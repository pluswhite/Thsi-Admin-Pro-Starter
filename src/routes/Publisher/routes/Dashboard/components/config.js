export const type = {
  overview: {
    title: '',
    api: 'fetchOverview',
    data: 'overview'
  },
  user: {
    title: '用户统计',
    api: 'fetchUser',
    data: 'user',
    icon: require('../assets/imgs/yonghu_tj.png')
  },
  sales: {
    title: '销售统计',
    api: 'fetchSales',
    data: 'sales',
    icon: require('../assets/imgs/xiaoshou.png')
  },
  sales_region: {
    title: '订单销售地域统计',
    api: 'fetchSalesRegion',
    data: 'salesRegion',
    icon: require('../assets/imgs/diyu.png')
  },
  hot_goods: {
    title: '热销商品TOP10排名',
    api: 'fetchHotGoods',
    data: 'hotGoods',
    icon: require('../assets/imgs/rexiao.png')
  },
  hot_category: {
    title: '销售商品类别占比',
    api: 'fetchHotcategory',
    data: 'hotCategory',
    icon: require('../assets/imgs/leibie.png')
  },
  hot_search: {
    title: '热门搜索',
    api: 'fetchHotSearch',
    data: 'hotSearch',
    icon: require('../assets/imgs/resou.png')
  },
  hot_share: {
    title: '热门分享',
    api: 'fetchHotShare',
    data: 'hotShare',
    icon: require('../assets/imgs/refen.png')
  }
}

export const blockIcon = [
  require('../assets/imgs/yonghu.png'),
  require('../assets/imgs/dingdan.png'),
  require('../assets/imgs/fangwen.png'),
  require('../assets/imgs/fenxiang.png')
]
