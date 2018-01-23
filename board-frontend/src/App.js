import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Navi, Footer, LoadingBar } from './components';
import { setIsLogin, logOutRequest, userInfoRequest } from './actions/Authen';
import { connect } from 'react-redux';

import { Home, Insert, Select, Update, Login } from './containers';

class App extends Component {
    constructor(props) {
        super(props);

        this.logOutProcess = this.logOutProcess.bind(this);
    }

    componentDidMount(){
        this.props.setIsLogin();
    }

    logOutProcess(){
        this.props.logOutRequest()
        .then((response) => {
            this.props.setIsLogin();
        }).catch((error) => {
            this.props.setIsLogin();
        });
    }

    render() {
        return (
            <Router>
                <div>
                    { this.props.isLoading === true ? <LoadingBar/> : undefined }
                    <Navi
                        searchData = {this.props.searchData}
                        setIsLogin = {this.props.setIsLogin}
                        isLogin = {this.props.isLogin}
                        logOutRequest = {this.logOutProcess}
                        userInfoRequest = {this.props.userInfoRequest}
                    />
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/listBoard" component={Home}/>
                        <Route exact path="/insertBoard" component={Insert}/>
                        <Route exact path="/selectBoard" component={Select}/>
                        <Route exact path="/updateBoard" component={Update}/>
                        <Route component={Home}/>
                    </Switch>
                    <Footer />
                    
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchData: state.board.searchData
        , isLogin : state.authen.isLogin
        , isLoading : state.common.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setIsLogin: () => {
            return dispatch(setIsLogin());
        }
        , logOutRequest : () => {
            return dispatch(logOutRequest());
        }
        , userInfoRequest : () => {
            return dispatch(userInfoRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);