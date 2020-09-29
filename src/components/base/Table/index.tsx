import React from 'react';
import {
	TablePagination,
} from '@material-ui/core';
import MUIDataTable, { MUIDataTableProps } from 'mui-datatables';



type TableProps = MUIDataTableProps & {
    pagination: {
        /** 总数据量 */
        total: number;
        /** 当前页数 */
        page: number;
        /** rowsPerPage */
        rowsPerPage: number;
    },
    onPageChange?: (page: number) => void;
};

const Table: React.FC<TableProps> = ({options, data, pagination, onPageChange, ...restProps}) => {
	const _options = React.useMemo(() => ({
		filterType: 'checkbox' as 'checkbox',
		jumpToPage: true,
		selectToolbarPlacement: 'none',
		tableId: 'name',
		print: false,
		searchable: false,
		search: false,
		serverSide: true,
		download: false,
		filter: false,
		rowsPerPageOptions: options?.rowsPerPageOptions || [5, 10, 15, 20, 25],
		textLabels: {
			selectedRows: {
				text: '行已选择',
				delete: '删除',
				deleteAria: '删除所选数据',
			},
			toolbar: {
				viewColumns: '需要显示的列',
			},
			viewColumns: {
				title: '显示列',
				titleAria: '显示/隐藏 表哥列',
			},
			pagination: {
				next: '下一页',
				previous: '上一页',
				rowsPerPage: '每页行数:',
				displayRows: '共',
				jumpToPage: '跳转到',
			},
		},
		customFooter: (
			count: number,
			page: number,
			rowsPerPage: number,
			changeRowsPerPage: any,
			changePage: any,
		) => (
			<TablePagination
				rowsPerPageOptions={options?.rowsPerPageOptions || [5, 10, 15, 20, 25]}
				component='div'
				count={pagination.total}
				rowsPerPage={pagination.rowsPerPage}
				page={pagination.page - 1}
				labelDisplayedRows={({ from, to, count: _count }) => `${from}-${to} 共 ${_count !== -1 ? _count : `more than ${to}`} 条数据`}
				onChangePage={(event, np: number) => changePage(np)}
				onChangeRowsPerPage={e => changeRowsPerPage(e.target.value)}
			/>
		),
		onChangePage: (np: number) => onPageChange && onPageChange(np + 1),
		...options,
	}), [onPageChange, options, pagination.page, pagination.rowsPerPage, pagination.total]);

	return (
		<MUIDataTable
			data={data}
			options={_options as any}
			{...restProps}
		/>
	);
};

export default Table;
