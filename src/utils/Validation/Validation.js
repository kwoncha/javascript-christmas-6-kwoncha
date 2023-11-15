import { DEC_DATE, ORDERED_MENU, MENU, NUMBER } from '../../constants/constants.js';
import MESSAGE from '../../constants/messages.js';
import MenuCalculation from '../Calculation/MenuCalculation.js';

class Validation {
  constructor() {
    this.menuCalculation = new MenuCalculation();
  }

  isValidDecemberDate(date) {
    if (!this.isValidDateType(date)) throw new Error(MESSAGE.ERROR.notValidDate);
  }

  isValidMenuOrder(inputMenus) {
    const dividedInputMenuArray = this.menuCalculation.getdivideMenuOrders(inputMenus);

    this.isValidMenuAndAmount(dividedInputMenuArray);
    this.isValidMenuIncludedInMenu(dividedInputMenuArray, MENU);

    const dividedMenuOrderAndAmount =
      this.menuCalculation.getProcessIndividualOrder(dividedInputMenuArray);
    this.isDrinkOnlyOrder(dividedMenuOrderAndAmount);
    this.isOrderQuantityValid(dividedInputMenuArray);

    return dividedMenuOrderAndAmount;
  }

  isOrderQuantityValid() {
    const totalItems = this.menuCalculation.getTotalOrderedItems();

    if (totalItems > NUMBER.maximumOrder) throw new Error(MESSAGE.ERROR.tooManyItems);
    if (totalItems === NUMBER.minimumOrder) throw new Error(MESSAGE.ERROR.noItemsOrdered);
  }

  isDrinkOnlyOrder(dividedMenuOrderAndAmount) {
    const hasNonDrinkItem = Object.keys(dividedMenuOrderAndAmount).some(category => {
      if (category !== 'drink') {
        return Object.values(dividedMenuOrderAndAmount[category]).some(quantity => quantity > 0);
      }

      return false;
    });

    if (!hasNonDrinkItem) throw new Error(MESSAGE.ERROR.drinksOnlyOrder);
  }

  isValidMenuAndAmount(dividedInputMenu) {
    const checkedMenuItems = this.menuCalculation.checkSingleMenuOrder(dividedInputMenu);

    checkedMenuItems.forEach(menu => {
      if (!this.isValidMenuType(menu)) throw new Error(MESSAGE.ERROR.notValidMenuInput);
    });
  }

  isValidMenuIncludedInMenu(dividedInputMenu, menulist) {
    const orderedMenu = [];
    const checkedMenuItems = this.menuCalculation.checkSingleMenuOrder(dividedInputMenu);

    checkedMenuItems.forEach(menu => {
      const [menuName, _] = menu.split('-');
      orderedMenu.push(menuName);

      this.isValidMenuIncluded(menuName, menulist);
    });

    this.isMenuAlreadyIncluded(dividedInputMenu, orderedMenu);
  }

  isMenuAlreadyIncluded(dividedInputMenu, orderMenuList) {
    const setOrderMenuList = new Set(orderMenuList);

    if (setOrderMenuList.size !== dividedInputMenu.length)
      throw new Error(MESSAGE.ERROR.notValidMenuInput);
  }

  isValidMenuIncluded(menuName, menu) {
    let isMenuValid = false;

    Object.keys(menu).forEach(category => {
      if (menuName in menu[category]) {
        isMenuValid = true;
      }
    });

    if (!isMenuValid) throw new Error(MESSAGE.ERROR.notValidMenuInput);
  }

  isIncludedComma(inputMenus) {
    if (inputMenus.includes(',')) return true;

    return false;
  }

  isValidMenuType(menu) {
    return ORDERED_MENU.test(menu);
  }

  isValidDateType(date) {
    return DEC_DATE.test(date);
  }
}

export default Validation;
