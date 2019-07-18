import * as d3 from 'd3';
import pipe from 'lodash/fp/pipe';
import style from './style.scss';
import CartesianCoordinates from '@client/business/CartesianCoordinates/index';

type TDataEle = { x: number; y: number, value?: number };
type TData = TDataEle[][];

type TEase = (p: number) => number;


const formatData = (data: TDataEle[]): [number,number][] => data.map(({x, y}) => [x, y]);
const getTransitionStartData = (data: [number, number][]): [number,number][] => data.map(([x, y]) => [x, 0]);
// interface IData IDataEle[][]
// type TSvg = d3.Selection<GElement, Datum, PElement, PDatum>;
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
class Line extends CartesianCoordinates {
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
	protected createClipPath(
		svg = this.svg,
		xAxisLen:number = this.xAxisLen,
		yAxisLen: number = this.yAxisLen,
		edgeLen: number = this.dotR
	) {
		svg
				.append('defs')
					.attr('class', 'body-clip-defs')
				.append('clipPath')
					.attr('id', this.clipId)
				.append('rect')
					.attr('x', -edgeLen)
					.attr('y', -edgeLen)
					.attr('width', xAxisLen + edgeLen * 2)
					.attr('height', yAxisLen + edgeLen * 2);
		return svg;
	}
	renderLine = (svg: any, data: TData) => {
		const line = d3.line()
			.x(([x]) => this.xScale(x))
			.y(([,y]) => this.yScale(y))
			.curve(d3.curveCardinal.tension(this.tension));

		const area = d3.area()
			.x(([x]) => this.xScale(x))
			.y0(this.yScale(0))
			.y1(([,y]) => this.yScale(y))
			.curve(d3.curveCardinal.tension(this.tension));

		const fline = pipe(formatData, line);

		const fArea = pipe(formatData, area);

		const lineSelection = svg.selectAll(`path.${style.line}`).data(this.data);
		// line enter;
		lineSelection
			.enter()
				.append('path')
				.attr('class', `${style.line}`)
			.merge(lineSelection)
				.style('stroke', (d: any, i:number) => this.colors(i))
				.transition()
					.attr('d', fline);


		// area enter
		const areaSelection = svg.selectAll(`path.${style.area}`).data(this.data);

		areaSelection
			.enter()
				.append('path')
				.attr('class', style.area)
			.merge(areaSelection)
				.attr('fill', (d:any, i:number) => this.colors(i))
				.transition()
					.attr('d', fArea);

		return svg;
	};

	updateData() {
		const dotsNumber = 11;
		const createLineData = () => d3.range(dotsNumber).map((d, i) => ({x: i, y: Math.random() * 10, value: Math.random() * 50}));
		const lineNumber = 3;
		this.data = d3.range(lineNumber).map(createLineData);
	}
	render() {
		this.updateData();
		super.render();
		this.renderLine(this.body, this.data);
	}
	setTension(tension: number) {
		super.setTension(tension);
		this.updateData();
		this.renderLine(this.body, this.data);
		super.render();
	}
}

export default Line;
