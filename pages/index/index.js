const app = getApp()

/**
 * 首页 index：按原 uni-app 项目纵向单页结构，1:1 还原
 * 顺序：topTitle → page0 → page1 → page2 → eAddr → eTips → end
 */
Page({
  data: {
    // ===== 新人信息（来自 app.js globalData）=====
    groomName: '李雨晨',
    brideName: '冯雅雪',
    // 顶部右下角竖排三行：年 / 月 / 日
    dateDotted: ['2026年', '9月', '26日'],
    venueName: '',
    venueHall: '',
    venueAddress: '',
    latitude: 0,
    longitude: 0,

    // ===== 时间地点文字 =====
    timeText: '',
    tips: '（点击下面图标可导航至这个位置，不迷路）',

    // ===== eTips 婚礼提示 =====
    tipItems: [
      {
        title: '关于住宿',
        content: '外地的朋友们请提前告知，我们会为您安排好住宿！'
      },
      {
        title: '关于出行',
        content: '地图搜索食神(仲景路店)或点击上方导航，按指示到达即可。自驾车辆停入停车场，离开时在前台报车牌号，可享免费停车。'
      },
      {
        title: '关于照片',
        content: '如果大家当天拍了新郎新娘的照片，麻烦p的美一点，也希望您分享给新郎新娘，谢谢啦~'
      }
    ],

    // ===== 倒计时 =====
    countdownStatus: 'before',  // before | today | after
    cdDays: 0,
    cdHours: 0,
    cdMinutes: 0,
    cdSeconds: 0
  },

  // 倒计时定时器引用
  _cdTimer: null,

  onLoad() {
    const g = app.globalData
    // 解析 weddingDate（如 "2026年9月26日"）→ ['2026年','9月','26日']
    const wd = g.weddingDate || '2026年9月26日'
    const yearMatch = wd.match(/(\d+)年/)
    const monthMatch = wd.match(/(\d+)月/)
    const dayMatch = wd.match(/(\d+)日/)
    const dateDotted = [
      yearMatch ? yearMatch[1] + '年' : '2026年',
      monthMatch ? monthMatch[1] + '月' : '9月',
      dayMatch ? dayMatch[1] + '日' : '26日'
    ]
    this.setData({
      groomName: g.groomName,
      brideName: g.brideName,
      dateDotted: dateDotted,
      venueName: g.venueName || '食神(仲景路店)',
      venueHall: g.venueHall || '三楼',
      venueAddress: g.venueAddress || '',
      latitude: g.latitude,
      longitude: g.longitude,
      timeText: (g.weddingDate || '2026年9月26日') + '\n' + (g.weddingLunar || '农历：八月十六（星期六）')
    })

    // 启动倒计时
    this._ceremonyTime = new Date(g.ceremonyDateTime || '2026-09-26 11:30:00').getTime()
    this._updateCountdown()
    this._cdTimer = setInterval(() => {
      this._updateCountdown()
    }, 1000)
  },

  onUnload() {
    if (this._cdTimer) {
      clearInterval(this._cdTimer)
      this._cdTimer = null
    }
  },

  // 更新倒计时显示
  _updateCountdown() {
    const now = Date.now()
    const ceremony = this._ceremonyTime
    // 婚礼当天 0 点的时间戳
    const ceremonyDayStart = new Date(new Date(ceremony).setHours(0, 0, 0, 0)).getTime()

    let status, diff
    if (now < ceremonyDayStart) {
      // 婚礼前：倒计时到婚礼当天 0 点
      status = 'before'
      diff = ceremonyDayStart - now
    } else if (now < ceremony) {
      // 婚礼当天，仪式未开始：从 0 点开始正计
      status = 'today'
      diff = now - ceremonyDayStart
    } else {
      // 仪式已开始/结束
      this.setData({ countdownStatus: 'after' })
      if (this._cdTimer) {
        clearInterval(this._cdTimer)
        this._cdTimer = null
      }
      return
    }

    const totalSeconds = Math.floor(diff / 1000)
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    this.setData({
      countdownStatus: status,
      cdDays: days,
      cdHours: hours,
      cdMinutes: minutes,
      cdSeconds: seconds
    })
  },

  // 导航
  onNavigate() {
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: this.data.venueName,
      address: this.data.venueAddress || this.data.venueName + ' ' + this.data.venueHall
    })
  },

  // 跳转地点页
  goLocation() {
    wx.navigateTo({ url: '/pages/location/location' })
  },

  // 保存照片 / 滚动到底部
  scrollToAddr() {
    const q = wx.createSelectorQuery()
    q.select('#addr').boundingClientRect()
    q.selectViewport().scrollOffset()
    q.exec((res) => {
      if (res && res[0] && res[1]) {
        wx.pageScrollTo({
          scrollTop: res[0].top + res[1].scrollTop - 60,
          duration: 300
        })
      }
    })
  },

  // 分享
  onShareAppMessage() {
    return {
      title: `诚邀您参加${this.data.groomName}和${this.data.brideName}的婚礼`,
      path: '/pages/index/index',
      imageUrl: '/images/cover.jpg'
    }
  },
  onShareTimeline() {
    return {
      title: `诚邀您参加${this.data.groomName}和${this.data.brideName}的婚礼`,
      imageUrl: '/images/cover.jpg'
    }
  }
})
