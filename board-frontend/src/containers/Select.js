import React from 'react';
import { connect } from 'react-redux';
import { SelectBoard } from '../components';
import { boardSelectRequest, boardDeleteRequest } from '../actions/Board';
import {withRouter} from "react-router-dom";
import withBaseWrapHoc from './withBaseWrap';
import queryString from 'query-string';

const UPDATE_PAGE='/updateBoard';
const LIST_PAGE='/';

class Select extends React.Component{
    constructor(props){
        super(props);

        this.handleUpdateView = this.handleUpdateView.bind(this);
        this.handleListView = this.handleListView.bind(this);

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
        this.props.boardSelectRequest(boardId).then(()=>{
            //
        });
    }

    handleUpdateView(){
        this.props.history.push(UPDATE_PAGE+'?board='+this.state.boardId);
    }

    handleListView(){
        this.props.history.push(LIST_PAGE);
    }

    render(){
        return(
            <SelectBoard
                data={this.props.boardData}
                isLogin={this.props.isLogin}
                updateView = {this.handleUpdateView}
                deleteBoard = {this.props.boardDeleteRequest}
                listView = {this.handleListView}
                />
        );
    }
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
        boardSelectRequest : (_boardId)=>{
            return dispatch(boardSelectRequest(_boardId));
        }
        , boardDeleteRequest : (_boardId)=>{
            return dispatch(boardDeleteRequest(_boardId));
        }
    };
};

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(withRouter(Select));

export default withBaseWrapHoc(connectComponent);