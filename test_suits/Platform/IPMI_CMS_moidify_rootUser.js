//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var IPMI_CMS_User = mockData_global.IPMI_CMS_User;
var modify_User = IPMI_CMS_User.modify_User;


var caseName = 'IPMI_CMS_modifyUser_root';

casper.test.begin('Platform management modifyUser root module!', 8, function () {

    //打开路由配置组的地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName, '/user');
    });

    //添加UDP用户
    casper.then(function () {
        IPMI.cms_modifyUser_permission(caseName, modify_User.userName);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
})
