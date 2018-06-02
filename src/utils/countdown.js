/* eslint-disable */
class Countdown {
  constructor(options = {}) {
    Object.assign(this, {options})
    this.__init()
  }

  /**
	 * 初始化
	 */
  __init() {
    // this.page = getCurrentPages()[getCurrentPages().length - 1]
    // this.setData = this.page.setData.bind(this.page)
    this.restart(this.options)
  }

  /**
	 * 默认参数
	 */
  setDefaults() {
    return {
      start: new Date(),
      end: '2020-11-11 11:11:11',
      refresh: 1000,
      offset: 0,
      onEnd() {},
      render(date) {}
    }
  }

  /**
	 * 合并参数
	 */
  mergeOptions(options) {
    const defaultOptions = this.setDefaults()

    for (let i in defaultOptions) {
      if (defaultOptions.hasOwnProperty(i)) {
        this.options[i] = typeof options[i] !== `undefined`
          ? options[i]
          : defaultOptions[i]

        if (i === `start` && typeof this.options.start !== `object`) {
          this.options.start = new Date(this.options.start)
        }

        if (i === `end` && typeof this.options.end !== `object`) {
          this.options.end = new Date(this.options.end)
        }

        if (typeof this.options[i] === `function`) {
          this.options[i] = this.options[i].bind(this)
        }
      }
    }
    if (typeof this.options.start !== `object`) {
      this.options.start = new Date(this.options.start)
    }
    if (typeof this.options.end !== `object`) {
      this.options.end = new Date(this.options.end)
    }
  }

  /**
	 * 计算日期差
	 */
  getDiffDate() {
    let temp = 0
    if (Date.now() < this.options.start) {
      // 在时间段之前
      this.options.flag = -1
      temp = this.options.start
    } else if (Date.now() > this.options.start && Date.now() < this.options.end) {
      // 在时间段内
      this.options.flag = 0
      temp = this.options.end
    } else if (Date.now() > this.options.end) {
      // 在时间段之后
      this.options.flag = 1
      temp = 0
    }

    let diff = (temp - Date.now() + this.options.offset) / 1000

    let dateData = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0
    }

    if (diff <= 0) {
      if (this.interval) {
        this.stop()
        this.options.onEnd()
      }
      return dateData
    }

    if (diff >= (365.25 * 86400)) {
      dateData.years = Math.floor(diff / (365.25 * 86400))
      diff -= dateData.years * 365.25 * 86400
    }

    if (diff >= 86400) {
      dateData.days = Math.floor(diff / 86400)
      diff -= dateData.days * 86400
    }

    if (diff >= 3600) {
      dateData.hours = Math.floor(diff / 3600)
      diff -= dateData.hours * 3600
    }

    if (diff >= 60) {
      dateData.min = Math.floor(diff / 60)
      diff -= dateData.min * 60
    }

    dateData.sec = Math.round(diff)

    dateData.millisec = diff % 1 * 1000

    return dateData
  }

  /**
	 * 补零
	 */
  leadingZeros(num, length = 2) {
    num = String(num)
    if (num.length > length)
      return num
    return (Array(length + 1).join(`0`) + num).substr(-length)
  }

  /**
	 * 更新组件
	 */
  update(newDate) {
    this.options.end = typeof (newDate !== `object` ? new Date(newDate) : newDate)
    this.render()
    return this
  }

  /**
	 * 停止倒计时
	 */
  stop() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = !1
    }
    return this
  }

  /**
	 * 渲染组件
	 */
  render() {
    this.options.render(this.getDiffDate())
    return this
  }

  /**
	 * 启动倒计时
	 */
  start() {
    if (this.interval)
      return !1
    this.render()
    if (this.options.refresh) {
      this.interval = setInterval(() => {
        console.log('CD is working:', this.interval)
        this.render()
      }, this.options.refresh)
    }
    return this
  }

  /**
	 * 更新offset
	 */
  updateOffset(offset) {
    this.options.offset = offset
    return this
  }

  /**
	 * 重启倒计时
	 */
  restart(options = {}) {
    this.mergeOptions(options)
    this.interval = !1
    this.start()
    return this
  }
}

export default Countdown
/* eslint-enable */
