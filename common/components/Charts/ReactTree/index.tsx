import React, {useState, useRef, useEffect} from 'react';
import { spring, TransitionMotion } from 'react-motion';
import * as d3 from 'd3';


type TGetValue = (d: any) => number;
type colorIndex =  0|1|2|3|4|5|6|7|8|9|10;
type TSvgSelection = d3.Selection<SVGSVGElement, any, HTMLElement, any>;
type TBaseSelection = d3.Selection<any, any, any, any>;
type TNode = {
	children: TNode | null | undefined,
	_children: TNode | null | undefined,
	parent: TNode | null | undefined,
	x: number,
	y: number,
	data: {
		name: string,
	}
};

namespace ReactTree {
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
		data: any;
	}
	export interface IInitDataParams {
		width: number;
		height: number;
		margin: margin;
		data: any;
	}
}
// const TYPES = {
// 	VERTICAL: 'vertical',
// 	HORIZONTAL: 'horizontal',
// };
enum TYPES {
	VERTICAL= 'vertical',
	HORIZONTAL= 'horizontal',
};

const convertCartesianCoordinates = (p: any[]) => {
	// return p.map((item: {x:number, y:number}, index: number) => ({
	// 	...item,
	// 	x: item.y,
	// 	y: item.x,
	// }));
	p.forEach((item: {x:number, y:number}, index: number) => {
		const x = item.x;
		item.x = item.y;
		item.y = x;
	});
}
const generateLinkPath = (target: any, source: any, type: TYPES ):string => {
	const path = d3.path();
	path.moveTo(target.x, target.y);
	if (type === TYPES.HORIZONTAL) {
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

const ReactTree = (p: ReactTree.constructorParams) => {
	const {
		width = 1600,
		height = 1600,
		margin = {top: 50,right:50,bottom:50,left:50},
		data,
	} = p;
	const { top, right, bottom, left } = margin;
	const tree = d3.tree()
				.size([
					width - left - right,
					height - top - bottom
				]);

	const anyArr: any[] = [];
	const anyObj: any = {};
	const [root, setRoot] = useState(tree(d3.hierarchy(data)));
	const [nodeList, setNodeList] = useState(anyArr);
	const type = TYPES.HORIZONTAL;

	const update = (tree: d3.TreeLayout<any>, root:d3.HierarchyPointNode<any>) => {
		setRoot(tree(root));
		const nodeList = root.descendants();
		if (type === TYPES.HORIZONTAL) {
			convertCartesianCoordinates(nodeList);
		}
		setNodeList(nodeList);
	}
	useEffect(() => update(tree, root), [])

	const toggleNode = (node: any) => {
		if (node.children) {
			node._children = node.children;
			node.children = null;
		} else {
			node.children = node._children;
			node._children = null;
		}
		update(tree, root);
	}
	return (
		<svg width={width} height={height}>
			<g className="body" transform="translate(50,50)">
				{
					nodeList.map((node: any, index: number) => (
						node.parent && <path
							key={index}
							d={generateLinkPath(node.parent, node, type)}
							style={{
								fill: 'none',
								stroke: '#ccc',
							}}
						/>
					))
				}
				{
					nodeList.map((node: any, index: number) => {
						return (
							<g className='node' key={index} transform={`translate(${node.x}, ${node.y})`}>
								<circle
									onClick={() => toggleNode(node)}
									r='4'
									fill={node._children ? 'blue' : '#fff'}
									stroke='blue'
								/>
								<text
									style={{
										fontSize: 11,
									}}
									textAnchor={node.children? 'end':'start'}
									dy='0.27em'
									dx={node.children?-10:10}
								>
									{node.data.name}
								</text>
							</g>
						)
					})
				}
			</g>
		</svg>
	)
}

export default ReactTree;
