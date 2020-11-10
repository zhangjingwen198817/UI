//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var IPMI_SIP = mockData_global.IPMI_SIP;
var remove_sip = IPMI_SIP.remove_sip;


var caseName='IPMI_remove_SIP';
casper.test.begin('remove SIP!', 8, function () {

    //打开SIP的地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/sippool');
    });

    //删除SIP
    casper.then(function () {
        IPMI.remove_sip(caseName,remove_sip.ip);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
