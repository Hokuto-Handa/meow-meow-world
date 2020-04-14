import React, { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { get } from '../actions';
import { Link } from 'react-router-dom';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';

import { Head1 } from './child';

function Home() {
  const dispatch = useDispatch();
  const animals = useSelector(state => state.animals);
  //ループしないようにからの配列を第２匹数に設定
  useEffect(() => {
     dispatch(get());
     // eslint-disable-next-line
   },[]);
  const renderHeader = () => (
      <Head1>
        Meow Meow World
      </Head1>
  );
  const renderTable = () => {
    // const { animals } = this.props;
    const tbody = animals.map((animal, index)=>{
      return(
      <TableRow key={animal.id}>
        <TableCell>{index}</TableCell>
        <TableCell align="right">{animal.name}</TableCell>
        <TableCell align="right">{animal.age}</TableCell>
        <TableCell align="right"><img className="animal_img" alt={animal.name} src={`http://localhost:8080/images/${animal.image}`} /></TableCell>
        <TableCell align="right"><Link to={"/edit/"+index}><EditIcon color="secondary" /></Link></TableCell>
      </TableRow>
    )});
    return(
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell align="right">なまえ</TableCell>
              <TableCell align="right">年齢</TableCell>
              <TableCell align="right">イメージ</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {tbody}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  return(
      <div>
        {renderHeader()}
        {renderTable()}
      </div>
  )
}

export default Home;
