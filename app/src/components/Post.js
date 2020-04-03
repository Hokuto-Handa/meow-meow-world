import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { postIt } from '../actions';

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
    this.renderFormArea = this.renderFormArea.bind(this);
  }
  async postSubmit(v){
    const { postIt, history } = this.props;
    await postIt(v);
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

const mapStateToProps = (state) =>(
  {animals: state.animals}
);
const mapDispatchToProps = (dispatch) => ({
  postIt: (values)=> dispatch(postIt(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form:'postman'})(Post));
