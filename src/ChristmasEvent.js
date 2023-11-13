import { MESSAGE } from './constants/messages';
import { NUMBER } from './constants/constants';
import InputView from './utils/Views/InputView';
import Validation from './utils/Validation/Validation';
import OutputView from './utils/Views/OutputView';
import MenuCalculation from './utils/Calculation/MenuCalculation';

class ChristmasEvent {
  constructor() {
    this.menuCalculation = new MenuCalculation();
  }

  async startOrder() {
    const reservedDate = await this.getReservationDate();
    const reservedOrder = await this.getReservationOrder();
    const reservedOrderList = this.menuCalculation.getProcessIndividualOrder(reservedOrder);
    const totalOrderPrice = this.menuCalculation.getCalculateTotalOrder(reservedOrder);

    if (totalOrderPrice >= NUMBER.minimumOrderPrice) {
      const discountAmount = this.menuCalculation.applyDiscounts(reservedDate);
      const applyEventBadge = this.menuCalculation.applyEventBadge(discountAmount);
    }
  }

  async getReservationDate() {
    const inputDate = await InputView.readLineAsync(MESSAGE.visitDate);
    try {
      Validation.isValidDecemberDate(inputDate);

      return +inputDate;
    } catch (error) {
      OutputView.print(error.message);

      return this.getReservationDate();
    }
  }

  async getReservationOrder() {
    const inputOrder = await InputView.readLineAsync(MESSAGE.menuOrderQuestion);
    try {
      Validation.isValidMenuOrder(inputOrder);

      return this.menuCalculation.getProcessIndividualOrder(inputOrder);
    } catch (error) {
      OutputView.print(error.message);

      return this.getReservationOrder();
    }
  }

  printapplyEvent
}

export default ChristmasEvent;
