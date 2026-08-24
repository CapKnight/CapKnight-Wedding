Page({
  data: {
    // 相册照片列表
    // 添加/替换照片：把图片放到 images/album/ 下，然后在这里加一行即可
    photos: [
      { url: '/images/album/1.jpg' },
      { url: '/images/album/2.jpg' },
      { url: '/images/album/3.jpg' },
      { url: '/images/album/4.jpg' },
      { url: '/images/album/5.jpg' }
    ],
    current: 0
  },

  // swiper 切换
  onChange(e) {
    this.setData({ current: e.detail.current })
  },

  // 点击单张照片 → 调起微信全屏预览
  onPreview(e) {
    const urls = this.data.photos.map(p => p.url)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    })
  },

  // 保存图片到相册
  onSave(e) {
    const url = e.currentTarget.dataset.url
    wx.showLoading({ title: '下载中...' })
    wx.downloadFile({
      url,
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            wx.showToast({ title: '已保存到相册', icon: 'success' })
          },
          fail: (err) => {
            if (err.errMsg.indexOf('auth deny') !== -1) {
              wx.showModal({
                title: '提示',
                content: '需要相册权限才能保存图片，请在设置中开启',
                confirmText: '去设置',
                success: (r) => {
                  if (r.confirm) wx.openSetting()
                }
              })
            } else {
              wx.showToast({ title: '保存失败', icon: 'none' })
            }
          },
          complete: () => wx.hideLoading()
        })
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({ title: '下载失败', icon: 'none' })
      }
    })
  }
})
