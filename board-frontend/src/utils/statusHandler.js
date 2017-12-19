import * as types from '../actions/ActionTypes';

const SHOW_TIME = 2;
const ERR_MSG = '오류가 발생하였습니다.';

let statusHandler = {};

statusHandler.showErrMessage = (msg) => {
        
        console.warn("ERR!");

        Toast.info(ERR_MSG, SHOW_TIME, null, false);

        Materialize.toast(msg || ERR_MSG, SHOW_TIME * 1000);
}

statusHandler.checkState=(state="", msg)=>{
        
        if(state.indexOf(types.FAIL_POSTFIX)>=0){
                statusHandler.showErrMessage(msg);
                //로딩바 꺼야함
                
                return false;
        }else if(state.indexOf(types.WAIT_POSTFIX)>=0){
                //로딩바 돌려야함
                return true;
        }else if(state.indexOf(types.SUCCESS_POSTFIX)>=0){
                //로딩바 꺼야야함
                return true;
        }
}

export default statusHandler;