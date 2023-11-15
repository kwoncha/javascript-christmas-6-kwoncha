import { MissionUtils } from '@woowacourse/mission-utils';
import Validation from '../src/utils/Validation/Validation';

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
});
