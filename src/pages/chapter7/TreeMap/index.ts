import * as d3 from 'd3';


type TGetValue = (d: any) => number;
type colorIndex =  0|1|2|3|4|5|6|7|8|9|10;
type TSvgSelection = d3.Selection<SVGSVGElement, any, HTMLElement, any>;
type TBaseSelection = d3.Selection<any, any, any, any>;

namespace TreeMap {
	export interface constructorParams {
		width?: number;
		height?: number;
		selector: string;
		data: any;
		getValue: TGetValue;
	}
}

class TreeMap {
	private width: number;
	private height: number;
	private selector: string;
	private data: any;
	private getValue: TGetValue;
	private svg: TSvgSelection | undefined;
	private treeMap: d3.TreemapLayout<any> | undefined;
	private root: any;
	private cells: any;

	constructor({
		width = 1600,
		height = 800,
		selector,
		getValue,
		data,
	}: TreeMap.constructorParams) {
		this.width = width;
		this.height = height;
		this.selector = selector;
		this.data = data;
		this.getValue = getValue;
	}
	private createMap() {
		if (this.svg === undefined) {
			this.svg = d3.select(this.selector)
				.append('svg')
					.attr('width', this.width)
					.attr('height', this.height);
		}
	}
	private init() {
		if (this.treeMap === undefined) {
			this.treeMap = d3.treemap()
							.size([this.width, this.height])
							.round(true)
							.padding(1);
		}
		this.root = d3.hierarchy(this.data)
			.sum(this.getValue)
			.sort((a: any, b: any) => b.value - a.value);
		// 格式化直接改变了root的值
		this.treeMap(this.root);
		this.cells = (<TSvgSelection>this.svg).selectAll('.cell').data(this.root.leaves(), (d: any) => d.data.name);
		this.renderCells(this.cells);
	}
	private renderCells(cells: any) {
		const cellsEnter = cells
			.enter()
				.append('g')
			.merge(cells)
				.attr('class', 'cell')
				.attr('transform', (d: any) => `translate(${d.x0},${d.y0})`);
			this.renderRect(cellsEnter, cells);
			this.renderText(cellsEnter, cells);
			cells.exit().remove();
	}
	private renderRect(cellsEnter: any, cells: any) {
		cellsEnter.append('rect');
		cellsEnter
			.merge(cells)
			.transition()
                .select("rect")
                .attr("width", (d: any) => d.x1 - d.x0)
                .attr("height", (d: any) => d.y1 - d.y0)
                .style("fill", (d: any) => this.colors(d.parent.data.name));

	}
	private renderText(cellsEnter: any, cells: any) {
		cellsEnter.append('text');
		cellsEnter
			.merge(cells)
			// .transition()
				.select("text")
				.style("font-size", 11)
                .attr("x", (d: any) => (d.x1 - d.x0)/2)
				.attr("y", (d: any) => (d.y1 - d.y0)/2)
				.attr("text-anchor", "middle")
				.text((d: any) => d.data.name)
				.style("opacity", function (this: any, d: any) {
					d.w = this.getComputedTextLength();
                    return d.w < (d.x1 - d.x0) ? 1 : 0; //<-I
                });
                // .style("fill", (d: any) => this.colors(d.parent.data.name));

	}
	render() {
		this.createMap();
		this.init();
	}
	private colors(name: string) {
		const leaves = this.root.leaves();
		let parentNames = leaves.map((d: any) => d.parent.data.name);
		parentNames = [...new Set(parentNames)];

		const scale = d3.scaleSequential(d3.interpolateRainbow)
			.domain([0, parentNames.length]);
		const nameIndex = parentNames.findIndex((parentName: any) => parentName === name);

		return scale(nameIndex);
	}
}

export default TreeMap;
