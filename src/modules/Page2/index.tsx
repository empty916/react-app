import React from 'react';
// import Button from '@base/IconButton';
// import Input from '@base/Input';
// import Icon from '@material-ui/core/Icon';
import styles from './style.scss';
import {
	Button,
	LinearProgress,
	FormControlLabel,
	Radio,
	TablePagination,
} from '@material-ui/core';
import { inject } from '@/store';
import { TextField, RadioGroup } from 'formik-material-ui';
import { Field, useFormik, FormikProvider } from 'formik';
import Checkbox from '@/components/base/Checkbox';
import ErrorMsgBoxHOC from '@/components/base/ErrorMsgBoxHOC';
import { DatePicker } from 'formik-material-ui-pickers';
import MUIDataTable from 'mui-datatables';

const injector = inject('page2', ['app', {}]);
type PageProps = typeof injector.type;

const _RadioGroup = ErrorMsgBoxHOC(RadioGroup);

const columns = [
	{
		name: 'name',
		label: 'Name',
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: 'company',
		label: 'Company',
		options: {
			filter: true,
			sort: false,
		},
	},
	{
		name: 'city',
		label: 'City',
		options: {
			filter: true,
			sort: false,
		},
	},
	{
		name: 'state',
		label: 'State',
		options: {
			filter: true,
			sort: false,
		},
	},
];

const data = [
	{ name: 'Joe James', company: 'Test Corp', city: 'Yonkers', state: 'NY' },
	{ name: 'John Walsh', company: 'Test Corp', city: 'Hartford', state: 'CT' },
	{ name: 'Bob Herm', company: 'Test Corp', city: 'Tampa', state: 'FL' },
	{ name: 'James Houston', company: 'Test Corp', city: 'Dallas', state: 'TX' },
];

const options = {
	filterType: 'checkbox' as 'checkbox',
	jumpToPage: true,
	// selectableRowsHeader: false,
	selectToolbarPlacement: 'none',
	// viewColumns: false,
	tableId: 'name',
	// count: 100,
	print: false,
	searchable: false,
	search: false,
	serverSide: true,
	download: false,
	filter: false,
	rowsPerPageOptions: [5, 10, 25],
	onTableChange: (...arg: any) => {
		console.log(...arg);
	},
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
			rowsPerPageOptions={[5, 10, 25]}
			component='div'
			count={100}
			rowsPerPage={rowsPerPage}
			page={page}
			labelDisplayedRows={({ from, to, count: _count }) => `${from}-${to} 共 ${_count !== -1 ? _count : `more than ${to}`} 条数据`}
			onChangePage={(event, np: number) => changePage(np)}
			onChangeRowsPerPage={e => changeRowsPerPage(e.target.value)}
		/>
	),
};

// const MyDatePicker

const Page2: React.FC<PageProps> = ({ page2 }) => {
	const { actions } = page2;
	const formikbag = useFormik({
		initialValues: {
			email: '',
			date: '',
			password: '',
			checked: false,
			activity: '',
		},
		onSubmit: (values, { setSubmitting }) => {
			setSubmitting(false);
			actions.changePageName(values.email);
			// console.log(JSON.stringify(values, null, 2));
		},
	});
	const { isSubmitting, submitForm } = formikbag;

	// const changePage2 = (e: React.ChangeEvent<HTMLInputElement>) => actions.changePageName(e.target.value);
	return (
		<div className={styles.page2}>
			<MUIDataTable
				title=""
				data={data}
				columns={columns}
				options={options as any}
			/>
			<FormikProvider value={formikbag}>
				<Field
					component={DatePicker}
					label="date"
					cancelLabel="取消"
					okLabel="确定"
					name="date"
				/>
				<br />
				<Field
					component={TextField}
					name="email"
					type="email"
					label="Email"
					validate={(v: string) => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(v)
						? 'Invalid email address'
						: undefined)}
				/>
				<br />
				<Field
					component={Checkbox}
					type="checkbox"
					name="checked"
					validate={(v: any) => (!!v ? undefined : 'checked required!')}
				/>
				<br />
				<Field
					component={_RadioGroup}
					name="activity"
					validate={(v: any) => (!!v ? undefined : 'acivity required!')}
				>
					<FormControlLabel
						value="painting"
						control={<Radio disabled={isSubmitting} />}
						label="Painting"
						disabled={isSubmitting}
					/>
					<FormControlLabel
						value="drawing"
						control={<Radio disabled={isSubmitting} />}
						label="Drawing"
						disabled={isSubmitting}
					/>
					<FormControlLabel
						value="none"
						control={<Radio disabled={isSubmitting} />}
						label="None"
						disabled
					/>
				</Field>
				<br />
				<Field
					component={TextField}
					type="password"
					label="Password"
					name="password"
				/>
				{isSubmitting && <LinearProgress />}
				<br />
				<Button
					variant="contained"
					color="primary"
					disabled={isSubmitting}
					onClick={submitForm}
				>
					Submit
				</Button>
			</FormikProvider>
		</div>
	);
};

export { state, maps, actions } from './store';

export default injector(Page2);
