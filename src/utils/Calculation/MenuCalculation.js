import { NUMBER, MENU } from '../../constants/constants.js';

class MenuCalculation {
  #menu = new Map();

  getdDvideMenuOrders(inputMenus) {
    return this.#menu(inputMenus.split(','));
  }

  getProcessIndividualOrder(inputMenus) {
    const dividedMenuOrders = this.divideMenuOrders(inputMenus);

    return this.#menu(dividedMenuOrders.map(menu => { return menu.split('-') }));
  }

  getCalculateTotalOrder(dividedMenuAndAmount) {
    return dividedMenuAndAmount.reduce((orderedPrice, menuAndAmount) => {
      const menuName = menuAndAmount[NUMBER.menuName];
      const menuQuantity = +menuAndAmount[NUMBER.menuAmount];

      const menuPrice = Object.keys(MENU).reduce((price, category) => {
        return menuName in MENU[category] ? MENU[category][menuName] * menuQuantity : price;
      }, 0);

      return orderedPrice + menuPrice;
    }, 0);
  }

  getChristmasDistcount(date) {
    return
  }
}

export default MenuCalculation;
