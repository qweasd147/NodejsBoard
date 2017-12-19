import React from 'react';
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types';

class DropZone extends React.Component {
    constructor(props){
        super(props);

        this.handleOnDrop = this.handleOnDrop.bind(this);
    }

    handleOnDrop(files) {
        this.props.handleOnDrop(files);
    }

    render() {
        return (
            <Dropzone onDrop={this.handleOnDrop} style={this.props.style} className={this.props.className} multiple={true}>
                <span className="blue-text text-darken-2">Try dropping some files here, or click to select files to upload.</span>
            </Dropzone>
        );
    }
}


DropZone.propTypes = {
    handleOnDrop : PropTypes.func
};

DropZone.defaultProps = {
    handleOnDrop : ()=>{console.warn('handleOnDrop 정의 되어 있지 않음');}
};

export default DropZone;