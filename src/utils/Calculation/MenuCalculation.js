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
    const individualOrder = dividedMenuAndAmount;

    let orderedPrice = 0;
    individualOrder.forEach(menuAndAmount => {
      orderedPrice += MENU[menuAndAmount[MENU.menuName]] * +menuAndAmount[MENU.menuAmount];
    });

    return orderedPrice;
  }
}

export default MenuCalculation;
