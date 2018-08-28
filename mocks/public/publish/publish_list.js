/**
 * Publish list mocks
 */

let Mock = require('mockjs')
let Random = Mock.Random
let ROW_NUM = 30

let data = []

for (let i = 0; i < ROW_NUM; i++) {
  data.push(Mock.mock({
    'id': Random.id(),
    'publish_name': Random.csentence(),
    'user_count': Random.integer(1, 100),
    'goods_count': Random.integer(1, 100),
    'date_range': Random.datetime('yyyy/MM/dd HH:mm') + ' ~ ' + Random.datetime('yyyy/MM/dd HH:mm'),
    'publisher|1': ['OPERATOR', 'ADMIN', 'ROOT'],
    'user_list_type|1': ['0', '1', '2'],
    'status|1': ['0', '1', '2', '3', '4'],
    'last_modified_at': Random.datetime()
  }))
}

console.log(data)

module.exports = data
