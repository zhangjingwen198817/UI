//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var DB = require('../sources/database_s_cfg.js');
var DB_cfg = mockData_global.DB_cfg;
var DB_backUp_mysql_instance = DB_cfg.DB_backUp_mysql_instance;


var caseName='DB_backUp_mysql_instance';
casper.test.begin('DB backUp mysql instance !', 15, function () {

    //打开数据库页面地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/database');
    });

    //手工备份数据库实例
    casper.then(function () {
        DB.backUp_mysql_instance(caseName,DB_backUp_mysql_instance.groupName,
            DB_backUp_mysql_instance.mysql_alias,DB_backUp_mysql_instance.backUp_tools);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
