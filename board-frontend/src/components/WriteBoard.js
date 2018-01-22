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
            dropFiles: []           //등록 요청할 파일 목록
            , uploadedFiles : []    //현재 서버에 저장되어 있는 파일목록
            , imagePreviewUrl: ''
            , subject : ''
            , contents : ''
            , count : ''
            , writer : ''
            , deleteFiles : []      //삭제 요청할 파일 목록
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleWrite = this.handleWrite.bind(this);
        this.handleOnDrop = this.handleOnDrop.bind(this);
        this.handleFileDelete = this.handleFileDelete.bind(this);
    }

    componentWillReceiveProps(nextProps){
        
        let nextState = {};

        nextState['subject'] = nextProps.selectData.subject;
        nextState['contents'] = nextProps.selectData.contents;
        nextState['count'] = nextProps.selectData.count;
        nextState['tag'] = nextProps.selectData.tag;
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
        //formData.append('uploadFile',this.state.dropFiles);
        //formData.append('deleteFile',this.state.deleteFiles);

        const _chipData = $('.chips').material_chip('data');
        const _dropFiles = this.state.dropFiles;
        const _deleteFiles = this.state.deleteFiles;

        $.each(_chipData,function(idx,item){
            formData.append('tag[]',item.tag);
        });

        $.each(_dropFiles,function(idx,item){
            formData.append('uploadFile[]',_dropFiles[idx]);
        });

        $.each(_deleteFiles,function(idx,item){
            formData.append('deleteFile[]',_deleteFiles[idx]);
        });
        
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

    handleOnDrop(dropFiles) {
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

    /**
     * 기존 업로드된 파일
     *      ==> deleteFile에 file._id값을 집어넣고 state에서도 해당 _id값을 제거한다
     * 프론트에만 있는 파일
     *      ==> 넘겨받은 index값을 dropfiles에서 제거한다.
     * 
     * @param {*} event 
     * @param {*} file 
     * @param {*} isUploaded 
     */
    handleFileDelete(event, filekey, isUploaded){

        event.preventDefault();

        if(isUploaded){
            //서버단으로 보낼 정보
            this.setState({
                deleteFiles: update(
                    this.state.deleteFiles,
                    {
                        $push: [filekey]
                    }
                )
            });

            //화면에서 제거

            const _uploadedFiles = this.state.uploadedFiles;

            const fileIdx = _uploadedFiles.findIndex((item)=>
                filekey === item._id
            );

            this.setState({
                uploadedFiles: update(
                    this.state.uploadedFiles,
                    {
                        $splice: [[fileIdx, 1]]
                    }
                )
            });

        }else{
            //화면에서 제거
            if(filekey>=0){
                this.setState({
                    dropFiles: update(
                        this.state.dropFiles,
                        {
                            $splice: [[filekey, 1]]
                        }
                    )
                });
            }
        }
    }

    render() {

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

            let fileNameKey;

            if(isUploaded)  fileNameKey = "originName";
            else            fileNameKey = "name";

            if(Array.isArray(files)){
                return files.map((file, i) => {
                    let fileKey;    //물리적 파일 리스트 중 특정 파일을 구분할 수 있는 파일 key
    
                    //이미 업로드 된 파일은 _id값으로,
                    //프론트에서만 올라가 있는 파일은 마지막 index값으로 key값을 설정한다.
                    if(isUploaded)  fileKey = file['_id'];
                    else            fileKey = this.state.dropFiles.length -1;
    
                    return (
                        <li className="collection-item" key={i.toString()}>
                            <div>{file[fileNameKey]} ({(file.size / Math.pow(1024,2)).toFixed(2)} MB)
                                <a href="#none" className="secondary-content" onClick={(e)=>this.handleFileDelete(e, fileKey, isUploaded)}>
                                <i className="material-icons">delete</i></a>
                            </div>
                        </li>
                    );
                });
            }else{
                return undefined;
            }
            
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
                                <DropZone
                                    handleOnDrop = {this.handleOnDrop}
                                    style={dropZoneStyle}
                                    className={'card-panel'}
                                />
                                <div className="col s10 offset-s1">
                                    <ul className="collection with-header">
                                        {mapToFilesComponents(this.state.uploadedFiles ,true)}
                                        {mapToFilesComponents(this.state.dropFiles ,false)}
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