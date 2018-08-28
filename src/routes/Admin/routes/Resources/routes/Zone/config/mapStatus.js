export default status => {
  switch (status) {
    case status:
      return statusList[status]
    default:
      return statusList[0]
  }
}

const statusList = [
  {
    label: '异常',
    value: '0',
    className: 'danger',
    avaliable: []
  },
  {
    label: '未开始',
    value: '1',
    className: 'primary',
    avaliable: [
      // {
      //   label: '执行',
      //   value: '2'
      // }
    ]
  },
  {
    label: '执行中',
    value: '2',
    className: 'success',
    avaliable: [
      {
        label: '暂停',
        value: '4'
      },
      // {
      //   label: '结束',
      //   value: '3'
      // }
    ]
  },
  {
    label: '已结束',
    value: '3',
    className: '',
    avaliable: []
  },
  {
    label: '暂停中',
    value: '4',
    className: 'warning',
    avaliable: [
      {
        label: '执行',
        value: '2'
      },
      // {
      //   label: '结束',
      //   value: '3'
      // }
    ]
  }
]
