import React from 'react';
import { connect } from 'react-redux';
import { thirdPartyUrlRequest } from '../actions/Authen';
import {withRouter} from "react-router-dom";


class Login extends React.Component{

    componentWillMount(){
        this.props.thirdPartyUrlRequest();
    }

    render(){
        /*
        const serverHost = process.env.REACT_APP_SERVER_HOST || "";

        const googleLogin = "/api/authen/login/google";
        const kakaoLogin = "/api/authen/login/kakao";
        const naverLogin = "/api/authen/login/naver";
        */
        const {
            googleURL
            , kakaoURL
            , naverURL
        } = this.props.urlMap;

        return(
            <div className="container" id="main-contents">
                <h1 className="text-center">Login</h1>
                <div>
                    <a href={googleURL} className="btn btn-block blue">Google</a>
                    <a href={kakaoURL} className="btn btn-block yellow">KaKao</a>
                    <a href={naverURL} className="btn btn-block">Naver</a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        urlMap: state.authen.urlRequest.dataMap
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        thirdPartyUrlRequest : ()=>{
            return dispatch(thirdPartyUrlRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));