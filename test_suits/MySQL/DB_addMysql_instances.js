//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var DB = require('../sources/database_s_cfg.js');
var DB_cfg = mockData_global.DB_cfg;
var DB_add_mysql_instance = DB_cfg.DB_add_mysql_instance;

var cnf_global = require('../configs/cnf_global.js');
var downloads = cnf_global.downloads;
var ssh_Command=require("../configs/ssh_Command.js");
var Init_DMP=ssh_Command.cmdData.Init_DMP;


var caseName='DB_add_mysql_instance';
casper.test.begin('DB add mysql instance !', 18, function () {

    //打开数据库页面地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/database');
    });

    //添加数据库组
    casper.then(function () {
        DB.add_mysql_instance(caseName,
            DB_add_mysql_instance.groupName,
            DB_add_mysql_instance.hostName,
            DB_add_mysql_instance.port,
            DB_add_mysql_instance.mysql_alias,
            DB_add_mysql_instance.install_standard,
            DB_add_mysql_instance.init_data,
            DB_add_mysql_instance.password,
            DB_add_mysql_instance.mysql_tarball_path,
            DB_add_mysql_instance.mysql_base_path,
            DB_add_mysql_instance.mysql_data_path,
            DB_add_mysql_instance.mysql_binlog_path,
            DB_add_mysql_instance.mysql_relaylog_path,
            DB_add_mysql_instance.mysql_redolog_path,
            DB_add_mysql_instance.mysql_tmp_path,
            DB_add_mysql_instance.backup_path,
            DB_add_mysql_instance.mycnf_path,
            DB_add_mysql_instance.all_user,
            DB_add_mysql_instance.all_host,
            DB_add_mysql_instance.all_password,
            DB_add_mysql_instance.run_user,
            DB_add_mysql_instance.run_user_group,
            DB_add_mysql_instance.mysql_uid,
            DB_add_mysql_instance.mysql_gid,
            DB_add_mysql_instance.serverID,
            DB_add_mysql_instance.umask,
            DB_add_mysql_instance.umask_dir
            );
    });

    //在主机上检查uagent进程以及文件加用户
    casper.then(function () {
        universe.checkUserOrGroup(downloads.umc_2_user, downloads.umc_2_ip,Init_DMP.etc_3306_Cmd,Init_DMP.etc_3306_ViewCmd,'actiontech-mysql','actiontech-mysql','uagent');
        universe.checkUserGroudId(downloads.umc_2_user, downloads.umc_2_ip,Init_DMP.id_actiontech_mysql,'5700(actiontech)');
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
