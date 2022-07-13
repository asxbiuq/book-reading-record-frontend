import moment from 'moment/min/moment-with-locales'
import { forEach, forIn, isArray } from 'lodash-es'



export const formatTime = (items:Array<item>) => {
  moment.locale('zh-cn')
  forEach(items, (item) => {
    if (item.time){
      item.time = moment(item.time).format('llll')
    }
  })
}
