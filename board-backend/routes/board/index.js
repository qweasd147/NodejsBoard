const express = require('express');
const { wrapAsyncForReject } = require('../utils/asyncUtils');
const multer = require('multer');
//const Q = require('q');
const uuid = require('node-uuid');

const router = express.Router();
const boardCtrl = require('./ctrl');

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
    , filename: (req, file, callback)=>{
        let fileName = uuid.v4();

        callback(null, fileName);
    }
});

const upload = multer({ storage: storage });

/**
 * Board List
 */
router.get('/', wrapAsyncForReject(boardCtrl.getBoardList));

/**
 * Board 상세
 * 
 * errCode
 * 2 -> 잘못된 아이디
 */
router.get('/:id', wrapAsyncForReject(boardCtrl.getBoardDetail));

/**
 * 글쓰기
 * 
 * errCode 
 * 1 -> 벨리데이션 오류
 */
router.post('/', upload.array('uploadFile[]'), wrapAsyncForReject(boardCtrl.insertBoardOne));

/**
 * 글수정
 * 
 * errCode 
 * 1 -> 벨리데이션 오류
 * 2 -> 잘못된 아이디
 * 3 -> 해당 글번호 존재안함
 * 4 -> 수정 권한 없음
 */
router.put('/:id', upload.array('uploadFile[]'), wrapAsyncForReject(boardCtrl.updateBoardOne));

/**
 * Board 삭제
 * 
 * errCode
 * 2 -> 잘못된 아이디
 */
router.delete('/:id', wrapAsyncForReject(boardCtrl.deleteBoardOne));

/**
 * download 요청을 한다.
 */
router.get('/download/:boardId/:fileId', wrapAsyncForReject(boardCtrl.downloadFile));

module.exports = router;