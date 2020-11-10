//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var IPMI_server = mockData_global.IPMI_server;
var form_add_server_1 = IPMI_server.form_add_server_1;
var install_single_uMon_module=IPMI_server.install_single_uMon_module;
var cnf_global = require('../configs/cnf_global.js');
var downloads = cnf_global.downloads;
var ssh_Command=require("../configs/ssh_Command.js");
var Init_DMP=ssh_Command.cmdData.Init_DMP;

var caseName='IPMI_install_single_uMon_module';

casper.test.begin('Platform management install umon module!', 10, function () {

    //打开主机地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/server');
    });

    //安装单个uMon组件
    casper.then(function () {
        IPMI.install_single_uMon_module(caseName, form_add_server_1.server_ip_1,install_single_uMon_module.install_component,
            install_single_uMon_module.umon_path,install_single_uMon_module.umon_id,
            install_single_uMon_module.umon_install_file,install_single_uMon_module.umon_status);
    });

    //在主机上检查umon进程
    casper.then(function () {
        universe.checkProcessExit(downloads.umc_1_user, downloads.umc_1_ip, Init_DMP.umon_Process, Init_DMP.umon_ViewProcess, '/opt/umon/bin/umon');

    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
