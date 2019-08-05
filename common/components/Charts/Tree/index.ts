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

namespace Tree {
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
}
const TYPES = {
	VERTICAL: 'vertical',
	HORIZONTAL: 'horizontal',
};
class Tree {
	private width: number;
	private height: number;
	private margin: Tree.margin;
	private selector: string;
	private data: any;
	private svg: TSvgSelection | undefined;
	private body: TGSelection | undefined;
	private tree: d3.TreeLayout<any> | undefined;
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
		width = 1500,
		height = 1500,
		margin = {top: 50,right:50,bottom:50,left:50},
		selector,
		data,
	}: Tree.constructorParams) {
		this.width = width;
		this.height = height;
		this.margin = margin;
		this.selector = selector;
		this.data = data;
	}
	private createTree() {
		if (this.svg === undefined) {
			this.svg = d3.select(this.selector)
				.append('svg')
					.attr('width', this.width)
					.attr('height', this.height);
		}
		if (this.body === undefined) {
			this.body = this.svg.append('g')
				.attr('class', 'body')
				.attr('transform', `translate(${this.margin.left},${this.margin.top})`)
		}
		if (this.tree === undefined) {
			const { top, right, bottom, left } = this.margin;
			this.tree = d3.tree()
							.size([
								this.width - left - right,
								this.height - top - bottom
							]);
			this.root = d3.hierarchy(this.data);
		}
	}
	private init() {
		// 格式化直接改变了root的值
		(<d3.TreeLayout<any>>this.tree)(this.root);
		if (this.type !== TYPES.VERTICAL) {
			this.convertCartesianCoordinates(this.root.descendants());
		}
		this.nodes = (<TGSelection>this.body)
			.selectAll('.node')
			.data(this.root.descendants(), (d: any) => d.id || (d.id = ++this.index));

		this.renderLinks();
		this.renderNodes(this.nodes);
	}
	private renderNodes(nodes: d3.Selection<SVGGElement, any, HTMLElement, any>) {
		const nodesEnter = nodes
			.enter()
				.append('g')
					.attr('class', 'node')
					.attr('transform', (d: any) => `translate(${d.parent ? [d.parent.x, d.parent.y] : [0,0]})`)
				.on('click', (d: any) => {
					this.toggle(d);
					this.render();
				});

		const nodesUpdate = nodesEnter.merge(nodes);
		nodesUpdate
			.transition()
				.attr('transform', (d: any) => `translate(${d.x},${d.y})`);

		const nodesExit = nodes
							.exit()
							.transition()
							.attr('transform', (d: any) => {
								const hideNode = this.findHideParentNode(d);
								if (hideNode) {
									return `translate(${hideNode.x},${hideNode.y})`;
								}
								return `translate(${0},${0})`;
							})
							.remove();

		this.renderNode(nodesEnter, nodesUpdate, nodesExit);
		this.renderText(nodesEnter, nodesUpdate, nodesExit);

	}
	private renderNode(nodesEnter: TGSelection, nodesUpdate: TGSelection, nodesExit:TGTransition) {
		const node = nodesEnter
			.append('circle')
			.transition()
				.attr('r', this.circleR)
				.style("fill", (d: any) => d._children ? 'lightsteelblue' : '#fff')
				.style('opacity', 1)
				.style("stroke", 'steelblue')
				.style("stroke-width", '1.5px');

		nodesUpdate
			.select('circle')
			.transition()
				.attr('r', this.circleR)
				.style('opacity', 1)
				.style("stroke-width", '1.5px')
				.style("fill", (d: any) => d._children ? 'lightsteelblue' : '#fff');

		nodesExit
			.select('circle')
				.style('opacity', 0)
			.remove();
	}
	private renderText(nodesEnter: TGSelection, nodesUpdate: TGSelection, nodesExit: TGTransition) {
		nodesEnter
			.append('text')
				.style("font-size", 11)
                .attr("dx", (d: any) => !!d.children ? -6 : 6)
				.attr("dy", '0.35em')
				.attr("text-anchor", (d: any) => !!d.children ? 'end':"start")
				.text((d: any) => d.data.name);

		nodesUpdate
			.select('text')
			.attr("dx", (d: any) => !!d.children ? -6 : 6)
			.attr("text-anchor", (d: any) => !!d.children ? 'end':"start")

		nodesExit
			.select('text')
				.style("fill-opacity", 0)
			.remove();
	}
	private renderLinks() {
		this.links = (<TGSelection>this.body)
				.selectAll('.link')
				.data(this.root.descendants().slice(1), (d: any) => d.id || (d.id = ++this.index));

		this.links
			.enter()
				.append('path')
					.attr('class', 'link')
					.style('opacity', 0)
					.attr('d', (d: any) => this.generateLinkPath({x: d.x, y: d.y}, {x: d.x, y: d.y}))
				.transition()
					.attr('d', (d: any) => this.generateLinkPath({x: d.parent.x, y: d.parent.y}, d))
					.style('opacity', 1)
					.style('fill', 'none')
					.style('stroke', '#ccc')
					.style('stroke-width', 1.5);
		this.links
			.filter((d: any, i: number) => !!d.parent)
			.transition()
				.attr('d', (d: any) => this.generateLinkPath({x: d.parent.x, y: d.parent.y}, d))


		this.links
			.exit()
			.transition()
				.style('opacity', 0)
				.attr('d', (d: any) => {

					const hideNode = this.findHideParentNode(d);
					if (hideNode) {
						const {x, y} = hideNode;
						return this.generateLinkPath({x,y}, {x, y});
					}
					return {x: 0, y: 0};
				})
			.remove();


	}
	private destroyLinks() {
		this.links.remove();
	}
	private generateLinkPath(target: {x:number,y:number}, source: {x:number,y:number}) {
		const path = d3.path();
		path.moveTo(target.x, target.y);
		if (this.type === TYPES.HORIZONTAL) {
			// 水平连线
			path.lineTo((target.x + source.x)/2, target.y);
			path.lineTo((target.x + source.x)/2, source.y);
		} else {
			// 垂直连线
			path.lineTo(target.x, (target.y + source.y)/2);
			path.lineTo(source.x, (target.y + source.y)/2);
		}
		path.lineTo(source.x, source.y);
		return path.toString();
	}
	render() {
		this.createTree();
		this.init();
		this.colors('1')
	}
	destory() {

	}
	unMount() {
		this.nodes
			.exit()
				.on('click', null)
				.remove()
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
	private findHideParentNode(node:TNode): TNode|null|undefined {
		if (node.parent && !node.parent._children) {
			return this.findHideParentNode(node.parent);
		}
		return node.parent;
	}
	/**
	 * 翻转坐标系的x与y轴
	 */
	private convertCartesianCoordinates(p: {x:number, y:number}[]){
		p.forEach((item: {x:number, y:number}, index: number) => {
			const x = item.x;
			item.x = item.y;
			item.y = x;
		});
	}
	private toggle(d: any) {
		if (d.children) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}
	}
}

export default Tree;
