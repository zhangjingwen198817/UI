//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var DB = require('../sources/database_s_cfg.js');
var caseName = 'DB_switch_MasterSlave_mysql_instance';

casper.test.begin('DB switch MasterSlave mysql_instance !', 0, function () {

    //进入实例配置页面
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName, '/database');
    });

    //切换数据库主从
    casper.then(function () {
        this.wait(12000,function () {
            DB.switch_mysql_Master_Slave_instance(caseName, "主实例(SIP)");
        });

    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
