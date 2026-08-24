const app = getApp()

Page({
  data: {
    venueName: '',
    venueHall: '',
    venueAddress: '',
    latitude: 0,
    longitude: 0,
    markers: [],
    groomPhone: '',
    bridePhone: ''
  },

  onLoad() {
    const g = app.globalData
    this.setData({
      venueName: g.venueName,
      venueHall: g.venueHall,
      venueAddress: g.venueAddress,
      latitude: g.latitude,
      longitude: g.longitude,
      groomPhone: g.groomPhone,
      bridePhone: g.bridePhone,
      markers: [{
        id: 1,
        latitude: g.latitude,
        longitude: g.longitude,
        title: g.venueName,
        width: 30,
        height: 30
      }]
    })
  },

  // 调起微信内置地图，支持选择高德/百度/腾讯地图导航
  onNavigate() {
    const { latitude, longitude, venueName, venueAddress } = this.data
    wx.openLocation({
      latitude,
      longitude,
      name: venueName,
      address: venueAddress,
      scale: 18,
      fail: () => {
        wx.showToast({ title: '调起地图失败', icon: 'none' })
      }
    })
  },

  // 复制地址
  onCopy() {
    wx.setClipboardData({
      data: `${this.data.venueName} ${this.data.venueAddress}`,
      success: () => {
        wx.showToast({ title: '地址已复制', icon: 'success' })
      }
    })
  },

  // 拨打电话
  callGroom() {
    if (!this.data.groomPhone) return
    wx.makePhoneCall({ phoneNumber: this.data.groomPhone })
  },

  callBride() {
    if (!this.data.bridePhone) return
    wx.makePhoneCall({ phoneNumber: this.data.bridePhone })
  }
})
