import * as d3 from 'd3';
import StackCartesianCoordinates from '@client/business/StackCartesianCoordinates';

type TDataEle = {
	0: number;
	1: number,
	data: {
		value1: number;
		value2: number;
		value3: number;
		x: number;
	}
};
type TData = TDataEle[][];

type TEase = (p: number) => number;

class StackBar extends StackCartesianCoordinates {
	duration: number;
	easeType: TEase;
	padding: number = 20;
	constructor(selector: string, tension: number = 0, data = []) {
		super({
			selector,
			tension,
			data,
			width: 1000,
			xDomain: [-0.5, 11],
			yDomain: [0, 30],
			keys: ['value1', 'value2', 'value3'],
		});
		this.duration = 500;
		this.easeType = d3.easeCubic;
	}
	renderDots() {}
	renderBar = (svg: any, data: TData) => {
		const heightScale = this.yScale.range([0, this.yAxisLen]);
		this.stackData.forEach((dataItem: any, index: number) => {
			const barSelection = svg.selectAll(`rect.bar-${index}`).data(dataItem);
			barSelection
				.enter()
					.append('rect')
					.attr('class', `bar-${index}`)
				.merge(barSelection)
					.transition()
						.attr('x', (d: TDataEle) => this.xScale(d.data.x))
						.attr('y', (d: TDataEle) => this.yScale(d[1]))
						.attr('width', (d: TDataEle) => Math.floor(this.xAxisLen/this.data.length) - this.padding)
						.attr('height', (d: TDataEle) => heightScale(d[1] - d[0]))
						.attr('fill', d3.schemeCategory10[index])
		})
		return svg;
	};
	createData() {
		const dotsNumber = 11;
		const getRandomData = () => Math.random() * 10;
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
		this.renderBar(this.body, this.data);
	}
	setTension(tension: number) {
		super.setTension(tension);
		this.updateData();
		this.renderBar(this.body, this.data);
		super.render();
	}
}

export default StackBar;
