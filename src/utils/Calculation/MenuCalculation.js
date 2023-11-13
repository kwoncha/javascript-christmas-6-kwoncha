class MenuCalculation {
  #menu = new Map();

  getdDvideMenuOrders(inputMenus) {
    return this.#menu(inputMenus.split(','));
  }

  getProcessIndividualOrder(inputMenus) {
    const dividedMenuOrders = this.divideMenuOrders(inputMenus);

    return this.#menu(dividedMenuOrders.map(menu => { return menu.split('-') }));
  }
}

export default MenuCalculation;
