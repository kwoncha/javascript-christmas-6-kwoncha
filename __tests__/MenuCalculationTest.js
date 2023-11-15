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
});
