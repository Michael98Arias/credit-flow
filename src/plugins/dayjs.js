import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/es';
import 'dayjs/locale/en';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale('es');

export default {
  install (app) {
    app.config.globalProperties.$dayjs = dayjs;
  },
};

export { dayjs };
