import ChristmasEvent from '../src/ChristmasEvent';

describe('유효값 확인 class 테스트', () => {
  const christmasEvent = new ChristmasEvent();

  test('숫자를 화폐 단위로 바꿔주는 함수 테스트', () => {
    const expected = ['1,000', '20,000'];
    const moneys = [1000, 20000];

    moneys.forEach((money, index) => {
      expect(christmasEvent.formatNumberToCurrency(money)).toBe(expected[index]);
    });
  });
});
