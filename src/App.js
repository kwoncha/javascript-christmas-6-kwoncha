import ChristmasEvent from './ChristmasEvent';

class App {
  constructor() {
    this.christmasEvent = new ChristmasEvent();
  }

  async run() {
    await this.christmasEvent.startOrder();
  }
}

export default App;
