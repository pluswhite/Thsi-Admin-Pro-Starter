/**
 * User list mocks
 */

let Mock = require('mockjs')
let Random = Mock.Random
let ROW_NUM = 50

let data = []

for (let i = 0; i < ROW_NUM; i++) {
  data.push(Mock.mock({
    'id': Random.id(),
    'avatar': Random.image('64x64'),
    'nickname': Random.name(),
    'sex|1': ['0', '1', '2'],
    'location': Random.city(true),
    'country|1': ['中国', '海外', '月球'],
    'status|1': ['0', '1', '2'],
    'last_login_at': Random.datetime()
  }))
}

console.log(data)

module.exports = data
