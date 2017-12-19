import React from 'react';
import { Link } from 'react-router-dom';
import { $ } from '../utils/thirdPartyLib';

class SearchBox extends React.Component {

    componentDidMount(){
        $('select').material_select();
    }
    render() {
        return (
            <div className="row search-area">
                <div className="col s9"></div>
                <div className="col s1">
                    <select id="select-option" name="select-option">
                        <option value="1">Subject</option>
                        <option value="2">Contents</option>
                        <option value="3">Tag</option>
                    </select>
                    <label>Select Option</label>
                </div>
                <div className="col s2">
                    <div>
                        <div className="col s10">
                            <div className="input-field search">
                                <input id="passwd1" type="text" />
                                <label htmlFor="passwd1">keyword</label>
                            </div>
                        </div>
                        <div className="col s2">
                            <Link to="/" className="waves-effect waves-light btn search-btn">
                                <i className="material-icons">search</i>
                            </Link>
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