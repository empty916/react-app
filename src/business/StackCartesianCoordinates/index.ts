import * as d3 from 'd3';
import CartesianCoordinates from '../CartesianCoordinates';

namespace StackCartesianCoordinates {
	export interface ConstructorParams extends CartesianCoordinates.ConstructorParams {
		stackType?: any;
		keys: string[];
	}
}
type SCC = StackCartesianCoordinates.ConstructorParams;

// 堆叠式数据的Cartesian coordinates 直角坐标
class StackCartesianCoordinates extends CartesianCoordinates {
	protected keys: string[] = [];
	protected stackType = d3.stackOffsetNone;
	constructor(params: SCC) {
		super(params);
		this.stackType = params.stackType || d3.stackOffsetNone;
		this.keys = params.keys;
	}
	get createStackDataByData(): any {
		return d3.stack().keys(this.keys).offset(this.stackType);
	}
	get stackData() {
		return this.createStackDataByData(this.data);
	}
}

export default StackCartesianCoordinates;
