import React from 'react';
import { $ } from '../utils/thirdPartyLib';

class SearchBox extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            keyword : 'subject'
            , searchWord : ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleRequestBoard = this.handleRequestBoard.bind(this);
    }

    componentDidMount(){
        $('select').material_select();

        //TODO onChange 옵션 주면 안먹음... 왜 안되는지 모르겠음
        $('#keyword').on('change',(e)=>{
            this.handleChange(e);
        });
    }

    handleChange(e){

        let nextState = {};

        nextState[e.target.name] = e.target.value;

        this.setState(nextState);
    }

    handleRequestBoard(){
        
        const {
            keyword
            , searchWord
        } = this.state;

        this.props.handleListBoard(1, keyword, searchWord);
    }

    render() {
        return (
            <div className="row search-area">
                <div className="col s9"></div>
                <div className="col s1">
                    <select id="keyword" name="keyword" onChange={this.handleChange} >
                        <option value="subject">Subject</option>
                        <option value="contents">Contents</option>
                        <option value="tag">Tag</option>
                    </select>
                    <label htmlFor="keyword">Select Option</label>
                </div>
                <div className="col s2">
                    <div>
                        <div className="col s10">
                            <div className="input-field search">
                                <input id="searchWord" name="searchWord" type="text" onChange={this.handleChange} />
                                <label htmlFor="searchWord">keyword</label>
                            </div>
                        </div>
                        <div className="col s2">
                            <a onClick={this.handleRequestBoard} className="waves-effect waves-light btn search-btn">
                                <i className="material-icons">search</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


SearchBox.propTypes = {
};

SearchBox.defaultProps = {
};

export default SearchBox;