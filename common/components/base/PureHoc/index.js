import React, { Component } from 'react'
import isEqual from 'lodash/isEqual'

const PureHoc = WrappedComponent => {

    return class extends Component {
        shouldComponentUpdate(nextProps) {
            return !isEqual(nextProps, this.props);
        }

        render() {
            const { children, ...restProps } = this.props;
            return <WrappedComponent { ...restProps } >{ children }</WrappedComponent>;
        }
    }

};

export default PureHoc;