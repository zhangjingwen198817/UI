//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var DB = require('../sources/database_s_cfg.js');
var DB_cfg = mockData_global.DB_cfg;
var DB_start_HA_mysql_slave = DB_cfg.DB_start_HA_mysql_slave;

var caseName='DB_stop_HA_mysql_slave';


casper.test.begin('DB stop slave mysql HA !', 9, function () {

    //打开数据库页面地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/database');
    });

    //添加数据库组
    casper.then(function () {
        DB.stop_HA_mysql(caseName, DB_start_HA_mysql_slave.groupName,
            DB_start_HA_mysql_slave.mysql_alias);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
