import MESSAGE from './constants/messages.js';
import { DISCOUNT, NUMBER } from './constants/constants.js';
import InputView from './utils/Views/InputView.js';
import Validation from './utils/Validation/Validation.js';
import OutputView from './utils/Views/OutputView.js';
import MenuCalculation from './utils/Calculation/MenuCalculation.js';

class ChristmasEvent {
  #orderedMenuList = [];

  #benefitDetails = [];

  constructor() {
    this.menuCalculation = new MenuCalculation();
    this.validation = new Validation();
  }

  async startOrder() {
    const reservedDate = await this.getReservationDate();
    const reservedOrderList = await this.getReservationOrder();
    const totalOrderPrice = this.menuCalculation.getCalculateTotalOrder();
    let discountAmount = 0;
    let applyEventBadge;

    if (totalOrderPrice >= NUMBER.minimumOrderPrice) {
      discountAmount = this.menuCalculation.applyDiscounts(reservedDate);
      applyEventBadge = this.menuCalculation.applyEventBadge(discountAmount);
    }

    const discountList = this.menuCalculation.setDiscountList();
    this.updateOrderMenuList(reservedOrderList);
    this.updateBenefitDetails(discountList);
    const amountAfterDiscount = this.menuCalculation.calculateTotalAmount(totalOrderPrice, discountAmount);

    OutputView.print(MESSAGE.benefitList(reservedDate));
    OutputView.printOrderMenu(this.#orderedMenuList);
    OutputView.printTotalOrderPrice(this.formatNumberToCurrency(totalOrderPrice));
    OutputView.printGiftMenu(discountList);
    OutputView.printBenefitList(this.#benefitDetails);
    OutputView.printTotalBenefitAmount(discountAmount, this.formatNumberToCurrency(discountAmount));
    OutputView.printamountAfterDiscount(this.formatNumberToCurrency(amountAfterDiscount));
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

  updateBenefitDetails(list) {
    Object.entries(list).forEach(([benefitDetail, discountAmount]) => {
      if (discountAmount !== 0) {
        const discountName = DISCOUNT[benefitDetail];
        this.#benefitDetails.push([discountName, this.formatNumberToCurrency(discountAmount)]);
      }
    })
  }

  formatNumberToCurrency(number) {
    return number.toLocaleString('ko-KR');
  }
}

export default ChristmasEvent;
