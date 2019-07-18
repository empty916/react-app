import * as d3 from 'd3';
import CartesianCoordinates from '@client/business/CartesianCoordinates/index';

type TDataEle = { x: number; y: number, value?: number };
type TData = TDataEle[][];

type TEase = (p: number) => number;


const _data = [
	[
		{ x: 0, y: 5 },
		{ x: 1, y: 9 },
		{ x: 2, y: 7 },
		{ x: 3, y: 5 },
		{ x: 4, y: 3 },
		{ x: 5, y: 8 },
		{ x: 6, y: 4 },
		{ x: 7, y: 2 },
		{ x: 8, y: 3 },
		{ x: 9, y: 2 },
		{ x: 10, y: 1 },
	],

	d3.range(11).map(function(i) {
		return { x: i, y: Math.sin(i) + 5 };
	}),
];
class Bubble extends CartesianCoordinates {
	duration: number;
	easeType: TEase;
	constructor(selector: string, tension: number = 0, data = _data) {
		super({selector, tension, data, width: 1000});
		this.duration = 500;
		this.easeType = d3.easeCubic;
	}
	renderDots(svg: any, data: TData, r:number, colors:any) {
		data.forEach((item, index:number) => {
			svg.selectAll(`.dot-wrapper-${index}`)
				.data([1])
				.enter()
					.append('g')
					.attr('class', `dot-wrapper-${index}`);

			const dotWrapper = svg.select(`.dot-wrapper-${index}`);
			const dots = dotWrapper.selectAll('.dot').data(item);

			dots.enter()
					.append('circle')
					.classed('dot', true)
				.merge(dots)
				.transition()
					.attr('cx', (d:TDataEle) => this.xScale(d.x))
					.attr('cy', (d:TDataEle) => this.yScale(d.y))
					.attr('stroke', colors(index))
					.attr('fill', colors(index))
					.attr('fill-opacity', 0.2)
					.attr('r', (d:TDataEle) => d.value);
			dots.exit().remove();
		});
	};
	updateData() {
		const createLineData = () => d3.range(3).map((d, i) => ({x: Math.random() * 10, y: Math.random() * 10, value: Math.random() * 50}));
		const lineNumber = 6;
		this.data = d3.range(lineNumber).map(createLineData);
	}
	render() {
		this.updateData();
		super.render();
	}
	setTension(tension: number) {
		super.setTension(tension);
		this.updateData();
		super.render();
	}
}

export default Bubble;
