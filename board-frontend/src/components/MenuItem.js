import React from 'react';
import { Link } from 'react-router-dom';

class MenuItem extends React.Component {
    constructor(props){
        super(props);

        this.logOut = this.logOut.bind(this);
        this.userInfo = this.userInfo.bind(this);
    }

    logOut(){
        this.props.logOutRequest();

        return false;
    }

    userInfo(){
        this.props.userInfoRequest();
    }

    componentWillMount(){
        //쿠키를 사용해서 로그인 여부 확인
        this.props.setIsLogin();
    }
    render() {
        const loginMenu = (
            <ul className={ this.props.menuType=="top" ? "right hide-on-med-and-down" : "side-nav" }
                id={ this.props.menuType=="top" ? undefined : "mobile-demo" }>
                <li><Link to="/listBoard">List</Link></li>
                <li><Link to="/insertBoard">Insert</Link></li>
                {/*
                <li><a href="#none" onClick={this.props.logoutRequest}>logout</a></li>
                <li><a href="#none" onClick={this.props.popUserInfo}>UserInfo</a></li>
                */}
                
                <li><a href="#none" onClick={this.logOut}>logout</a></li>
                <li><a href="#none" onClick={this.userInfo}>userInfo</a></li>
            </ul>
        );

        const notLoginMenu = (
            <ul className={ this.props.menuType=="top" ? "right hide-on-med-and-down" : "side-nav" }
                id={ this.props.menuType=="top" ? undefined : "mobile-demo" }>
                <li><Link to="/listBoard">List</Link></li>
                {/**
                    <li><a href="#none" className="kakakoLogin" onClick={this.props.loginRequest}>login</a></li>    
                */}
                <li><Link to="/login">Login Page</Link></li>
            </ul>
        );

        return (
            <div>
                { this.props.isLogin == true ? loginMenu : notLoginMenu }
            </div>
        );
    }
}


MenuItem.propTypes = {
};

MenuItem.defaultProps = {
};

export default MenuItem;