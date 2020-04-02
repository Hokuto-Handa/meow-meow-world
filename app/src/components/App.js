import React, { Component } from 'react';
import { connect } from 'react-redux'

import { get } from '../actions';
import { Link } from 'react-router-dom';

function LinkArea() {
  return(
    <div>
      <Link to="/post">POST</Link>
    </div>
  );
}

class App extends Component {
  constructor(props){
    super(props)
    this.renderHeader = this.renderHeader.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  componentDidMount(){
    const { get } = this.props;
    get();
  }
  renderHeader(){
    return(
      <h1>
        Meow Meow World
      </h1>
    );
  }
  renderTable(){
    const { animals } = this.props;
    const tbody = animals.map((animal)=>{
      return(
      <tr key={animal.id}>
        <td>{animal.id}</td>
        <td>{animal.age}</td>
        <td>{animal.name}</td>
      </tr>
    )});
    return(
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>age</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {tbody}
        </tbody>
      </table>
    )
  }

  render(){
    return(
      <div>
        {this.renderHeader()}
        {this.renderTable()}
        <LinkArea/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  animals: state.animals,
});

const mapDispatchToProps = {
  get,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
