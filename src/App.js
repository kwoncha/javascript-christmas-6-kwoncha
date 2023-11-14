import ChristmasEvent from './ChristmasEvent.js';

class App {
  constructor() {
    this.christmasEvent = new ChristmasEvent();
  }

  async run() {
    await this.christmasEvent.startOrder();
  }
}

export default App;
