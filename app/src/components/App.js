import React, { Component } from 'react';
import { connect } from 'react-redux'

import { get } from '../actions';
import { Link } from 'react-router-dom';

function LinkArea() {
  return(
    <div>
      <div>
        <Link to="/post">POST</Link>
      </div>
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
    // console.log(animals);
    const tbody = animals.map((animal, index)=>{
      return(
      <tr key={animal.id}>
        <td><Link to={"/edit/"+index}>{index}</Link></td>
        <td>{animal.name}</td>
        <td>{animal.age}</td>
        <td><img className="animal_img" alt={animal.name} src={`http://localhost:8080/images/${animal.image}`} /></td>
      </tr>
    )});
    return(
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Age</th>
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
