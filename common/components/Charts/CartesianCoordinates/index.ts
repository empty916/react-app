import * as d3 from 'd3';
import style from './style.scss';

type TDataEle = { x: number; y: number };
type TData = TDataEle[][];
type TNumDomain = [number, number];

namespace CartesianCoordinates {
	export interface ConstructorParams {
		selector: string;
		tension: number;
		data: any;
		colors?: any;
		width?: number;
		height?: number;
		margin?: number;
		dotR?: number;
		xDomain?: TNumDomain;
		yDomain?: TNumDomain;
		[p: string]: any;
	}
}

// Cartesian coordinates 直角坐标
class CartesianCoordinates {
	private hasInit: boolean = false;
	private id: string;
	protected clipId: string;

	protected width: number;
	protected height: number;
	protected margin: number;
	protected data: any;
	protected selector: string;
	protected tension: number;
	protected svg: any;
	protected body: any;
	protected axes: any;
	protected dotR: number;
	protected colors: any;
	protected xDomain: TNumDomain;
	protected yDomain: TNumDomain;

	constructor(param: CartesianCoordinates.ConstructorParams) {
		this.data = param.data;
		this.selector = param.selector; // svg父容器的选择器

		this.width = param.width || 500;
		this.height = param.height || 500;
		this.margin = param.margin || 50;
		this.tension = param.tension || 0;
		this.dotR = param.dotR || 5;
		this.colors = param.colors || d3.scaleOrdinal(d3.schemeCategory10);
		this.xDomain = param.xDomain || [0, 10];
		this.yDomain = param.yDomain || [0, 10];

		this.id = `svg${Date.now()}`;
		this.clipId = `body-clip-${Date.now()}`;
	}
	private createSvg() {
		this.svg = d3.select(this.selector)
			// .selectAll(`#${this.id}`)
			// .data([1])
			// .enter()
				.append('svg');

		this.svg.attr('width', this.width)
			.attr('height', this.height)
			.attr('id', this.id)

		return this.svg;
	};
	private createBody(svg: any = this.svg) {
		this.body = svg
			// .selectAll('.body')
			// .data([1])
			// .enter()
				.append('g')
					.attr('class', 'body')
					.attr('clip-path', `url(#${this.clipId})`)
					.attr('transform', `translate(${this.margin},${this.margin})`)

	}
	private createAxes(svg: any = this.svg) {
		this.axes = svg
			// .selectAll('.axes')
			// .data([1])
			// .enter()
				.append('g')
					.attr('class', 'axes');
	}
	protected createClipPath(
		svg = this.svg,
		xAxisLen:number = this.xAxisLen,
		yAxisLen: number = this.yAxisLen,
		edgeLen: number = this.dotR
	) {
		svg
			// .selectAll('.body-clip-defs')
			// .data([1])
			// .enter()
				.append('defs')
					.attr('class', 'body-clip-defs')
				.append('clipPath')
					.attr('id', this.clipId)
				.append('rect')
					.attr('x', 0)
					.attr('y', 0)
					.attr('width', xAxisLen)
					.attr('height', yAxisLen);
		return svg;
	}
	private renderXAxes(svg: any) {
		const xAxisPainter = d3.axisBottom(this.xScale);

		const xAxis = svg.selectAll(`.${style['x-axis']}`)
			.data([1])
			.enter()
				.append('g')
					.attr('class', style['x-axis'])
					.attr('transform', () => `translate(${this.xStart},${this.yStart})`)
			.call(xAxisPainter);

		xAxis.selectAll(`.${style['x-axis']} .tick`)
			.selectAll(`.${style['grid-line']}`)
			.data([1])
			.enter()
				.append('line')
					.classed(style['grid-line'], true)
					.attr('x1', 0)
					.attr('x2', 0)
					.attr('y1', 0)
					.attr('y2', -this.yAxisLen);

		return svg;
	};
	private renderYAxes(svg: any) {
		const yAxisPainter = d3.axisLeft(this.yScale);

		const yAxis = svg.selectAll(`.${style['y-axis']}`)
			.data([1])
			.enter()
				.append('g')
					.attr('class', style['y-axis'])
					.attr('transform', () => `translate(${this.xStart},${this.yEnd})`)
			.call(yAxisPainter);

		yAxis.selectAll('.tick')
			.selectAll(`.${style['grid-line']}`)
			.data([1])
			.enter()
				.append('line')
					.attr('class', style['grid-line'])
					.attr('x1', 0)
					.attr('x2', this.xAxisLen)
					.attr('y1', 0)
					.attr('y2', 0)

		return svg;
	};
	protected renderDots(svg: any, data: TData, r:number, colors:any) {
		data.forEach((item, index:number) => {
			svg.selectAll(`.dot-wrapper-${index}`)
				.data([1])
				.enter()
					.append('g')
					.attr('class', `dot-wrapper-${index}`);

			const dotWrapper = svg.select(`.dot-wrapper-${index}`);
			const dots = dotWrapper.selectAll(`.${style.dot}`).data(item);

			dots.enter()
					.append('circle')
				.merge(dots)
					.attr('class', `${style.dot}`)
					.style('stroke', colors(index))
					.style('fill', colors(index))
				.transition()
					.attr('cx', (d:TDataEle) => this.xScale(d.x))
					.attr('cy', (d:TDataEle) => this.yScale(d.y))
					.attr('r', r);
			dots.exit().remove();
		});
	};
	private init() {
		if (this.hasInit) {
			return;
		}
		this.createSvg();
		this.createAxes();
		this.createBody();
		this.createClipPath();
		this.hasInit = true;
	}
	protected render() {
		this.init();
		this.renderXAxes(this.axes);
		this.renderYAxes(this.axes);
		this.renderDots(this.body, this.data, this.dotR, this.colors);
	}
	destroy() {
		(this.svg as d3.Selection<SVGSVGElement, any, HTMLElement, any>).selectAll('*').remove();
		(this.svg as d3.Selection<SVGSVGElement, any, HTMLElement, any>).remove();
	}
	protected setTension(tension: number) {
		this.tension = tension;
	}

	protected get xStart() {
		return this.margin;
	}
	protected get xEnd() {
		return this.width - this.margin;
	}
	protected get yStart() {
		return this.height - this.margin;
	}
	protected get yEnd() {
		return this.margin;
	}
	protected get xAxisLen() {
		return this.width - this.margin * 2;
	}
	protected get yAxisLen() {
		return this.height - this.margin * 2;
	}
	protected get xScale() {
		return d3
			.scaleLinear()
			.domain(this.xDomain)
			.range([0, this.xAxisLen]);
	}
	protected get yScale() {
		return d3
			.scaleLinear()
			.domain(this.yDomain)
			.range([this.yAxisLen, 0]);
	}
}

export default CartesianCoordinates;
