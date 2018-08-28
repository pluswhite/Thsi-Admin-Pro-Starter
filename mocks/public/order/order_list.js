/**
 * Order list mocks
 */

let Mock = require('mockjs')
let Random = Mock.Random
let ROW_NUM = 30

let data = []

for (let i = 0; i < ROW_NUM; i++) {
  data.push(Mock.mock({
    'id': Random.guid(),
    'order_id': Random.natural(),
    'order_type|1': ['1', '2', '3', '4'],
    'order_amount': Random.float(1, 10000, 2, 2),
    'time': Random.datetime('yyyy/MM/dd HH:mm'),
    'rebated_amount': Random.float(1, 500, 2, 2),
    'owner': Random.name(),
    'status|1': ['0', '1', '2', '3', '4', '5'],
    'last_modified_at': Random.datetime()
  }))
}

console.log(data)

module.exports = data
