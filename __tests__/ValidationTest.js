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

  test('comma가 포함된 문자열인지 확인하는 함수 테스트', () => {
    const expected = [true, false];
    const strings = ['1,2', '123'];

    strings.forEach((string, index) => {
      expect(validation.isIncludedComma(string)).toBe(expected[index]);
    });
  });

  test('12월 날짜가 맞는지 확인하는 함수 테스트', () => {
    const expected = [true, false];
    const strings = ['1', '123'];

    strings.forEach((date, index) => {
      expect(validation.isValidDateType(date)).toBe(expected[index]);
    });
  });

  test('주문 형식이 맞는지 확인하는 함수 테스트', () => {
    const expected = [true, false, false];
    const strings = ['아이스트-2', '123', 'asdf-3'];

    strings.forEach((menu, index) => {
      expect(validation.isValidMenuType(menu)).toBe(expected[index]);
    });
  });
});
