//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var IPMI_CMS_User = mockData_global.IPMI_CMS_User;
var add_User_readOnly = IPMI_CMS_User.add_User_readOnly;


var caseName = 'IPMI_CMS_addUser_readOnly';

casper.test.begin('Platform management addUser readOnly module!', 9, function () {

    //打开路由配置组的地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName, '/user');
    });

    //添加UDP用户
    casper.then(function () {
        IPMI.cms_add_User(caseName, add_User_readOnly.userName, add_User_readOnly.password, add_User_readOnly.privilage);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
})
