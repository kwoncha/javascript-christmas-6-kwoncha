import { MESSAGE } from './constants/messages';
import InputView from './utils/Views/InputView';
import Validation from './utils/Validation/Validation';
import OutputView from './utils/Views/OutputView';

class ChristmasEvent {
  async startOrder() {
    const reservedDate = await this.getReservationDate();
  }

  async getReservationDate() {
    const inputDate = await InputView.readLineAsync(MESSAGE.visitDate);
    try {
      Validation.isValidDecemberDate(inputDate);

      return inputDate;
    } catch (error) {
      OutputView.print(error.message);

      return this.getReservationDate();
    }
  }
}

export default ChristmasEvent;
