//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var IPMI_server = mockData_global.IPMI_server;
var form_add_server_1 = IPMI_server.form_add_server_1;
var form_server_manager_list=IPMI_server.form_server_manager_list;
var ssh_Command = require("../configs/ssh_Command.js");
var Init_DMP = ssh_Command.cmdData.Init_DMP;
var cnf_global = require('../configs/cnf_global.js');
var downloads = cnf_global.downloads;

var caseName='IPMI_oneKey_reg_avbManage';

casper.test.begin('One key registers a high availability Manage environment!', 10, function () {

    //打开主机地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/server');
    });

    //一键注册高可用管理端
    casper.then(function () {
        IPMI.onKey_reg_avbManage(caseName, form_add_server_1.server_ip, form_server_manager_list.mgr_ha_uguard_mgr_path,
            form_server_manager_list.mgr_ha_uguard, form_server_manager_list.mgr_ha_uguard_mgr_install_file,
            form_server_manager_list.mgr_ha_urman_mgr_path, form_server_manager_list.mgr_ha_urman_mgr_id,
            form_server_manager_list.mgr_ha_urman_mgr_install_file);
    });

    //在主机上检查uguard-mgr/urman-mgr进程
    casper.then(function () {
        universe.checkProcessExit(downloads.umc_2_user, downloads.umc_2_ip, Init_DMP.uguard_mgr_Process, Init_DMP.uguard_mgr_ViewProcess, '/opt/uguard-mgr/bin/uguard-mgr');
        universe.checkProcessExit(downloads.umc_2_user, downloads.umc_2_ip, Init_DMP.urman_mgr_Process, Init_DMP.urman_mgr_ViewProcess, '/opt/urman-mgr/bin/urman-mgr');
    });


    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
