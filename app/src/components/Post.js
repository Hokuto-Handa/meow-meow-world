import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { useDropzone } from 'react-dropzone'
import { useHistory } from 'react-router-dom';
import { postIt } from '../actions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Head1, FormPaper } from './child';

let formData = new FormData();
let file = [];

function Dropzone() {
  //formdata へのデータ追加はSUBMIT内でしないと反映されない
  const onDrop = useCallback(acceptedFiles => {
    // form.append("image", acceptedFiles[0]);←無効
    file = acceptedFiles;
  }, [])
  const {getRootProps, getInputProps, acceptedFiles} = useDropzone({ onDrop, accept: 'image/png', maxSize: 1024*1024})
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {Math.ceil(file.size/1024)} kb
    </li>
  ));
  return (
    <section>
      <div {...getRootProps({className: "dropzone"})}>
        <input {...getInputProps()} />
        {
          <Button variant="outlined">画像を選択<br/>(PNGのみ,1MB以下)</Button>
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
    if(file[0]){
      formData.append("image", file[0]);
    }
    await dispatch(postIt(formData));
    //次のpostに備えて初期化
    formData = new FormData();
    history.push('/');
    file = [];
  }
  const TextFieldAdapter = ({ input, meta, ...rest }) => (
    <TextField
      {...input}
      {...rest}
      helperText={meta.touched ? meta.error : ''}
    />
  );
  const nameValidate = value => (value ? undefined : '名前を入力してください');
  const ageValidate = value => {
    let error = undefined;
    if(isNaN(value)){
      error = '半角数字で入力してください';
    }
    if(!value){
      error = '年齢を入力してください';
    }
    return error;
  }
  return(
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, pristine, submitting }) => (
        <form
          onSubmit={handleSubmit}>
          <div>
            <Field name="name" type="text" component={TextFieldAdapter} label="なまえ" validate={nameValidate}/>
          </div>
          <div>
            <Field name="age" type="number" component={TextFieldAdapter} label="年齢" validate={ageValidate}/>
          </div>
          <Dropzone />
          <Button variant="contained" color="primary" type="submit" disabled={submitting || pristine}>Submit</Button>
        </form>
      )}
     />
    );
}

function Post() {
  return(
    <div>
      <header>
        <Head1>どうぶつを投稿</Head1>
      </header>
      <main>
        <FormPaper>
          <AnimalForm />
        </FormPaper>
      </main>
    </div>
  );
}

export default Post;
