//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var IPMI_server = mockData_global.IPMI_server;
var form_add_server_1 = IPMI_server.form_add_server_1;

var caseName='IPMI_removeServer';

casper.test.begin('remove IPMI server!', 7, function () {

    casper.then(function () {
        //打开主机地址
        universe.navigate_to_aLink_Path(caseName,'/server');
    });

    //移除服务器
    casper.then(function () {
        IPMI.remove_server(caseName,form_add_server_1.server_ip,form_add_server_1.ssh_port,
            form_add_server_1.ssh_user,form_add_server_1.ssh_password,form_add_server_1.waittime);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
