import React, { Component, useCallback } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
// import Dropzone from 'react-dropzone'
import {useDropzone} from 'react-dropzone'
import { Link } from 'react-router-dom';
import { postIt } from '../actions';

let formData = new FormData();
let file = [];

function Dropzone() {
  //params へのデータ追加はSUBMITにしなければならない
  const onDrop = useCallback(acceptedFiles => {
    // params.append("image", acceptedFiles[0]);←無効
    file = acceptedFiles;
  }, [])

  const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({ accept: 'image/png', maxSize: 1024*1024})
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {Math.ceil(file.size/1024)} kb
    </li>
  ));

  return (
    <section>
      <div {...getRootProps({className:"dropzone"})}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>【画像】ここをクリックするかドラッグアンドドロップしてね.pngのみ</p>
        }
      </div>
      <aside>
          <ul>{files}</ul>
      </aside>
    </section>
  )
}

function LinkArea() {
  return(
    <div>
      <Link to="/">Index</Link>
    </div>
  );
}

class Post extends Component {
  constructor(props){
    super(props);
    this.postSubmit = this.postSubmit.bind(this);
    // this.renderFormArea = this.renderFormArea.bind(this);
  }
  async postSubmit(values){
    const { postIt, history } = this.props;
    formData.append("type", "post");
    formData.append("age", values.age);
    formData.append("name", values.name);
    formData.append("image", file[0]);
    await postIt(formData);
    //次のpostに備えて初期化
    formData = new FormData();
    history.push('/');
    file = [];
  }
  renderFormArea(){
    const {handleSubmit} = this.props;
    return(
      <form onSubmit={handleSubmit(this.postSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <Field name="name" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <Field name="age" component="input" type="text" />
        </div>
        <Dropzone />
        <button type="submit">Submit</button>
      </form>
    );
  }
  render(){
    return(
      <div>
        <header>
          <h1>this is post</h1>
        </header>
        <main>
          {this.renderFormArea()}
        </main>
        <footer>
        <LinkArea/>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return (
  {}
)};
const mapDispatchToProps = (dispatch) => ({
  postIt: (formData)=> dispatch(postIt(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form:'postman'})(Post));
