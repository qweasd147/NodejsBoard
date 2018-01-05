/* Board */

export const WAIT_POSTFIX           = "WAIT";
export const SUCCESS_POSTFIX        = "SUCCESS";
export const FAIL_POSTFIX           = "FAIL";

export const LIST_BOARD_WAIT        = "LIST_BOARD_"+WAIT_POSTFIX;
export const LIST_BOARD_SUCCESS     = "LIST_BOARD_"+SUCCESS_POSTFIX;
export const LIST_BOARD_FAIL        = "LIST_BOARD_"+FAIL_POSTFIX;

export const INSERT_BOARD_WAIT      = "INSERT_BOARD_"+WAIT_POSTFIX;
export const INSERT_BOARD_SUCCESS   = "INSERT_BOARD_"+SUCCESS_POSTFIX;
export const INSERT_BOARD_FAIL      = "INSERT_BOARD_"+FAIL_POSTFIX;

export const SELECT_BOARD_WAIT      = "SELECT_BOARD_"+WAIT_POSTFIX;
export const SELECT_BOARD_SUCCESS   = "SELECT_BOARD_"+SUCCESS_POSTFIX;
export const SELECT_BOARD_FAIL      = "SELECT_BOARD_"+FAIL_POSTFIX;

export const UPDATE_BOARD_WAIT      = "UPDATE_BOARD_"+WAIT_POSTFIX;
export const UPDATE_BOARD_SUCCESS   = "UPDATE_BOARD_"+SUCCESS_POSTFIX;
export const UPDATE_BOARD_FAIL      = "UPDATE_BOARD_"+FAIL_POSTFIX;

export const DELETE_BOARD_WAIT      = "DELETE_BOARD_"+WAIT_POSTFIX;
export const DELETE_BOARD_SUCCESS   = "DELETE_BOARD_"+SUCCESS_POSTFIX;
export const DELETE_BOARD_FAIL      = "DELETE_BOARD_"+FAIL_POSTFIX;

//어플 구동 상태
export const INITAL_APP             = "INIT";



//login
export const SET_IS_LOGIN = "SET_IS_LOGIN";
//logout
export const LOGOUT_WAIT = "LOGOUT_"+WAIT_POSTFIX;
export const LOGOUT_SUCCESS = "LOGOUT_"+SUCCESS_POSTFIX;
export const LOGOUT_FAIL = "LOGOUT_"+FAIL_POSTFIX;
//테스트용 action. 나중에 지울꺼
export const CHECK_LOGIN_DATA = "CHECK_LOGIN_DATA";


//data loding status
export const DATA_LOADING           = "WAIT";
export const DATA_LOADING_COMPLETE  = "DONE";