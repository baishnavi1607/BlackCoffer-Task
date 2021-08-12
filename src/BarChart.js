import React, { Component } from 'react';
import * as d3 from 'd3';

export default class BarChart extends Component {

  constructor(props) {
    super(props)

    this.myRef = React.createRef();
  }
  dataFromApi=async ()=>{
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
    const dataArray = res.result.map(data=>data.intensity)
    console.log(dataArray)
    return dataArray
  }

  async componentDidMount() {
    const resData = await this.dataFromApi()
    const data = resData;
    const w = 200;
    const h = 300;

    const accessToRef = d3.select(this.myRef.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "white")
      .style("padding", 10)
      .style("margin-left", 50);

    accessToRef.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 19)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 15)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");

  }

  render() {
    return (
      <div ref={this.myRef}></div>
    )
  }
}