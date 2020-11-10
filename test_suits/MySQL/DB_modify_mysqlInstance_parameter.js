//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var DB = require('../sources/database_s_cfg.js');
var DB_cfg = mockData_global.DB_cfg;
var caseName = 'DB_modify_mysqlInstance_parameter';
var DB_add_mysql_instance = DB_cfg.DB_add_mysql_instance;
var page_uproxy_backend = mockData_global.page_uproxy_backend;
var form_fill_data = page_uproxy_backend.form_fill_data;
var commonFun=require('../includes/commonFun.js');

var cnf_global = require('../configs/cnf_global.js');
var downloads = cnf_global.downloads;
var ssh_Command=require("../configs/ssh_Command.js");
var Init_DMP=ssh_Command.cmdData.Init_DMP;

casper.test.begin('DB modify mysqlInstance parameter !',13, function () {

    var getComponents;

    //打开数据库页面地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName, '/modify_config');
    });

    //数据库组参数变更
    casper.then(function () {
        DB.modify_mysqlInstance_parameter(caseName, DB_add_mysql_instance.mysql_user, DB_add_mysql_instance.password, form_fill_data.mysql_group_id, '120');
    });

    //访问数据库
    casper.then(function () {
        this.test.comment('exec sql sql_slave_net_timeout  .......');
        getComponents = commonFun.ssh(downloads.umc_2_user, downloads.umc_2_ip,Init_DMP.sql_slave_net_timeout);
    });

    casper.then(function () {
        this.waitFor(getComponents.wait);
    });

    casper.then(function () {
        if(getComponents.output().indexOf('120')!=-1){
            this.test.assert(true,getComponents.output());
        }
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});




