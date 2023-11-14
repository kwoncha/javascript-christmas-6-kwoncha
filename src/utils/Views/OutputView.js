import { MissionUtils } from '@woowacourse/mission-utils';
import MESSAGE from '../../constants/messages.js';

const OutputView = {
  print(text) {
    MissionUtils.Console.print(text);
  },

  printOrderMenu(orderedMenuList) {
    MissionUtils.Console.print(MESSAGE.orderMenu);
    orderedMenuList.forEach(menu => {
      const [menuName, menuAmount] = menu;
      MissionUtils.Console.print(MESSAGE.itemizedBill(menuName, menuAmount));
    });
  },

  printTotalOrderPrice(price) {
    MissionUtils.Console.print(MESSAGE.amountBeforeDiscount);
    MissionUtils.Console.print(MESSAGE.amountBeforeDiscountPrice(price));
  },

  printGiftMenu(discountList) {
    MissionUtils.Console.print(MESSAGE.giftMenu);
    if (discountList.champagnePresent !== 0) {
      MissionUtils.Console.print(MESSAGE.giftMenuDtails);
      return;
    }

    MissionUtils.Console.print(MESSAGE.nothing);
  },
};

export default OutputView;
