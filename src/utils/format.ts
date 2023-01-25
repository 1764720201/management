import { TIME_FORMAT } from '@/constant'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
export const formatUTC = (utcString: string) => {
  return dayjs
    .utc(utcString)
    .utcOffset(8 * 60)
    .format(TIME_FORMAT)
}
