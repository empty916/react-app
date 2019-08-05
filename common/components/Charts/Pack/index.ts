import * as d3 from 'd3';


type TGetValue = (d: any) => number;
type colorIndex =  0|1|2|3|4|5|6|7|8|9|10;
type TSvgSelection = d3.Selection<SVGSVGElement, any, HTMLElement, any>;
type TGSelection = d3.Selection<SVGGElement, any, HTMLElement, any>;
type TGTransition = d3.Transition<SVGGElement, any, HTMLElement, any>;
type TBaseSelection = d3.Selection<d3.BaseType, any, any, any>;
type TNode = {
	children: TNode | null | undefined,
	_children: TNode | null | undefined,
	parent: TNode | null | undefined,
	x: number,
	y: number,
};

export interface margin {
	top: number;
	right: number;
	bottom: number;
	left: number;
}
export interface constructorParams {
	width?: number;
	height?: number;
	margin?: margin;
	selector: string;
	data: any;
	// getValue: TGetValue;
}
const TYPES = {
	VERTICAL: 'vertical',
	HORIZONTAL: 'horizontal',
};
type TData = {
	children: TData;
	size?: number;
	[p: string]: any;
}

class Tree {
	private width: number;
	private height: number;
	private margin: margin;
	private selector: string;
	private data: any;
	private svg: TSvgSelection | undefined;
	private body: TGSelection | undefined;
	private packLayout: d3.PackLayout<any> | undefined;
	private root: any;
	private nodes: any;
	private links: any;

	private index: number = 0;
	static TYPES = TYPES;
	private type = TYPES.HORIZONTAL;

	private circleR: number = 4;
	private rectWidth: number = 50;
	private rectHeight: number = 100;

	constructor({
		width = 1280,
		height = 800,
		margin = {top: 0,right:0,bottom:0,left:0},
		selector,
		data,
	}: constructorParams) {
		this.width = width;
		this.height = height;
		this.margin = margin;
		this.selector = selector;
		this.data = data;
	}
	private createWrapper() {
		if (this.svg === undefined) {
			this.svg = d3.select(this.selector)
				.append('svg')
					.attr('width', this.width)
					.attr('height', this.height);
		}
		if (this.body === undefined) {
			this.body = this.svg.append('g')
				.attr('class', 'body')
				// .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
		}
		if (this.packLayout === undefined) {
			const { top, right, bottom, left } = this.margin;
			this.packLayout = d3.pack()
							.size([
								this.width - left - right,
								this.height - top - bottom
							]);
			this.root = d3.hierarchy<TData>(this.data)
							.sum((d: TData) => (d as {size: number}).size)
							.sort((a: d3.HierarchyNode<TData>, b: d3.HierarchyNode<TData>) => (a.value as number) - (b.value as number))
		}
	}
	private init() {
		// 格式化直接改变了root的值
		(this.packLayout as d3.PackLayout<any>)(this.root as d3.HierarchyNode<TData>);
		// if (this.type !== TYPES.VERTICAL) {
		// 	this.convertCartesianCoordinates(this.root.descendants());
		// }
		// this.nodes = (<TGSelection>this.body)
		// 	.selectAll('.node')
		// 	.data(this.root.descendants());

		this.renderNodes(this.root.descendants());
		this.renderText(this.root.descendants());
	}
	private renderNodes(nodesData: any) {
		const circles = (this.body as TGSelection)
			.selectAll('circle')
			.data(nodesData);

		circles
			.enter()
				.append('circle')
					.attr('class', 'node')
					.attr('cx', (d: any) => d.x)
					.attr('cy', (d: any) => d.y)
					.attr('r', (d: any) => d.r)
					.style('fill', '#fff')
					.style('stroke', 'steelblue')
		// this.renderText(nodesEnter);
	}
	private renderText(nodesData: any) {
		(this.body as TGSelection)
			.selectAll('text')
			.data(nodesData)
			.enter()
				.append('text')
					.style("font-size", 11)
					.attr("x", (d: any) => d.x)
					.attr("y", (d: any) => d.y)
					.attr("dy", '0.35em')
					.attr("text-anchor", 'middle')
					.filter((d: any) => d.children)
					.text((d: any) => d.data.name)
	}
	render() {
		this.createWrapper();
		this.init();
		// this.colors('1')
	}
	destroy() {
		(this.svg as d3.Selection<SVGSVGElement, any, HTMLElement, any>).selectAll('*').remove();
		(this.svg as d3.Selection<SVGSVGElement, any, HTMLElement, any>).remove();
	}
	private colors(name: string) {
		const nodes = this.root.descendants();
		const parentNames = d3.extent(nodes.map((d: any) => d.depth));
		// console.log(parentNames);
		return;
		const scale = d3.scaleSequential(d3.interpolateRainbow)
			.domain([0, parentNames.length]);
		const nameIndex = parentNames.findIndex((parentName: any) => parentName === name);

		return scale(nameIndex);
	}
}

export default Tree;
