//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var DB_cfg = mockData_global.DB_cfg;
var DB_server_3 = DB_cfg.DB_add_server_3;
var form_server_client_list_3=DB_cfg.form_server_client_list_3;
var form_server_manager_list_3=DB_cfg.form_server_manager_list_3;



var caseName='DB_addUmcService';
casper.test.begin('DB_addUmcService', 24, function () {

    casper.then(function () {
        //打开路由配置组的地址
        universe.navigate_to_aLink_Path(caseName,'/server');
    });

    //添加服务器umc-3
    casper.then(function () {
        IPMI.add_server(caseName,DB_server_3.uagent_install_method,DB_server_3.server_ip,DB_server_3.ssh_port,
            DB_server_3.ssh_user,DB_server_3.ssh_password, DB_server_3.hostname,
            DB_server_3.uagent_path,DB_server_3.uagent_id,DB_server_3.uagent_install_file,
            DB_server_3.ustats_path,DB_server_3.ustats_id,
            DB_server_3.waittime,DB_server_3.uagent_data);

    });

    //一键注册高可用客户端umc-3
    casper.then(function () {
        IPMI.onKey_reg_avbClient(caseName, DB_server_3.server_ip, form_server_client_list_3.reg_ha_udeploy_path,
            form_server_client_list_3.reg_ha_udeploy_id, form_server_client_list_3.reg_ha_udeploy_install_file,
            form_server_client_list_3.reg_ha_ustats_path, form_server_client_list_3.reg_ha_ustats_id,
            form_server_client_list_3.reg_ha_ustats_install_file, form_server_client_list_3.reg_ha_uguard_agent_path,
            form_server_client_list_3.reg_ha_uguard_agent_id, form_server_client_list_3.reg_ha_uguard_agent_install_file,
            form_server_client_list_3.reg_ha_urman_agent_path, form_server_client_list_3.reg_ha_urman_agent_id,
            form_server_client_list_3.reg_ha_urman_agent_install_file, form_server_client_list_3.reg_ha_max_backup_concurrency_num);
    });

    //一键注册高可用管理端umc-3
    casper.then(function () {
        IPMI.onKey_reg_avbManage(caseName, DB_server_3.server_ip, form_server_manager_list_3.mgr_ha_uguard_mgr_path,
            form_server_manager_list_3.mgr_ha_uguard, form_server_manager_list_3.mgr_ha_uguard_mgr_install_file,
            form_server_manager_list_3.mgr_ha_urman_mgr_path, form_server_manager_list_3.mgr_ha_urman_mgr_id,
            form_server_manager_list_3.mgr_ha_urman_mgr_install_file);
    });


    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
