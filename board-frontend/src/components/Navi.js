import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';
import { $, Materialize, Kakao } from '../utils/thirdPartyLib';

class Navi extends React.Component {
    constructor(props){
        super(props);

        this.loginWithKakao = this.loginWithKakao.bind(this);
        this.logoutWithKakao = this.logoutWithKakao.bind(this);
        this.requestLoginInfo = this.requestLoginInfo.bind(this);
        this.logOut = this.logOut.bind(this);
    }


    componentDidMount(){
        Kakao.init('68eff7df246366981018889dfb695cbd');
        // 카카오 로그인 버튼을 생성합니다.
        /*
        Kakao.Auth.createLoginButton({
          success: function(authObj) {
            alert(JSON.stringify(authObj));
          },
          fail: function(err) {
             alert(JSON.stringify(err));
          }
        });
        */

        $('.button-collapse').sideNav({
            closeOnClick: true
        });
    }

    loginWithKakao(){
        Kakao.Auth.login({
            success: function(authObj) {
                //alert(JSON.stringify(authObj));
                Materialize.toast('로그인 성공.', 2000);
            },
            fail: function(err) {
                alert(JSON.stringify(err));
                Materialize.toast('로그실패'+JSON.stringify(err), 2000);
            }
        });

        return false;
    }

    logoutWithKakao(){
        Kakao.Auth.logout(()=>{
            Materialize.toast('로그아웃 성공.', 2000);
        });

        return false;
    }

    requestLoginInfo(){
        Kakao.API.request({
          url: '/v1/user/me',
          success: function(res) {
            alert(JSON.stringify(res));
          },
          fail: function(error) {
            alert(JSON.stringify(error));
          }
        });
        
    }

    logOut(){

    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper teal lighten-2">
                    <Link to="/" className="brand-logo">Logo</Link>
                    <a href="#none" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                    <MenuItem menuType="top" 
                        loginRequest = {this.loginWithKakao}
                        logoutWithKakao = {this.logoutWithKakao}
                        popUserInfo = {this.requestLoginInfo}
                        setIsLogin = {this.props.setIsLogin}
                        isLogin = {this.props.isLogin}
                        logOutRequest = {this.props.logOutRequest}
                        userInfoRequest = {this.props.userInfoRequest}
                        />
                    <MenuItem menuType="side"
                        loginRequest = {this.loginWithKakao}
                        logoutWithKakao = {this.logoutWithKakao}
                        popUserInfo = {this.requestLoginInfo}
                        setIsLogin = {this.props.setIsLogin}
                        isLogin = {this.props.isLogin}
                        logOutRequest = {this.props.logOutRequest}
                        userInfoRequest = {this.props.userInfoRequest}
                        />
                </div>
            </nav>
        );
    }
}


/**
 * isLoggedIn -> 로그인 상태인지 아닌지
 * onLogout 로그아웃 담당
 * 
 * a 태그 대신에 react-router 의 Link 컴포넌트를 사용
 * 페이지를 새로 로딩하는것을 막고, 라우트에 보여지는 내용만 변하게 해준다
 */
Navi.propTypes = {
};

Navi.defaultProps = {
};

export default Navi;