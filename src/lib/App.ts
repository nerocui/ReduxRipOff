import Observer from './Observer';
import Reducer from './IReducer';
import { Action } from './types';

export default class ObservableApp {
	public store: any;
	private observers: Observer[];
	private reducers: Reducer[];

	constructor(initialState = {}) {
		this.store = initialState;
		this.observers = [];
		this.reducers = [];
	}

	public addReducer(reducer: Reducer) {
		this.reducers.push(reducer);
	}

	public addObserver(observer: Observer) {
		this.observers.push(observer);
	}

	private reduce(action: Action) {
		this.reducers.map(reducer => {
			this.store[reducer.name] = reducer.reduce(this.store[reducer.name], action);
		});
	}

	public dispatch(action: Action) {
		this.reduce(action);
		this.observers.map(observer => {
			observer.receive(this.store);
		})
	}
}
