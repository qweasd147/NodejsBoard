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
router.get('/:page', (req, resp) => {
    const page = req.params.page || 1;
    const keyword = req.params.keyword || '';
    const searchWord = req.params.searchWord || '';
    const perPage = 10; //하나의 페이지 당 출력 게시글
    
    Board.find({"state" : 1}).count((err,count)=>{
        Board.find({"state" : 1}).sort({"_id": -1})
        .limit(perPage)
        .skip(perPage*(page-1))
        .select('subject contents writer date tag count')
        .exec((err, boardList) => {
            if(err) throw err;
            resp.json({
                boardList
                ,count
                ,page
            });
        });
    });
});

/**
 * Board 상세
 * 
 * errCode
 * 2 -> 잘못된 아이디
 */
router.get('/select/:id', (req, resp) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return resp.status(400).json({
            error: "INVALID ID",
            code: 2
        });
    }

    /*
    Board.findById(req.params.id,
    'subject contents writer date tag count '
    +'file._id file.originName file.ext file.size'
    ,(err, selectData) => {
        if(err) throw err;

        // IF board DOES NOT EXIST
        if(!selectData) {
            return resp.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }

        return resp.json({
            selectData
        });
    });
    */
    
    Board.findOneAndUpdate(
        { "_id" : req.params.id, "state" : 1}
        ,{ $inc :  {count : 1}}
        ,{ "projection": {
            "file": {
                $elemMatch: {"state" : 1 } 
                }
            }
        }
        )
        .select(
            'subject contents writer date tag count '
            +'file._id file.originName file.ext file.size')
        .exec((err, selectData)=>{
            if(err) throw err;

            // IF board DOES NOT EXIST
            if(!selectData) {
                return resp.status(404).json({
                    error: "NO RESOURCE",
                    code: 3
                });
            }

            return resp.json({
                selectData
            });
        });
});

/**
 * 글쓰기
 * 
 * errCode 
 * 1 -> 벨리데이션 오류
 */
router.post('/', upload.array('uploadFile[]'), (req,resp)=>{
    
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
    
    let board = new Board({
        subject : req.body.subject,
        contents : req.body.contents,
        count : 0,
        writer : req.user.nickName,
        tag : req.body.tag,
        file : fileArr,
        state : 1
    });
    
    board.save( err => {
        if(err) throw err;
        return resp.json({ success: true });
    });
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
router.put('/:id', upload.array('uploadFile[]'), (req,resp)=>{
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
    
    Board.findById(req.params.id, (err, board) => {
        if(err){
            throw err
        };

        // IF board DOES NOT EXIST
        if(!board) {
            return resp.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }

        // MODIFY AND SAVE IN DATABASE
        board.subject = req.body.subject;
        board.contents = req.body.contents;
        board.writer = req.user.nickName,
        //board.date.edited = Date.now;
        board.date.edited = new Date();
        board.tag = req.body.tag;
        
        //삭제 요청한 파일 id값을 기준으로 삭제 처리를 진행(flag 번경) 한다.
        if(Array.isArray(req.body.deleteFile) && Array.isArray(board.file)){
            for(let i=0;i<req.body.deleteFile.length;i++){
                for(let j=0;j<board.file.length;j++){
                    if(board.file[j].equals(req.body.deleteFile[i])){
                        board.file[j].state=0;

                        continue;
                    }
                }
            }
        }
        

        board.save((err, board) => {
            if(err) throw err;
            return resp.json({
                success: true,
                board
            });
        });
    });
});

/**
 * Board 삭제
 * 
 * errCode
 * 2 -> 잘못된 아이디
 */
router.delete('/:id', (req, resp) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return resp.status(400).json({
            error: "INVALID ID",
            code: 2
        });
    }

    Board.update(
        { "_id" : req.params.id, "state" : 1}
        , { $set :  {"state" : 0}}
        ,(err, count, status)=>{
            if(err) throw err;

            return resp.json({
                success: true
            });
        });
});

/**
 * download 요청을 한다.
 */
router.get('/download/:boardId/:fileId',(req,resp)=>{
    
    const boardId = req.params.boardId;
    const fileId = req.params.fileId;

    

    if(!(mongoose.Types.ObjectId.isValid(boardId) && mongoose.Types.ObjectId.isValid(fileId))){
        return resp.status(404).json({
                error: "WRONG BOARD AND FILE ID",
                code: 4
            });
    }


    //TODO : 파일이 삭제 되었는지 안되어 있는지 검사해야함
    Board.findOne({_id : mongoose.Types.ObjectId(boardId)
        , 'file._id': mongoose.Types.ObjectId(fileId)
    },"file"
    ,(err, fileData) => {
        if(err) throw err;


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