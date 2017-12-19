import React from 'react';
import { connect } from 'react-redux';
import { SelectBoard } from '../components';
import { boardSelectRequest } from '../actions/Board';
import {withRouter} from "react-router-dom";
import queryString from 'query-string';

const UPDATE_PAGE='/updateBoard';

class Select extends React.Component{
    constructor(props){
        super(props);

        this.handleUpdateView = this.handleUpdateView.bind(this);

        this.state = {
            boardId : ''
            , onLoad : false
        }
    }
    
    componentWillMount(){

        const query = queryString.parse(window.location.search);

        const boardId = query.board;

        this.setState({
            boardId
        });
        this.props.boardSelectRequest(boardId).then(()=>{
            this.setState({
                onLoad : true
            });
        });
    }

    handleUpdateView(){
        this.props.history.push(UPDATE_PAGE+'?board='+this.state.boardId);
    }

    render(){
        return(
            <SelectBoard data={this.state.onLoad == true? this.props.boardData: undefined} isLogin={this.props.isLogin} updateView = {this.handleUpdateView}/>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        boardData : state.board.selectOne.data
        , isLogin : state.authen.isLogin
        , status : state.board.selectOne.status
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        boardSelectRequest : (_boardId)=>{
            return dispatch(boardSelectRequest(_boardId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Select));