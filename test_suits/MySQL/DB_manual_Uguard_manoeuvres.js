//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var DB = require('../sources/database_s_cfg.js');


var caseName = 'DB_manual_Uguard_manoeuvres';

casper.test.begin('DB manual Uguard manoeuvres!', 0, function () {

    //切换到配置元数据
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName, '/config_metadata');
    });

    //设置 universe/uguard/exercise-task/manual-running=1
    casper.then(function () {
        DB.modify_manual_running(caseName,'true','root','172.100.10.2','./log/','/opt/uguard-mgr/logs/key.log');
    });


    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
