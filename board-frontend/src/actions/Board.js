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

import { requestGET, requestPOST, requestPUT, requestDELETE } from '../utils/ajaxUtils';

const BOARD_API = "/api/board/";

//글 목록
export function BoardListRequest(pageNum, keyword, searchWord) {
    return (dispatch) => {

        dispatch(listBoardWait());
        
        let queryStr = "";

        if(keyword && searchWord){
            queryStr = `?keyword=${keyword}&searchWord=${searchWord}&page=${pageNum}`;
        }else{
            queryStr = `?page=${pageNum}`;
        }

        return requestGET(BOARD_API+queryStr)
        .then((response) => {
            dispatch(listBoardSuccess(response.data));
        }).catch((error) => {
            dispatch(listBoardFail(error.message));
        });
    };
}

export function listBoardWait() {
    return {
        type: LIST_BOARD_WAIT
    };
}

export function listBoardSuccess(data) {
    return {
        type: LIST_BOARD_SUCCESS
        , data
    };
}

export function listBoardFail(msg) {
    return {
        type: LIST_BOARD_FAIL
        , msg
    };
}

//글쓰기
export function boardWriteRequest(formData) {
    return (dispatch) => {

        dispatch(insertBoardWait());

        var options = {
            headers: { 'content-type': 'multipart/form-data' }
        };

        return requestPOST(BOARD_API, formData, options)
        .then((response) => {
            dispatch(insertBoardSuccess(response.data));
        }).catch((error) => {
            dispatch(insertBoardFail(error.message));
        });
    };
}

export function insertBoardWait() {
    return {
        type: INSERT_BOARD_WAIT
    };
}

export function insertBoardSuccess(data) {
    return {
        type: INSERT_BOARD_SUCCESS
        , data
    };
}

export function insertBoardFail(msg) {
    return {
        type: INSERT_BOARD_FAIL
        , msg
    };
}

//글 상세
export function boardSelectRequest(_id){
    return (dispatch)=>{

        dispatch(selectBoardWait());

        return requestGET(BOARD_API+_id)
        .then((response) => {
            dispatch(selectBoardSuccess(response.data));
        }).catch((error) => {
            dispatch(selectBoardFail(error.message));
        });
    }
}


export function selectBoardWait() {
    return {
        type: SELECT_BOARD_WAIT
    };
}

export function selectBoardSuccess(data) {
    return {
        type: SELECT_BOARD_SUCCESS
        , data
    };
}

export function selectBoardFail(msg) {
    return {
        type: SELECT_BOARD_FAIL
        , msg
    };
}

//글 수정
export function boardUpdateRequest(formData, _id) {
    return (dispatch) => {

        dispatch(updateBoardWait());

        var options = {
            headers: { 'content-type': 'multipart/form-data' }
        };

        return requestPUT(BOARD_API+_id, formData, options)
        .then((response) => {
            dispatch(updateBoardSuccess());
        }).catch((error) => {
            dispatch(updateBoardFail(error.message));
        });
    };
}

export function updateBoardWait() {
    return {
        type: UPDATE_BOARD_WAIT
    };
}

export function updateBoardSuccess() {
    return {
        type: UPDATE_BOARD_SUCCESS
    };
}

export function updateBoardFail(msg) {
    return {
        type: UPDATE_BOARD_FAIL
        , msg
    };
}

//글 삭제
export function boardDeleteRequest(_id){
    return (dispatch)=>{

        dispatch(deleteBoardWait());

        return requestDELETE(BOARD_API+_id)
        .then((response) => {
            dispatch(deleteBoardSuccess(response.data));
        }).catch((error) => {
            dispatch(deleteBoardFail(error.message));
        });
    }
}


export function deleteBoardWait() {
    return {
        type: DELETE_BOARD_WAIT
    };
}

export function deleteBoardSuccess(data) {
    return {
        type: DELETE_BOARD_SUCCESS
        , data
    };
}

export function deleteBoardFail(msg) {
    return {
        type: DELETE_BOARD_FAIL
        , msg
    };
}