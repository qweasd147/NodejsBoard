import React from 'react';
import { connect } from 'react-redux';
import { WriteBoard } from '../components';
import { boardSelectRequest, boardUpdateRequest } from '../actions/Board';
import {withRouter} from "react-router-dom";
import queryString from 'query-string';
import withBaseWrapHoc from './withBaseWrap';

const INDEX_PAGE = '/';

class Update extends React.Component{
    constructor(props){
        super(props);

        this.viewList = this.viewList.bind(this);

        this.state = {
            boardId : ''
        }
    }

    componentWillMount(){
        const query = queryString.parse(window.location.search);

        const boardId = query.board;

        this.setState({
            boardId
        });
        this.props.boardSelectRequest(boardId);
    }

    viewList(){
        this.props.history.push(INDEX_PAGE);
    }

    render(){
        return (
            <WriteBoard
            handleWrite={this.props.boardUpdateRequest}
            afterWrite={this.viewList}
            isInsert = {false}
            selectData = {this.props.boardData}
            boardId = {this.state.boardId}
            />
        );
    };
}



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
        boardUpdateRequest : (formData, boardId)=>{
            return dispatch(boardUpdateRequest(formData, boardId));
        }
        , boardSelectRequest : (_boardId)=>{
            return dispatch(boardSelectRequest(_boardId));
        }
    };
};

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(withRouter(Update));

export default withBaseWrapHoc(connectComponent);