import * as d3 from 'd3';
import style from './style.scss';
import StackCartesianCoordinates from '@common/components/Charts/StackCartesianCoordinates';
import { namespace } from 'd3';

type TDataEle = {
	0: number;
	1: number;
	data: {
		value1: number;
		value2: number;
		value3: number;
		x: number;
	};
};
type TData = TDataEle[][];

type TEase = (p: number) => number;

namespace StackLine {
	export interface ConstructorParams {
		selector: string;
		tension?: number;
		data?: any;
		width?: number;
		keys?: string[];
		renderLine?: boolean;
	}
}

// const formatData = (data: TDataEle[]): [number,number][] => data.map(({x, y}) => [x, y]);

class StackLine extends StackCartesianCoordinates {
	private duration: number;
	private easeType: TEase;
	private symbolTypes = [
		d3.symbolStar,
		d3.symbolDiamond,
		d3.symbolCircle,
		d3.symbolCross,
		d3.symbolSquare,
		d3.symbolTriangle,
		d3.symbolWye,
	];
	private shouldRenderLine: boolean = true;
	constructor({
		selector,
		tension,
		data,
		width,
		keys,
		renderLine,
	}: StackLine.ConstructorParams) {
		super({
			selector,
			tension: tension || 0,
			data,
			width: width || 1000,
			yDomain: [0, 100],
			keys: keys || ['value1', 'value2', 'value3'],
			stackType: d3.stackOffsetNone,
		});
		this.duration = 500;
		this.easeType = d3.easeCubic;
		this.shouldRenderLine = renderLine || true;
	}
	protected createClipPath(
		svg = this.svg,
		xAxisLen: number = this.xAxisLen,
		yAxisLen: number = this.yAxisLen,
		edgeLen: number = this.dotR,
	) {
		svg.append('defs')
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
		const line = d3
			.line()
			.x((d: any) => this.xScale(d.data.x))
			.y((d: any) => this.yScale(d[1]))
			.curve(d3.curveCardinal.tension(this.tension));

		const area = d3
			.area()
			.x((d: any) => this.xScale(d.data.x))
			.y0((d: any) => this.yScale(d[0]))
			.y1((d: any) => this.yScale(d[1]))
			.curve(d3.curveCardinal.tension(this.tension));

		if (this.shouldRenderLine) {
			const lineSelection = svg
				.selectAll(`path.line`)
				.data(this.stackData);

			// line enter;
			lineSelection
				.enter()
				.append('path')
				.attr('class', 'line')
				.attr('fill', 'none')
				.merge(lineSelection)
				.style('stroke', (d: any, i: number) => this.colors(i))
				.transition()
				.attr('d', line);
		}

		// area enter
		const areaSelection = svg
			.selectAll(`path.${style.area}`)
			.data(this.stackData);

		areaSelection
			.enter()
			.append('path')
			.attr('class', style.area)
			.merge(areaSelection)
			.attr('fill', (d: any, i: number) => this.colors(i))
			.transition()
			.attr('d', area);

		return svg;
	};
	createData() {
		const dotsNumber = 11;
		const getRandomData = () => Math.random() * 30;
		const createData = (index: number) => ({
			value1: getRandomData(),
			value2: getRandomData(),
			value3: getRandomData(),
			x: index,
		});
		return d3.range(dotsNumber).map(createData);
	}
	updateData() {
		this.data = this.createData();
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
	// get stackData() {
	// 	return d3.stack()
	// 		.keys(this.keys)
	// 		.order(d3.stackOrderInsideOut)
	// 		.offset(d3.stackOffsetWiggle)(this.data);
	// }
}

export default StackLine;
