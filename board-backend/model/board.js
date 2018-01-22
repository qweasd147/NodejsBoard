const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Board = new Schema({
    subject : String
    , contents : String
    , writer : String
    , date: {
        created: { type: Date, default: Date.now },
        edited: { type: Date, default: Date.now }
    }
    , tag : [String]
    , count : {type : Number, integer : true}
    , file : [{
        uploadedName : String
        , uploadedDir : String
        , originName : String
        , ext : String
        , mimeType : String
        , size : Number
        , state : {type : Number, integer : true}
    }]
    , state : {type : Number, integer : true}
});

Board.statics.listBoard = async function( page, findParams ) {

    const perPage = 10; //페이지 당 출력 할 게시물

    page = page || 1;
    findParams = findParams || {};

    return this.find(findParams)
        .sort({"_id": -1})
        .limit(perPage)
        .skip(perPage*((page || 1)-1))
        .select('subject contents writer date tag count')
        .exec();
}

Board.statics.selectBoardCount = function( findParams ) {

    findParams = findParams || {};

    return this.find(findParams).count().exec();
}

Board.statics.selectBoard = function( boardId, isIncCount) {

    let updateData;

    isIncCount = isIncCount || true;

    if(isIncCount){
        updateData = { $inc :  {count : 1}}
    }else{
        updateData = {};
    }

    return this.findOneAndUpdate(
        { "_id" : boardId, "state" : 1}
        , updateData
        ,{ 'new' : true}
        )
        .select(
            'subject contents writer date tag count '
            +'file._id file.originName file.ext file.size file.state')
        .exec();
}

Board.statics.insertBoard = function( boardDataObj ) {


    const board = new this(boardDataObj);

    return board.save();
}

Board.statics.updateBoard = async function( boardId, boardDataObj, arrAtchFile, arrDtchFile ) {

    

    //먼저 삭제를 완료 하고 게시글 내용 수정

    /* mongodb version 3.6이상 되어야 가능 하다고 나와있음. 따로 테스트x
    await this.update(
        { "_id" : boardId, "state" : 1, "file._id" : { $in : arrDtchFile}}
        , { $set : { "file.$[i].state" : 0 }}
        , { arrayFilters : [{"i._id" : { $in : arrDtchFile}}]
            , multi : true
        }
    ).exec();
    */

    if(Array.isArray(arrDtchFile) && arrDtchFile.length > 0){
        let _boardData = await this.findById(boardId).exec();

        for(let i=0;i<arrDtchFile.length;i++){
            for(let j=0;j<_boardData.file.length;j++){
                if(_boardData.file[j].equals(arrDtchFile[i])){
                    _boardData.file[j].state=0;

                    continue;
                }
            }
        }

        await _boardData.save();
    }

    
    return updateBoard = this.update(
        { "_id" : boardId, "state" : 1}
        , { $set :  boardDataObj
            , $push : { file : { $each : arrAtchFile } }
        }
    ).exec();
}

Board.statics.deleteBoard = function( boardId, boardDataObj ) {

    return this.update(
        { "_id" : boardId, "state" : 1}
        , { $set :  {"state" : 0}}
    ).exec();
}

Board.statics.selectBoardFile = function( boardId, fileId ) {

    return this.findOne({
        _id : mongoose.Types.ObjectId(boardId)
        ,state : 1
    }
    ,{'file': {$elemMatch : {
            _id: mongoose.Types.ObjectId(fileId)
            ,state : 1
        }}
    })
    .exec();
}

module.exports = mongoose.model('board',Board);