//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var DB = require('../sources/database_s_cfg.js');
var DB_cfg = mockData_global.DB_cfg;
var DB_add_mysql_instance_backUp = DB_cfg.DB_add_mysql_instance_backUp;

var cnf_global = require('../configs/cnf_global.js');
var downloads = cnf_global.downloads;
var ssh_Command=require("../configs/ssh_Command.js");
var Init_DMP=ssh_Command.cmdData.Init_DMP;

var caseName='DB_add_mysql_instance_backUp';
casper.test.begin('DB add mysql instance base on backUp !', 18, function () {

    //打开数据库页面地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/database');
    });

    // //基于手工备份添加数据库组
    casper.then(function () {
        DB.add_mysql_instance_baseOnBackUp(caseName,
            DB_add_mysql_instance_backUp.groupName,
            DB_add_mysql_instance_backUp.hostName,
            DB_add_mysql_instance_backUp.port,
            DB_add_mysql_instance_backUp.mysql_alias,
            DB_add_mysql_instance_backUp.install_standard,
            DB_add_mysql_instance_backUp.mysql_tarball_path
        );
    });

    //在主机上检查uagent进程以及文件加用户
    casper.then(function () {
        universe.checkUserOrGroup(downloads.umc_3_user, downloads.umc_3_ip,Init_DMP.etc_3306_Cmd,Init_DMP.etc_3306_ViewCmd,'actiontech-mysql','actiontech-mysql','uagent');
        universe.checkUserGroudId(downloads.umc_3_user, downloads.umc_3_ip,Init_DMP.id_actiontech_mysql,'5700(actiontech)');
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
