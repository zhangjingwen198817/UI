//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var DB = require('../sources/database_s_cfg.js');
var DB_cfg = mockData_global.DB_cfg;
var DB_add_mysql_instance_backUp = DB_cfg.DB_add_mysql_instance_backUp;


var caseName='DB_reset_Slave_Mysql_instance';


casper.test.begin('DB reset Slave Mysql instance !', 10, function () {

    //打开数据库页面地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/database');
    });

    //重置数据库实例
    casper.then(function () {
        DB.reset_Mysql_instance(caseName, DB_add_mysql_instance_backUp.mysql_alias);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
