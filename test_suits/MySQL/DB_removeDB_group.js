//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var DB = require('../sources/database_s_cfg.js');
var DB_cfg = mockData_global.DB_cfg;
var DB_remove_group = DB_cfg.DB_remove_group;
var caseName='DB removeDB_group';

casper.test.begin('remove database group!', 8, function () {

    //打开数据库页面地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/database');
    });

    //移除数据库组
    casper.then(function () {
        DB.remove_database_group(caseName,DB_remove_group.groupName);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
