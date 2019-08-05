import * as d3 from 'd3';
import pipe from 'lodash/fp/pipe';
import style from './style.scss';
import { map } from 'd3';
import { number } from 'prop-types';

// interface IData IDataEle[][]
// type TSvg = d3.Selection<GElement, Datum, PElement, PDatum>;
const createData = (endAngle: number) => [
	// <-B
	{ startAngle: 0, endAngle: 0.1 * endAngle },
	{ startAngle: 0.1 * endAngle, endAngle: 0.2 * endAngle },
	{ startAngle: 0.2 * endAngle, endAngle: 0.4 * endAngle },
	{ startAngle: 0.4 * endAngle, endAngle: 0.6 * endAngle },
	{ startAngle: 0.6 * endAngle, endAngle: 0.7 * endAngle },
	{ startAngle: 0.7 * endAngle, endAngle: 0.9 * endAngle },
	{ startAngle: 0.9 * endAngle, endAngle: endAngle },
];

class Pie {
	data: any;
	selector: string;
	width: number = 500;
	height: number = 500;
	svg: any;
	constructor(selector: string, endAngle: number = Math.PI * 2) {
		this.data = createData(endAngle);
		this.selector = selector;
	}
	createSvg() {
		this.svg = d3
			.select(this.selector)
			.selectAll('svg')
			.data([1])
			.enter()
			.append('svg')
			.attr('width', this.width)
			.attr('height', this.height);
	}
	renderPie() {
		const arc = d3
			.arc()
			.outerRadius(this.width / 2)
			.innerRadius(this.width / 4);

		this.svg
			.selectAll('g')
			.data([1])
			.enter()
			.append('g')
			.attr('class', 'pie')
			.attr('clip-path', 'url(#body-clip)')
			.attr(
				'transform',
				`translate(${this.width / 2},${this.height / 2})`,
			);

		const pie = this.svg.selectAll('.pie').data([1]);

		pie.selectAll('.arc')
			.data(this.data)
			.enter()
			.append('path')
			.attr('class', 'arc');

		const start = {startAngle: 0, endAngle: 0};
		pie.selectAll('.arc')
			.attr('fill', (d: any, i: number) => this.colors(i))
			.data(this.data)
			.transition().duration(1000).ease(d3.easeBounce)
			.attrTween('d', (d: any) => {
				const interpolate = d3.interpolate({...start}, d);
				return pipe(interpolate, arc);
			});
	}
	createClipPath = (svg = this.svg) => {
		svg.selectAll('.body-clip')
			.data([1])
			.enter()
				.append('defs')
				.append('clipPath')
					.attr('id', 'body-clip')
					.attr('class', 'body-clip')
				.append("rect")
					.attr("x", -this.width/4)
					.attr("y", -this.height/4)
					.attr("width", this.width/2)
					.attr("height", this.height/2);

	}
	render() {
		this.createSvg();
		this.createClipPath();
		this.renderPie();
	}
	colors(i: number) {
		var color = d3.scaleSequential(d3.interpolateRainbow);
		// const color = d3.scaleOrdinal(d3.schemeCategory10);
		return color(i/10);
	}
}

export default Pie;
