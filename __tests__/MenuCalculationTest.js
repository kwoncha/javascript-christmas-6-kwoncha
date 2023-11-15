import MenuCalculation from '../src/utils/Calculation/MenuCalculation';

describe('이벤트 관련 계산 class 테스트', () => {
  const menuCalculation = new MenuCalculation();

  test('getdivideMenuOrders 동작 테스트', () => {
    const expected = [['아이스크림-1'], ['아이스크림-1', '초코케이크-2']];

    const inputMenus = ['아이스크림-1', '아이스크림-1,초코케이크-2'];

    inputMenus.forEach((order, index) => {
      expect(menuCalculation.getdivideMenuOrders(order)).toEqual(expected[index]);
    });
  });

  test('checkSingleMenuOrder 동작 테스트', () => {
    const expected = [['아이스크림-1'], ['아이스크림-1', '초코케이크-2']];

    const inputMenus = [['아이스크림-1'], ['아이스크림-1', '초코케이크-2']];

    inputMenus.forEach((order, index) => {
      expect(menuCalculation.checkSingleMenuOrder(order)).toEqual(expected[index]);
    });
  });

  test('applyEventBadge 동작 테스트', () => {
    const expected = ['산타', '트리', '별'];

    const discountAmounts = [30000, 12000, 6000];

    discountAmounts.forEach((discountAmount, index) => {
      const eventBadge = menuCalculation.applyEventBadge(discountAmount);

      expect(eventBadge).toBe(expected[index]);
    });
  });

  test('총 주문 금액 계산하는 동작 테스트', () => {
    const expected = [1000, 20000];
    const amounts = [1000, 22000];
    const discountAmounts = [0, 2000];

    amounts.forEach((amount, index) => {
      const totalAmount = menuCalculation.calculateTotalAmount(amount, discountAmounts[index]);

      expect(totalAmount).toBe(expected[index]);
    });
  });
});
