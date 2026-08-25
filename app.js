/**
 * 婚礼请柬小程序 - 全局配置
 *
 * ============= 使用说明 =============
 * 一、修改下面的 globalData 为你自己的信息
 *    - 新人姓名、婚礼日期、地点名称、地址
 *    - 经纬度：在腾讯地图 (https://lbs.qq.com/getPoint/) 拾取后填入
 *
 * 二、替换照片（必须，否则页面会显示空白占位框）
 *    放在 images/photo/ 下，保持文件名：
 *    images/photo/02.jpg  - page0 大图（建议竖版）
 *    images/photo/03.jpg  - 新郎圆形头像
 *    images/photo/04.jpg  - 新娘圆形头像
 *    images/photo/05.jpg  - 电影胶片横幅
 *    images/photo/08.jpg  - 地点节双照片（右）
 *    images/photo/09.jpg  - 地点节双照片（左）
 *    images/photo/10.jpg  - eTips 节照片
 *
 * 三、分享封面图
 *    images/cover.jpg - 转发到好友/朋友圈时显示的封面图
 *
 * 四、images/static/ 目录是静态装饰图，无需改动
 *    （包含 l1.png、l2.png、ls.png、flim.png、nav.png）
 *
 * 五、用微信开发者工具打开
 *    1. 打开微信开发者工具 → 导入项目
 *    2. 项目目录选择本 mp-native 文件夹
 *    3. AppID 选择"测试号"（开发期），或填入你的个人小程序 AppID
 *
 * 六、上架流程（个人小程序）
 *    1. 在 https://mp.weixin.qq.com 注册"小程序"账号（个人主体免费）
 *    2. 在后台 → 开发 → 开发管理 → 开发设置 拿到 AppID
 *    3. 把 AppID 填到 project.config.json 的 appid 字段（替换 "touristappid"）
 *    4. 在开发者工具点"上传" → 填写版本号
 *    5. 在公众平台后台 → 版本管理 → 提交审核
 *    6. 审核通过后 → 发布
 *
 * 注意：小程序主包大小限制 2MB
 *      建议每张照片压缩到 200KB 以内
 */
App({
  onLaunch() {
    // 小程序启动时执行
  },
  globalData: {
    // ===== 新人信息（首页 topTitle 右上姓名 + 时间 + page2 邀请人）=====
    groomName: '李雨晨',
    brideName: '冯雅雪',
    weddingDate: '2026年9月26日',
    weddingLunar: '农历：八月十六（星期六）',
    // 婚礼仪式时间（用于首页倒计时，格式：'YYYY-MM-DD HH:mm:ss'）
    // 婚礼当天 0 点开始进入"今天我们结婚啦"状态，仪式时间到后进入"已经结婚啦"状态
    ceremonyDateTime: '2026-09-26 12:30:00',

    // ===== 婚礼地点（eAddr 节 与 独立 location 页共用）=====
    venueName: '食神酒店',
    venueHall: '三楼',
    venueAddress: '河南省南阳市卧龙区张衡街道仲景大道辅路长安1号写字楼',
    // 经纬度：到 https://lbs.qq.com/getPoint/ 拾取后填入（前纬后经）
    latitude: 33.020855,
    longitude: 112.554214,
  }
})
