//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var DB = require('../sources/database_s_cfg.js');
var DB_cfg = mockData_global.DB_cfg;
var DB_add_group = DB_cfg.DB_add_group;

var caseName='DB_addDB_group';
casper.test.begin('add database group!', 8, function () {


    //打开数据库页面地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/database');
    });

    //添加数据库组
    casper.then(function () {
        DB.add_database_group(caseName,DB_add_group.groupName,DB_add_group.sip,DB_add_group.app_Eg_name,
            DB_add_group.app_name, DB_add_group.sql_purpose,DB_add_group.node_detail,
            DB_add_group.app_grade,DB_add_group.disaster_garde);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
