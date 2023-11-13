import deepFreeze from '../utils/deepFreeze/deepFreeze.js';

const PREFIX = '[ERROR]';

const MESSAGE = deepFreeze({
  introMessage: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  visitDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  menuOrderQuestion:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
  benefitList: date => `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  orderMenu: '<주문 메뉴>',
  amountBeforeDiscount: '<할인 전 총주문 금액>',
  giftMenu: '<증정 메뉴>',
  benifitDetails: '<혜택 내역>',
  totalBenefitAmount: '<총혜택 금액>',
  amountAfterDiscount: '<할인 후 예상 결제 금액>',
  eventBadge: '<12월 이벤트 배지>',
  ERROR: {
    notValidDate: `${PREFIX} 정확한 날짜를 입력해주세요.`,
    notValidMenuInput: `${PREFIX} 메뉴와 수량을 정확히 입력해주세요.`,
    noValidMenuIncluded: `${PREFIX} 메뉴판에 있는 메뉴를 입력해주세요.`,
  },
});

export { MESSAGE };
