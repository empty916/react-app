import * as d3 from 'd3';
import pipe from 'lodash/fp/pipe';
import style from './style.scss';
import CartesianCoordinates from '@common/components/Charts/CartesianCoordinates';

type TDataEle = { x: number; y: number, value?: number };
type TData = TDataEle[][];

type TEase = (p: number) => number;

const barNumber = 11;

const _data = d3.range(barNumber).map(function(i) {
	return { x: i, y: Math.sin(i) + 5 };
});
class Bar extends CartesianCoordinates {
	duration: number;
	easeType: TEase;
	padding: number = 20;
	constructor(selector: string, tension: number = 0, data = _data) {
		super({
			selector,
			tension,
			data,
			width: 1000,
			xDomain: [-0.5, 11]
		});
		this.duration = 500;
		this.easeType = d3.easeCubic;
	}
	renderDots() {}
	renderBar = (svg: any, data: TData) => {

		const barSelection = svg.selectAll(`rect.bar`).data(this.data);
		// line enter;
		barSelection
			.enter()
				.append('rect')
				.attr('class', 'bar')
			.merge(barSelection)
				// .style('stroke', (d: any, i:number) => this.colors(i))
				.transition()
					.attr('x', (d: TDataEle) => this.xScale(d.x))
					.attr('y', (d: TDataEle) => this.yScale(d.y))
					.attr('width', (d: TDataEle) => Math.floor(this.xAxisLen/this.data.length) - this.padding)
					.attr('height', (d: TDataEle) => {
						console.log(this.yAxisLen - this.yScale(d.y));
						return this.yAxisLen - this.yScale(d.y);
					})
					.attr('fill', d3.schemeCategory10[0])

		return svg;
	};
	updateData() {
		this.data = d3.range(barNumber).map((d, i) => ({x: i, y: Math.random() * 10}));
	}
	render() {
		this.updateData();
		super.render();
		this.renderBar(this.body, this.data);
	}
	setTension(tension: number) {
		super.setTension(tension);
		this.updateData();
		this.renderBar(this.body, this.data);
		super.render();
	}
}

export default Bar;
