import React from 'react';
import MUIDataTable, { MUIDataTableProps } from 'mui-datatables';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';

type TableState = {
	selectedRows: {
		data: {dataIndex: number}[]
	}
};

type TableProps = Omit<MUIDataTableProps, 'title'> & {
	pagination: {
		/** 总数据量 */
		total: number;
		/** 当前页数 */
		page: number;
		/** 每页的数据有多少行 */
		rowsPerPage: number;
	},
	onPageChange?: (page: number) => void;
	onChangeRowsPerPage?: (page: number) => void;
	onTableChange?: (dataIndex: number[]) => void;
	title?: string;
};

const Table: React.FC<TableProps> = ({options, data, pagination, onPageChange, onChangeRowsPerPage, onTableChange, title = '', ...restProps}) => {
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
				titleAria: '显示/隐藏 表格列',
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
			<TableFooter>
				<TableRow>
					<TableCell>
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
					</TableCell>
				</TableRow>
			</TableFooter>

		),
		onChangePage: (np: number) => onPageChange && onPageChange(np + 1),
		onChangeRowsPerPage: (size: number) => onChangeRowsPerPage && onChangeRowsPerPage(size),
		onTableChange: (action: string, tableState: TableState) => {
			if (onTableChange) {
				return onTableChange(tableState.selectedRows.data.map(item => item.dataIndex));
			}
		},
		...options,
	}), [onPageChange, onChangeRowsPerPage, onTableChange, options, pagination.page, pagination.rowsPerPage, pagination.total]);

	return (
		<MUIDataTable
			title={title}
			data={data}
			options={_options as any}
			{...restProps}
		/>
	);
};
export default Table;
