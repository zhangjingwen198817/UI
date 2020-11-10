//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var DB = require('../sources/database_s_cfg.js');
var cnf_global=require('../configs/cnf_global.js');
var login_url = cnf_global.cnf.page_login.url;

var DB_cfg = mockData_global.DB_cfg;
var DB_start_HA_mysql_slave = DB_cfg.DB_start_HA_mysql_slave;
var DB_add_mysql_instance = DB_cfg.DB_add_mysql_instance;

var caseName = 'DB_monitorData_complete';

casper.test.begin('DB monitorData complete !', 0, function () {


    casper.thenOpen(login_url,function () {
        //数据库实例监控
        casper.then(function () {
            universe.navigate_to_aLink_Path(caseName, '/database');
        });
    });

    //关闭数据库实例监控
    casper.then(function () {
        DB.close_Mysql_instance_monitor(caseName, DB_start_HA_mysql_slave.mysql_alias);
    });

    //关闭数据库组监控
    casper.then(function () {
        DB.close_Mysql_group_monitor(caseName, DB_add_mysql_instance.groupName);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
