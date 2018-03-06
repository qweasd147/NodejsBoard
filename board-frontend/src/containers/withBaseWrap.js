import React from 'react';
import { connect } from 'react-redux';

import { WAIT_POSTFIX, SUCCESS_POSTFIX, FAIL_POSTFIX } from '../actions/ActionTypes';
import { Materialize } from '../utils/thirdPartyLib';
import { dataLoading, dataLoadingComplete } from '../actions/Common';

const withBaseWrap = (ParamsComponent) =>{
    class baseHoc extends React.Component {
        
        checkContainersState(){

            const _status = this.props.status;
            const _msg = this.props.msg;

            console.log(333);
            
            if(_status.indexOf(WAIT_POSTFIX) > 0){    
                this.props.dataLoading();
            }else if(_status.indexOf(SUCCESS_POSTFIX) > 0){
                this.props.dataLoadingComplete();
            }else if(_status.indexOf(FAIL_POSTFIX) > 0){
                this.props.dataLoadingComplete();
                Materialize.toast(_msg || '오류가 발생 하였습니다.', 2000);
            }
        }

        shouldComponentUpdate(prevProps, prevState) {
            console.log('check update');
            return prevProps !== this.props;
        }

        componentDidMount() {
            this.checkContainersState();
        }
        
        componentDidUpdate(prevProps, prevState){
            this.checkContainersState();
        }

        render() {
          return (
            <ParamsComponent {...this.props}/>
          )
        }
    }

    baseHoc.defaultProps = {
        msg: ''
        , status: ''
    };

    const mapStateToProps = (state) => {
        return {
            boardData : state.board.selectOne.data
            , isLogin : state.authen.isLogin
            , status : state.board.selectOne.status
            , msg : state.board.selectOne.msg
        }
    };
    
    const mapDispatchToProps = (dispatch) => {
        return {
            dataLoading : ()=>{
                return dispatch(dataLoading());
            }
            , dataLoadingComplete : ()=>{
                return dispatch(dataLoadingComplete());
            }
        };
    };

    return connect(mapStateToProps, mapDispatchToProps)(baseHoc);
}

export default withBaseWrap;