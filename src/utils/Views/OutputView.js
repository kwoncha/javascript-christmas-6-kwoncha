import { MissionUtils } from '@woowacourse/mission-utils';
import MESSAGE from '../../constants/messages.js';

const OutputView = {
  print(text) {
    MissionUtils.Console.print(text);
  },

  printTotalOrderPrice(price) {
    MissionUtils.Console.print(MESSAGE.amountBeforeDiscount);
    MissionUtils.Console.print(MESSAGE.amountBeforeDiscountPrice(price));
  },
};

export default OutputView;
