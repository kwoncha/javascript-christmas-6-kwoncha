import { MissionUtils } from '@woowacourse/mission-utils';

const InputView = {
  async readLineAsync(text) {
    const inputdata = await MissionUtils.Console.readLineAsync(text);

    return inputdata;
  },
};

export default InputView;
