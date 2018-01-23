import * as types from '../actions/ActionTypes';
import { Materialize } from './thirdPartyLib';

const SHOW_TIME = 2;
const ERR_MSG = '오류가 발생하였습니다.';

let statusHandler = {};

statusHandler.showErrMessage = (msg) => {
        
        console.warn("ERR!");

        Materialize.toast(msg || ERR_MSG, SHOW_TIME * 1000);
}

statusHandler.checkState=(state="", msg)=>{
        
        if(state.indexOf(types.FAIL_POSTFIX)>=0){
                statusHandler.showErrMessage(msg);
        
                return false;
        }else if(state.indexOf(types.WAIT_POSTFIX)>=0){
                return true;
        }else if(state.indexOf(types.SUCCESS_POSTFIX)>=0){
                return true;
        }
}

export default statusHandler;