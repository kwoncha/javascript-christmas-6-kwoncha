import deepFreeze from '../utils/deepFreeze/deepFreeze.js';

const PREFIX = '[ERROR]';

const MESSAGE = deepFreeze({
  introMessage: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  visitDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  menuOrderQuestion:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
  benefitList: date => `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  orderMenu: '\n<주문 메뉴>',
  itemizedBill: (menu, amount) => `${menu} ${amount}개`,
  amountBeforeDiscount: '\n<할인 전 총주문 금액>',
  amountBeforeDiscountPrice: price => `${price}원`,
  giftMenu: '\n<증정 메뉴>',
  giftMenuDtails: `샴페인 1개`,
  benefitDetails: '\n<혜택 내역>',
  benefitDetailsDescription: (benefit, amount) => `${benefit}: -${amount}원`,
  totalBenefitAmount: '\n<총혜택 금액>',
  totalBenefitAmountInfo: benefit => `-${benefit}원`,
  noBenefit: '0원',
  amountAfterDiscount: '\n<할인 후 예상 결제 금액>',
  amountAfterDiscountDetails: amount => `${amount}원`,
  eventBadge: '\n<12월 이벤트 배지>',
  nothing: '없음',
  santa: '산타',
  tree: '트리',
  star: '별',
  ERROR: {
    notValidDate: `${PREFIX} 유효하지 않은 날짜입니다. 다시 입력해 주세요.`,
    notValidMenuInput: `${PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
    drinksOnlyOrder: `${PREFIX} 음료만 주문 할 수 없습니다.`,
    tooManyItems: `${PREFIX} 최대 20개만 주문 할 수 있습니다.`,
    noItemsOrdered: `${PREFIX} 최소 1개이상 주문해주세요.`,
  },
});

export default MESSAGE;
