import React, { useEffect } from 'react';
import throttle from 'lodash/throttle';
import * as d3 from 'd3';
import style from './style.scss';
import pipe from 'lodash/fp/pipe';
import { ChinaData, ProvinceData } from 'china-map-geojson';

type TAngle = { startAngle: number; endAngle: number };
const pieData = [0.5, 1];

const projection = d3.geoMercator().scale(1000).translate([-1200, 1200])

const path = d3.geoPath().projection(projection);

const zoom = function zoomHandler(this:any, g: any) {
	const {x, y, k} = d3.event.transform;
	d3.select(this).select('.body').attr("transform", "translate("
			+ x + "," + y
			+ ")scale(" + k + ")");
}

const Page2: React.FC<any> = (p: any) => {
	useEffect(() => {
		const svg = d3
			.select(`.${style.page2}`)
			.append('svg')
				.attr('width', '100%')
				.attr('height', '100%')
				.call(
					d3.zoom()
					.scaleExtent([1, 10])
					.on('zoom', zoom) as any
				)


		const g = svg.append('g')
					.attr('class', 'body')

		const tooltip =
			d3.select('body')
				.append('div')
				.attr('class', style.tooltip)
				.html('<b>2333</b>')
				.style('position', 'absolute');

		g
		.selectAll('path.china')
		.data(ChinaData.features)
		.enter()
		.append('path')
			.classed('china', true)
			.attr('fill', 'lightsteelblue')
			.attr('stroke', 'steelblue')
			.attr('d', path as any)
			.on('mouseover', function(d: any) {
				tooltip
					.style('display', 'block')
					.style("left", d3.event.pageX + 15 + "px")
					.style("top", d3.event.pageY - 25 + "px")
					.html(`<b>${d.properties.name}</b>`)
				d3.select(this).attr('fill', 'pink');
			})
			.on('mouseleave', function() {
				tooltip
					.style('display', 'none')
				d3.select(this).attr('fill', 'lightsteelblue');
			})


		// const allProvinceData = Object.keys(ProvinceData)
		// 			.map(key => ProvinceData[key].features)
		// 			.reduce((allPD, pdItem) => allPD.concat(pdItem), []);

		// g
		// .selectAll('path.province')
		// .data(allProvinceData)
		// .enter()
		// .append('path')
		// 	.classed('province', true)
		// 	.attr('fill', 'lightsteelblue')
		// 	.attr('stroke', 'steelblue')
		// 	.attr('d', path as any)
		// 	.on('mouseover', function() {
		// 		d3.select(this).attr('fill', 'steelblue');
		// 	})
		// 	.on('mouseleave', function() {
		// 		d3.select(this).attr('fill', 'lightsteelblue');
		// 	})

	}, []);
	return <div className={style.page2} />;
};

export default Page2;
