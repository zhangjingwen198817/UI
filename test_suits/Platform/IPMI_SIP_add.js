//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var IPMI_SIP = mockData_global.IPMI_SIP;
var add_sip = IPMI_SIP.add_sip;


var caseName='IPMI_add_SIP';
casper.test.begin('add SIP!', 16, function () {

    //打开SIP的地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/sippool');
    });
    casper.wait(10*1000);

    //添加SIP
    casper.then(function () {
        IPMI.add_sip(caseName,add_sip.ip,add_sip.ip_7,add_sip.ip_8,add_sip.ip_9,add_sip.ip_10,add_sip.ip_11,
            add_sip.ip_12,add_sip.ip_13, add_sip.ip_14);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
