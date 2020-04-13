import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { useDropzone } from 'react-dropzone'
import { Link, useHistory, useParams } from 'react-router-dom';
import { postIt } from '../actions';

let formData = new FormData();
let file = [];

function Dropzone() {
  //params へのデータ追加はSUBMIT内でしなければならない
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
      console.log("ある");
    }else{
      console.log("ない")
    }
    await dispatch(postIt(formData));
    //次のEDITに備えて初期化
    file = [];
    formData = new FormData();
    history.push('/');
  }
  const handleDelete = async () => {
    formData.append("type", "delete");
    formData.append("id", animal.id);
    await dispatch(postIt(formData));
    formData = new FormData();
    history.push('/');
  }

  return(
    <div>
      <Form
        onSubmit={onSubmit}
        initialValues={animal}
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
            <div>
              <img className="animal_img" alt={animal.name} src={`http://localhost:8080/images/${animal.image}`} />
            </div>
            <Dropzone />
            <button type="submit" disabled={submitting || pristine}>Submit</button>
          </form>
        )}
       />
       <button onClick={handleDelete}>DELETE</button>
    </div>
  );
}

  function Edit(){
    return(
      <div>
        <header>
          <h1>this is EDIT</h1>
        </header>
        <main>
          <EditForm />
        </main>
        <footer>
        <LinkArea/>
        </footer>
      </div>
    );
  }
// class Edit extends Component {
//   // constructor(props){
//   //   super(props);
//   //   this.editData = this.editData.bind(this);
//   //   this.renderFormArea = this.renderFormArea.bind(this);
//   //   this.handleDelete = this.handleDelete.bind(this);
//   // }
//   async editData(values){
//     const { animal, postIt, history } = this.props;
//     formData.append("type", "edit");
//     formData.append("id", animal.id);
//     formData.append("name", values.name);
//     formData.append("age", values.age);
//     if (file[0]) {
//       formData.append("image", file[0]);
//       console.log("ある");
//     }else{
//       console.log("ない")
//     }
//     await postIt(formData);
//     //次のEDITに備えて初期化
//     file = [];
//     formData = new FormData();
//     history.push('/');
//   }
//   async handleDelete(){
//     const { animal, postIt, history } = this.props;
//     formData.append("type", "delete");
//     formData.append("id", animal.id);
//     await postIt(formData);
//     formData = new FormData();
//     history.push('/');
//   }
//   renderFormArea(){
//     const { animal, handleSubmit } = this.props;
//     return(
//       <form onSubmit={handleSubmit(this.editData)}>
//         <div>
//           <label htmlFor="name">Name</label>
//           <Field name="name" component="input" type="text" />
//         </div>
//         <div>
//           <label htmlFor="age">Age</label>
//           <Field name="age" component="input" type="text" />
//         </div>
//         <div>
//           <img className="animal_img" alt={animal.name} src={`http://localhost:8080/images/${animal.image}`} />
//         </div>
//         <Dropzone />
//         <button type="submit">EDIT</button>
//       </form>
//     );
//   }
//   render(){
//     return(
//       <div>
//         <header>
//           <h1>this is EDIT</h1>
//         </header>
//         <main>
//           {this.renderFormArea()}
//           <button onClick={handleDelete}>DELETE</button>
//         </main>
//         <footer>
//         <LinkArea/>
//         </footer>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state, ownProps) =>{
//   const animal = state.animals[ownProps.match.params.id];
//   return({
//       initialValues: animal,
//       animal,
//     }
//   )};
// const mapDispatchToProps = (dispatch) => ({
//   // edit: (values)=> dispatch(edit(values)),
//   // erase: (id)=> dispatch(erase(id)),
//   postIt: (formData)=> dispatch(postIt(formData)),
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form:'editman'})(Edit));
export default Edit;
