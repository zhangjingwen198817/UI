//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var DB = require('../sources/database_s_cfg');
var DB_cfg = mockData_global.DB_cfg;
var DB_back_up_rule = DB_cfg.DB_back_up_rule;

var caseName='DB_deleteBackUp_rule';
casper.test.begin('DB delete BackUp rule!', 18, function () {

    //打开规则管理页面
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/urman_rule');
    });

    //删除备份规则
    casper.then(function () {
        DB.delete_BackUp_rule(caseName,DB_back_up_rule.backUp_rule_name);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});