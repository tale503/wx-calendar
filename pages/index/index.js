const app = getApp()

Page({
  data: {
    extraData: [
      {date: '2020-6-3', value: '签到', dot: true, active: true},
      {date: '2020-6-5', value: '未签到', dot: true, active: false},
    ]
  },
  onLoad: function () {

  },
  onCalendar(e) {
    console.log(e, 'tale---')
  }
})
