import React, { Component, useCallback } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
// import Dropzone from 'react-dropzone'
import {useDropzone} from 'react-dropzone'
import { Link } from 'react-router-dom';
import { postIt } from '../actions';

let formData = new FormData();
let file = [];

function Basic() {
  //params へのデータ追加はSUBMITにしなければならない
  const onDrop = useCallback(acceptedFiles => {
    // params.append("image", acceptedFiles[0]);←無効
    file = acceptedFiles;
  }, [])

  const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDrop})
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
      <aside>
          <h4>Files</h4>
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
    formData = new FormData();
    history.push('/');
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
        <Basic />
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
