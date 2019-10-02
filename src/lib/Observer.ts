export default class Observer {
	private handlers: any[];

	constructor() {
		this.handlers = [];
	}

	public addHandler(handler: any) {
		this.handlers.push(handler);
	}

	public receive(store: any) {
		this.handlers.map(handler => {
			handler(store);
		});
	}
}

export const connect = (mapStateToProps: any, state: any) => {
	return (render:any) => {
		const props: any = mapStateToProps(state);
		return render(props);
	}
}
