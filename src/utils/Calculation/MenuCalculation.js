import { MENUNAME, MENUAMOUNT, MENU } from '../../constants/constants.js';

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
    let orderedPrice = 0;
    dividedMenuAndAmount.forEach(menuAndAmount => {
      const menuName = menuAndAmount[MENUNAME];
      const menuQuantity = +menuAndAmount[MENUAMOUNT];

      for (let category in MENU) {
        if (menuName in MENU[category]) {
          orderedPrice += MENU[category][menuName] * menuQuantity;
          break;
        }
      }
    });

    return orderedPrice;
  }
}

export default MenuCalculation;
