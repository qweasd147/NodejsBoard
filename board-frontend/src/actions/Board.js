import {
    LIST_BOARD_WAIT
    , LIST_BOARD_SUCCESS
    , LIST_BOARD_FAIL
    , INSERT_BOARD_WAIT
    , INSERT_BOARD_SUCCESS
    , INSERT_BOARD_FAIL
    , SELECT_BOARD_WAIT
    , SELECT_BOARD_SUCCESS
    , SELECT_BOARD_FAIL
    , UPDATE_BOARD_WAIT
    , UPDATE_BOARD_SUCCESS
    , UPDATE_BOARD_FAIL
    , DELETE_BOARD_WAIT
    , DELETE_BOARD_SUCCESS
    , DELETE_BOARD_FAIL
} from './ActionTypes';
import { dataLoading, dataLoadingComplete
    , waitHandler, successHandler, failHandler, getErrMsg } from './Common';
import { requestGET, requestPOST, requestPUT, requestDELETE } from '../utils/ajaxUtils';

const BOARD_API = "/api/board/";

//글 목록
export function BoardListRequest(pageNum, condition, searchWord) {
    return (dispatch) => {
        
        dispatch(dataLoading());
        dispatch(listBoardWait());
        
        let queryStr = "";

        if(condition && searchWord){
            queryStr = `?searchCondition=${condition}&searchKeyWord=${searchWord}&pageIdx=${pageNum}`;
        }else{
            queryStr = `?pageIdx=${pageNum}`;
        }

        return requestGET(BOARD_API+queryStr)
        .then((response) => {
            dispatch(listBoardSuccess(response.data.data));
            dispatch(dataLoadingComplete());
        }).catch((error) => {
            dispatch(listBoardFail(getErrMsg(error)));
            dispatch(dataLoadingComplete());
        });
    };
}

export function listBoardWait() {
    return waitHandler(null, false, {
        type: LIST_BOARD_WAIT
    });
}

export function listBoardSuccess(data) {
    return successHandler(null, false, {
        type: LIST_BOARD_SUCCESS
        , data
    });
}

export function listBoardFail(msg) {
    return failHandler(msg, true, {
        type: LIST_BOARD_FAIL
        , msg
    });
}

//글쓰기
export function boardWriteRequest(formData) {
    return (dispatch) => {

        dispatch(dataLoading());
        dispatch(insertBoardWait());

        var options = {
            headers: { 'content-type': 'multipart/form-data' }
        };
        
        return requestPOST(BOARD_API, formData, options)
        .then((response) => {
            dispatch(insertBoardSuccess(response.data));
            dispatch(dataLoadingComplete());
        }).catch((error) => {
            dispatch(insertBoardFail(getErrMsg(error)));
            dispatch(dataLoadingComplete());
        });
    };
}

export function insertBoardWait() {
    return waitHandler(null, false, {
        type: INSERT_BOARD_WAIT
    });
}

export function insertBoardSuccess(data) {
    return successHandler(null, true, {
        type: INSERT_BOARD_SUCCESS
        , data
    });
}

export function insertBoardFail(msg) {
    return failHandler(msg, false, {
        type: INSERT_BOARD_FAIL
        , msg
    });
}

//글 상세
export function boardSelectRequest(_id){
    return (dispatch)=>{

        dispatch(dataLoading());
        dispatch(selectBoardWait());

        return requestGET(BOARD_API+_id)
        .then((response) => {
            dispatch(selectBoardSuccess(response.data.data));
            dispatch(dataLoadingComplete());
        }).catch((error) => {
            dispatch(selectBoardFail(getErrMsg(error)));
            dispatch(dataLoadingComplete());
        });
    }
}


export function selectBoardWait() {
    return waitHandler(null, false, {
        type: SELECT_BOARD_WAIT
    });
}

export function selectBoardSuccess(data) {
    return successHandler(null, false, {
        type: SELECT_BOARD_SUCCESS
        , data
    });
}

export function selectBoardFail(msg) {
    return failHandler(msg, true, {
        type: SELECT_BOARD_FAIL
        , msg
    });
}

//글 수정
export function boardUpdateRequest(formData, _id) {
    return (dispatch) => {

        dispatch(dataLoading());
        dispatch(updateBoardWait());

        var options = {
            headers: { 'content-type': 'multipart/form-data' }
        };

        return requestPOST(BOARD_API+_id, formData, options)
        .then((response) => {
            dispatch(updateBoardSuccess());
            dispatch(dataLoadingComplete());
        }).catch((error) => {
            dispatch(updateBoardFail(getErrMsg(error)));
            dispatch(dataLoadingComplete());
        });
    };
}

export function updateBoardWait() {
    return waitHandler(null, false, {
        type: UPDATE_BOARD_WAIT
    });
}

export function updateBoardSuccess() {
    return successHandler(null, true, {
        type: UPDATE_BOARD_SUCCESS
    });
}

export function updateBoardFail(msg) {
    return failHandler(msg, true, {
        type: UPDATE_BOARD_FAIL
        , msg
    });
}

//글 삭제
export function boardDeleteRequest(_id){
    return (dispatch)=>{

        dispatch(dataLoading());
        dispatch(deleteBoardWait());

        return requestDELETE(BOARD_API+_id)
        .then((response) => {
            dispatch(deleteBoardSuccess(response.data));
            dispatch(dataLoadingComplete());
        }).catch((error) => {
            dispatch(deleteBoardFail(getErrMsg(error)));
            dispatch(dataLoadingComplete());
        });
    }
}


export function deleteBoardWait() {
    return waitHandler(null, false, {
        type: DELETE_BOARD_WAIT
    });
}

export function deleteBoardSuccess(data) {
    return successHandler(null, true, {
        type: DELETE_BOARD_SUCCESS
        , data
    });
}

export function deleteBoardFail(msg) {
    return failHandler(msg, true, {
        type: DELETE_BOARD_FAIL
        , msg
    });
}