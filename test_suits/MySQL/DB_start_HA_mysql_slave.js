//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var DB = require('../sources/database_s_cfg.js');
var DB_cfg = mockData_global.DB_cfg;
var DB_start_HA_mysql_slave = DB_cfg.DB_start_HA_mysql_slave;
var DB_add_group = DB_cfg.DB_add_group;
var commonFun=require('../includes/commonFun.js');

var cnf_global = require('../configs/cnf_global.js');
var downloads = cnf_global.downloads;
var ssh_Command = require("../configs/ssh_Command.js");
var Init_DMP = ssh_Command.cmdData.Init_DMP;

var caseName = 'DB_start_HA_mysql_slave';

casper.test.begin('DB start slave mysql HA !', 0, function () {
    var host_ip, getResult_1;
    //打开数据库页面地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName, '/database');
    });

    //添加数据库组
    casper.then(function () {
        DB.start_HA_mysql(caseName, DB_start_HA_mysql_slave.groupName,
            DB_start_HA_mysql_slave.mysql_alias, "从实例");
    });

    // //在主机上检查ip绑定情况
    // casper.then(function () {
    //     universe.checkRemoteCmdResult(downloads.umc_2_user, downloads.umc_2_ip, Init_DMP.sipBind, DB_add_group.sip + "/32");
    // });

    //查看高可用主从复制状态,复制延迟0s
    casper.then(function () {
        //universe.waitForPageElementByXpath(caseName, "//td[@data-source='" + DB_start_HA_mysql_slave.mysql_alias + "']/..//td[@data='replication_delay'][contains(text(),'0')]", 120000);
        universe.refreshCheckDelay(caseName, DB_start_HA_mysql_slave.mysql_alias, 0);
    });

    //自动切换IP
    casper.then(function () {
        if (DB_start_HA_mysql_slave.mysql_alias == 'automationMysql_1') {
            host_ip = "172.100.10.2";
        } else if (DB_start_HA_mysql_slave.mysql_alias == 'automationMysql_2') {
            host_ip = "172.100.10.3";
        }
    });

    //检测数据库表是否存在
    casper.then(function () {
        this.test.comment('exec sql query select  .......');
        getResult_1 = commonFun.ssh(downloads.umc_2_user, host_ip, Init_DMP.sql_query_select);
    });

    casper.then(function () {
        this.waitFor(getResult_1.wait);
    });

    casper.then(function () {
        if (getResult_1.output().indexOf('doesn\'t exist')!= -1) {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'sync table failed !');
        }else{
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'sync table success !');
        }
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
