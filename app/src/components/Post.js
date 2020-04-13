import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { useDropzone } from 'react-dropzone'
import { Link, useHistory } from 'react-router-dom';
import { postIt } from '../actions';

let formData = new FormData();
let file = [];

function Dropzone() {
  //params へのデータ追加はSUBMIT内でしないと反映されない
  const onDrop = useCallback(acceptedFiles => {
    // params.append("image", acceptedFiles[0]);←無効
    file = acceptedFiles;
  }, [])
  const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({ onDrop, accept: 'image/png', maxSize: 1024*1024})
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

function AnimalForm(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const onSubmit = async(values) => {
    formData.append("type", "post");
    formData.append("age", values.age);
    formData.append("name", values.name);
    formData.append("image", file[0]);
    await dispatch(postIt(formData));
    //次のpostに備えて初期化
    formData = new FormData();
    history.push('/');
    file = [];
  }

  const validate = (values) => {
    // if (!values.name) {
    //   alert("nameかけ")
    //   return { name: 'Enter Name' };
    // }
    // if (!values.age) {
    //   alert("ageかけ")
    //   return { age: 'Enter Age' };
    // }
    // return;
  }
  const { initialValues } = props;
  return(
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, pristine, submitting }) => (
        <form
          onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" component="input" type="text" />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <Field name="age" component="input" type="text" />
          </div>
          <Dropzone />
          <button type="submit" disabled={submitting || pristine}>Submit</button>
        </form>
      )}
     />
    );
}

function LinkArea() {
  return(
    <div>
      <Link to="/">Index</Link>
    </div>
  );
}

function Post() {
  return(
    <div>
      <header>
        <h1>this is post</h1>
      </header>
      <main>
        <AnimalForm initialValues={{name:"noname"}} />
      </main>
      <footer>
      <LinkArea/>
      </footer>
    </div>
  );
}

export default Post;
