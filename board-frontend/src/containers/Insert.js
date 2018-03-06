import React from 'react';
import { connect } from 'react-redux';
import { WriteBoard } from '../components';
import { boardWriteRequest } from '../actions/Board';
import {withRouter} from "react-router-dom";
import withBaseWrapHoc from './withBaseWrap';

const INDEX_PAGE='/';

class Insert extends React.Component{
    constructor(props){
        super(props);

        this.viewList = this.viewList.bind(this);
    }

    viewList(){
        this.props.history.push(INDEX_PAGE);
    }
    render(){
        return (
            <WriteBoard handleWrite={this.props.boardWriteRequest} afterWrite={this.viewList} isInsert = {true}/>
        );
    };
}



const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        boardWriteRequest : (formData)=>{
            return dispatch(boardWriteRequest(formData));
        }
    };
};

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(withRouter(Insert));

export default withBaseWrapHoc(connectComponent);