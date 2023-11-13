import deepFreeze from '../utils/deepFreeze/deepFreeze';

const DEC_DATE = /^(?:[1-9]|[12]\d|3[01])$/;

const ORDERED_MENU = /^[가-힣a-zA-Z\s]+-\d+$/;

const NUMBER = deepFreeze({
  menuName: 0,
  menuAmount: 1,
  thousandDiscount: 1000,
  dDayDiscount: 100,
  weekdayDiscount: 2023,
  weekendDiscount: 2023,
});

const MENU = deepFreeze({
  appetizer: {
    양송이수프: 6000,
    타파스: 5500,
    시저샐러드: 8000,
  },
  main: {
    티본스테이크: 55000,
    바비큐립: 54000,
    해산물파스타: 35000,
    크리스마스파스타: 25000,
  },
  dessert: {
    초코케이크: 15000,
    아이스크림: 5000,
  },
  drink: {
    제로콜라: 3000,
    레드와인: 60000,
    샴페인: 25000,
  },
});

export { DEC_DATE, MENU, ORDERED_MENU, NUMBER };
