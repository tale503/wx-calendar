Component({
  options: {
    multipleSlots: true
  },
  properties: {
    time: {
      type: Object,
      value: {
        year: 2020,
        month: 5
      }
    },
    extraData: {
      type: Array,
      value: []
    },
    showText: {
      type: Boolean,
      value: true
    },
    showDot: {
      type: Boolean,
      value: true
    }
  },
  data: {
    value: new Date(),
    weeks: ['日', '一', '二', '三', '四', '五', '六'],
    click_time: {},
    visibleDaysArr: []
  },
  lifetimes: {
    attached() {
      this.visibleDays();
    }
  },
  methods: {
    getYearMonthDay(date) {
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      return {
        year,
        month,
        day
      }
    },
    getDate(year, month, day){
      return new Date(year, month, day)
    },
    visibleDays() { // 计算当月展示日期
      let {time: {year, month}, extraData, click_time} = this.data;
      let currentFirstDay = this.getDate(year, month, 1);
      let week = currentFirstDay.getDay();
      let startDay = currentFirstDay - week * 60 * 60 * 1000 * 24;
      let arr = [];
      for(let i = 0; i < 42; i++) {
        let day = new Date(startDay + i * 60 * 60 * 1000 * 24);
        let {year: dayY, month: dayM, day: dayD} = this.getYearMonthDay(day);
        let data = {};
        for (let item of extraData) {
          let dateString = item.date;
          let dateArr = dateString.indexOf('-') !== -1
            ? dateString.split('-')
            : dateString.indexOf('/') !== -1
              ? dateString.split('/')
              : [];
          if (dateArr.length === 3
            && Number(dateArr[0]) === Number(dayY)
            && Number(dateArr[1]) === (Number(dayM) + 1)
            && Number(dateArr[2]) === Number(dayD)) {
            data = item
          }
        }
        let obj = {
          isToday: this.isToday(day),
          selected: this.isClick(day),
          isCur: this.isCurrentMonth(day),
          day: day.getDate(),
          date: day.toDateString(),
          data
        }
        arr.push(obj)
      }
      this.setData({
        visibleDaysArr: arr
      })
    },
    isCurrentMonth(date) { // 是否当月
      let {time} = this.data;
      let {year, month} = this.getYearMonthDay(this.getDate(time.year, time.month, 1));
      let {year: y, month:m} = this.getYearMonthDay(date);
      return year === y && month === m;
    },
    isToday(date) { // 是否当天
      let {year, month, day} = this.getYearMonthDay(new Date());
      let {year: y, month: m, day: d} = this.getYearMonthDay(date);
      return year === y && month === m && day === d;
    },
    isClick(date) { // 是否是点击日期
      let {click_time} = this.data;
      if (!click_time.day) return false;
      let {year, month, day} = this.getYearMonthDay(this.getDate(click_time.year, click_time.month, click_time.day));
      let {year: y, month: m, day: d} = this.getYearMonthDay(date);
      return year === y && month === m && day === d;
    },
    clickDate(e) { // 点击日期
      let date = e.currentTarget.dataset.date;
      let {year, month, day} = this.getYearMonthDay(new Date(date));
      this.setData({
        click_time: {year, month, day}
      }, () => {
        this.visibleDays();
        this.triggerEvent('myevent', {year, month, day})
      });
    },
    prevMonth() { // 上一月
      let { time: { year, month} } = this.data;
      let d = this.getDate(year, month, 1);
      d.setMonth(d.getMonth() - 1);
      this.setData({
        time: this.getYearMonthDay(d),
        click_time: {}
      }, () => this.visibleDays());
    },
    nextMonth() { // 下一月
      // 获取当前的年月的日期
      let { time: { year, month} } = this.data;
      let d = this.getDate(year, month, 1);
      d.setMonth(d.getMonth() + 1);
      this.setData({
        time: this.getYearMonthDay(d),
        click_time: {}
      }, () => this.visibleDays());
    },
    monthChange(e) {
      let {value} = e.detail;
      let timeArr = value.split('-');
      this.setData({
        time: {year: timeArr[0], month: timeArr[1] - 1, day: 1}
      }, () => this.visibleDays());
    }
  }
})
