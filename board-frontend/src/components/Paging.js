import React from 'react';
import { Link } from 'react-router-dom';
import PagingUtil from '../utils/paging';
import PropTypes from 'prop-types';

class Paging extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            currentPage : 1
            , startBlock : 0
            , endBlock : 0
            , totalPage : 0
        }
        this.handlePrevPage = this.handlePrevPage.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.changePage = this.changePage.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        let Paging = new PagingUtil(nextProps.count, nextProps.page, 10, 10);

        this.setState({
            currentPage : Paging.getCurrentPage()
            , startBlock : Paging.getStartBlock()
            , endBlock : Paging.getEndBlock()
            , totalPage : Paging.getTotalPage()
        });

    }



    changePage(e){
        e.preventDefault();

        this.props.handlePage(e.currentTarget.text);
    }

    handlePrevPage(e){
        e.preventDefault();

        let p = this.state.currentPage;
        
        if(p>1){
            this.props.handlePage(p-1);
        }
    }

    handleNextPage(e){
        e.preventDefault();

        let p = this.state.currentPage;

        if(!(p>=this.state.totalPage)){
            this.props.handlePage(parseInt(p, 10)+1);
        }
            
    }
    render() {
        const block =[];
        for(let i=this.state.startBlock;i<this.state.endBlock+1;i++){
            block.push(
                <li className={(this.state.currentPage==i)?'active':''} key={i.toString()}>
                    <a href="#none" onClick={this.changePage}>{i}</a>
                </li>
            )
        }
        
        return (
            <div className="row">
                <div className="input-field col s12">
                    <ul className="pagination center">
                        <li className={(this.state.currentPage==1)?'disabled':'waves-effect'}>
                            <a href="#!" onClick={this.handlePrevPage}><i className="material-icons">chevron_left</i></a>
                        </li>
                        {block}
                        <li className={((this.state.currentPage==this.state.totalPage || this.state.totalPage==0))?'disabled':'waves-effect'}>
                            <a href="#!" onClick={this.handleNextPage}><i className="material-icons">chevron_right</i></a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}



Paging.propTypes = {
    count : PropTypes.number
    , handlePage : PropTypes.func
    , currentPage : PropTypes.number
};

Paging.defaultProps = {
    count : 1
    , handlePage : ()=>{console.warn('handlePage 정의 되어 있지 않음');}
    , currentPage : 1
};

export default Paging;