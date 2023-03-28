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
const Counter = sequelize.define("Counter", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  gmt_created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Date.now()
  },
  gmt_modified: {
    type: DataTypes.TIME,
    allowNull: false,
    defaultValue: Date.now()
  }
}, {
  timestamps: false
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
