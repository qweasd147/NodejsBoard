import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SearchBox from './SearchBox';
import Paging from './Paging';

class ListBoard extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e, item){
        e.preventDefault();

        if(item._id)
            this.props.handleSelectBoard(item._id);
    }

    render() {

        const mapToComponents = (data, totalCnt) => {
            if(data.length==0){
                return (
                    <tr><td colSpan="5" className="center">검색된 데이터가 없습니다.</td></tr>
                );
            }
            
            const listCnt = totalCnt;

            return data.map((item, i) => {
                /*
                const noSearchForm = (
                    <tr>
                        <td className="center" colSpan="5">검색 된 데이터가 없습니다.</td>
                    </tr>
                );
                const searchForm = (
                    <tr>
                        <td className="center">{listCnt - i}</td>
                        <td><a href="#none" onClick={(e)=>this.handleClick(e, item)}>{item.subject}</a></td>
                        <td className="center">{item.count}</td>
                        <td className="center">{item.date.edited}</td>
                        <td className="center">{item.writer}</td>
                    </tr>
                );
                */
                return (
                    <tr key={i.toString()}>
                        <td className="center">{listCnt>0? listCnt - i:''}</td>
                        <td><a href="#none" onClick={(e)=>this.handleClick(e, item)}>{item.subject}</a></td>
                        <td className="center">{item.count}</td>
                        <td className="center">{item.date.edited}</td>
                        <td className="center">{item.writer}</td>
                    </tr>
                );
            });
        };

        const loginMenu = (
            <ul>
                <li><Link to="/insertBoard" className="btn-floating red"><i className="material-icons">mode_edit</i></Link></li>
            </ul>
        );

        return (
            <div className="container" id="main-contents">
                <SearchBox />
                <div className="row">
                    <table className="highlight">
                        <thead>
                            <tr>
                                <th className="center" style={{width:'10%'}}>Num</th>
                                <th className="center">Subject</th>
                                <th className="center" style={{width:'15%'}}>count</th>
                                <th className="center" style={{width:'15%'}}>Time</th>
                                <th className="center" style={{width:'15%'}}>Reg</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mapToComponents(this.props.listBoard, this.props.totCount)}
                        </tbody>
                    </table>
                </div>
                <Paging count = {this.props.totCount} handlePage = {this.props.handlePage} page = {this.props.page}/>
                <div className="fixed-action-btn">
                    <a className="btn-floating btn-large red">
                        <i className="large material-icons">add</i>
                    </a>
                    { this.props.isLogin == true ? loginMenu : <ul></ul> }
                </div>
            </div>
        );
    }
}


ListBoard.propTypes = {
    listBoard: PropTypes.array
    ,totCount : PropTypes.number
    ,page : PropTypes.number  
    ,handleSelectBoard : PropTypes.func
};

ListBoard.defaultProps = {
    listBoard:
        [{
            number: ''
            ,subject:"검색 된 내용이 없습니다."
            ,count: ''
            ,date : {created : '', edited : ''}
            ,writer : ''
        }]
    ,totCount : 0
    ,page : 0
    ,handleSelectBoard : ()=>{console.warn('handleSelectBoard 정의되어 있지 않음');}
};

export default ListBoard;