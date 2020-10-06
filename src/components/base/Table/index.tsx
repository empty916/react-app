import React from 'react';
import MUIDataTable, { MUIDataTableProps } from 'mui-datatables';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';


type TableProps<
	D extends {},
	RSI extends number | string,
	IDName extends keyof D = keyof D,
> = Omit<MUIDataTableProps, 'title'|'data'> & {
	/**
	 * 分页数据
	 */
	pagination: {
		/** 总数据量 */
		total: number;
		/** 当前页数，从1开始算 */
		page: number;
		/** 每页的数据有多少行 */
		rowsPerPage: number;
	},
	/**
	 * 当分页页数改变时
	 */
	onPageChange?: (page: number) => void;
	/**
	 * 当，当前的每页数据有多少行的配置更新时
	 */
	onRowsPerPageChange?: (page: number) => void;
	/**
	 * 当表格选中项更新时
	 */
	onRowSelectionChange?: (newRowsSelected: RSI[]) => void;
	/**
	 * 表格标题
	 */
	title?: string;
	/**
	 * 被选中的项目id数组，可以是index索引，
	 * 也可以是数据的id，如果是id数据的话，必须要声明idName的值，
	 * 也就是每行数据的id数据对应的名字
	 * */
	rowsSelected?: RSI[];
	/**
	 * 数据的id对应的名字
	 */
	idName?: IDName;
	data: D[];
};


const Table = <
	D extends {},
	RSI extends number | string,
>({
		options,
		data,
		pagination,
		onPageChange,
		onRowsPerPageChange,
		onRowSelectionChange,
		idName,
		rowsSelected = [],
		title = '',
		...restProps
	}: TableProps<D, RSI>) => {
	const _rowsSelected = React.useMemo(() => {
		if (idName) {
			return data.reduce((idxs, d, currentIndex) => {
				if (rowsSelected.indexOf(d[idName] as any) > -1) {
					idxs.push(currentIndex);
				}
				return idxs;
			}, [] as number[]);
		}
		return rowsSelected;
	}, [data, idName, rowsSelected]);
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
		rowsSelected: _rowsSelected,
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
		onChangeRowsPerPage: (size: number) => onRowsPerPageChange && onRowsPerPageChange(size),
		onRowSelectionChange: (currentRowsSelected: any, allRowsSelected: any, selectedIndexs: any) => {
			if (onRowSelectionChange) {
				if (idName) {
					// @ts-ignore
					onRowSelectionChange(selectedIndexs.map((si: number) => data[si][idName]));
				} else {
					onRowSelectionChange(selectedIndexs);
				}
			}
		},
		...options,
	}), [
		_rowsSelected,
		options,
		pagination.total,
		pagination.rowsPerPage,
		pagination.page,
		onPageChange,
		onRowsPerPageChange,
		onRowSelectionChange,
		idName,
		data,
	]);


	return (
		<MUIDataTable
			title={title}
			data={data}
			options={_options as MUIDataTableProps['options']}
			{...restProps}
		/>
	);
};
export default Table;
