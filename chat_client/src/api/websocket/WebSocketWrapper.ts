export type onOpenHandler = (event: Event) => void;
export type onCloseHandler = (event: CloseEvent) => void;
export type onErrorHandler = (event: Event) => void;
export type onMessageHandler = (event: MessageEvent) => void;

type WebSocketEventHandlers = {
	onopen?: onOpenHandler;
	onclose?: onCloseHandler;
	onerror?: onErrorHandler;
	onmessage?: onMessageHandler;
};

class WebSocketWrapper {
	protected socket: WebSocket | null;

	constructor() {
		this.socket = null;
	}

	protected open(url: string | URL, eventHandlers?: WebSocketEventHandlers) {
		const socket = new WebSocket(url);

		if (eventHandlers?.onopen) socket.onopen = eventHandlers.onopen;
		if (eventHandlers?.onclose) socket.onclose = eventHandlers.onclose;
		if (eventHandlers?.onerror) socket.onerror = eventHandlers.onerror;
		if (eventHandlers?.onmessage) socket.onmessage = eventHandlers.onmessage;

		this.socket = socket;
	}
	protected close() {
		if (!this.socket) throw new Error('Socket is not set');

		this.socket.close();
	}

	protected send(message: boolean | number | string | object) {
		if (!this.socket) throw new Error('Socket is not set');

		const stringifiedMessage = JSON.stringify(message);

		this.socket.send(stringifiedMessage);
	}
}

export default WebSocketWrapper;
