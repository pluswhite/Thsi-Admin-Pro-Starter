/**
 * Default API config.
 */

module.exports = {
  apiBaseUrl: 'http://localhost:3466/',
  // apiBaseUrl: 'http://192.168.1.174:3466/',
  tokenName: 'vra-token',
  apiList: {
    auth: {
      register: 'auth/register.json',
      login: 'auth/login.json',
      validateToken: 'auth/validate_token.json',
      modifyPsw: 'auth/modify_password.json',
      resetPsw: 'auth/reset_password.json'
    },
    common: {
      upload_files: 'common/upload_files.json',
      search_user: 'common/search_user.json'
    },
    me: {
      profile: 'me/profile.json',
      message: 'me/message_list.json'
    },
    dash: {
      // index: 'dash/dash.json',
      // 四个方块
      fetchOverview: 'dash/overview.json',
      // 用户统计
      fetchUser: 'dash/user.json',
      // 销售统计
      fetchSales: 'dash/sales.json',
      // 订单销售地域统计
      fetchSalesRegion: 'dash/sales_region.json',
      // 热销商品TOP10排名
      fetchHotGoods: 'dash/hot_goods.json',
      // 销售商品类别占比
      fetchHotcategory: 'dash/hot_category.json',
      // 热门搜索
      fetchHotSearch: 'dash/hot_search.json',
      // 热门分享
      fetchHotShare: 'dash/hot_share.json'
    },
    account: {
      index: 'account/account_list.json',
      changeStatus: 'account/change_status.json',
      new: 'account/update_account.json',
      edit: 'account/update_account.json',
      accountInfo: 'account/account_item.json',
      checkEmailUnique: 'account/email_unique.json',
      resetPsw: 'account/reset_password.json'
    },
    role: {
      index: 'role/role_list.json',
      changeStatus: 'role/change_status.json',
      new: 'role/update_role.json',
      edit: 'role/update_role.json',
      roleInfo: 'role/role_item.json',
      rolePermission: 'role/role_permissions.json'
    },
    user: {
      index: 'user/user_list.json',
      new: 'user/update_user.json',
      edit: 'user/update_user.json',
      userInfo: 'user/user_item.json',
      changeStatus: 'user/change_status.json',
      changeType: 'user/change_type.json',

      userAssets: 'user/get_user_assets.json',
      updateUserAssets: 'user/update_user_assets.json'
    },
    products: {
      categoryList: 'promote/category_list.json',

      // cps
      CPSProductList: 'promote/cps_list.json',
      CPSProductLink: 'promote/cps_link.json',
      postCPSLinkChange: 'promote/post_cps_link_change.json',
      postNewCPSProduct: 'promote/post_new_cps.json',

      // cpc买方列表和创意尺寸
      CPCListInfo: 'promote/cpc_list_info.json',
      CPCProductList: 'promote/cpc_list.json',
      // 编辑cpc的post请求
      updateCPCProduct: 'promote/update_cpc_product.json',
      // 添加cpc的post请求
      addCPCProduct: 'promote/add_cpc_product.json',

      // cpd目录，与cps目录结构结构一致，范围可只返回默认
      CPDCategoryList: 'promote/category_list.json',
      CPDProductList: 'promote/cpd_list.json',
      // 编辑cpd的post请求
      updateCPDProduct: 'promote/update_cpc_product.json',
      // 添加cpd的post请求
      addCPDProduct: 'promote/add_cpc_product.json',
      // 上传cpd图片地址
      uploadCPDProductImg: 'promote/upload_cpd_product_img.json',

      // product 2018-03-08
      promoteProductList: 'promote/promote_product_list.json',
      promoteProductInfo: 'promote/promote_product_info.json',
      addPromoteProduct: 'promote/promote_new_product.json',
      updatePromoteProduct: 'promote/promote_update_product.json',
      updatePromoteProductStatus: 'promote/promote_update_product_status.json',
      promoteDisplay: 'promote/promote_display.json',
      promoteDisplayDetail: 'promote/promote_display_detail.json',
      uploadPromoteProductImg: 'promote/upload_cpd_product_img.json',

      // 2017-12-19
      // 商品status修改
      updateCPSStatus: 'promote/update_cpc_status.json',
      updateCPCStatus: 'promote/update_cpc_status.json',
      updateCPDStatus: 'promote/update_cpc_status.json',

      // 活动列表
      activityType: 'promote/get_activity_type.json',
      activityTypeInfo: 'promote/get_activity_type_info.json',
      activityList: 'promote/get_activity_list.json',
      addActivity: 'promote/add_activity.json',
      activityInfo: 'promote/get_activity_info.json',
      updateActivity: 'promote/update_activity.json',
      updateActivityStatus: 'promote/update_activity_status.json',
      // 活动报表
      actReport: 'promote/get_act_report.json',

      // 模板列表
      templateList: 'promote/get_template_list.json',
      updateTemplateStatus: 'promote/update_template_status.json',
      templateInfo: 'promote/get_template_info.json',

      // 活动来源
      salerList: 'promote/saler_list.json'
    },
    publish: {
      index: 'publish/publish_list.json',
      new: 'publish/update_publish.json',
      edit: 'publish/update_publish.json',
      publishInfo: 'publish/publish_item.json',
      changeStatus: 'publish/change_status.json',
      changeType: 'publish/change_type.json',
      publishGoods: 'publish/publish_goods.json',
      publishUsers: 'publish/publish_users.json',
      publishTags: 'publish/publish_tags.json',
      publishBindInfos: 'publish/publish_bind_infos.json'
    },
    order: {
      index: 'order/order_list.json',
      info: 'order/order_info.json',
      audit: 'order/audit.json',
      categoryList: 'order/category_list.json',
      // 所属发布
      publisher: 'order/publisher.json',
      // 新增优惠券实时计算
      calculateCoupon: 'order/calculateCoupon.json',
      // 单个商品返利
      goodsRebate: 'order/goods_rebate.json',
      opLogs: 'order/order_op_logs.json',

      uploadAccountTransferImg: 'order/upload_account_transfer_img.json',

      edit: 'order/edit.json'
    },
    tag: {
      index: 'tag/tag_list.json',
      changeStatus: 'tag/change_status.json',
      new: 'tag/update_tag.json',
      edit: 'tag/update_tag.json',
      updateUsers: 'tag/update_users.json',
      tagInfo: 'tag/tag_item.json',
      tagUsers: 'tag/tag_users.json',
      bindUsers: 'tag/bind_users.json'
    },
    reports: {
      index: 'reports/report_list.json',
      provinceList: 'reports/get_province_list.json',
      cityList: 'reports/get_city_list.json',
      plateformList: 'reports/get_plateform_list.json',
      user: 'reports/report_user.json',
      order: 'reports/report_order.json',
      orderTypeList: 'reports/get_order_type_list.json'
    }
  }
}
