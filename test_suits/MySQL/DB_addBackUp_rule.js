//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var DB = require('../sources/database_s_cfg');
var DB_cfg = mockData_global.DB_cfg;
var DB_back_up_rule = DB_cfg.DB_back_up_rule;

var caseName='DB_addBackUp_rule';
casper.test.begin('DB add BackUp rule!', 20, function () {

    //打开规则管理页面
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/urman_rule');
    });

    //添加备份规则
    casper.then(function () {
        DB.automatic_BackUp(caseName,DB_back_up_rule.backUp_rule_name,DB_back_up_rule.backUp_tool,DB_back_up_rule.Operation_duration);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});