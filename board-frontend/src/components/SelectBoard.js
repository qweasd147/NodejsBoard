import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

class SelectBoard extends React.Component {
    constructor(props){
        super(props)

        this.handleFileClick = this.handleFileClick.bind(this);
        this.handleUpdateView = this.handleUpdateView.bind(this);
        this.handleListView = this.handleListView.bind(this);
        this.handleDeleteBoard = this.handleDeleteBoard.bind(this);

        this.state={
            boardID : ''
            , fileID : ''
        };
    }

    handleFileClick(e, item){
        e.preventDefault();

        const boardID = this.props.data._id;
        const fileID = item._id;
        
        this.setState({
            boardID
            , fileID
        });
        
        const serverHost = process.env.REACT_APP_SERVER_HOST || "";

        this.setState({
            downloadURL : serverHost+"/api/board/download/"+boardID+"/"+fileID
        });
        
    }

    handleUpdateView(e){
        e.preventDefault();

        this.props.updateView();
    }
    
    handleListView(){
        this.props.listView();
    }

    handleDeleteBoard(e){

        const boardId = this.props.data._id;

        if(boardId){
            this.props.deleteBoard(boardId).then(()=>{
                this.handleListView();
            })
        }
        
        return false;
    }

    render() {
        const mapToComponentFile = data => {
            return data.map((file, i) => {
                return (
                    <li key={i.toString()}>
                        <div className="collection-item valign-wrapper">
                            <div className="left">
                                <div>
                                    <a href="#none" onClick={(e)=>{this.handleFileClick(e,file)}}>{file.originName}</a>
                                </div>
                            </div>
                        </div>
                    </li>
                );
            });
        };

        const mapToComponentChips = data => {
            return data.map((chip, i) => {
                return (
                    <div className="chip" key={i.toString()}>
                        {chip}
                    </div>
                );
            });
        };

        const hdnStyle = {
            display : "none"
        }
        return (
            <div className="container" id="main-contents">
                <div className="row">
                    <div className="col s12">
                        <table>
                            <tbody>
                                <tr>
                                    <th scope="row">제목</th>
                                    <td colSpan="5">{this.props.data.subject}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Reg User</th>
                                    <td>{this.props.data.writer}</td>
                                    <th scope="row">Count</th>
                                    <td>{this.props.data.count}</td>
                                    <th scope="row">Date</th>
                                    <td>{moment(this.props.data.date.edited).format('YYYY.MM.D HH:mm')}<br/>({moment(this.props.data.date.edited).fromNow()})</td>
                                </tr>
                                <tr>
                                    <th scope="row">Contents</th>
                                    <td colSpan="5">{this.props.data.contents}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Tag</th>
                                    <td colSpan="5">
                                        <div>
                                            {mapToComponentChips(this.props.data.tag)}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Attach File</th>
                                    <td colSpan="5">
                                        <ul>
                                            {mapToComponentFile(this.props.data.file)}
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="fixed-action-btn">
                    <a className="btn-floating btn-large red">
                        <i className="large material-icons">add</i>
                    </a>
                    <ul>
                        {this.props.isLogin == true? 
                        <li><a onClick={this.handleUpdateView} className="btn-floating red"><i className="material-icons">mode_edit</i></a></li> : undefined
                        }
                        <li><a onClick={this.handleListView} className="btn-floating yellow darken-1"><i className="material-icons">view_list</i></a></li>
                        {this.props.isLogin == true? 
                        <li><a onClick={this.handleDeleteBoard} className="btn-floating green"><i className="material-icons">delete</i></a></li> : undefined
                        }
                    </ul>
                </div>
                    <iframe title="downloadFrame" id="hiddenFrame" style={hdnStyle} src={this.state.downloadURL}></iframe>
            </div>
            
        );
    }
}



SelectBoard.propTypes = {
    data : PropTypes.object
};

SelectBoard.defaultProps = {
    data : {
        subject:""
        ,contents:"잘못된 접근입니다."
        ,writer:""
        ,date : {}
        ,count:"0"
        ,tag: []
        ,file : []
        ,state : "init"
    }
};

export default SelectBoard;