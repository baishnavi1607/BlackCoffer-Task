import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './Table1.css';
import { Paper } from '@material-ui/core';

export default class Table1 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/get_users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        limit: 20,
        skip: 0
      })
    })
      .then(res => res.json())
      .then(users => {
        this.setState({ data: users.result })
        console.log(users);
      })
      .catch((error) => {
        console.error(error);
      });

  }



  render() {
    return (
      <div>
        <TableContainer>
          <Table aria-label="simple table" className="table" size="small">
          <Paper>
            <TableHead>
              <TableRow>
                <TableCell>TOPIC</TableCell>
                <TableCell align="right">INTENSITY</TableCell>
                <TableCell align="right">LIKELIHOOD</TableCell>
                <TableCell align="right">RELEVANCE</TableCell>
                <TableCell align="right">REGION</TableCell>
                <TableCell align="right">COUNTRY</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((s) => (
                <TableRow key={s.topic}>

                  <TableCell component="th" scope="row">
                    {s.topic}
                  </TableCell>
                  <TableCell align="right">{s.intensity}</TableCell>
                  <TableCell align="right">{s.likelihood}</TableCell>
                  <TableCell align="right">{s.relevance}</TableCell>
                  <TableCell align="right">{s.region}</TableCell>
                  <TableCell align="right">{s.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Paper>
          </Table>
        </TableContainer>
      </div>
    )
  }
}
