import React from 'react';
import { ErrorMessage } from 'formik';
import { Box } from '@material-ui/core';

type AnyFun = (...arg: any) => any;

const ErrorMsgBoxHOC = <C extends AnyFun>(Comp: C) => {
	const WithErrorComponent: React.FC<Parameters<C>[0]> = props => {
		const {field} = props;
		const {name} = field;
		return (
			<>
				<Comp {...props} />
				<Box fontSize={12} pl={2} color='error.main'>
					<ErrorMessage name={name} />
				</Box>
			</>
		);
	};
	return WithErrorComponent;
};
export default ErrorMsgBoxHOC;
