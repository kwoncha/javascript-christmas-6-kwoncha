import { DEC_DATE, ORDERED_MENU, MENU } from '../../constants/constants.js';
import { MESSAGE } from '../../constants/messages.js';
import MenuCalculation from '../Calculation/MenuCalculation.js';

class Validation {
  isValidDecemberDate(date) {
    if (!this.isValidDateType(date)) throw new Error(MESSAGE.ERROR.notValidDate);
  }

  isValidMenuOrder(inputMenus) {
    const dividedMenuArray = MenuCalculation.getdDvideMenuOrders(inputMenus);
    this.isValidReservationDate(dividedMenuArray);
  }

  isValidReservationDate(dividedMenuArray) {
    dividedMenuArray.forEach(menu => {
      if (!this.isValidMenuType(menu)) throw new Error(MESSAGE.notValidMenuInput);
    });
  }

  isValidMenuType(menu) {
    return ORDERED_MENU.test(menu);
  }

  isValidDateType(date) {
    return DEC_DATE.test(date);
  }
}

export default Validation;
