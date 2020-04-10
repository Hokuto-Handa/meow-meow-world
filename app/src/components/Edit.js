import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
// import { get } from '../actions';
import { edit, erase, postIt } from '../actions';

let formData = new FormData();
let file = [];

function LinkArea() {
  return(
    <div>
      <Link to="/">Index</Link>
    </div>
  );
}

class Edit extends Component {
  constructor(props){
    super(props);
    this.editData = this.editData.bind(this);
    this.renderFormArea = this.renderFormArea.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  async editData(values){
    const { animal, postIt, history } = this.props;
    formData.append("type", "edit");
    formData.append("id", animal.id);
    formData.append("name", values.name);
    formData.append("age", values.age);
    await postIt(formData);
    formData = new FormData();
    history.push('/');
  }
  async handleDelete(){
    const { animal, postIt, history } = this.props;
    formData.append("type", "delete");
    formData.append("id", animal.id);
    await postIt(formData);
    formData = new FormData();
    history.push('/');
  }
  renderFormArea(){
    const {handleSubmit} = this.props;
    return(
      <form onSubmit={handleSubmit(this.editData)}>
        <div>
          <label htmlFor="name">Name</label>
          <Field name="name" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <Field name="age" component="input" type="text" />
        </div>
        <button type="submit">EDIT</button>
      </form>
    );
  }
  render(){
    return(
      <div>
        <header>
          <h1>this is EDIT</h1>
        </header>
        <main>
          {this.renderFormArea()}
          <button onClick={this.handleDelete}>DELETE</button>
        </main>
        <footer>
        <LinkArea/>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) =>{
  const animal = state.animals[ownProps.match.params.id];
  return({
      initialValues: animal,
      animal,
    }
  )};
const mapDispatchToProps = (dispatch) => ({
  // edit: (values)=> dispatch(edit(values)),
  // erase: (id)=> dispatch(erase(id)),
  postIt: (formData)=> dispatch(postIt(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form:'editman'})(Edit));
