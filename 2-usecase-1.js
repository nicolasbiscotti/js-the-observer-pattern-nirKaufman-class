class Store {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  dispatch(state) {
    this.state = Object.assign(this.state, state);
    this.listeners.forEach((listener) => listener(this.state));
  }

  suscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
