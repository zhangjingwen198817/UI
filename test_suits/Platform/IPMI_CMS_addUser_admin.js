//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var IPMI_CMS_User = mockData_global.IPMI_CMS_User;
var add_User_admin = IPMI_CMS_User.add_User_admin;


var caseName = 'IPMI_CMS_addUser_admin';

casper.test.begin('Platform management addUser admin module!', 9, function () {

    //打开路由配置组的地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName, '/user');
    });

    //添加UDP用户
    casper.then(function () {
        IPMI.cms_add_User(caseName, add_User_admin.userName, add_User_admin.password, add_User_admin.privilage);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
