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
    dateDotted: '2026 . 9 . 26',  // 2023 . 8 . 6 格式，用于顶部右下角
    venueName: '',
    venueHall: '',
    venueAddress: '',
    latitude: 0,
    longitude: 0,
    groomPhone: '',
    bridePhone: '',

    // ===== 时间地点文字 =====
    timeText: '',
    tips: '（点击下面图标可导航至这个位置，不迷路）',
    blessing: '一辈子很长 恰到好处的喜欢就是最好\n我很欢喜和你一起\n"始于初见 陷于陪伴 终于白首"',

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
        title: '特别提醒',
        content: '如果大家当天拍了新郎新娘的照片，麻烦p的美一点，谢谢啦~'
      }
    ],
    ending: '以前觉得婚礼是一则官方通告\n现在才明白这是一场\n人生中为数不多的相聚\n是千里之外的奔赴\n是不计得失的支持\n好久不见，我们婚礼见!'
  },

  onLoad() {
    const g = app.globalData
    const dateDotted = (g.weddingDate || '').replace(/年|月|日/g, ' . ').replace(/\s*12时08分.*/, '').trim()
    this.setData({
      groomName: g.groomName,
      brideName: g.brideName,
      dateDotted: dateDotted || '2026 . 9 . 26',
      venueName: g.venueName || '食神(仲景路店)',
      venueHall: g.venueHall || '三楼',
      venueAddress: g.venueAddress || '',
      latitude: g.latitude,
      longitude: g.longitude,
      groomPhone: g.groomPhone,
      bridePhone: g.bridePhone,
      timeText: (g.weddingDate || '2026年9月26日') + '\n' + (g.weddingLunar || '农历：八月十六（星期六）')
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

  // 跳转相册
  goAlbum() {
    wx.navigateTo({ url: '/pages/album/album' })
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

  callGroom() {
    if (!this.data.groomPhone) return
    wx.makePhoneCall({ phoneNumber: this.data.groomPhone })
  },
  callBride() {
    if (!this.data.bridePhone) return
    wx.makePhoneCall({ phoneNumber: this.data.bridePhone })
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
