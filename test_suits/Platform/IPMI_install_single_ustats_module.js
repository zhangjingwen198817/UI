//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var IPMI_server = mockData_global.IPMI_server;
var form_add_server_1 = IPMI_server.form_add_server_1;
var install_single_uStats_module=IPMI_server.install_single_uStats_module;

var caseName='IPMI_install_single_ustats_module';

casper.test.begin('Platform management install ustats module!', 12, function () {

    //打开主机地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/server');
    });

    //安装单个uStats组件
    casper.then(function () {
        IPMI.install_single_uStats_module(caseName, form_add_server_1.server_ip,install_single_uStats_module.install_component,
            install_single_uStats_module.ustats_path,install_single_uStats_module.ustats_id,
            install_single_uStats_module.ustats_install_file,install_single_uStats_module.ustats_status);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
})
