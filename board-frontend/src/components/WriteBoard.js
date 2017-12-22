import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import update from 'react-addons-update';

import { DropZone } from '../components';
import { $, Materialize } from '../utils/thirdPartyLib';

class WriteBoard extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            dropFiles: []
            , uploadedFiles : []
            , imagePreviewUrl: ''
            , subject : ''
            , contents : ''
            , count : ''
            , writer : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleWrite = this.handleWrite.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleOnDrop = this.handleOnDrop.bind(this);
        this.handleFileDelete = this.handleFileDelete.bind(this);
    }

    componentWillReceiveProps(nextProps){
        
        let nextState = {};

        nextState['subject'] = nextProps.selectData.subject;
        nextState['contents'] = nextProps.selectData.contents;
        nextState['count'] = nextProps.selectData.count;
        nextState['writer'] = nextProps.selectData.tag;
        nextState['uploadedFiles'] = nextProps.selectData.file;

        this.setState(nextState);
    }

    componentDidMount(){
        $('.chips').material_chip({
            placeholder: 'Enter a tag',
            secondaryPlaceholder: '+Tag'
        });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.selectData.tag && prevProps.selectData.tag.length>0){
            let materialTagArray = [];

            const propsTagArray = prevProps.selectData.tag;

            for(let i=0;i<propsTagArray.length;i++){
                let tagObj = {
                    tag : propsTagArray[i]
                };

                materialTagArray.push(tagObj);
            }

            $('.chips').material_chip({
                placeholder: 'Enter a tag'
                , secondaryPlaceholder: '+Tag'
                , data : materialTagArray
            });
        }
        
        if(prevState.subject || prevState.nextState)
        Materialize.updateTextFields();
    }

    handleChange(e){
        let nextState = {};

        nextState[e.target.name] = e.target.value;

        this.setState(nextState);
    }

    handleWrite(){
        let formData = new FormData();

        formData.append('subject',this.state.subject);
        formData.append('contents',this.state.contents);
        formData.append('uploadFile',this.state.file);

        const chipData = $('.chips').material_chip('data');

        $.each(chipData,function(idx,item){
            formData.append('tag[]',item.tag);
        })
        
        /*
        let formData = {
            subject : this.state.subject
            , contents : this.state.contents
            , tag : chipsArr
            , file : this.state.file
        };
        */

        const boardId = this.props.boardId;

        this.props.handleWrite(formData, boardId).then(()=>{
            //state 초기화
            this.setState({
                subject : ''
                , contents : ''
            });

        }).then(()=>{this.props.afterWrite();});

        return false;
    }

    handleImageChange(e){
        e.preventDefault();
        
        let reader = new FileReader();
        let file = e.target.files[0];
        
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    handleOnDrop(dropFiles) {
        console.log(33);
        //기존 dropfiles에 새로 추가된걸 push한다
        this.setState({
            dropFiles: update(
                this.state.dropFiles,
                {
                    $push: dropFiles
                }
            )
        });
    }

    handleFileDelete(event, file, isUploaded){
        alert('파일 삭제!(나중에 할꺼)');
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        }

        const dropZoneStyle = {
            'width' : '100%'
            , 'height' : '200px'
        }

        /**
         * 파일 정보를 컴포넌트 형태로 만든다.
         * @param {*} files 
         * @param {*} isUploaded 서버에서 받아온 파일인지 여부. false => 서버에서 가저온 정보/true => 프론트에서 가져온 파일 정보
         */
        const mapToFilesComponents = (files, isUploaded) => {
            console.log('compo');
            console.log('compo');
            console.log('compo');
            console.log('compo');
            let fileNameKey;

            if(isUploaded)  fileNameKey = "originName";
            else            fileNameKey = "name";

            return files.map((file, i) => {
                return (
                    <li className="collection-item" key={i.toString()}>
                        <div>{file[fileNameKey]} ({(file.size / Math.pow(1024,2)).toFixed(2)} MB)
                            <a href="#none" className="secondary-content" onClick={(e)=>this.handleFileDelete(e, file, isUploaded)}><i className="material-icons">delete</i></a>
                        </div>
                    </li>
                );
            });
        };

        return (
            <div className="container" id="main-contents">
                <div className="row" id="insert-area">
                    <form className="col s12" id="insert-form">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="subject" name="subject" type="text" onChange={this.handleChange} value={this.state.subject}/>
                                <label htmlFor="subject" className={(this.props.isInsert)? '':'active'}>Subject</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea id="txt" className="materialize-textarea" name="contents" onChange={this.handleChange} value={this.state.contents}></textarea>
                                <label htmlFor="txt" className={(this.state.isInsert)? '':'active'}>Textarea</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <div className="chips"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <div className="file-field input-field">
                                    <div className="btn">
                                        <span>File</span>
                                        <input type="file" onChange={this.handleImageChange} />
                                        {/* 이미지 미리보기
                                            $imagePreview
                                        */}
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" placeholder="Upload one or more files" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <DropZone
                                    handleOnDrop = {this.handleOnDrop}
                                    style={dropZoneStyle}
                                    className={'card-panel'}
                                />
                                <div className="col s10 offset-s1">
                                    <ul className="collection with-header">
                                        {mapToFilesComponents(this.state.dropFiles ,false)}
                                        {mapToFilesComponents(this.state.uploadedFiles ,true)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="fixed-action-btn">
                    <a className="btn-floating btn-large red">
                        <i className="large material-icons">add</i>
                    </a>
                    <ul>
                        <li><a onClick={this.handleWrite} className="btn-floating red"><i className="material-icons">mode_edit</i></a></li>
                        <li><Link to="/" className="btn-floating yellow darken-1"><i className="material-icons">view_list</i></Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}


WriteBoard.propTypes = {
    afterWrite :PropTypes.func
    , handleWrite : PropTypes.func
    , isInsert : PropTypes.bool
    , selectData : PropTypes.object
};

WriteBoard.defaultProps = {
    afterWrite : ()=>{console.warn('afterWrite 정의 되어 있지 않음')}
    , handleWrite : ()=>{console.warn('handleWrite 정의 되어 있지 않음')}
    , isInsert : true
    , selectData : {}
};

export default WriteBoard;