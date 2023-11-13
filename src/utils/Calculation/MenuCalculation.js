import { NUMBER, MENU, CALENDAR } from '../../constants/constants.js';

class MenuCalculation {
  #menu = new Map();
  #orderedMenu = {
    appetizer: {
      양송이수프: NUMBER.zero,
      타파스: NUMBER.zero,
      시저샐러드: NUMBER.zero,
    },
    main: {
      티본스테이크: NUMBER.zero,
      바비큐립: NUMBER.zero,
      해산물파스타: NUMBER.zero,
      크리스마스파스타: NUMBER.zero,
    },
    dessert: {
      초코케이크: NUMBER.zero,
      아이스크림: NUMBER.zero,
    },
    drink: {
      제로콜라: NUMBER.zero,
      레드와인: NUMBER.zero,
      샴페인: NUMBER.zero,
    },
  }

  #discountList = {
    dDayDiscount: NUMBER.zero,
    weekDayDiscount: NUMBER.zero,
    weekendDiscount: NUMBER.zero,
    starDiscount: NUMBER.zero,
    champagnePresent: NUMBER.zero,
  }

  #eventBadge;

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
      return total + Object.values(this.#orderedMenu[category]).reduce((subTotal, quantity) => subTotal + quantity, NUMBER.zero);
    }, NUMBER.zero);
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
    let orderedPrice = NUMBER.zero;

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
    }, NUMBER.zero);
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
      .reduce((discount, menuName) => discount + this.#orderedMenu[category][menuName] * discountPerItem, NUMBER.zero);
  }

  applyEventBadge(totalDiscountAmount) {
    if (totalDiscountAmount < NUMBER.star) this.#eventBadge = MESSAGE.nothing;
    if (NUMBER.star <= totalDiscountAmount && totalDiscountAmount < NUMBER.tree) this.#eventBadge = MESSAGE.star;
    if (NUMBER.tree <= totalDiscountAmount && totalDiscountAmount < NUMBER.santa) this.#eventBadge = MESSAGE.tree;
    if (NUMBER.santa <= totalDiscountAmount) this.#eventBadge = MESSAGE.santa;

    return this.#eventBadge;
  }
}

export default MenuCalculation;
