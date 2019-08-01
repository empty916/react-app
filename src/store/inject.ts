import {
	useState,
} from 'react';
import { StoreContext } from './createStore';

const Loading = () => 'loading';

const Inject = (moduleName: string[]) => {
	return (WrappedComponent: React.Component | React.FunctionComponent) => {
		return () => {

		}
	}
}


