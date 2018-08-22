import React from 'react';
import { connect } from 'react-redux';
import { thirdPartyUrlRequest } from '../actions/Authen';
import {withRouter} from "react-router-dom";


class Login extends React.Component{
    render(){
        const serverHost = process.env.REACT_APP_SERVER_HOST || "";
        const googleLogin = "/api/authen/login/google";
        const kakaoLogin = "/api/authen/login/kakao";
        const naverLogin = "/api/authen/login/naver";

        return(
            <div className="container" id="main-contents">
                <h1 className="text-center">Login</h1>
                <div>
                    <a href={serverHost+googleLogin} className="btn btn-block blue">google</a>
                    <a href={serverHost+kakaoLogin} className="btn btn-block yellow">KaKao</a>
                    <a href={serverHost+naverLogin} className="btn btn-block">Naver</a>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        thirdPartyUrlRequest : ()=>{
            return dispatch(thirdPartyUrlRequest());
        }
    };
};

export default connect(null, mapDispatchToProps)(withRouter(Login));;