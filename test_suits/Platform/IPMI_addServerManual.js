//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var IPMI_server = mockData_global.IPMI_server;
var form_add_server_1 = IPMI_server.form_add_server_1;
var cnf_global = require('../configs/cnf_global.js');
var downloads = cnf_global.downloads;
var ssh_Command = require("../configs/ssh_Command.js");
var Init_DMP = ssh_Command.cmdData.Init_DMP;

var caseName = 'IPMI_addServer_manual';
var components_path = "/tmp";
//var getUagent = "cd  " + components_path + " ; wget " + downloads.ftp_uagent + downloads.uagent_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.uagent_version;


casper.test.begin('IPMI add Server Manual', 16, function () {

    casper.then(function () {
        //打开路由配置组的地址
        universe.navigate_to_aLink_Path(caseName, '/server');
    });

    //添加服务器
    casper.then(function () {
        IPMI.add_serverManual(caseName, form_add_server_1.uagent_install_method_manual, form_add_server_1.server_ip_manu, form_add_server_1.ssh_port,
            form_add_server_1.ssh_user, form_add_server_1.ssh_password, form_add_server_1.hostname_manu,
            form_add_server_1.uagent_path, form_add_server_1.uagent_id_manu, form_add_server_1.uagent_install_file, form_add_server_1.waittime);

    });
    //下载组件到指定服务器umc-5
    casper.then(function () {
        universe.scpComponents(downloads.umc_5_user, downloads.umc_5_ip, downloads.uagent_version,'/tmp/');
    });

    //安装uagent 组件
    casper.then(function () {
        universe.execCmd(downloads.umc_5_user, downloads.umc_5_ip, "rpm -iv --prefix /opt/uagent /tmp/uagent-9.9.9.9-qa.x86_64.rpm");
    });

    //启动uagent组件
    casper.then(function () {
        universe.execCmd(downloads.umc_5_user, downloads.umc_5_ip,
            "cd /opt/uagent; (/opt/uagent/bin/uagent -n uagent-" + form_add_server_1.hostname_manu + " -e server-" + form_add_server_1.uagent_id_manu + " -c 172.100.10.1 -f  1>/opt/uagent/logs/std.log 2>&1) && ([[ \"systemd\" != \"$(cat /proc/1/comm 2>/dev/null)\" ]] && service uagent start || systemctl restart uagent.service)");
    });

    //在主机上检查uagent进程以及文件夹用户
    casper.then(function () {
        universe.checkProcessExit(downloads.umc_5_user, downloads.umc_5_ip, Init_DMP.uagentProcess, Init_DMP.uagentViewProcess, '/opt/uagent/bin/uagent');
        universe.checkUserOrGroup(downloads.umc_5_user, downloads.umc_5_ip, Init_DMP.uagentCmd, Init_DMP.uagentViewCmd, 'actiontech-universe', 'actiontech', 'uagent');
    });

    //等待页面元素出现
    casper.then(function () {
        casper.test.comment('wait the added server appear!');
        universe.refreshWaitElement(caseName,form_add_server_1.server_ip_manu, form_add_server_1.uagent_data, '运行', 0);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
