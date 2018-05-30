import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initSelect = 
    {
        boardId : '-1'
        , data : {
            number:0
            ,subject:""
            ,count:0
            ,date : {created : '', edited : ''}
            ,writer : ''
            ,tag : []
            ,file : []
        }
        , status : types.INITAL_APP
        , error : -1
        , msg : 'INIT'
    };

const initWrite = 
    {
        status : types.INITAL_APP
        , msg : 'INIT'
    }

const initList = 
    {
        data : []
        , totCount : 0
        , currentPage : 1
        , status : types.INITAL_APP
        , msg : 'INIT'
    }
/*
const initialState = 
    {
        list: initList
        , post : initPost
        , select : initSelect
    };
*/
const initialState =
    {
        list : initList
        , selectOne : initSelect
        , write : initWrite
    }

export default function board(appState, action){
    if(typeof appState === "undefined") {
        appState = initialState;
    }
    switch(action.type) {
        //list
        case types.LIST_BOARD_WAIT:
            return update(appState, {
                list : {
                    status : {$set:types.LIST_BOARD_WAIT}
                }
            });
        case types.LIST_BOARD_SUCCESS:
            return update(appState, {
                list: {
                    data: { $set: action.data.boardList }
                    , totCount : {$set: action.data.count}
                    , currentPage : {$set: parseInt(action.data.page)}
                    , status : {$set:types.LIST_BOARD_SUCCESS}
                }, 
            });
        case types.LIST_BOARD_FAIL:
            return update(appState, {
                list : {
                    status : {$set:types.LIST_BOARD_FAIL}
                    , msg : { $set: action.msg }
                }
            });
        //insert
        case types.INSERT_BOARD_WAIT:
            return update(appState, {
                write : {
                    status : {$set:types.INSERT_BOARD_WAIT}
                }
            });
        case types.INSERT_BOARD_SUCCESS:
            return update(appState, {
                write : {
                    status : {$set:types.INSERT_BOARD_SUCCESS}
                }
            });    
        case types.INSERT_BOARD_FAIL:
            return update(appState, {
                write : {
                    state : {$set:types.INSERT_BOARD_FAIL}
                    , msg : { $set: action.msg }
                }
            });
        //select    
        case types.SELECT_BOARD_WAIT:
            return update(appState, {
                selectOne : {
                    status : {$set:types.SELECT_BOARD_WAIT}
                }
            });
        
        case types.SELECT_BOARD_SUCCESS:
            return update(appState, {
                selectOne : {
                    data : {$set:action.data}
                    , status : {$set:types.INSERT_BOARD_SUCCESS}
                }
            });

        case types.SELECT_BOARD_FAIL:
            return update(appState, {
                selectOne : {
                    status : {$set:types.SELECT_BOARD_FAIL}
                    , msg : { $set: action.msg }
                }
            });
        //update
        case types.UPDATE_BOARD_WAIT:
            return update(appState, {
                write : {
                    status : {$set:types.UPDATE_BOARD_WAIT}
                }
            });
        case types.UPDATE_BOARD_SUCCESS:
            return update(appState, {
                write : {
                    status : {$set:types.UPDATE_BOARD_SUCCESS}
                }
            });    
        case types.UPDATE_BOARD_FAIL:
            return update(appState, {
                write : {
                    state : {$set:types.UPDATE_BOARD_FAIL}
                    , msg : { $set: action.msg }
                }
            });
        //delete
        case types.DELETE_BOARD_WAIT:
            return update(appState, {
                write : {
                    status : {$set:types.DELETE_BOARD_WAIT}
                }
            });
        case types.DELETE_BOARD_SUCCESS:
            return update(appState, {
                write : {
                    status : {$set:types.DELETE_BOARD_SUCCESS}
                }
            });    
        case types.DELETE_BOARD_FAIL:
            return update(appState, {
                write : {
                    state : {$set:types.DELETE_BOARD_FAIL}
                    , msg : { $set: action.msg }
                }
            });
        default:
            
    }
    return appState;
};