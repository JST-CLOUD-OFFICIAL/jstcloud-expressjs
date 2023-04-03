const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const {
  db_addr, // 数据库地址
  db_name, // 数据库名称
  db_user, // 数据库用户名
  db_pass  // 数据库密码
} = process.env

const port = 3306;
const type = "mysql"

// 定义数据库对象
const sequelize = new Sequelize(db_name, db_user, db_pass, {
  db_addr,
  port,
  dialect: type,
  timezone: "+08:00"
});

// 定义数据模型
const Counter = sequelize.define("counter", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  gmt_created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW')
  },
  gmt_modified: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW')
  }
}, {
  tableName: 'counter', // 将表名设置为 "counter"
  timestamps: false
});

// 在每次更新前自动更新 gmt_modified 字段
Counter.beforeUpdate((counter) => {
  counter.gmt_modified = Sequelize.fn('NOW');
});

// 数据库初始化方法
async function init() {
  await Counter.sync({ alter: true });
}

// 导出初始化方法和模型
module.exports = {
  init,
  Counter,
};
