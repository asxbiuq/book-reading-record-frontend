import { forEach } from 'lodash-es'
import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.extend(isLeapYear)
dayjs.locale('zh-cn')

export const formatTime = (items: Array<any>) => {
  forEach(items, (item) => {
    try {
      if (item.time) {
        item.time = dayjs().to(item.time)
      }
    } catch (error) {
      throw new Error(`格式化时间出错${item.time}`)
    }
  })
}
