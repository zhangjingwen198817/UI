//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var IPMI_CMS_User = mockData_global.IPMI_CMS_User;
var add_User_admin = IPMI_CMS_User.add_User_admin;


var caseName = 'IPMI_CMS_removeUser_admin';

casper.test.begin('Platform management removeUser admin module!', 8, function () {

    //打开路由配置组的地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName, '/user');
    });

    //添加UDP用户
    casper.then(function () {
        IPMI.cms_remove_User(caseName, add_User_admin.userName);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
})
