import React, { Component } from 'react'
import PureHoc from 'PureHoc'
import { Table } from 'antd'

@PureHoc
class PureTable extends Component {
    render() {
        return <Table { ...this.props }/>;
    }
}

export default PureTable;