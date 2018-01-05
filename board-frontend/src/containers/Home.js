import React from 'react';
import { connect } from 'react-redux';
import { ListBoard } from '../components';
import { BoardListRequest } from '../actions/Board';
import {withRouter} from "react-router-dom";

const SELECT_PAGE = '/selectBoard';

class Home extends React.Component{
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(_boardID){
        this.props.history.push(SELECT_PAGE+'?board='+_boardID);
    }
    componentWillMount(){
        this.props.boardListRequest(1).then(()=>{
            //
        });
    }

    render(){
        return (
            <ListBoard 
            listBoard = {this.props.boardData} 
            totCount = {this.props.totCount} 
            handlePage = {this.props.boardListRequest}
            page = {this.props.currentPage}
            handleSelectBoard = {this.handleSelect}
            isLogin = {this.props.isLogin}
            handleListBoard = {this.props.boardListRequest}
            />
        );
    };
}



const mapStateToProps = (state) => {
    return {
        boardData: state.board.list.data
        , totCount : state.board.list.totCount
        , currentPage : state.board.list.currentPage
        , isLogin : state.authen.isLogin
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        boardListRequest: (pageNum, keyword, searchWord) => {
            return dispatch(BoardListRequest(pageNum, keyword, searchWord));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));