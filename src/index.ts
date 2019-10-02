import * as $ from 'jquery'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style/index.css'
import ObservableApp from './lib/App';
import Observer, { connect } from './lib/Observer';
import Reducer from './lib/IReducer';
import { Action, ToDoProps } from './lib/types';

const initialState: any = {
	ToDoReducer: {
		items: [],
	},
};

function addItem(app: ObservableApp, item: any) {
	app.dispatch({type: "ADD_ITEM", payload: item});
}


class ToDoReducer implements Reducer {
	public name: string;

	constructor() {
		this.name = "ToDoReducer";
	}

	public reduce(state: any, action: Action) {
		switch (action.type) {
			case "ADD_ITEM":
				const items = state.items;
				return Object.assign({}, state, {items: [...items, action.payload]});
			default:
				return state;
		}
	}
}



function getRenderMethod() {
	let methods = [];
	for (let i = 0; i < 15; i++) {
		const render = (props: ToDoProps) => {
			$(`#list${i}`).html("");
			props.items.map((item: any) => {
				const li = document.createElement('li');
				$(li).addClass('item');
				$(li).html(item);
				$(`#list${i}`).append(li);
			});
		};
		methods.push(render);
	}
	return methods;
}

function mapStateToProps(state: any) {
	return {
		items: state.ToDoReducer.items,
	};
}




function main() {
	const app = new ObservableApp(initialState);
	const observer = new Observer();
	app.addObserver(observer);
	app.addReducer(new ToDoReducer());

	const onSubmit = (e: Event, input: any) => {
		e.preventDefault();
		const text = input.value;
		if (!text || text === '') {
			return;
		}
		addItem(app, text);
		$(input).val('');
	}

	const input = $("#input")[0];
	$("form.addForm").submit((e: any) => onSubmit(e, input));
	const renderers = getRenderMethod();
	renderers.map(renderer => {
		observer.addHandler((state: any) => connect(mapStateToProps, state)(renderer));
	});
	addItem(app, 'haha');
	addItem(app, 'hehe');
}

$(document).ready(main);
