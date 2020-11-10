//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var IPMI_server = mockData_global.IPMI_server;
var form_add_server_1 = IPMI_server.form_add_server_1;
var form_server_client_list=IPMI_server.form_server_client_list;
var cnf_global = require('../configs/cnf_global.js');
var downloads = cnf_global.downloads;
var ssh_Command=require("../configs/ssh_Command.js");
var Init_DMP=ssh_Command.cmdData.Init_DMP;

var caseName='IPMI_oneKey_reg_avbClient';

casper.test.begin('One key registers a high availability Client environment!', 14, function () {

    //打开主机地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/server');
    });

    //一键注册高可用客户端
    casper.then(function () {
        IPMI.onKey_reg_avbClient(caseName, form_add_server_1.server_ip, form_server_client_list.reg_ha_udeploy_path,
            form_server_client_list.reg_ha_udeploy_id, form_server_client_list.reg_ha_udeploy_install_file,
            form_server_client_list.reg_ha_ustats_path, form_server_client_list.reg_ha_ustats_id,
            form_server_client_list.reg_ha_ustats_install_file, form_server_client_list.reg_ha_uguard_agent_path,
            form_server_client_list.reg_ha_uguard_agent_id, form_server_client_list.reg_ha_uguard_agent_install_file,
            form_server_client_list.reg_ha_urman_agent_path, form_server_client_list.reg_ha_urman_agent_id,
            form_server_client_list.reg_ha_urman_agent_install_file, form_server_client_list.reg_ha_max_backup_concurrency_num);
    });

    //在主机上检查udeploy/urman-agent/ uguard-agent /ustats 进程
    casper.then(function () {
        universe.checkProcessExit(downloads.umc_2_user, downloads.umc_2_ip, Init_DMP.udeploy_Process, Init_DMP.udeploy_ViewProcess, '/opt/udeploy/bin/udeploy');
        universe.checkProcessExit(downloads.umc_2_user, downloads.umc_2_ip, Init_DMP.urman_agent_Process, Init_DMP.uguard_mgr_ViewProcess, '/opt/urman-agent/bin/urman-agent');
        universe.checkProcessExit(downloads.umc_2_user, downloads.umc_2_ip, Init_DMP.uguard_agent_Process, Init_DMP.uguard_agent_ViewProcess, '/opt/uguard-agent/bin/uguard-agent');
        universe.checkProcessExit(downloads.umc_2_user, downloads.umc_2_ip, Init_DMP.ustats_Process, Init_DMP.ustats_ViewProcess, '/opt/ustats/bin/ustats');
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
