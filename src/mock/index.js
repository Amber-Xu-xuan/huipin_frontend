//引入mock数据
const Mock = require('mockjs')
Mock.mock('candidate/jobs','get',require('./json/job'))
