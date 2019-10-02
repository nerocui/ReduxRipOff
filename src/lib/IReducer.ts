import {Action} from './types';

export default interface Reducer {
	name: string;
	reduce: any;
};
