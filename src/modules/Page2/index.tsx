import React from 'react';
// import Button from '@base/IconButton';
// import Input from '@base/Input';
// import Icon from '@material-ui/core/Icon';
import styles from './style.scss';
import { Button, LinearProgress, FormControlLabel, Radio } from '@material-ui/core';
import { inject } from '@/store';
import { TextField, RadioGroup } from 'formik-material-ui';
import { Field, useFormik, FormikProvider } from 'formik';
import Checkbox from '@/components/base/Checkbox';
import ErrorMsgBoxHOC from '@/components/base/ErrorMsgBoxHOC';


const injector = inject('page2', ['app', {}]);
type PageProps = typeof injector.type;


const _RadioGroup = ErrorMsgBoxHOC(RadioGroup);

const Page2: React.FC<PageProps> = ({page2}) => {
	const {actions } = page2;
	const formikbag = useFormik({
		initialValues: {
			email: '',
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
	const {isSubmitting, submitForm} = formikbag;

	// const changePage2 = (e: React.ChangeEvent<HTMLInputElement>) => actions.changePageName(e.target.value);
	return (
		<div className={styles.page2}>
			<FormikProvider value={formikbag}>
				<Field
					component={TextField}
					name="email"
					type="email"
					label="Email"
					validate={(v: string) => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(v) ? 'Invalid email address' : undefined)}
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


export {
	state,
	maps,
	actions,
} from './store';

export default injector(Page2);
