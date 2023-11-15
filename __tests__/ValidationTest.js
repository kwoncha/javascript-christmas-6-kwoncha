import { MissionUtils } from '@woowacourse/mission-utils';
import Validation from '../src/utils/Validation/Validation';
import { MENU } from '../src/constants/constants';

const mockQuestions = inputs => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

describe('유효값 확인 class 테스트', () => {
  const validation = new Validation();

  test.each([[[0]], [[32]], [[36]]])('12월 날짜가 아닐 시 예외 테스트', inputs => {
    mockQuestions(inputs);

    expect(() => validation.isValidDecemberDate(inputs[0])).toThrowError('[ERROR]');
  });

  test.each([[['1100']], [['아sdf-2']], [['asdfbf']]])(
    '정확한 주문 형식이 아닐 시 예외 처리',
    inputs => {
      mockQuestions(inputs);

      expect(() => validation.isValidMenuAndAmount(inputs[0])).toThrowError('[ERROR]');
    },
  );

  test('동일 메뉴가 주문될 시 예외 처리', () => {
    const orderMenuList = [
      ['아이스크림', '아이스크림'],
      ['초코', '초코', '아이스'],
    ];
    const dividedInputMenu = [
      ['아이스크림-2', '아이스크림-1'],
      ['초코-1', '초코-2', '아이스-2'],
    ];

    dividedInputMenu.forEach((list, index) => {
      expect(() => validation.isMenuAlreadyIncluded(list, orderMenuList[index])).toThrowError(
        '[ERROR]',
      );
    });
  });

  test('메뉴판에 없는 메뉴가 주문될 시 예외 처리', () => {
    const orderMenuList = [
      ['아이크림', '아이스크림'],
      ['초코', '초코', '아이스'],
    ];

    orderMenuList.forEach(list => {
      expect(() => validation.isValidMenuIncluded(list, MENU)).toThrowError('[ERROR]');
    });
  });
});
