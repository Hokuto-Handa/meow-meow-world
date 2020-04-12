import React, { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

const App = (props) => {
  const dispatch = useDispatch();
  const animals = useSelector(state => state.animals);
  //ループしないようにからの配列を第２匹数に設定
  useEffect(() => {
     dispatch(get());
     // eslint-disable-next-line
   },[]);
  const renderHeader = () => (
      <h1>
        Meow Meow World
      </h1>
  );
  const renderTable = () => {
    // const { animals } = this.props;
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
  return(
    <div>
      {renderHeader()}
      {renderTable()}
      <LinkArea/>
    </div>
  )
}

export default App;
