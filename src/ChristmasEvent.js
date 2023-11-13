import MESSAGE from './constants/messages.js';
import { NUMBER } from './constants/constants.js';
import InputView from './utils/Views/InputView.js';
import Validation from './utils/Validation/Validation.js';
import OutputView from './utils/Views/OutputView.js';
import MenuCalculation from './utils/Calculation/MenuCalculation.js';

class ChristmasEvent {
  #orderedMenuList = [];

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

    OutputView.print(MESSAGE.benefitList(reservedDate));
    this.printOrderMenuList(reservedOrderList);
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

  printOrderMenuList(reservedOrderList) {
    this.updateOrderMenuList(reservedOrderList);
    this.printOrderMenu();
  }

  printOrderMenu() {
    OutputView.print(MESSAGE.orderMenu);
    this.#orderedMenuList.forEach(menu => {
      const [menuName, menuAmount] = menu;
      OutputView.print(MESSAGE.itemizedBill(menuName, menuAmount));
    })
  }

  updateOrderMenuList(reservedOrderList) {
    Object.keys(reservedOrderList).forEach(category => {
      this.updateCategoryInOrderMenuList(category);
    })
  }

  updateCategoryInOrderMenuList(category, reservedOrderList) {
    Object.keys(category).forEach(menuName => {
      if (menuName in reservedOrderList[category]) {
        this.#orderedMenuList.push([menuName, reservedOrderList[category][menuName]]);
      }
    })
  }
}

export default ChristmasEvent;
