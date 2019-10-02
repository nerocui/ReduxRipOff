import ObservableApp from './App';
import Observer, {connect} from './Observer';
import Reducer from './IReducer';
import * as types from './types';

export default {
	App: ObservableApp,
	Observer,
	connect,
};
