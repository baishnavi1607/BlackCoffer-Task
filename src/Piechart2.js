import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';


const data = [
                {item: 'Gas', count: 6},
                {item: 'Oil', count: 36},
                {item: 'Consumption', count: 6},
                {item: 'Biofuel', count: 24},
                {item: 'Market', count: 46},
                {item: 'Battery', count: 9}
             ]


const Pie = () => {

	const pieChart = useRef()

	useEffect(()=>{

		
		const piedata = d3.pie().value(d => d.count)(data)
		
		const arc = d3.arc().innerRadius(0).outerRadius(90)

		const colors = d3.scaleOrdinal(['#ffa822','#134e6f','#ff6150','#1ac0c6','#dee0e6','#345sdf'])

		
		const svg = d3.select(pieChart.current)
						.attr('width', 300)
						.attr('height',300)
						.append('g')
							.attr('transform','translate(150,150)')

		const tooldiv = d3.select('#chartArea')
						  .append('div')
						  .style('visibility','hidden')
						  .style('position','relative')
						  .style('background-color','red')


		svg.append('g')
			.selectAll('path')
			.data(piedata)
			.join('path')
				.attr('d', arc)
				.attr('fill',(d,i)=>colors(i))
				.attr('stroke', 'white')
				.on('mouseover', (e,d)=>{
					console.log(e)
					console.log(d)

					tooldiv.style('visibility','visible')
							.text(`${d.data.item}:` + `${d.data.count}`)
				})
				.on('mousemove', (e,d)=>{
					tooldiv.style('top', (e.pageY-50) + 'px')
							.style('left', (e.pageX-50) + 'px')
				})
				.on('mouseout',()=>{
					tooldiv.style('visibility','hidden')
				})

	})

	return (
		<div id='chartArea'>
			<svg ref={pieChart}></svg>
		</div>
	)
}

export default Pie;

