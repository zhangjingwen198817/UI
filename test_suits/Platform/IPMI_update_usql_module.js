//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var IPMI_server = mockData_global.IPMI_server;
var form_add_server_1 = IPMI_server.form_add_server_1;
var update_module_usql=IPMI_server.update_module_usql;

var caseName='IPMI_update_usql_module';

casper.test.begin('Platform management update usql module!', 9, function () {

    //打开主机地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/server');
    });

    //升级uDeploy组件
    casper.then(function () {
        IPMI.update_uSql_module(caseName, form_add_server_1.server_ip,
            update_module_usql.module_name,update_module_usql.module_file);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
