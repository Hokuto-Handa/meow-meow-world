import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { useDropzone } from 'react-dropzone'
import { useHistory, useParams } from 'react-router-dom';
// import { postIt } from '../actions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Img1 from './images/cat.png';
import Img2 from './images/rabbit.png';
import Img3 from './images/fish_donko.png';
import Img4 from './images/fukuro.png';


import { Head1, DelBtn, FormPaper } from './child';

let formData = new FormData();
let file = [];

function Dropzone() {
  //params へのデータ追加はSUBMIT内でしなければならない
  const onDrop = useCallback(acceptedFiles => {
    // params.append("image", acceptedFiles[0]);←無効
    file = acceptedFiles;
  }, [])
  const {getRootProps, getInputProps, acceptedFiles} = useDropzone({onDrop})
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  return (
    <section>
      <div {...getRootProps({className: "dropzone"})}>
        <input {...getInputProps()} />
        {
          <Button variant="outlined">画像を変更<br/>(PNGのみ,1MB以下)</Button>
        }
      </div>
      <aside>
          <ul>{files}</ul>
      </aside>
    </section>
  )
}

function EditForm() {
  const { id } = useParams();
  const animal = useSelector(state => state.animals[id])
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values) => {
    formData.append("type", "edit");
    formData.append("id", animal.id);
    formData.append("name", values.name);
    formData.append("age", values.age);
    if (file[0]) {
      formData.append("image", file[0]);
    }
    // await dispatch(postIt(formData));
    alert('ご利用ありがとうございます（編集はされません）');
    //次のEDITに備えて初期化
    file = [];
    formData = new FormData();
    history.push('/');
  }
  const handleDelete = async () => {
    formData.append("type", "delete");
    formData.append("id", animal.id);
    // await dispatch(postIt(formData));
    alert("ご利用ありがとうございます（削除はされません）")
    formData = new FormData();
    history.push('/');
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
    const imgArray = [Img1, Img2, Img3, Img4]

  return(
    <div>
      <Form
        onSubmit={onSubmit}
        initialValues={animal}
        render={({ handleSubmit, pristine, submitting }) => (
          <form
            onSubmit={handleSubmit}>
            <div>
              <Field name="name" type="text" component={TextFieldAdapter} label="なまえ" validate={nameValidate}/>
            </div>
            <div>
              <Field name="age" type="number" component={TextFieldAdapter} label="年齢" validate={ageValidate}/>
            </div>
            <div>
              <img className="animal_img" alt={animal.name} src={imgArray[animal.id]} />
            </div>
            <Dropzone />
            <Button variant="contained" color="primary" type="submit" disabled={submitting}>Submit</Button>
          </form>
        )}
       />
       <DelBtn variant="contained" color="secondary" onClick={handleDelete}>DELETE</DelBtn>
    </div>
  );
}

  function Edit(){
    return(
      <div>
        <header>
          <Head1>どうぶつを編集</Head1>
        </header>
        <main>
          <FormPaper>
            <EditForm />
          </FormPaper>
        </main>
      </div>
    );
  }

export default Edit;
