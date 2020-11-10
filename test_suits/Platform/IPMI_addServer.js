//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var IPMI_server = mockData_global.IPMI_server;
var form_add_server_1 = IPMI_server.form_add_server_1;
var cnf_global = require('../configs/cnf_global.js');
var downloads = cnf_global.downloads;
var ssh_Command=require("../configs/ssh_Command.js");
var Init_DMP=ssh_Command.cmdData.Init_DMP;

var caseName='IPMI_addServer';
casper.test.begin('IPMI add Server', 10, function () {

    casper.then(function () {
        //打开路由配置组的地址
        universe.navigate_to_aLink_Path(caseName,'/server');
    });

    //添加服务器
    casper.then(function () {
        IPMI.add_server(caseName,form_add_server_1.uagent_install_method,form_add_server_1.server_ip,form_add_server_1.ssh_port,
            form_add_server_1.ssh_user,form_add_server_1.ssh_password, form_add_server_1.hostname,
            form_add_server_1.uagent_path,form_add_server_1.uagent_id,form_add_server_1.uagent_install_file,
            form_add_server_1.ustats_path ,form_add_server_1.ustats_id, form_add_server_1.waittime,form_add_server_1.uagent_data);

    });
    //在主机上检查uagent进程以及文件加用户
    casper.then(function () {
        universe.checkProcessExit(downloads.umc_2_user, downloads.umc_2_ip,Init_DMP.uagentProcess,Init_DMP.uagentViewProcess,'/opt/uagent/bin/uagent');
        universe.checkUserOrGroup(downloads.umc_2_user, downloads.umc_2_ip,Init_DMP.uagentCmd,Init_DMP.uagentViewCmd,'actiontech-universe','actiontech','uagent');
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
