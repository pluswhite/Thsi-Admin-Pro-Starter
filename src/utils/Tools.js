/**
 * Tools libs
 */

// 判断对象是否为空
export const isObjectOwnEmpty = obj => {
  for (var name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false // 返回false，不为空对象
    }
  }
  return true // 返回true，为空对象
}

// 判断当前账户可用第一个权限
export const chooseRoute = permissions => {
  const {
    api_dashboard,
    api_admin,
    api_wx_user,
    api_products,
    api_publish,
    api_order,
    api_tag,
    api_report,
    api_set
  } = permissions

  let redirectPath = ''

  if (api_dashboard && api_dashboard.has) {
    redirectPath = '/admin/dashboard'
  } else if (api_admin && api_admin.has) {
    redirectPath = '/admin/account'
  } else if (api_wx_user && api_wx_user.has) {
    redirectPath = '/admin/user'
  } else if (api_products && api_products.has) {
    redirectPath = '/admin/product'
  } else if (api_publish && api_publish.has) {
    redirectPath = '/admin/publish'
  } else if (api_order && api_order.has) {
    redirectPath = '/admin/order'
  } else if (api_tag && api_tag.has) {
    redirectPath = '/admin/tag'
  } else if (api_report && api_report.has) {
    redirectPath = '/admin/report'
  } else if (api_set && api_set.has) {
    redirectPath = '/admin/setting'
  }

  return redirectPath
}

// 判断是否PC设备
export const IS_PC = document.documentElement.clientWidth > 400
