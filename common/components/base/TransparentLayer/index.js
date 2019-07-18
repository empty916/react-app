import React, {Component} from 'react';

import style from './style.scss';

class TransparentLayer extends Component {
	render() {
		return <div className={style.layer}>{this.props.children}</div>;
	}
}

export default TransparentLayer;
