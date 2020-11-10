//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var IPMI_server = mockData_global.IPMI_server;
var form_add_server_1 = IPMI_server.form_add_server_1;
var install_single_umc_module=IPMI_server.install_single_umc_module;

var caseName='IPMI_install_single_umc_module';

casper.test.begin('Platform management install umc module!', 12, function () {

    //打开主机地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/server');
    });

    //安装单个umc组件
    casper.then(function () {
        IPMI.install_single_umc_module(caseName, form_add_server_1.server_ip,install_single_umc_module.install_component,
            install_single_umc_module.umc_path,install_single_umc_module.umc_id,install_single_umc_module.umc_install_file,
            install_single_umc_module.umc_data);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
})