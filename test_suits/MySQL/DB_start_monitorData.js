//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var DB = require('../sources/database_s_cfg.js');
var DB_cfg = mockData_global.DB_cfg;
var DB_start_HA_mysql_slave = DB_cfg.DB_start_HA_mysql_slave;
var DB_add_mysql_instance = DB_cfg.DB_add_mysql_instance;

var caseName = 'DB_start_monitorData';

casper.test.begin('DB start monitorData !', 0, function () {

    //数据库实例监控
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName, '/database');
    });

    //启动数据库组监控
    casper.then(function () {
        DB.start_Mysql_group_monitor(caseName, DB_add_mysql_instance.groupName);
    });

    //启动数据库实例监控
    casper.then(function () {
        DB.start_Mysql_instance_monitor(caseName, DB_start_HA_mysql_slave.mysql_alias);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
