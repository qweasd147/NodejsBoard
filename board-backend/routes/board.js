const express = require('express');
const Board = require('../model/board');
const { getRemoteAddr } = require('../util/httpUtils');
const mongoose = require('mongoose');
const multer = require('multer');
//const Q = require('q');
const uuid = require('node-uuid');

const router = express.Router();

/*
var saveFile = function (req, res) {
    var deferred = Q.defer();
    var storage = multer.diskStorage({
        // 서버에 저장할 폴더
        destination: '/dev/upload'
        
        // 서버에 저장할 파일 명
        , filename: function (req, file, cb) {
            file.uploadedFile = {
                name: req.params.filename,
                ext: file.mimetype.split('/')[1]
            };
            cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext+(new Date().getTime()));
        }
    });
    
    var upload = multer({ storage: storage }).single('uploadFile');
    upload(req, res, function (err) {
        if (err) deferred.reject();
        else deferred.resolve(req.file.uploadedFile);
    });

    return deferred.promise;
};
*/

const storage = multer.diskStorage({
    destination: '/dev/upload'
    , filename: function (req, file, callback) {        
        let fileName = uuid.v4();

        callback(null, fileName);
    }
});

const upload = multer({ storage: storage });

/**
 * Board List
 */
router.get('/', async (req, resp) => {

    const {
        keyword
        , searchWord
        , page
    } = req.query

    const perPage = 10; //하나의 페이지 당 출력 게시글
    
    let findParams = {"state" : 1};

    //state(게시물 상태값)은 검색 조건과 무관해야함!
    if(keyword && searchWord && (keyword != "state")){

        const arrSearchWord = searchWord.split(" ").filter((token)=>token);

        findParams[keyword] = { $in : arrSearchWord};
    }

    const arrPromise = [ Board.listBoard(page || 1, findParams), Board.selectBoardCount(findParams) ];

    const listBoardResults = await Promise.all(arrPromise);

    const boardListData = listBoardResults[0];
    const boardListCount = listBoardResults[1];

    return resp.json({
        boardList : boardListData
        , count :boardListCount
        , page : page || 1
    });
});

/**
 * Board 상세
 * 
 * errCode
 * 2 -> 잘못된 아이디
 */
router.get('/:id', async (req, resp) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return resp.status(400).json({
            error: "INVALID ID",
            code: 2
        });
    }

    const boardOne = await Board.selectBoard(req.params.id, true);

    if(!boardOne) {
        return resp.status(404).json({
            error: "NO RESOURCE",
            code: 3
        });
    }

    //삭제 처리 된 파일은 제거. 쿼리문에서 필터링 하는걸 모르겠음...
    boardOne.file = boardOne.file.filter((item)=>item.state===1);

    return resp.json({
        selectData : boardOne
    });
});

/**
 * 글쓰기
 * 
 * errCode 
 * 1 -> 벨리데이션 오류
 */
router.post('/', upload.array('uploadFile[]'), async (req,resp)=>{
    
    //벨리데이션
    if(!(req.body.subject && req.body.contents)){
        return resp.status(403).json({
            error: "check validation",
            code: 1
        });
    }
    
    //로그인 체크
    if(!(req.user)){
        return resp.status(403).json({
            error: "PERMISSION FAILURE",
            code: 4
        });
    }
    
    let fileArr = getFileObjArr(req.files);
    
    await Board.insertBoard({
        subject : req.body.subject,
        contents : req.body.contents,
        count : 0,
        writer : req.user.nickName,
        tag : req.body.tag,
        file : fileArr,
        state : 1
    });

    return resp.json({ success: true });
});

/**
 * 글수정
 * 
 * errCode 
 * 1 -> 벨리데이션 오류
 * 2 -> 잘못된 아이디
 * 3 -> 해당 글번호 존재안함
 * 4 -> 수정 권한 없음
 */
router.put('/:id', upload.array('uploadFile[]'), async (req,resp)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return resp.status(400).json({
            error: "INVALID ID",
            code: 2
        });
    }

    //로그인 체크
    if(!(req.user)){
        return resp.status(403).json({
            error: "PERMISSION FAILURE",
            code: 4
        });
    }

    if(!(req.body.subject && req.body.contents)){
        return resp.status(403).json({
            error: "check validation",
            code: 1
        });
    }
    
    const newBoardData = {
        subject : req.body.subject
        , contents : req.body.contents
        , writer : req.user.nickName
        , date : {edited : new Date()}
        , tag : req.body.tag || []
    }

    const fileArr = getFileObjArr(req.files);

    const dtchFileArr = Array.isArray(req.body.deleteFile)? req.body.deleteFile : [];

    await Board.updateBoard(req.params.id, newBoardData, fileArr, dtchFileArr);

    return resp.json({
        success: true
    });
});

/**
 * Board 삭제
 * 
 * errCode
 * 2 -> 잘못된 아이디
 */
router.delete('/:id', async (req, resp) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return resp.status(400).json({
            error: "INVALID ID",
            code: 2
        });
    }

    await Board.deleteBoard(req.params.id);

    return resp.json({
        success: true
    });
});

/**
 * download 요청을 한다.
 */
router.get('/download/:boardId/:fileId', async (req,resp)=>{
    
    const boardId = req.params.boardId;
    const fileId = req.params.fileId;

    if(!(mongoose.Types.ObjectId.isValid(boardId) && mongoose.Types.ObjectId.isValid(fileId))){
        return resp.status(404).json({
                error: "WRONG BOARD AND FILE ID",
                code: 4
            });
    }

    const fileData = await Board.selectBoardFile(boardId, fileId);

    // IF board DOES NOT EXIST
    if(!(fileData.file.length>0)) {
        return resp.status(404).json({
            error: "NO RESOURCE",
            code: 3
        });
    }

    const fileFullPath = fileData.file[0].uploadedDir +"/"+ fileData.file[0].uploadedName;
    const originName = fileData.file[0].originName;

    resp.download(fileFullPath, originName);
});

/**
 * multer에서 upload에서 제공받는 형태와
 * MongoDb에 저장할 형태를 맞추는 adapter
 * @param {*} files 
 */
function getFileObjArr(files){
    let rtnArr = new Array();

    if(!files)
        return rtnArr;
        
    for(let i=0;i<files.length;i++){

        let _ext = "";

        const oFileName = files[i].originalname;
        const _idx = oFileName.lastIndexOf('.');
        
        if(_idx>0){
            _ext = oFileName.substr(_idx+1, oFileName.length)
        }

        let fileObj = {
            uploadedName : files[i].filename
            , uploadedDir : files[i].destination
            , originName : files[i].originalname
            , ext : _ext || ''
            , mimeType : files[i].mimetype
            , size : files[i].size
            , state : 1
        }
        rtnArr.push(fileObj);
    }

    return rtnArr;
}

module.exports = router;