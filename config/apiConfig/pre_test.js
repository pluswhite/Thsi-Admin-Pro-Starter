/**
 * Default API config.
 */

module.exports = {
  apiBaseUrl: 'http://wx.hf.vamaker.com/index.php/api/v1',
  tokenName: 'vra-token',
  apiList: {
    auth: {
      register: 'auth/register.json',
      login: 'admin/login',
      validateToken: 'admin/token',
      modifyPsw: 'admin/update-password',
      resetPsw: 'auth/reset_password.json'
    },
    common: {
      upload_files: 'common/upload_files.json',
      search_user: 'user/search-user'
    },
    me: {
      profile: 'admin/info',
      message: 'user/get-notes'
    },
    dash: {
      // index: 'dash/dash.json',
      // 四个方块
      fetchOverview: 'dash/statistics',
      // 用户统计
      fetchUser: 'dash/get-user-statistics',
      // 销售统计
      fetchSales: 'dash/get-sales-statistics',
      // 订单销售地域统计
      fetchSalesRegion: 'dash/get-geo-sales-statistics',
      // 热销商品TOP10排名
      fetchHotGoods: 'dash/get-hot-goods',
      // 销售商品类别占比
      fetchHotcategory: 'dash/get-hot-categories',
      // 热门搜索
      fetchHotSearch: 'dash/get-hot-search',
      // 热门分享
      fetchHotShare: 'dash/get-hot-share'
    },
    account: {
      index: 'admin/list',
      changeStatus: 'admin/set-status',
      new: 'admin/add',
      edit: 'admin/edit',
      accountInfo: 'admin/role-list',
      checkEmailUnique: 'admin/check-email',
      resetPsw: 'admin/reset-password'
    },
    role: {
      index: 'role/list',
      new: 'role/add',
      edit: 'role/edit',
      roleInfo: 'role/item',
      rolePermission: 'role/info'
    },
    user: {
      index: 'wx-user/list',
      edit: 'wx-user/edit',
      userInfo: 'wx-user/info',
      changeStatus: 'wx-user/set-status',
      changeType: 'wx-user/set-type',
      userAssets: 'wx-user/user-assets',
      updateUserAssets: 'wx-user/update-assets',
    },
    products: {
      categoryList: 'cps-goods/get-category',
      CPSProductList: 'cps-goods/get',
      CPSProductLink: 'cps-goods/get-share-links',
      postCPSLinkChange: 'cps-goods/update-share-links',
      postNewCPSProduct: '/file/add',

      // cpc买方列表
      CPCListInfo: 'cpc-goods/get-dim',
      CPCBuyerList: 'cpc-goods/get-buyers',
      CPCProductList: 'cpc-goods/get',
      // 编辑cpc的post请求
      updateCPCProduct: 'cpc-goods/update',
      // 添加cpc的post请求
      addCPCProduct: 'cpc-goods/add',

      // cpd目录，与cps目录结构结构一致，范围可只返回默认
      CPDCategoryList: 'cpd-goods/get-category',
      CPDProductList: 'cpd-goods/get',
      // 编辑cpd的post请求
      updateCPDProduct: 'cpd-goods/update',
      // 添加cpd的post请求
      addCPDProduct: 'cpd-goods/add',
      // 上传cpd图片地址
      uploadCPDProductImg: '/file/cpd-add',

      // 2017-12-19
      // 商品status修改
      updateCPSStatus: 'cps-goods/update-status',
      updateCPCStatus: 'cpc-goods/update-status',
      updateCPDStatus: 'cpd-goods/update-status',

      promoteProductList: 'promote/get',
      promoteProductInfo: 'promote/info',
      addPromoteProduct: 'promote/add',
      updatePromoteProduct: 'promote/update',
      updatePromoteProductStatus: 'promote/update-status',
      promoteDisplay: 'promote/display',
      promoteDisplayDetail: 'promote/display-detail',
      uploadPromoteProductImg: '/file/cpd-add',

      // 活动列表
      activityType: 'active/template',
      activityTypeInfo: 'active/template-content',
      activityList: 'active/get',
      addActivity: 'active/add',
      activityInfo: 'active/info',
      updateActivity: 'active/edit',
      updateActivityStatus: 'active/change-status',
      actReport: 'active/data-report',

      // 模板列表
      templateList: 'template/get',
      updateTemplateStatus: 'template/change-status',
      templateInfo: 'template/info',
    },
    publish: {
      index: 'publish/get',
      new: 'publish/add',
      edit: 'publish/update',
      publishInfo: 'publish/get-info',
      changeStatus: 'publish/change-status',
      publishGoods: 'publish/get-goods',
      publishUsers: 'publish/get-ops',
      changeType: 'publish/change-bw-list',
      publishTags: 'publish/get-tag',
      publishBindInfos: 'publish/get-attachments'
    },
    tag: {
      index: 'tag/list',
      changeStatus: 'tag/status',
      new: 'tag/add',
      edit: 'tag/edit',
      updateUsers: 'tag/bind-user',
      tagInfo: 'tag/info',
      tagUsers: 'tag/search-user',
      bindUsers: 'tag/bind-list'
    },
    reports: {
      index: 'reports/report_list.json',
      provinceList: 'report/get-province-list',
      cityList: 'report/get-city-list',
      plateformList: 'report/get-platform',
      user: 'report/get-user-report',
      order: 'report/get-order-report',
      orderTypeList: 'report/get-order-type-list'
    },
    order: {
      index: 'order/list',
      info: 'order/info',
      audit: 'order/audit',
      categoryList: 'order/category',
      calculateCoupon: 'order/cal-coupon',
      publisher: 'order/search-active',
      goodsRebate: 'order/rebate',
      opLogs: 'order/op-logs',
      uploadAccountTransferImg: '/file/add',
      edit: 'order/edit'
    }
  }
}
