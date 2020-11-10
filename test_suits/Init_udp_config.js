//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');

var cnf_global = require('../configs/cnf_global.js');
var cnf = cnf_global.cnf;
var downloads = cnf_global.downloads;

var ssh_Command = require("../configs/ssh_Command.js");
var Init_DMP = ssh_Command.cmdData.Init_DMP;

var caseName = 'init_udp_config';

casper.test.begin('Init DMP config ......', 24, function () {
universe.casper = casper;
console.log(universe.casper);
    casper.then(function () {
        //等待umc服务启动
        this.wait(3000);
    });

    casper.then(function () {
        //初始化udp环境
        casper.start(cnf.domain, function () {

            universe.capturePath(caseName, 'init.png');
            //等待主机信息并填写表单
            casper.then(function () {
                this.test.comment('Wait the master info .....');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                universe.waitForPageElementByXpath(caseName, "//input[@id='component_path']", 30000);
                this.test.comment('fill the ucore path info .....');
                this.fillSelectors('div#install-modal form',
                    {
                        'input#component_path': '/opt',
                        'input#server_id': 'umc-1',
                        'input#server_ip': '172.100.10.1'
                    }, false);
            });

            //点击扩展按钮
            casper.then(function () {
                this.test.comment('click the expand button .....');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.thenClick('img[src=\'../static/images/expand.svg\']', function () {
                    this.test.assert(true, 'click the expand button success!');
                    universe.waitForPageElementByXpath(caseName, "//input[@id='ucore_path']", 240000);
                    universe.capturePath(caseName, 'click_expend.png');
                });

            });
            //填写ucore表单
            casper.then(function () {
                this.test.comment('fill the ucore info .....');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.fillSelectors('div#install-modal form',
                    {
                        'input#ucore_path': '/opt/ucore',
                        'input#ucore_id': 'umc-1'
                    }, false);
                universe.capturePath(caseName, 'fill_ucore.png');
            });

            //点击Uagent
            casper.then(function () {
                this.test.comment('click the Uagent Tab !');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.thenClick(
                    {
                        type: 'xpath',
                        path: "//div[text()='Uagent']"
                    }, function () {
                        this.test.assert(true, 'click Uagent tab success!');
                        universe.waitForPageElementByXpath(caseName, "//input[@id='uagent_path']", 240000);
                        universe.capturePath(caseName, 'uagent.png');
                    })
            });

            //填写uagent表单
            casper.then(function () {
                this.test.comment('fill the Uagent info !');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.fillSelectors('div#install-modal form',
                    {
                        'input#uagent_path': '/opt/uagent',
                        //'select#uagent_install_file': 'uagent-9.9.9.9-qa.x86_64.rpm',
                        'input#uagent_id': 'umc-1'
                    }, false);
                universe.capturePath(caseName, 'fill_uagent.png');
            });

            //点击umc
            casper.then(function () {
                this.test.comment('click the umc Tab !');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.thenClick(
                    {
                        type: 'xpath',
                        path: "//div[text()='Umc']"
                    }, function () {
                        this.test.assert(true, 'click Umc tab success!');
                        universe.waitForPageElementByXpath(caseName, "//input[@id='umc_id']", 240000);
                        universe.capturePath(caseName, 'Umc.png');
                    })
            });

            //填写umc表单
            casper.then(function () {
                this.test.comment('fill the umc info');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.fillSelectors('div#install-modal form',
                    {
                        //'input#umc_path': '/opt/umc',
                        'input#umc_id': 'umc-1'
                    }, false);
                universe.capturePath(caseName, 'fill_umc.png');
            });

            //点击ustats
            casper.then(function () {
                this.test.comment('click the ustats Tab !');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.thenClick(
                    {
                        type: 'xpath',
                        path: "//div[text()='Ustats']"
                    }, function () {
                        this.test.assert(true, 'click Ustats tab success!');
                        universe.waitForPageElementByXpath(caseName, "//input[@id='ustats_path']", 240000);
                        universe.capturePath(caseName, 'Ustats.png');
                    });
            });

            //填写Ustats表单
            casper.then(function () {
                this.test.comment('fill the Ustats info');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.fillSelectors('div#install-modal form',
                    {
                        'input#ustats_path': '/opt/ustats',
                        'input#ustats_id': 'umc-1'
                    }, false);
                universe.capturePath(caseName, 'fill_Ustats.png');
            });

            //点击udeploy
            casper.then(function () {
                this.test.comment('click the udeploy Tab !');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.thenClick(
                    {
                        type: 'xpath',
                        path: "//div[text()='Udeploy']"
                    }, function () {
                        this.test.assert(true, 'click Udeploy tab success!');
                        universe.waitForPageElementByXpath(caseName, "//input[@id='udeploy_path']", 240000);
                        universe.capturePath(caseName, 'Udeploy.png');
                    })
            });

            //填写Udeploy表单
            casper.then(function () {
                this.test.comment('fill the Udeploy info');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.fillSelectors('div#install-modal form',
                    {
                        'input#udeploy_path': '/opt/udeploy',
                       // 'select#udeploy_install_file': 'udeploy-9.9.9.9-qa.x86_64.rpm',
                        'input#ustats_id': 'umc-1'
                    }, false);
                universe.capturePath(caseName, 'fill_Udeploy.png');
            });

            //点击mysql
            casper.then(function () {
                this.test.comment('click the mysql Tab !');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.thenClick(
                    {
                        type: 'xpath',
                        path: "//div[text()='MySQL']"
                    }, function () {
                        this.test.assert(true, 'click MySQL tab success!');
                        universe.waitForPageElementByXpath(caseName, "//input[@id='mysql_path']", 240000);
                        universe.capturePath(caseName, 'MySQL.png');
                    })
            });

            //填写MySQL表单
            casper.then(function () {
                this.test.comment('fill the MySQL info');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.fillSelectors('div#install-modal form',
                    {
                        'input#mysql_path': '/opt/udb/mysql',
                        'input#mysql_id': 'udb1',
                        'input#mysql_port': '5690'
                    }, false);
                universe.capturePath(caseName, 'fill_MySQL.png');
            });


            //点击继续按钮
            casper.then(function () {
                this.test.comment('click the continue button !');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.thenClick("div.save.install.continue.finished img[src='../static/images/continue.svg']", function () {
                    this.test.assert(true, 'click continue button success!');
                    this.wait(60000).then(
                        function () {
                            universe.capturePath(caseName,'installing.png');
                        }
                    );
                });
            });

            //等待初始化完成，切换待server页面查看页面元素是否成功显示
            casper.then(function () {
                this.test.comment('wait the init finished .............');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.wait(520000, function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    universe.capturePath(caseName, 'installing.png');
                    universe.navigate_to_aLink_Path(caseName, '/server');
                    universe.waitForPageElementByCss(caseName, "button#add-server-btn", 520000);
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    //universe.refreshWaitElement(caseName, "172.100.10.1", 'ucore_status', '运行', 0);
                });
            });

            //后台验证umc-1 服务器上的/opt/umc /opt/ucore /opt/uagent文件夹下文件及文件夹用户和组用户是否正确
            casper.then(function () {
                this.test.comment("Verify the permission of user and group (umc/ucore/uagent) !");
                universe.checkUserOrGroup(downloads.umc_1_user, downloads.umc_1_ip, Init_DMP.umcCmd, Init_DMP.umcViewCmd, 'actiontech-universe', 'actiontech', 'umc');
                universe.checkUserOrGroup(downloads.umc_1_user, downloads.umc_1_ip, Init_DMP.ucoreCmd, Init_DMP.ucoreViewCmd, 'actiontech-universe', 'actiontech', 'ucore');
                universe.checkUserOrGroup(downloads.umc_1_user, downloads.umc_1_ip, Init_DMP.uagentCmd, Init_DMP.uagentViewCmd, 'actiontech-universe', 'actiontech', 'uagent');
            });
            //后台验证umc-1服务器上的组件umc/ucore/uagent/MySQL进程是否存在
            casper.then(function () {
                this.test.comment("Verify the process of umc/ucore/uagent !");
                universe.checkProcessExit(downloads.umc_1_user, downloads.umc_1_ip, Init_DMP.umcProcess, Init_DMP.umcViewProcess, './bin/umc');
                universe.checkProcessExit(downloads.umc_1_user, downloads.umc_1_ip, Init_DMP.ucoreProcess, Init_DMP.ucoreViewProcess, '/opt/ucore/bin/ucore');
                universe.checkProcessExit(downloads.umc_1_user, downloads.umc_1_ip, Init_DMP.uagentProcess, Init_DMP.uagentViewProcess, '/opt/uagent/bin/uagent');
                universe.checkProcessExit(downloads.umc_1_user, downloads.umc_1_ip, Init_DMP.mysqlProcess, Init_DMP.mysqlViewProcess, '/opt/udb/mysql/base/bin/mysqld');
            });
            //检查用户及用户组的id为5700
            casper.then(function () {
                this.test.comment("Verify the userID=5700,groupId=5700");
                universe.checkUserGroudId(downloads.umc_1_user, downloads.umc_1_ip, Init_DMP.userAndGroup, 'uid=5700(actiontech-universe) gid=5700(actiontech) groups=5700(actiontech)');
            });


        });
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});
