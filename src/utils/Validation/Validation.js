import { DEC_DATE, ORDERED_MENU, MENU } from '../../constants/constants.js';
import { MESSAGE } from '../../constants/messages.js';

class Validation {
  isValidDecemberDate(date) {
    if (!this.isValidDateType(date)) throw new Error(MESSAGE.ERROR.notValidDate);
  }

  isValidDateType(date) {
    return DEC_DATE.test(date);
  }
}

export default Validation;
