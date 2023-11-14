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
    this.validation = new Validation();
  }

  async startOrder() {
    const reservedDate = await this.getReservationDate();
    const reservedOrderList = await this.getReservationOrder();
    const totalOrderPrice = this.menuCalculation.getCalculateTotalOrder();

    if (totalOrderPrice >= NUMBER.minimumOrderPrice) {
      const discountAmount = this.menuCalculation.applyDiscounts(reservedDate);
      const applyEventBadge = this.menuCalculation.applyEventBadge(discountAmount);
    }

    OutputView.print(MESSAGE.benefitList(reservedDate));
    this.printOrderMenuList(reservedOrderList);
    OutputView.printTotalOrderPrice(this.formatNumberToCurrency(totalOrderPrice));
  }

  async getReservationDate() {
    const inputDate = await InputView.readLineAsync(MESSAGE.visitDate);
    try {
      this.validation.isValidDecemberDate(inputDate);

      return +inputDate;
    } catch (error) {
      OutputView.print(error.message);

      return this.getReservationDate();
    }
  }

  async getReservationOrder() {
    const inputOrder = await InputView.readLineAsync(MESSAGE.menuOrderQuestion);
    try {
      const orderedMenu = this.validation.isValidMenuOrder(inputOrder);
      this.menuCalculation.setUpdateOrderedMenu(orderedMenu);

      return orderedMenu;
    } catch (error) {
      OutputView.print(error.message);

      return this.getReservationOrder();
    }
  }

  printOrderMenuList(orderedMenuObject) {
    this.updateOrderMenuList(orderedMenuObject);
    this.printOrderMenu();
  }

  printOrderMenu() {
    OutputView.print(MESSAGE.orderMenu);
    this.#orderedMenuList.forEach(menu => {
      const [menuName, menuAmount] = menu;
      OutputView.print(MESSAGE.itemizedBill(menuName, menuAmount));
    })
  }

  updateOrderMenuList(orderedMenuObject) {
    Object.keys(orderedMenuObject).forEach(category => {
      this.updateCategoryInOrderMenuList(category, orderedMenuObject);
    })
  }

  updateCategoryInOrderMenuList(category, orderedMenuObject) {
    Object.keys(orderedMenuObject[category]).forEach(menuName => {
      if (orderedMenuObject[category][menuName] !== 0) {
        this.#orderedMenuList.push([menuName, orderedMenuObject[category][menuName]]);
      }
    });
  }

  formatNumberToCurrency(number) {
    return number.toLocaleString('ko-KR');
  }
}

export default ChristmasEvent;
