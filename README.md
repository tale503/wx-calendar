# wx-calendar
微信小程序日历组件
### 使用
```
<v-calendar name="calendar" bindmyevent="onCalendar" extraData="{{extraData}}"></v-calendar>
```
```
{
  "usingComponents": {
    "v-calendar": "../../components/calendar"
  }
}
```
```
const app = getApp()

Page({
  data: {
    extraData: [ // 传入参数
      {date: '2020-6-3', value: '签到', dot: true, active: true},
      {date: '2020-6-5', value: '未签到', dot: true, active: false},
    ]
  },
  onLoad: function () {

  },
  onCalendar(e) { // 单击日期返回参数
    console.log(e, 'tale---')
  }
})
```
