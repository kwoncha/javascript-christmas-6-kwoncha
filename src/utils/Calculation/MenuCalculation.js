import { NUMBER, MENU, CALENDAR } from '../../constants/constants.js';

class MenuCalculation {
  #menu = new Map();
  #orderedMenu = {
    appetizer: {
      양송이수프: 0,
      타파스: 0,
      시저샐러드: 0,
    },
    main: {
      티본스테이크: 0,
      바비큐립: 0,
      해산물파스타: 0,
      크리스마스파스타: 0,
    },
    dessert: {
      초코케이크: 0,
      아이스크림: 0,
    },
    drink: {
      제로콜라: 0,
      레드와인: 0,
      샴페인: 0,
    },
  }

  #discountList = {
    dDayDiscount: 0,
    weekDayDiscount: 0,
    weekendDiscount: 0,
    starDiscount: 0,
    champagnePresent: 0,
  }

  getdDvideMenuOrders(inputMenus) {
    return this.#menu(inputMenus.split(','));
  }

  getProcessIndividualOrder(inputMenus) {
    const dividedMenuOrders = this.getdDvideMenuOrders(inputMenus);

    dividedMenuOrders.forEach(menu => {
      const [menuName, quantity] = menu.split('-');
      this.updateOrderedMenu(menuName, +quantity);
    });

    return this.#orderedMenu;
  }

  getTotalOrderedItems() {
    return Object.keys(this.#orderedMenu).reduce((total, category) => {
      return total + Object.values(this.#orderedMenu[category]).reduce((subTotal, quantity) => subTotal + quantity, 0);
    }, 0);
  }

  updateOrderedMenu(menuName, quantity) {
    Object.keys(this.#orderedMenu).forEach(category => {

      if (menuName in MENU[category]) {
        this.#orderedMenu[category][menuName] += quantity;
        return;
      }
    })
  }

  getCalculateTotalOrder() {
    let orderedPrice = 0;

    Object.keys(this.#orderedMenu).forEach(category => {
      Object.keys(this.#orderedMenu[category]).forEach(menuName => {
        orderedPrice += MENU[category][menuName] * this.#orderedMenu[category][menuName];
      });
    });

    return orderedPrice;
  }

  applyChristmasDiscount(date) {
    this.#discountList[dDayDiscount] += NUMBER.thousandDiscount + (date - NUMBER.firstDay) * NUMBER.dDayDiscount
  }

  applyDiscounts(date) {
    this.applyChristmasDiscount(date);
    this.applyWeekdayAndWeekendDiscount(date);

    if (CALENDAR.starDay.includes(date)) this.#discountList[starDiscount] += NUMBER.thousandDiscount;
    if (this.getCalculateTotalOrder() >= NUMBER.minimumChampagne) this.#discountList[champagnePresent] += NUMBER.champagnePrice;

    return Object.keys(this.#discountList).reduce((totalDiscount, discountType) => {
      return totalDiscount + this.#discountList[discountType];
    }, 0);
  }

  applyWeekdayAndWeekendDiscount(date) {
    if (CALENDAR.weekendDay.includes(date)) {
      this.#discountList[weekendDiscount] += this.calculateCategoryDiscount('main', NUMBER.weekendDiscount);
      return;
    }

    this.#discountList[weekdayDiscount] += this.calculateCategoryDiscount('dessert', NUMBER.weekdayDiscount);
  }

  calculateCategoryDiscount(category, discountPerItem) {
    return Object.keys(this.#orderedMenu[category])
      .reduce((discount, menuName) => discount + this.#orderedMenu[category][menuName] * discountPerItem, 0);
  }
}

export default MenuCalculation;
