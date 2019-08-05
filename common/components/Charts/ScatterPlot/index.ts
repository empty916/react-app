import * as d3 from 'd3';
import pipe from 'lodash/fp/pipe';
import style from './style.scss';
import CartesianCoordinates from '@common/components/Charts/CartesianCoordinates/index';

type TDataEle = { x: number; y: number, value?: number };
type TData = TDataEle[][];

type TEase = (p: number) => number;


const formatData = (data: TDataEle[]): [number,number][] => data.map(({x, y}) => [x, y]);
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
class ScatterPlot extends CartesianCoordinates {
	duration: number;
	easeType: TEase;
	symbolTypes = [
		d3.symbolStar,
		d3.symbolDiamond,
		d3.symbolCircle,
		d3.symbolCross,
		d3.symbolSquare,
		d3.symbolTriangle,
		d3.symbolWye,
	];
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
					.append('path')
					.classed('dot', true)
				.merge(dots)
				.transition()
					.attr('transform', (d: TDataEle) => `translate(${this.xScale(d.x)},${this.yScale(d.y)})`)
					.attr('d', d3.symbol().type(this.symbolTypes[index]))
					.attr('stroke', colors(index))
					.attr('fill', colors(index))
			dots.exit().remove();
		});
	};
	updateData() {
		const createLineData = () => d3.range(3).map((d, i) => ({x: Math.random() * 10, y: Math.random() * 10}));
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

export default ScatterPlot;
