import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import './Table2.css';

export default function Table2() {

  const [data, setData] = useState([])
  const columns =[
    { title: "Topic", field: "topic" },
    { title: "Intensity", field: "intensity" },
    { title: "Relevance", field: "relevance" },
    { title: "Region", field: "region" },
    { title: "Country", field: 'country' },
    {title: "Sector" , field: 'sector'}
  ]
  useEffect(async () => {
    let res = await fetch('http://localhost:8000/get_users', {
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
    res = await res.json()
    console.log(res.result)
    setData(res.result)
  }, [])




  return (
    <div className="table" style={{width:"90%"}}>
      <MaterialTable
      title="Data Table"
      data={data}
      columns={columns}/>
    </div>
  )
}
