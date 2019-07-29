import * as d3 from 'd3';
import pipe from 'lodash/fp/pipe';
import style from './style.scss';

const createData = () => d3.range(6).map(i => ({
	id: i,
	value: Math.random() * 10,
	text: i,
}));

type TDataEle = {
	id: number;
	value: any;
}

class Pie {
	data: any;
	selector: string;
	width: number = 500;
	height: number = 500;
	svg: any;
	pie: any;
	hasInit: boolean = false;
	formatData:any = d3
		.pie()
			.sort((a: any, b: any) => a.id - b.id)
			.value((d: any) => d.value)
			.padAngle(0.01);

	constructor({selector, endAngle = Math.PI * 2}: {
		selector: string;
		endAngle?: number;
	}) {
		this.selector = selector;
		this.updateData();
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

	createPie() {
		this.pie = this.svg
			.append('g')
				.attr('class', 'pie')
				// .attr('clip-path', 'url(#body-clip)')
				.attr(
					'transform',
					`translate(${this.width / 2},${this.height / 2})`,
				);
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
	renderPie() {
		const arc = this.scale;

		const arcs = this.pie.selectAll('.arc').data(this.data);

		const allSelection =
				arcs.enter()
					.append('path')
						.attr('class', 'arc')
				.merge(arcs);

		allSelection
				.attr('fill', (d: any, i: number) => this.colors(i))
			.transition()
				.attrTween('d', function(this:any, d: any) {
					const start = this.__current__ || {startAngle: 0, endAngle: 0};
					const interpolate = d3.interpolate({...start}, d);
					this.__current__ = d;
					return pipe(interpolate, arc);
				});
	}
	renderLabel() {
		const textSelection = this.pie.selectAll('text.label').data(this.data);
		textSelection.enter()
			.append('text')
				.attr('class', 'label')
			.merge(textSelection)
			.transition()
				.attr('transform', (d: any) => `translate(${this.outScale.centroid(d)})`)
				.attr("dy", ".35em")
				.attr("text-anchor", "middle")
				.text((d: any) => d.data.id);
	}
	init() {
		if (this.hasInit) {
			return;
		}
		this.createSvg();
		this.createPie();
		this.createClipPath();
		this.hasInit = true;
	}
	render() {
		this.init();
		this.updateData();
		this.renderPie();
		this.renderLabel();
	}
	updateData() {
		this.data = this.formatData(createData());
	}
	colors(i: number) {
		var color = d3.scaleSequential(d3.interpolateRainbow);
		// const color = d3.scaleOrdinal(d3.schemeCategory10);
		// console.log(i);
		return color(i/10);
		// return d3.schemeCategory10[i];
		// console.log(d3.schemeBrBG);
		// return d3.schemeBrBG[11][i];
	}
	get scale() {
		return d3
			.arc()
			.outerRadius(this.width / 2)
			.innerRadius(this.width / 4);
	}
	get outScale() {
		return this.scale.outerRadius(this.width/2);
	}
}

export default Pie;
