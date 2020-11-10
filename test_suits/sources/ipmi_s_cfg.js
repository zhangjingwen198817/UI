//智能平台管理页面
///////////zjw----------
var require = patchRequire(require);
var universe = require('../includes/universe.js');


//添加服务器
exports.add_server = function (caseName, uagent_install_method, server_ip, ssh_port, ssh_user, ssh_password,
                               hostname, uagent_path, uagent_id, uagent_install_file, ustats_path, ustats_id, time, uagent_data) {

    //等待服务器管理按钮出现

    // universe.casper.then(function () {
    //     this.test.comment('wait the server button appear!');
    //     universe.waitForPageElementByCss(caseName, "div#dataContainer-server-btn", 240000);
    // });
    universe.casper.then(function () {
        this.test.comment('wait the add server button appear!');
        universe.waitForPageElementByCss(caseName, "button#add-server-btn", 240000);
    });

    //选择服务器管理
    // universe.casper.then(function () {
    //     this.test.comment('select the server manage !');
    //     this.mouse.move("div#dataContainer-server-btn");
    //     universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    // });

    //点击添加服务器
    universe.casper.then(function () {
        this.test.comment('click add the server!');
        this.thenClick('button#add-server-btn', function () {
            universe.casper.test.assertVisible('div#add-server-modal', 'add server is popUp!');
            universe.capturePath(caseName, 'add_server_popUp.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //填写服务器base配置信息
    universe.casper.then(function () {
        this.test.comment('fill the server base info !');
        this.fillSelectors('div#add-server-modal form',
            {
                'select#uagent_install_method': uagent_install_method,
                'input#add_server_ip': server_ip,
                'input#add_ssh_port': ssh_port,
                'input#add_ssh_user': ssh_user,
                'input#add_ssh_password': ssh_password
            }, false).then(function () {
            universe.capturePath(caseName, 'finished_fill_cfg.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击安装信息
    universe.casper.then(function () {
        this.test.comment('click install info !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='add-server-modal']//li[text()='安装信息']"
            }, function () {
                this.test.assertVisible('input#server_id', 'install message page appear!');
                universe.capturePath(caseName, 'install_message_page.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            });
    });

    //填写服务器安装信息
    universe.casper.then(function () {
        this.test.comment('fill the info of install');
        this.fillSelectors('div#add-server-modal form',
            {
                'input#server_id': hostname,
                'input#add_uagent_path': uagent_path,
                'input#add_uagent_id': uagent_id,
                'select#uagent_install_file': uagent_install_file,
                'input#add_ustats_path': ustats_path,
                'input#add_ustats_id': ustats_id
            }, false).then(function () {
            universe.capturePath(caseName, 'fill_install_msg.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击保存
    universe.casper.then(function () {
        this.test.comment('click the save button!');
        universe.casper.thenClick('button.btn.save.sshSave', function () {
            universe.casper.test.assertVisible(
                {
                    type: 'xpath',
                    path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
                }, 'popUp submit list!');
            universe.capturePath(caseName, 'submit_server_list.png');
        });
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button!');
        universe.casper.thenClick('button.btn.confirm', function () {
            universe.casper.test.assert(true, 'click the submit button success !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //等待添加的服务器出现
                universe.casper.then(function () {
                    universe.casper.test.comment('wait the added server appear!');
                    //universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']", time);
                    universe.refreshWaitElement(caseName, server_ip, uagent_data, '运行', 0);
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 240000
        );
    });

};

//手动添加服务器
exports.add_serverManual = function (caseName, uagent_install_method, server_ip, ssh_port, ssh_user, ssh_password,
                                     hostname, uagent_path, uagent_id, uagent_install_file, time) {

    //等待服务器管理按钮出现

    // universe.casper.then(function () {
    //     this.test.comment('wait the server button appear!');
    //     universe.waitForPageElementByCss(caseName, "div#dataContainer-server-btn", 240000);
    // });
    universe.casper.then(function () {
        this.test.comment('wait the add server button appear!');
        universe.waitForPageElementByCss(caseName, "button#add-server-btn", 240000);
    });

    //点击添加服务器
    universe.casper.then(function () {
        this.test.comment('click add the server!');
        this.thenClick('button#add-server-btn', function () {
            universe.casper.test.assertVisible('div#add-server-modal', 'add server is popUp!');
            universe.capturePath(caseName, 'add_server_popUp.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //选择手工安装
    universe.casper.then(function () {
        this.test.comment('select the manual install !');
        this.fillSelectors('div#add-server-modal form',
            {
                'select#uagent_install_method': uagent_install_method
            }, false);
        universe.waitForPageElementByXpath(caseName, "//div[@id='add-server-modal']//li[text()='手工安装命令']", 20000);
    });
    //填写IP信息
    universe.casper.then(function () {
        this.test.comment('fill the ip info !');
        this.fillSelectors('div#add-server-modal form',
            {
                'input#add_server_ip': server_ip
            }, false);
    });
    //点击安装信息
    universe.casper.then(function () {
        this.test.comment('click install info !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='add-server-modal']//li[text()='安装信息']"
            }, function () {
                this.test.assertVisible('input#server_id', 'install message page appear!');
                universe.capturePath(caseName, 'install_message_page.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            });
    });

    //填写服务器安装信息
    universe.casper.then(function () {
        this.test.comment('fill the info of install');
        this.fillSelectors('div#add-server-modal form',
            {
                'input#server_id': hostname,
                'input#add_uagent_path': uagent_path,
                'input#add_uagent_id': uagent_id,
                'select#uagent_install_file': uagent_install_file
            }, false).then(function () {
            universe.capturePath(caseName, 'fill_install_msg.png');
        });
    });

    //点击手工命令
    universe.casper.then(function () {
        this.test.comment('click install info !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='add-server-modal']//li[text()='手工安装命令']"
            }, function () {
                this.test.assertVisible('input#ca_certificate', 'Certificate generated !');
                universe.capturePath(caseName, 'iCertificate_generated.png');
            });
    });

    //点击保存
    universe.casper.then(function () {
        this.test.comment('click the save button!');
        universe.casper.thenClick("div#add-server-modal button[class='btn save']", function () {
            universe.casper.test.assertVisible(
                {
                    type: 'xpath',
                    path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
                }, 'popUp submit list!');
            universe.capturePath(caseName, 'submit_server_list.png');
        });
    });

    //点击执行按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button!');
        universe.casper.thenClick('button.btn.confirm.confirmDone', function () {
            universe.casper.test.assert(true, 'click the submit button success !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //等待添加的服务器出现
                universe.casper.then(function () {
                    universe.casper.test.comment('wait the added server appear!');
                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']", time);
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 240000
        );
    });

};


//移除服务器
exports.remove_server = function (caseName, server_ip, ssh_port, ssh_user, ssh_password, time) {

    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 240000);
        });
    });

    //选择要移除的server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择服务器管理
    universe.casper.then(function () {
        this.test.comment('select the server btn !');
        this.mouse.move("div#dataContainer-server-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //检测移除服务器按钮是否可用
    universe.casper.then(function () {
        this.test.comment('check remove button is able !');
        if (universe.assertBtnAbleByXpath("//button[@id='remove-server-btn']")) {
            this.thenClick('button#remove-server-btn');
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the remove button !');
        } else {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'remove button disable !');
        }
    });

    //填写服务器信息
    universe.casper.then(function () {
        this.test.comment('fill server info !');
        //等待移除服务器对话框
        this.waitUntilVisible("div#remove-server-modal", function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'remove server popUp !');
            universe.capturePath(caseName, 'remove_server.png', {top: 0, left: 0, width: 1440, height: 1024});
        }, function () {
            universe.capturePath(caseName, 'Error_remove_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'remove server not popUp !');
        }, 240000);

        //填写服务器信息
        this.fillSelectors('div#remove-server-modal form',
            {
                'input#remove_ssh_port': ssh_port,
                'input#remove_ssh_user': ssh_user,
                'input#remove_ssh_password': ssh_password
            }, false).then(function () {
            universe.capturePath(caseName, 'fill_server_info.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click save button!');
        this.thenClick('div#remove-server-modal button.btn.save', function () {
            this.waitUntilVisible('div.dialog.confirm button.btn.confirm',
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'submit button appear !');
                    universe.capturePath(caseName, 'submit_button_appear.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_submit_button_appear.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'submit button not appear !');
                }, 240000);

        });
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click submit button!');
        this.thenClick('div.dialog.confirm button.btn.confirm');
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //查看页面元素是否消失
                universe.casper.then(function () {
                    this.waitWhileVisible(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"

                        },
                        function () {
                            universe.capturePath(caseName, 'server_disappear.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, "remove server : " + server_ip + ' is  success !');

                        },
                        function () {
                            universe.capturePath(caseName, 'Error_server_disappear.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, "Error: remove server : " + server_ip + ' is  Fail !');
                        }, 240000
                    );
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 240000
        );
    });

};

//一键注册高可用客户端
exports.onKey_reg_avbClient = function (caseName, server_ip, reg_ha_udeploy_path, reg_ha_udeploy_id,
                                        reg_ha_udeploy_install_file, reg_ha_ustats_path, reg_ha_ustats_id,
                                        reg_ha_ustats_install_file, reg_ha_uguard_agent_path, reg_ha_uguard_agent_id,
                                        reg_ha_uguard_agent_install_file, reg_ha_urman_agent_path, reg_ha_urman_agent_id,
                                        reg_ha_urman_agent_install_file, reg_ha_max_backup_concurrency_num) {


    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 240000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择一键高可用环境
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-prepare-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断一键注册高可用客户端是否可以点击
    universe.casper.then(function () {
        this.test.comment('click one key reg button !');
        if (universe.assertBtnAbleByXpath("//button[@id='onekey-register-ha-environ-btn']")) {
            this.thenClick("button#onekey-register-ha-environ-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click one key button!');
            });
        } else {
            universe.capturePath(caseName, 'one_key_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'oneKey button disable !');
        }

    });

    //判断一键注册高可用信息对话框是否出现
    universe.casper.then(function () {
        this.test.comment(' wait one key button appear !');
        this.waitUntilVisible("div#onekey-register-ha-environ-modal",
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'one key register ha client dialog appear!');
                universe.capturePath(caseName, 'one_key_reg_ha_client.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_one_key_reg_ha_client.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'one key register ha client dialog not appear!');

            }, 240000);

    });

    //填写表单
    universe.casper.then(function () {
        this.test.comment('fill the onekey register ha environ form !');
        this.fillSelectors('div#onekey-register-ha-environ-modal form',
            {
                'input#reg_ha_udeploy_path': reg_ha_udeploy_path,
                'input#reg_ha_udeploy_id': reg_ha_udeploy_id,
                'select#reg_ha_udeploy_install_file': reg_ha_udeploy_install_file,
                'input#reg_ha_ustats_path': reg_ha_ustats_path,
                'input#reg_ha_ustats_id': reg_ha_ustats_id,
                'select#reg_ha_ustats_install_file': reg_ha_ustats_install_file,
                'input#reg_ha_uguard-agent_path': reg_ha_uguard_agent_path,
                'input#reg_ha_uguard-agent_id': reg_ha_uguard_agent_id,
                'select#reg_ha_uguard-agent_install_file': reg_ha_uguard_agent_install_file,
                'input#reg_ha_urman-agent_path': reg_ha_urman_agent_path,
                'input#reg_ha_urman-agent_id': reg_ha_urman_agent_id,
                'select#reg_ha_urman-agent_install_file': reg_ha_urman_agent_install_file,
                'input#reg_ha_max-backup-concurrency-num': reg_ha_max_backup_concurrency_num
            }
            , false).then(function () {
            universe.capturePath(caseName, 'finished_fill_list.png', {top: 0, left: 0, width: 1440, height: 1024});
        });

    });

    //点击保存按钮
    universe.casper.then(function () {
        this.thenClick('div#onekey-register-ha-environ-modal button.btn.save', function () {
            this.test.assertVisible('div.dialog.confirm', ' click the save button success!');
            universe.capturePath(caseName, 'submit_list.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.thenClick("div.dialog.confirm button.btn.confirm", function () {
            this.test.comment("waiting install finish ......");
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //检测安装组件是否正常运行

                // universe.casper.then(function () {
                //     this.test.comment('reload the page !');
                //     var checkfun = function (nums, times) {
                //         if (nums == 4 && times <= 20) {
                //             universe.casper.test.assert(true, 'All installed moudles is running !');
                //             universe.capturePath(caseName, 'all_running.png');
                //         } else if (nums < 4 && times == 20) {
                //             universe.capturePath(caseName, 'Error_not_all_running.png');
                //             universe.casper.test.assert(false, 'Installed modules is not all running !');
                //         } else {
                //             universe.casper.wait(2000);
                //             universe.casper.reload(function () {
                //                 this.waitUntilVisible(
                //                     {
                //                         type: 'xpath',
                //                         path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                //                     },
                //                     function () {
                //                         this.test.assert(true, 'added server appear on page!');
                //                         universe.capturePath(caseName, 'server_appear_on_page.png', {
                //                             top: 0,
                //                             left: 0,
                //                             width: 1440,
                //                             height: 1024
                //                         });
                //                     },
                //                     function () {
                //                         universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                //                             top: 0,
                //                             left: 0,
                //                             width: 1440,
                //                             height: 1024
                //                         });
                //                         this.test.assert(false, 'added server not appear on page!');
                //                     }, 120000);
                //             }).then(function () {
                //                 temp1 = universe.checkIPMI_ModuleStatus(caseName, server_ip, 'udeploy_status', '运行');
                //                 temp2 = universe.checkIPMI_ModuleStatus(caseName, server_ip, 'uguard-agent_status', '运行');
                //                 temp3 = universe.checkIPMI_ModuleStatus(caseName, server_ip, 'ustats_status', '运行');
                //                 temp4 = universe.checkIPMI_ModuleStatus(caseName, server_ip, 'urman-agent_status', '运行');
                //                 nums = temp1 + temp2 + temp3 + temp4;
                //                 times++;
                //                 this.test.comment(nums + '  modules are running !');
                //                 this.test.comment('Refresh the page for the ' + times + ' time !');
                //                 return checkfun(nums, times);
                //             });
                //         }
                //     }
                //     checkfun(0, 0);
                // });
                universe.refreshWaitElement(caseName, server_ip, 'udeploy_status', '运行', 0);
                universe.refreshWaitElement(caseName, server_ip, 'uguard-agent_status', '运行', 0);
                universe.refreshWaitElement(caseName, server_ip, 'ustats_status', '运行', 0);
                universe.refreshWaitElement(caseName, server_ip, 'urman-agent_status', '运行', 0);
                // universe.casper.waitFor(
                //     function(){
                //         return this.evaluate(function() {
                //             return  __utils__.getElementByXPath();
                //         });
                //         {
                //             type:'xpath',
                //                 path:"//table[@id='grid']//td[text()='172.100.10.2']/../td[@data='uguard-agent_status'][text()='运行']"
                //         },
                //     },
                //
                //
                //     function () {
                //         this.test.comment("OK");
                //     },
                //     function () {
                //         this.test.comment('error');
                //
                //     },30000
                //     );

            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//一键注册高可用管理端
exports.onKey_reg_avbManage = function (caseName, server_ip, mgr_ha_uguard_mgr_path, mgr_ha_uguard, mgr_ha_uguard_mgr_install_file,
                                        mgr_ha_urman_mgr_path, mgr_ha_urman_mgr_id, mgr_ha_urman_mgr_install_file) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择一键高可用环境
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-prepare-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断一键注册高可用管理端是否可以点击
    universe.casper.then(function () {
        this.test.comment('click one key reg button !');
        if (universe.assertBtnAbleByXpath("//button[@id='onekey-register-ha-environ-btn']")) {
            this.thenClick("button#onekey-manage-ha-manager-environ-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click one key button!');
            });
        } else {
            universe.capturePath(caseName, 'one_key_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'oneKey button disable !');
        }

    });

    //判断一键注册高可用信息对话框是否出现
    universe.casper.then(function () {
        this.test.comment(' wait one key button appear !');
        this.waitUntilVisible("div#onekey-manage-ha-manager-environ-modal",
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'one key register ha manager dialog appear!');
                universe.capturePath(caseName, 'one_key_reg_ha_manager.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_one_key_reg_ha_manager.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'one key register ha manager dialog not appear!');

            }, 240000);
    });

    //填写高可用管理端环境配置
    universe.casper.then(function () {
        this.test.comment('file ha manage modal !');
        this.fillSelectors("div#onekey-manage-ha-manager-environ-modal form",
            {
                'input#mgr_ha_uguard-mgr_path': mgr_ha_uguard_mgr_path,
                'input#mgr_ha_uguard-mgr_id': mgr_ha_uguard,
                'select#mgr_ha_uguard-mgr_install_file': mgr_ha_uguard_mgr_install_file,
                'input#mgr_ha_urman-mgr_path': mgr_ha_urman_mgr_path,
                'input#mgr_ha_urman-mgr_id': mgr_ha_urman_mgr_id,
                'select#mgr_ha_urman-mgr_install_file': mgr_ha_urman_mgr_install_file
            }, false).then(function () {
            universe.capturePath(caseName, 'oneKey_ha_mg.png', {top: 0, left: 0, width: 1440, height: 1024});
        });

    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click save button !');
        this.thenClick('div#onekey-manage-ha-manager-environ-modal button.btn.save', function () {
            this.test.assertVisible('div.dialog.confirm', ' click the save button success!');
            universe.capturePath(caseName, 'submit_list.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.thenClick("div.dialog.confirm button.btn.confirm", function () {
            this.test.comment("waiting install finish ......");
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //检测安装组件是否正常运行
                // universe.casper.then(function () {
                //     this.test.comment('reload the page !');
                //     var checkfun = function (nums, times) {
                //         if (nums == 2 && times <= 20) {
                //             universe.casper.test.assert(true, 'All installed moudles is running !');
                //             universe.capturePath(caseName, 'all_running.png');
                //         } else if (nums < 2 && times == 20) {
                //             universe.capturePath(caseName, 'Error_not_all_running.png');
                //             universe.casper.test.assert(false, 'Installed modules is not all running !');
                //         } else {
                //             universe.casper.wait(2000);
                //             universe.casper.reload(function () {
                //                 this.waitUntilVisible(
                //                     {
                //                         type: 'xpath',
                //                         path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                //                     },
                //                     function () {
                //                         this.test.assert(true, 'added server appear on page!');
                //                         universe.capturePath(caseName, 'server_appear_on_page.png', {
                //                             top: 0,
                //                             left: 0,
                //                             width: 1440,
                //                             height: 1024
                //                         });
                //                     },
                //                     function () {
                //                         universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                //                             top: 0,
                //                             left: 0,
                //                             width: 1440,
                //                             height: 1024
                //                         });
                //                         this.test.assert(false, 'added server not appear on page!');
                //                     }, 240000);
                //             }).then(function () {
                //                 temp1 = universe.checkIPMI_ModuleStatus(caseName, server_ip, 'uguard-mgr_status', '运行');
                //                 temp2 = universe.checkIPMI_ModuleStatus(caseName, server_ip, 'urman-mgr_status', '运行');
                //                 nums = temp1 + temp2;
                //                 times++;
                //                 this.test.comment(nums + '  modules are running !');
                //                 this.test.comment('Refresh the page for the ' + times + ' time !');
                //                 return checkfun(nums, times);
                //             });
                //         }
                //     };
                //
                //     checkfun(0, 0);
                // });
                universe.refreshWaitElement(caseName, server_ip, 'uguard-mgr_status', '运行', 0);
                universe.refreshWaitElement(caseName, server_ip, 'urman-mgr_status', '运行', 0);

            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });
};

//卸载单个组件
exports.remove_module = function (caseName, server_ip, Uguard_mgr, data) {


    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断卸载组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='uninstall-component-btn']")) {
            this.thenClick("button#uninstall-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click uninstall button!');
            });
        } else {
            universe.capturePath(caseName, 'uninstall_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'uninstall disable !');
        }
    });

    //点击卸载组件
    universe.casper.then(function () {
        this.test.comment('click uninstall module button !');
        this.thenClick('button#uninstall-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the uninstall module button !');
        });
    });

    //等待卸载组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog comp-modal']//h3[contains(text(),'卸载组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'component modal dialog popUp ! ');
                universe.capturePath(caseName, 'component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'component modal dialog popUp ! ');
            },
            240000
        );
    });

    //选择要卸载的组件
    universe.casper.then(function () {
        this.test.comment('select the remove module !');

        this.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='uninstall-component-modal']//label[text()=\'" + Uguard_mgr + "\']"
            }, function () {
                universe.capturePath(caseName, 'selected_uninstall_component.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            });
        //this.clickLabel(Uguard_mgr, 'label');
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#uninstall-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //检测是否卸载成功
                universe.casper.then(function () {
                    this.test.comment('check the module  uninstall success !');
                    universe.casper.waitForSelectorTextChange(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/..//td[@data=\'" + data + "\']"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'unInstall ' + data + ' success !');
                            universe.capturePath(caseName, 'unInstall_' + data + '_success.png');
                        },
                        function () {
                            universe.capturePath(caseName, 'unInstall_' + data + '_failed.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'unInstall' + data + ' failed !');
                        },
                        240000
                    );
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//安装单个uDeploy组件
exports.install_single_uDeploy_module = function (caseName, server_ip, component, path, id, install_file, data) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断安装组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='install-component-btn']")) {
            this.thenClick("button#install-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click install button!');
            });
        } else {
            universe.capturePath(caseName, 'install_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'install disable !');
        }
    });

    //点击安装组件
    universe.casper.then(function () {
        this.test.comment('click install module button !');
        this.thenClick('button#install-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the install module button !');
        });
    });

    //等待安装组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='install-component-modal']//h3[contains(text(),'安装组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'install component modal dialog popUp ! ');
                universe.capturePath(caseName, 'install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'install component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写安装组件的信息
    universe.casper.then(function () {
        this.test.comment('fill the install module info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'select#install_component': component
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //填写安装组件的剩余信息
    universe.casper.then(function () {
        this.test.comment('fill the install module other info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'input#udeploy_path': path,
                'input#udeploy_id': id,
                'select#udeploy_install_file': install_file
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info_1.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#install-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button  success !');
            universe.capturePath(caseName, 'finished_click_save_button.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //等待安装组件出现
                universe.casper.then(function () {
                    this.waitForSelectorTextChange(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/..//td[@data=\'" + data + "\']"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'Install ' + data + ' success !');
                            universe.capturePath(caseName, 'Install_' + data + '_success.png');
                        },
                        function () {
                            universe.capturePath(caseName, 'Install_' + data + '_failed.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'Install ' + data + ' failed !');
                        },
                        240000
                    );


                });

                //重新加载等待页面元素是否出现
                universe.casper.then(function () {
                    this.test.comment('reload the page !');
                    this.reload(function () {
                        this.waitUntilVisible(
                            {
                                type: 'xpath',
                                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                            },
                            function () {
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(true, 'added server appear on page!');
                                universe.capturePath(caseName, 'server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                            },
                            function () {
                                universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(false, 'added server not appear on page!');
                            }, 120000);
                    });
                });

                //重新加载页面等待启动成功
                universe.casper.then(function () {
                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='运行']", 120000);
                });

            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });
};

//安装umc组件
exports.install_single_umc_module = function (caseName, server_ip, component, path, id, install_file, data) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断安装组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='install-component-btn']")) {
            this.thenClick("button#install-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click install button!');
            });
        } else {
            universe.capturePath(caseName, 'install_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'install disable !');
        }
    });

    //点击安装组件
    universe.casper.then(function () {
        this.test.comment('click install module button !');
        this.thenClick('button#install-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the install module button !');
        });
    });

    //等待安装组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='install-component-modal']//h3[contains(text(),'安装组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'install component modal dialog popUp ! ');
                universe.capturePath(caseName, 'install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'install component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写安装组件的信息
    universe.casper.then(function () {
        this.test.comment('fill the install module info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'select#install_component': component
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //填写安装组件的剩余信息
    universe.casper.then(function () {
        this.test.comment('fill the install module other info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'input#umc_path': path,
                'input#umc_id': id,
                'select#umc_install_file': install_file
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info_1.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#install-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button  success !');
            universe.capturePath(caseName, 'finished_click_save_button.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //等待安装组件出现
                universe.casper.then(function () {
                    this.waitForSelectorTextChange(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/..//td[@data=\'" + data + "\']"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'Install ' + data + ' success !');
                            universe.capturePath(caseName, 'Install_' + data + '_success.png');
                        },
                        function () {
                            universe.capturePath(caseName, 'Install_' + data + '_failed.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'Install ' + data + ' failed !');
                        },
                        240000
                    );
                });

                universe.casper.then(function () {
                    this.test.comment('reload the page !');
                    this.reload(function () {
                        this.waitUntilVisible(
                            {
                                type: 'xpath',
                                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                            },
                            function () {
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(true, 'added server appear on page!');
                                universe.capturePath(caseName, 'server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                            },
                            function () {
                                universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(false, 'added server not appear on page!');
                            }, 120000);
                    });
                });

                //重新加载页面等待启动成功
                universe.casper.then(function () {

                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='运行']", 120000);

                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });


};

//安装uguard_mgr组件
exports.install_single_uGuard_mgr_module = function (caseName, server_ip, component, path, id, install_file, data) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断安装组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='install-component-btn']")) {
            this.thenClick("button#install-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click install button!');
            });
        } else {
            universe.capturePath(caseName, 'install_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'install disable !');
        }
    });

    //点击安装组件
    universe.casper.then(function () {
        this.test.comment('click install module button !');
        this.thenClick('button#install-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the install module button !');
        });
    });

    //等待安装组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='install-component-modal']//h3[contains(text(),'安装组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'install component modal dialog popUp ! ');
                universe.capturePath(caseName, 'install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'install component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写安装组件的信息
    universe.casper.then(function () {
        this.test.comment('fill the install module info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'select#install_component': component
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //填写安装组件的剩余信息
    universe.casper.then(function () {
        this.test.comment('fill the install module other info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'input#uguard-mgr_path': path,
                'input#uguard-mgr_id': id,
                'select#uguard-mgr_install_file': install_file
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info_1.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#install-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button  success !');
            universe.capturePath(caseName, 'finished_click_save_button.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');

                //等待安装组件出现
                universe.casper.then(function () {
                    this.waitForSelectorTextChange(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/..//td[@data=\'" + data + "\']"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'Install ' + data + ' success !');
                            universe.capturePath(caseName, 'Install_' + data + '_success.png');
                        },
                        function () {
                            universe.capturePath(caseName, 'Install_' + data + '_failed.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'Install ' + data + ' failed !');
                        },
                        240000
                    );


                });

                //重新加载等待页面元素是否出现
                universe.casper.then(function () {
                    this.test.comment('reload the page !');
                    this.reload(function () {
                        this.waitUntilVisible(
                            {
                                type: 'xpath',
                                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                            },
                            function () {
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(true, 'added server appear on page!');
                                universe.capturePath(caseName, 'server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                            },
                            function () {
                                universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(false, 'added server not appear on page!');
                            }, 120000);
                    });
                });

                //重新加载页面等待启动成功
                universe.casper.then(function () {

                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='运行']", 120000);

                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//安装uguard_agent组件
exports.install_single_uGuard_agent_module = function (caseName, server_ip, component, path, id, install_file, data) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断安装组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='install-component-btn']")) {
            this.thenClick("button#install-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click install button!');
            });
        } else {
            universe.capturePath(caseName, 'install_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'install disable !');
        }
    });

    //点击安装组件
    universe.casper.then(function () {
        this.test.comment('click install module button !');
        this.thenClick('button#install-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the install module button !');
        });
    });

    //等待安装组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='install-component-modal']//h3[contains(text(),'安装组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'install component modal dialog popUp ! ');
                universe.capturePath(caseName, 'install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'install component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写安装组件的信息
    universe.casper.then(function () {
        this.test.comment('fill the install module info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'select#install_component': component
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //填写安装组件的剩余信息
    universe.casper.then(function () {
        this.test.comment('fill the install module other info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'input#uguard-agent_path': path,
                'input#uguard-agent_id': id,
                'select#uguard-agent_install_file': install_file
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info_1.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#install-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button  success !');
            universe.capturePath(caseName, 'finished_click_save_button.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //等待安装组件出现
                universe.casper.then(function () {
                    this.waitForSelectorTextChange(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/..//td[@data=\'" + data + "\']"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'Install ' + data + ' success !');
                            universe.capturePath(caseName, 'Install_' + data + '_success.png');
                        },
                        function () {
                            universe.capturePath(caseName, 'Install_' + data + '_failed.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'Install ' + data + ' failed !');
                        },
                        240000
                    );


                });

                //重新加载等待页面元素是否出现
                universe.casper.then(function () {
                    this.test.comment('reload the page !');
                    this.reload(function () {
                        this.waitUntilVisible(
                            {
                                type: 'xpath',
                                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                            },
                            function () {
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(true, 'added server appear on page!');
                                universe.capturePath(caseName, 'server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                            },
                            function () {
                                universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(false, 'added server not appear on page!');
                            }, 120000);
                    });
                });

                //重新加载页面等待启动成功
                universe.casper.then(function () {

                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='运行']", 120000);

                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//安装ustats组件
exports.install_single_uStats_module = function (caseName, server_ip, component, path, id, install_file, data) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断安装组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='install-component-btn']")) {
            this.thenClick("button#install-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click install button!');
            });
        } else {
            universe.capturePath(caseName, 'install_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'install disable !');
        }
    });

    //点击安装组件
    universe.casper.then(function () {
        this.test.comment('click install module button !');
        this.thenClick('button#install-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the install module button !');
        });
    });

    //等待安装组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='install-component-modal']//h3[contains(text(),'安装组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'install component modal dialog popUp ! ');
                universe.capturePath(caseName, 'install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'install component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写安装组件的信息
    universe.casper.then(function () {
        this.test.comment('fill the install module info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'select#install_component': component
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //填写安装组件的剩余信息
    universe.casper.then(function () {
        this.test.comment('fill the install module other info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'input#ustats_path': path,
                'input#ustats_id': id,
                'select#ustats_install_file': install_file
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info_1.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#install-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button  success !');
            universe.capturePath(caseName, 'finished_click_save_button.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //等待安装组件出现
                universe.casper.then(function () {
                    this.waitForSelectorTextChange(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/..//td[@data=\'" + data + "\']"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'Install ' + data + ' success !');
                            universe.capturePath(caseName, 'Install_' + data + '_success.png');
                        },
                        function () {
                            universe.capturePath(caseName, 'Install_' + data + '_failed.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'Install ' + data + ' failed !');
                        },
                        240000
                    );


                });

                //重新加载等待页面元素是否出现
                universe.casper.then(function () {
                    this.test.comment('reload the page !');
                    this.reload(function () {
                        this.waitUntilVisible(
                            {
                                type: 'xpath',
                                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                            },
                            function () {
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(true, 'added server appear on page!');
                                universe.capturePath(caseName, 'server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                            },
                            function () {
                                universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(false, 'added server not appear on page!');
                            }, 120000);
                    });
                });

                //重新加载页面等待启动成功
                universe.casper.then(function () {

                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='运行']", 120000);

                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//安装umon组件
exports.install_single_uMon_module = function (caseName, server_ip, component, path, id, install_file, data) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断安装组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='install-component-btn']")) {
            this.thenClick("button#install-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click install button!');
            });
        } else {
            universe.capturePath(caseName, 'install_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'install disable !');
        }
    });

    //点击安装组件
    universe.casper.then(function () {
        this.test.comment('click install module button !');
        this.thenClick('button#install-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the install module button !');
        });
    });

    //等待安装组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='install-component-modal']//h3[contains(text(),'安装组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'install component modal dialog popUp ! ');
                universe.capturePath(caseName, 'install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'install component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写安装组件的信息
    universe.casper.then(function () {
        this.test.comment('fill the install module info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'select#install_component': component
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //填写安装组件的剩余信息
    universe.casper.then(function () {
        this.test.comment('fill the install module other info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'input#umon_path': path,
                'input#umon_id': id,
                'select#umon_install_file': install_file
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info_1.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#install-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button  success !');
            universe.capturePath(caseName, 'finished_click_save_button.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {

        // this.waitUntilVisible(
        //     {
        //         type: 'xpath',
        //         path: "//span[text()='操作成功']"
        //     },
        //     function () {
        //         universe.capturePath(caseName, 'task_success.png');
        //         this.test.assert(true, 'task success !');
        //         // //等待安装组件出现
        //         // universe.casper.then(function () {
        //         //     this.waitForSelectorTextChange(
        //         //         {
        //         //             type: 'xpath',
        //         //             path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/..//td[@data=\'" + data + "\']"
        //         //         },
        //         //         function () {
        //         //             this.test.assert(true, 'Install ' + data + ' success !');
        //         //             universe.capturePath(caseName, 'Install_' + data + '_success.png');
        //         //         },
        //         //         function () {
        //         //             universe.capturePath(caseName, 'Install_' + data + '_failed.png');
        //         //             this.test.assert(false, 'Install ' + data + ' failed !');
        //         //         },
        //         //         240000
        //         //     );
        //         //
        //         //
        //         // });
        //         //
        //         // //重新加载等待页面元素是否出现
        //         // universe.casper.then(function () {
        //         //     universe.casper.test.comment('reload the page !');
        //         //     this.reload(function () {
        //         //         this.waitUntilVisible(
        //         //             {
        //         //                 type: 'xpath',
        //         //                 path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
        //         //             },
        //         //             function () {
        //         //                 this.test.assert(true, 'added server appear on page!');
        //         //                 universe.capturePath(caseName, 'server_appear_on_page.png', {
        //         //                     top: 0,
        //         //                     left: 0,
        //         //                     width: 1440,
        //         //                     height: 1024
        //         //                 });
        //         //             },
        //         //             function () {
        //         //                 universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
        //         //                     top: 0,
        //         //                     left: 0,
        //         //                     width: 1440,
        //         //                     height: 1024
        //         //                 });
        //         //                 this.test.assert(false, 'added server not appear on page!');
        //         //             }, 240000);
        //         //     });
        //         // });
        //         //
        //         // //重新加载页面等待启动成功
        //         // universe.casper.then(function () {
        //         //
        //         //     universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='运行']", 120000);
        //         //
        //         // });
        //         universe.refreshWaitElement(caseName, server_ip, data, '运行', 0);
        //
        //     },
        //     function () {
        //         universe.capturePath(caseName, 'Error_task_success.png');
        //         this.test.assert(false, 'Error: task fail !');
        //     }, 120000
        // );
        universe.refreshWaitElement(caseName, server_ip, data, '运行', 0);
    });

};

//安装ulogstash
exports.install_single_uLogStash_module = function (caseName, server_ip, component, path, id, install_file, data) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断安装组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='install-component-btn']")) {
            this.thenClick("button#install-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click install button!');
            });
        } else {
            universe.capturePath(caseName, 'install_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'install disable !');
        }
    });

    //点击安装组件
    universe.casper.then(function () {
        this.test.comment('click install module button !');
        this.thenClick('button#install-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the install module button !');
        });
    });

    //等待安装组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='install-component-modal']//h3[contains(text(),'安装组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'install component modal dialog popUp ! ');
                universe.capturePath(caseName, 'install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'install component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写安装组件的信息
    universe.casper.then(function () {
        this.test.comment('fill the install module info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'select#install_component': component
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //填写安装组件的剩余信息
    universe.casper.then(function () {
        this.test.comment('fill the install module other info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'input#ulogstash_path': path,
                'input#ulogstash_id': id,
                'select#ulogstash_install_file': install_file
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info_1.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#install-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button  success !');
            universe.capturePath(caseName, 'finished_click_save_button.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //等待安装组件出现
                universe.casper.then(function () {
                    this.waitForSelectorTextChange(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/..//td[@data=\'" + data + "\']"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'Install ' + data + ' success !');
                            universe.capturePath(caseName, 'Install_' + data + '_success.png');
                        },
                        function () {
                            universe.capturePath(caseName, 'Install_' + data + '_failed.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'Install ' + data + ' failed !');
                        },
                        240000
                    );


                });

                //重新加载等待页面元素是否出现
                universe.casper.then(function () {
                    this.test.comment('reload the page !');
                    this.reload(function () {
                        this.waitUntilVisible(
                            {
                                type: 'xpath',
                                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                            },
                            function () {
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(true, 'added server appear on page!');
                                universe.capturePath(caseName, 'server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                            },
                            function () {
                                universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(false, 'added server not appear on page!');
                            }, 120000);
                    });
                });

                //重新加载页面等待启动成功
                universe.casper.then(function () {

                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='运行']", 120000);

                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//安装uelasticsearch组件
exports.install_single_uElasticSearch_module = function (caseName, server_ip, component, path, id, install_file, data) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断安装组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='install-component-btn']")) {
            this.thenClick("button#install-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click install button!');
            });
        } else {
            universe.capturePath(caseName, 'install_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'install disable !');
        }
    });

    //点击安装组件
    universe.casper.then(function () {
        this.test.comment('click install module button !');
        this.thenClick('button#install-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the install module button !');
        });
    });

    //等待安装组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='install-component-modal']//h3[contains(text(),'安装组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'install component modal dialog popUp ! ');
                universe.capturePath(caseName, 'install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'install component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写安装组件的信息
    universe.casper.then(function () {
        this.test.comment('fill the install module info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'select#install_component': component
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //填写安装组件的剩余信息
    universe.casper.then(function () {
        this.test.comment('fill the install module other info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'input#uelasticsearch_path': path,
                'input#uelasticsearch_id': id,
                'select#uelasticsearch_install_file': install_file
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info_1.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#install-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button  success !');
            universe.capturePath(caseName, 'finished_click_save_button.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //等待安装组件出现
                universe.casper.then(function () {
                    this.waitForSelectorTextChange(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/..//td[@data=\'" + data + "\']"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'Install ' + data + ' success !');
                            universe.capturePath(caseName, 'Install_' + data + '_success.png');
                        },
                        function () {
                            universe.capturePath(caseName, 'Install_' + data + '_failed.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'Install ' + data + ' failed !');
                        },
                        240000
                    );


                });

                //重新加载等待页面元素是否出现
                universe.casper.then(function () {
                    this.test.comment('reload the page !');
                    this.reload(function () {
                        this.waitUntilVisible(
                            {
                                type: 'xpath',
                                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                            },
                            function () {
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(true, 'added server appear on page!');
                                universe.capturePath(caseName, 'server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                            },
                            function () {
                                universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(false, 'added server not appear on page!');
                            }, 120000);
                    });
                });

                //重新加载页面等待启动成功
                universe.casper.then(function () {

                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='运行']", 120000);

                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });


};

//安装urman-mgr组件
exports.install_single_urMan_mgr_module = function (caseName, server_ip, component, path, id, install_file, data) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断安装组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='install-component-btn']")) {
            this.thenClick("button#install-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click install button!');
            });
        } else {
            universe.capturePath(caseName, 'install_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'install disable !');
        }
    });

    //点击安装组件
    universe.casper.then(function () {
        this.test.comment('click install module button !');
        this.thenClick('button#install-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the install module button !');
        });
    });

    //等待安装组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='install-component-modal']//h3[contains(text(),'安装组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'install component modal dialog popUp ! ');
                universe.capturePath(caseName, 'install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'install component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写安装组件的信息
    universe.casper.then(function () {
        this.test.comment('fill the install module info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'select#install_component': component
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //填写安装组件的剩余信息
    universe.casper.then(function () {
        this.test.comment('fill the install module other info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'input#urman-mgr_path': path,
                'input#urman-mgr_id': id,
                'select#urman-mgr_install_file': install_file
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info_1.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#install-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button  success !');
            universe.capturePath(caseName, 'finished_click_save_button.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //等待安装组件出现
                universe.casper.then(function () {
                    this.waitForSelectorTextChange(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/..//td[@data=\'" + data + "\']"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'Install ' + data + ' success !');
                            universe.capturePath(caseName, 'Install_' + data + '_success.png');
                        },
                        function () {
                            universe.capturePath(caseName, 'Install_' + data + '_failed.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'Install ' + data + ' failed !');
                        },
                        240000
                    );


                });

                //重新加载等待页面元素是否出现
                universe.casper.then(function () {
                    this.test.comment('reload the page !');
                    this.reload(function () {
                        this.waitUntilVisible(
                            {
                                type: 'xpath',
                                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                            },
                            function () {
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(true, 'added server appear on page!');
                                universe.capturePath(caseName, 'server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                            },
                            function () {
                                universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(false, 'added server not appear on page!');
                            }, 120000);
                    });
                });

                //重新加载页面等待启动成功
                universe.casper.then(function () {

                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='运行']", 120000);

                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//安装urman-agent组件
exports.install_single_urMan_agent_module = function (caseName, server_ip, component, path, id, install_file, max_num, data) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断安装组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='install-component-btn']")) {
            this.thenClick("button#install-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click install button!');
            });
        } else {
            universe.capturePath(caseName, 'install_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'install disable !');
        }
    });

    //点击安装组件
    universe.casper.then(function () {
        this.test.comment('click install module button !');
        this.thenClick('button#install-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the install module button !');
        });
    });

    //等待安装组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='install-component-modal']//h3[contains(text(),'安装组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'install component modal dialog popUp ! ');
                universe.capturePath(caseName, 'install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'install component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写安装组件的信息
    universe.casper.then(function () {
        this.test.comment('fill the install module info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'select#install_component': component
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //填写安装组件的剩余信息
    universe.casper.then(function () {
        this.test.comment('fill the install module other info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'input#urman-agent_path': path,
                'input#urman-agent_id': id,
                'select#urman-agent_install_file': install_file,
                'input#max-backup-concurrency-num': max_num
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info_1.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#install-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button  success !');
            universe.capturePath(caseName, 'finished_click_save_button.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //等待安装组件出现
                universe.casper.then(function () {
                    this.waitForSelectorTextChange(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/..//td[@data=\'" + data + "\']"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'Install ' + data + ' success !');
                            universe.capturePath(caseName, 'Install_' + data + '_success.png');
                        },
                        function () {
                            universe.capturePath(caseName, 'Install_' + data + '_failed.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'Install ' + data + ' failed !');
                        },
                        240000
                    );


                });

                //重新加载等待页面元素是否出现
                universe.casper.then(function () {
                    this.test.comment('reload the page !');
                    this.reload(function () {
                        this.waitUntilVisible(
                            {
                                type: 'xpath',
                                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                            },
                            function () {
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(true, 'added server appear on page!');
                                universe.capturePath(caseName, 'server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                            },
                            function () {
                                universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(false, 'added server not appear on page!');
                            }, 120000);
                    });
                });

                //重新加载页面等待启动成功
                universe.casper.then(function () {

                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='运行']", 120000);

                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//安装uterm组件
exports.install_single_uTerm_module = function (caseName, server_ip, component, path, id, install_file, data) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断安装组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='install-component-btn']")) {
            this.thenClick("button#install-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click install button!');
            });
        } else {
            universe.capturePath(caseName, 'install_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'install disable !');
        }
    });

    //点击安装组件
    universe.casper.then(function () {
        this.test.comment('click install module button !');
        this.thenClick('button#install-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the install module button !');
        });
    });

    //等待安装组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='install-component-modal']//h3[contains(text(),'安装组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'install component modal dialog popUp ! ');
                universe.capturePath(caseName, 'install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'install component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写安装组件的信息
    universe.casper.then(function () {
        this.test.comment('fill the install module info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'select#install_component': component
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //填写安装组件的剩余信息
    universe.casper.then(function () {
        this.test.comment('fill the install module other info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'input#uterm_path': path,
                'input#uterm_id': id,
                'select#uterm_install_file': install_file
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info_1.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#install-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button  success !');
            universe.capturePath(caseName, 'finished_click_save_button.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');

                //等待安装组件出现
                universe.casper.then(function () {
                    this.waitForSelectorTextChange(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/..//td[@data=\'" + data + "\']"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'Install ' + data + ' success !');
                            universe.capturePath(caseName, 'Install_' + data + '_success.png');
                        },
                        function () {
                            universe.capturePath(caseName, 'Install_' + data + '_failed.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'Install ' + data + ' failed !');
                        },
                        240000
                    );


                });

                //重新加载等待页面元素是否出现
                universe.casper.then(function () {
                    this.test.comment('reload the page !');
                    this.reload(function () {
                        this.waitUntilVisible(
                            {
                                type: 'xpath',
                                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                            },
                            function () {
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(true, 'added server appear on page!');
                                universe.capturePath(caseName, 'server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                            },
                            function () {
                                universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(false, 'added server not appear on page!');
                            }, 120000);
                    });
                });

                //重新加载页面等待启动成功
                universe.casper.then(function () {

                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='运行']", 120000);

                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//安装uSql
exports.install_single_uSql_module = function (caseName, server_ip, component, path, id, install_file, data) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断安装组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='install-component-btn']")) {
            this.thenClick("button#install-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click install button!');
            });
        } else {
            universe.capturePath(caseName, 'install_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'install disable !');
        }
    });

    //点击安装组件
    universe.casper.then(function () {
        this.test.comment('click install module button !');
        this.thenClick('button#install-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the install module button !');
        });
    });

    //等待安装组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='install-component-modal']//h3[contains(text(),'安装组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'install component modal dialog popUp ! ');
                universe.capturePath(caseName, 'install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'install component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写安装组件的信息
    universe.casper.then(function () {
        this.test.comment('fill the install module info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'select#install_component': component
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //填写安装组件的剩余信息
    universe.casper.then(function () {
        this.test.comment('fill the install module other info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'input#usql_path': path,
                'input#usql_id': id,
                'select#usql_install_file': install_file
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info_1.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#install-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button  success !');
            universe.capturePath(caseName, 'finished_click_save_button.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');

                //等待安装组件出现
                universe.casper.then(function () {
                    this.waitForSelectorTextChange(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/..//td[@data=\'" + data + "\']"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'Install ' + data + ' success !');
                            universe.capturePath(caseName, 'Install_' + data + '_success.png');
                        },
                        function () {
                            universe.capturePath(caseName, 'Install_' + data + '_failed.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'Install ' + data + ' failed !');
                        },
                        240000
                    );


                });

                //重新加载等待页面元素是否出现
                universe.casper.then(function () {
                    this.test.comment('reload the page !');
                    this.reload(function () {
                        this.waitUntilVisible(
                            {
                                type: 'xpath',
                                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                            },
                            function () {
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(true, 'added server appear on page!');
                                universe.capturePath(caseName, 'server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                            },
                            function () {
                                universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(false, 'added server not appear on page!');
                            }, 120000);
                    });
                });

                //重新加载页面等待启动成功
                universe.casper.then(function () {

                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='运行']", 120000);

                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//安装uRds
exports.install_single_uRds_module = function (caseName, server_ip, component, path, id, install_file, data) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断安装组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='install-component-btn']")) {
            this.thenClick("button#install-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click install button!');
            });
        } else {
            universe.capturePath(caseName, 'install_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'install disable !');
        }
    });

    //点击安装组件
    universe.casper.then(function () {
        this.test.comment('click install module button !');
        this.thenClick('button#install-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the install module button !');
        });
    });

    //等待安装组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='install-component-modal']//h3[contains(text(),'安装组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'install component modal dialog popUp ! ');
                universe.capturePath(caseName, 'install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_install_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'install component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写安装组件的信息
    universe.casper.then(function () {
        this.test.comment('fill the install module info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'select#install_component': component
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //填写安装组件的剩余信息
    universe.casper.then(function () {
        this.test.comment('fill the install module other info !');
        this.fillSelectors('div#install-component-modal form',
            {
                'input#urds_path': path,
                'input#urds_id': id,
                'select#urds_install_file': install_file
            }, false).then(function () {
            universe.capturePath(caseName, 'finshed_fill_info_1.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#install-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button  success !');
            universe.capturePath(caseName, 'finished_click_save_button.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');

                //等待安装组件出现
                universe.casper.then(function () {
                    this.waitForSelectorTextChange(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/..//td[@data=\'" + data + "\']"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'Install ' + data + ' success !');
                            universe.capturePath(caseName, 'Install_' + data + '_success.png');
                        },
                        function () {
                            universe.capturePath(caseName, 'Install_' + data + '_failed.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'Install ' + data + ' failed !');
                        },
                        240000
                    );


                });

                //重新加载等待页面元素是否出现
                universe.casper.then(function () {
                    this.test.comment('reload the page !');
                    this.reload(function () {
                        this.waitUntilVisible(
                            {
                                type: 'xpath',
                                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                            },
                            function () {
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(true, 'added server appear on page!');
                                universe.capturePath(caseName, 'server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                            },
                            function () {
                                universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                                    top: 0,
                                    left: 0,
                                    width: 1440,
                                    height: 1024
                                });
                                var myDate = new Date();
                                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                                this.test.assert(false, 'added server not appear on page!');
                            }, 120000);
                    });
                });

                //重新加载页面等待启动成功
                universe.casper.then(function () {

                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='运行']", 120000);

                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//停用组件
exports.pause_module = function (caseName, server_ip, moduleName, data) {

    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断停用组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the pause component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='pause-component-btn']")) {
            this.thenClick("button#pause-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click pause component button!');
            });
        } else {
            universe.capturePath(caseName, 'pause_component_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'pause component button disable !');
        }
    });

    //点击停用组件
    universe.casper.then(function () {
        this.test.comment('click pause component module button !');
        this.thenClick('button#pause-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the pause component button !');
        });
    });

    //等待停用组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='pause-component-modal']//h3[contains(text(),'停用组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'pause component modal dialog popUp ! ');
                universe.capturePath(caseName, 'pause_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_pause_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'pause component modal dialog popUp ! ');
            },
            240000
        );
    });

    //选择要停用的组件
    universe.casper.then(function () {
        this.test.comment('select the pause module !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='pause-component-modal']//label[text()=\'" + moduleName + "\']"
            }, function () {
                universe.capturePath(caseName, 'selected_pause_component.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#pause-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        universe.casper.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //等待停用完成
                this.reload(function () {
                    universe.casper.then(function () {
                        universe.casper.waitForSelector(
                            {
                                type: 'xpath',
                                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='停止']"
                            },
                            function () {
                                universe.casper.test.assert(true, 'stop ' + moduleName + ' success !');
                                universe.capturePath(caseName, 'stop_' + moduleName + '_success.png');
                                universe.captureSelectorPath(caseName, 'stop_' + moduleName + '_success_2.png',
                                    {
                                        type: 'xpath',
                                        path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='停止']"
                                    });
                            },
                            function () {
                                universe.capturePath(caseName, 'Error_stop_' + moduleName + '_success.png');
                                universe.captureSelectorPath(caseName, 'Error_stop_' + moduleName + '_success_2.png',
                                    {
                                        type: 'xpath',
                                        path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\']"
                                    });
                                universe.casper.test.assert(false, 'Error: stop ' + moduleName + " failed !");
                            }, 120000
                        );
                    });
                });

            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });
    // //等待停用完成
    // universe.casper.then(function () {
    //     this.waitForSelector(
    //         {
    //             type: 'xpath',
    //             path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='停止']"
    //         },
    //         function () {
    //             this.test.assert(true, 'stop ' + moduleName + ' success !');
    //             universe.capturePath(caseName, 'stop_' + moduleName + '_success.png');
    //         },
    //         function () {
    //             universe.capturePath(caseName, 'Error_stop_' + moduleName + '_success.png');
    //             this.test.assert(false, 'Error: stop ' + moduleName + " failed !");
    //         }, 120000
    //     );
    //
    // });
};

//启用组件
exports.start_module = function (caseName, server_ip, moduleName, data) {

    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断启用组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the start component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='start-component-btn']")) {
            this.thenClick("button#start-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click start component button!');
            });
        } else {
            universe.capturePath(caseName, 'start_component_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'start component button disable !');
        }
    });

    //点击启用组件
    universe.casper.then(function () {
        this.test.comment('click start component module button !');
        this.thenClick('button#start-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the start  component button !');
        });
    });

    //等待启用组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='start-component-modal']//h3[contains(text(),'启用组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'start component modal dialog popUp ! ');
                universe.capturePath(caseName, 'start_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_start_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'start component modal dialog popUp ! ');
            },
            240000
        );
    });

    //选择要启用的组件
    universe.casper.then(function () {
        this.test.comment('select the start module !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='start-component-modal']//label[text()=\'" + moduleName + "\']"
            }, function () {
                universe.capturePath(caseName, 'selected_start_component.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#start-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                universe.captureSelectorPath(caseName, 'start' + moduleName + '_success_2.png',
                    {
                        type: 'xpath',
                        path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\']"
                    });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //重新加载等待页面元素是否出现
                // universe.casper.then(function () {
                //     this.test.comment('reload the page !');
                //     this.reload(function () {
                //         this.waitUntilVisible(
                //             {
                //                 type: 'xpath',
                //                 path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                //             },
                //             function () {
                //                 this.test.assert(true, 'added server appear on page!');
                //                 universe.capturePath(caseName, 'server_appear_on_page.png', {
                //                     top: 0,
                //                     left: 0,
                //                     width: 1440,
                //                     height: 1024
                //                 });
                //             },
                //             function () {
                //                 universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                //                     top: 0,
                //                     left: 0,
                //                     width: 1440,
                //                     height: 1024
                //                 });
                //                 this.test.assert(false, 'added server not appear on page!');
                //             }, 240000);
                //     });
                // });
                //重新加载页面等待启动成功
                universe.casper.then(function () {
                    this.reload(function () {
                        universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\'][text()='运行']", 120000);
                    });
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                universe.captureSelectorPath(caseName, 'Error_start' + moduleName + '_success_2.png',
                    {
                        type: 'xpath',
                        path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\']"
                    });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });
    //等待启动完成
    // universe.casper.then(function () {
    //     var refreshAndCheck = function (text,times) {
    //         if (text == '运行' && times <= 6) {
    //             universe.casper.test.assert(true, ' start ' + moduleName + ' success !');
    //             universe.capturePath(caseName,'start_'+moduleName+'_success.png');
    //         }else if(text !='运行' && times == 6){
    //             universe.capturePath(caseName,'Error_start_'+moduleName+'_success.png');
    //             universe.casper.test.assert(false, 'start ' + moduleName + ' failed !');
    //         } else if(text !='运行' && times < 6) {
    //             universe.casper.thenClick('div.actionBtn button.btn.refresh', function () {
    //                 universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\']", 240000);
    //                 this.wait(5000);
    //                 text = this.evaluate(function (server_ip, data) {
    //                     return __utils__.getElementByXPath("//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\']").innerText;
    //                 }, server_ip, data);
    //                 times++;
    //                 this.test.comment(text);
    //                 this.test.comment(times);
    //                 return refreshAndCheck(text,times);
    //             });
    //         }
    //     };
    //     refreshAndCheck('',0);
    // });
};

//uDeploy组件升级
exports.update_uDeploy_module = function (caseName, server_ip, moduleName, version) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断升级组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the update component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='update-component-btn']")) {
            this.thenClick("button#update-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click update component button!');
            });
        } else {
            universe.capturePath(caseName, 'update_component_disable.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'update component button disable !');
        }
    });

    //点击升级组件
    universe.casper.then(function () {
        this.test.comment('click update component module button !');
        this.thenClick('button#update-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the update  component button !');
        });
    });

    //等待升级组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='update-component-modal']//h3[contains(text(),'升级组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'update component modal dialog popUp ! ');
                universe.capturePath(caseName, 'update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'update component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写升级的组件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#update_component': moduleName
            }, false);
        universe.capturePath(caseName, 'fill_update_component.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //填写升级组件的文件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#udeploy_update_file': version
            }, false);
        universe.capturePath(caseName, 'fill_update_component_1.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#update-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });


};

//uelasticsearch组件升级
exports.update_uElasticsearch_module = function (caseName, server_ip, moduleName, version) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断升级组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the update component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='update-component-btn']")) {
            this.thenClick("button#update-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click update component button!');
            });
        } else {
            universe.capturePath(caseName, 'update_component_disable.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'update component button disable !');
        }
    });

    //点击升级组件
    universe.casper.then(function () {
        this.test.comment('click update component module button !');
        this.thenClick('button#update-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the update  component button !');
        });
    });

    //等待升级组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='update-component-modal']//h3[contains(text(),'升级组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'update component modal dialog popUp ! ');
                universe.capturePath(caseName, 'update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'update component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写升级的组件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#update_component': moduleName
            }, false);
        universe.capturePath(caseName, 'fill_update_component.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //填写升级组件的文件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#uelasticsearch_update_file': version
            }, false);
        universe.capturePath(caseName, 'fill_update_component_1.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#update-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//uguard-agent组件升级
exports.update_uGuard_agent_module = function (caseName, server_ip, moduleName, version) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断升级组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the update component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='update-component-btn']")) {
            this.thenClick("button#update-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click update component button!');
            });
        } else {
            universe.capturePath(caseName, 'update_component_disable.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'update component button disable !');
        }
    });

    //点击升级组件
    universe.casper.then(function () {
        this.test.comment('click update component module button !');
        this.thenClick('button#update-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the update  component button !');
        });
    });

    //等待升级组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='update-component-modal']//h3[contains(text(),'升级组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'update component modal dialog popUp ! ');
                universe.capturePath(caseName, 'update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'update component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写升级的组件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#update_component': moduleName
            }, false);
        universe.capturePath(caseName, 'fill_update_component.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //填写升级组件的文件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#uguard-agent_update_file': version
            }, false);
        universe.capturePath(caseName, 'fill_update_component_1.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#update-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//uguard_mgr组件升级
exports.update_uGuard_mgr_module = function (caseName, server_ip, moduleName, version) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断升级组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the update component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='update-component-btn']")) {
            this.thenClick("button#update-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click update component button!');
            });
        } else {
            universe.capturePath(caseName, 'update_component_disable.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'update component button disable !');
        }
    });

    //点击升级组件
    universe.casper.then(function () {
        this.test.comment('click update component module button !');
        this.thenClick('button#update-component-btn', function () {
            this.test.assert(true, 'click the update  component button !');
        });
    });

    //等待升级组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='update-component-modal']//h3[contains(text(),'升级组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'update component modal dialog popUp ! ');
                universe.capturePath(caseName, 'update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'update component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写升级的组件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#update_component': moduleName
            }, false);
        universe.capturePath(caseName, 'fill_update_component.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //填写升级组件的文件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#uguard-mgr_update_file': version
            }, false);
        universe.capturePath(caseName, 'fill_update_component_1.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#update-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//ulogstash组件升级
exports.update_uLogstash_module = function (caseName, server_ip, moduleName, version) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断升级组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the update component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='update-component-btn']")) {
            this.thenClick("button#update-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click update component button!');
            });
        } else {
            universe.capturePath(caseName, 'update_component_disable.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'update component button disable !');
        }
    });

    //点击升级组件
    universe.casper.then(function () {
        this.test.comment('click update component module button !');
        this.thenClick('button#update-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the update  component button !');
        });
    });

    //等待升级组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='update-component-modal']//h3[contains(text(),'升级组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'update component modal dialog popUp ! ');
                universe.capturePath(caseName, 'update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'update component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写升级的组件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#update_component': moduleName
            }, false);
        universe.capturePath(caseName, 'fill_update_component.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //填写升级组件的文件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#ulogstash_update_file': version
            }, false);
        universe.capturePath(caseName, 'fill_update_component_1.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#update-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//umon组件升级
exports.update_uMon_module = function (caseName, server_ip, moduleName, version) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断升级组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the update component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='update-component-btn']")) {
            this.thenClick("button#update-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click update component button!');
            });
        } else {
            universe.capturePath(caseName, 'update_component_disable.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'update component button disable !');
        }
    });

    //点击升级组件
    universe.casper.then(function () {
        this.test.comment('click update component module button !');
        this.thenClick('button#update-component-btn', function () {
            this.test.assert(true, 'click the update  component button !');
        });
    });

    //等待升级组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='update-component-modal']//h3[contains(text(),'升级组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'update component modal dialog popUp ! ');
                universe.capturePath(caseName, 'update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'update component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写升级的组件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#update_component': moduleName
            }, false);
        universe.capturePath(caseName, 'fill_update_component.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //填写升级组件的文件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#umon_update_file': version
            }, false);
        universe.capturePath(caseName, 'fill_update_component_1.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#update-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//urds组件升级
exports.update_uRds_module = function (caseName, server_ip, moduleName, version) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断升级组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the update component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='update-component-btn']")) {
            this.thenClick("button#update-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click update component button!');
            });
        } else {
            universe.capturePath(caseName, 'update_component_disable.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'update component button disable !');
        }
    });

    //点击升级组件
    universe.casper.then(function () {
        this.test.comment('click update component module button !');
        this.thenClick('button#update-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the update  component button !');
        });
    });

    //等待升级组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='update-component-modal']//h3[contains(text(),'升级组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'update component modal dialog popUp ! ');
                universe.capturePath(caseName, 'update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'update component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写升级的组件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#update_component': moduleName
            }, false);
        universe.capturePath(caseName, 'fill_update_component.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //填写升级组件的文件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#urds_update_file': version
            }, false);
        universe.capturePath(caseName, 'fill_update_component_1.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#update-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//urman-agent组件升级
exports.update_uRman_agent_module = function (caseName, server_ip, moduleName, version) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断升级组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the update component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='update-component-btn']")) {
            this.thenClick("button#update-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click update component button!');
            });
        } else {
            universe.capturePath(caseName, 'update_component_disable.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'update component button disable !');
        }
    });

    //点击升级组件
    universe.casper.then(function () {
        this.test.comment('click update component module button !');
        this.thenClick('button#update-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the update  component button !');
        });
    });

    //等待升级组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='update-component-modal']//h3[contains(text(),'升级组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'update component modal dialog popUp ! ');
                universe.capturePath(caseName, 'update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'update component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写升级的组件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#update_component': moduleName
            }, false);
        universe.capturePath(caseName, 'fill_update_component.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //填写升级组件的文件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#urman-agent_update_file': version
            }, false);
        universe.capturePath(caseName, 'fill_update_component_1.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#update-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//urman-mgr组件升级
exports.update_uRman_mgr_module = function (caseName, server_ip, moduleName, version) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断升级组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the update component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='update-component-btn']")) {
            this.thenClick("button#update-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click update component button!');
            });
        } else {
            universe.capturePath(caseName, 'update_component_disable.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'update component button disable !');
        }
    });

    //点击升级组件
    universe.casper.then(function () {
        this.test.comment('click update component module button !');
        this.thenClick('button#update-component-btn', function () {
            this.test.assert(true, 'click the update  component button !');
        });
    });

    //等待升级组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='update-component-modal']//h3[contains(text(),'升级组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'update component modal dialog popUp ! ');
                universe.capturePath(caseName, 'update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'update component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写升级的组件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#update_component': moduleName
            }, false);
        universe.capturePath(caseName, 'fill_update_component.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //填写升级组件的文件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#urman-mgr_update_file': version
            }, false);
        universe.capturePath(caseName, 'fill_update_component_1.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#update-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//urman-agent组件升级
exports.update_uRman_agent_module = function (caseName, server_ip, moduleName, version) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断升级组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the update component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='update-component-btn']")) {
            this.thenClick("button#update-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click update component button!');
            });
        } else {
            universe.capturePath(caseName, 'update_component_disable.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'update component button disable !');
        }
    });

    //点击升级组件
    universe.casper.then(function () {
        this.test.comment('click update component module button !');
        this.thenClick('button#update-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the update  component button !');
        });
    });

    //等待升级组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='update-component-modal']//h3[contains(text(),'升级组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'update component modal dialog popUp ! ');
                universe.capturePath(caseName, 'update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'update component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写升级的组件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#update_component': moduleName
            }, false);
        universe.capturePath(caseName, 'fill_update_component.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //填写升级组件的文件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#urman-agent_update_file': version
            }, false);
        universe.capturePath(caseName, 'fill_update_component_1.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#update-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//term组件升级
exports.update_uTerm_module = function (caseName, server_ip, moduleName, version) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断升级组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the update component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='update-component-btn']")) {
            this.thenClick("button#update-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click update component button!');
            });
        } else {
            universe.capturePath(caseName, 'update_component_disable.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'update component button disable !');
        }
    });

    //点击升级组件
    universe.casper.then(function () {
        this.test.comment('click update component module button !');
        this.thenClick('button#update-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the update  component button !');
        });
    });

    //等待升级组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='update-component-modal']//h3[contains(text(),'升级组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'update component modal dialog popUp ! ');
                universe.capturePath(caseName, 'update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'update component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写升级的组件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#update_component': moduleName
            }, false);
        universe.capturePath(caseName, 'fill_update_component.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //填写升级组件的文件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#uterm_update_file': version
            }, false);
        universe.capturePath(caseName, 'fill_update_component_1.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#update-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//usql组件升级
exports.update_uSql_module = function (caseName, server_ip, moduleName, version) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断升级组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the update component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='update-component-btn']")) {
            this.thenClick("button#update-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click update component button!');
            });
        } else {
            universe.capturePath(caseName, 'update_component_disable.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'update component button disable !');
        }
    });

    //点击升级组件
    universe.casper.then(function () {
        this.test.comment('click update component module button !');
        this.thenClick('button#update-component-btn', function () {
            this.test.assert(true, 'click the update  component button !');
        });
    });

    //等待升级组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='update-component-modal']//h3[contains(text(),'升级组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'update component modal dialog popUp ! ');
                universe.capturePath(caseName, 'update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'update component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写升级的组件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#update_component': moduleName
            }, false);
        universe.capturePath(caseName, 'fill_update_component.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //填写升级组件的文件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#usql_update_file': version
            }, false);
        universe.capturePath(caseName, 'fill_update_component_1.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#update-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//ustats组件升级
exports.update_uStats_module = function (caseName, server_ip, moduleName, version) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断升级组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the update component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='update-component-btn']")) {
            this.thenClick("button#update-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click update component button!');
            });
        } else {
            universe.capturePath(caseName, 'update_component_disable.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'update component button disable !');
        }
    });

    //点击升级组件
    universe.casper.then(function () {
        this.test.comment('click update component module button !');
        this.thenClick('button#update-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the update  component button !');
        });
    });

    //等待升级组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='update-component-modal']//h3[contains(text(),'升级组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'update component modal dialog popUp ! ');
                universe.capturePath(caseName, 'update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'update component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写升级的组件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#update_component': moduleName
            }, false);
        universe.capturePath(caseName, 'fill_update_component.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //填写升级组件的文件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#ustats_update_file': version
            }, false);
        universe.capturePath(caseName, 'fill_update_component_1.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#update-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//umc组件升级
exports.update_uMc_module = function (caseName, server_ip, moduleName, version) {
    //重新加载等待页面元素是否出现
    universe.casper.then(function () {
        this.test.comment('reload the page !');
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, 'added server appear on page!');
                    universe.capturePath(caseName, 'server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_server_appear_on_page.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, 'added server not appear on page!');
                }, 120000);
        });
    });

    //选择server
    universe.casper.then(function () {
        this.test.comment('select the server !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + server_ip + "\']"
            }, function () {
                universe.capturePath(caseName, 'select_server.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //选择组件服务
    universe.casper.then(function () {
        this.test.comment('select one key button !');
        this.mouse.move("div#dataContainer-component-btn");
        universe.capturePath(caseName, 'mousemove.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //判断升级组件是否可以点击
    universe.casper.then(function () {
        this.test.comment('click the update component services button !');
        if (universe.assertBtnAbleByXpath("//button[@id='update-component-btn']")) {
            this.thenClick("button#update-component-btn", function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click update component button!');
            });
        } else {
            universe.capturePath(caseName, 'update_component_disable.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'update component button disable !');
        }
    });

    //点击升级组件
    universe.casper.then(function () {
        this.test.comment('click update component module button !');
        this.thenClick('button#update-component-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the update  component button !');
        });
    });

    //等待升级组件对话框弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@id='update-component-modal']//h3[contains(text(),'升级组件')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'update component modal dialog popUp ! ');
                universe.capturePath(caseName, 'update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_update_component_modal_dialog.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'update component modal dialog popUp ! ');
            },
            240000
        );
    });

    //填写升级的组件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#update_component': moduleName
            }, false);
        universe.capturePath(caseName, 'fill_update_component.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //填写升级组件的文件信息
    universe.casper.then(function () {
        this.fillSelectors('div#update-component-modal form',
            {
                'select#umc_update_file': version
            }, false);
        universe.capturePath(caseName, 'fill_update_component_1.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#update-component-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button !');
        });
    });

    //等待操作清单对话框弹出
    universe.casper.then(function () {
        this.test.comment('wait the the action list popUp !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'popUp action list !');
                universe.capturePath(caseName, 'action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName, 'Error_action_list.png', {top: 0, left: 0, width: 1440, height: 1024});
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'popUp action list !');
            }, 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'wait the submit finished !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//添加UDP用户
exports.cms_add_User = function (caseName, userName, password, privilage) {
    //重新加载页面等待页面元素出现
    universe.casper.reload(function () {
        this.test.comment('reload page, wait element appear !');
        this.reload(function () {
            universe.waitForPageElementByXpath(caseName, "//button[@id='add-user-btn']", 240000);
        });
    });

    //点击增加用户按钮
    universe.casper.then(function () {
        this.thenClick('button#add-user-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the add button success !');
        });
    });

    //等待增加用户对话框出现
    universe.casper.then(function () {
        this.test.comment('wait the add user dialog popUp !');
        universe.waitForPageElementByXpath(caseName, "//div[@id='add-user-modal']//h3[text()='增加用户']", 240000);
    });

    //填写用户名和密码，权限
    universe.casper.then(function () {
        this.test.comment('fill the userName pwd ...');
        this.fillSelectors('div#add-user-modal form',
            {
                'div#add-user-modal input#add_name': userName,
                'div#add-user-modal input#password': password,
                'div#add-user-modal select#privilege': privilage
            }, false);
        universe.capturePath(caseName, 'fill_add_user.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#add-user-modal button.btn.save.saveAddUser', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button success !');
        });
    });

    //等待操作清单对话框出现
    universe.casper.then(function () {
        this.test.comment('wait the submit dialog appear !');
        universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']//h3[text()='操作清单']", 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the submit button success !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');

                //等待添加的用户出现
                universe.casper.then(function () {
                    if (privilage == '权限用户') {
                        privilage = '';
                    } else if (privilage == '只读用户') {
                        privilage = 'readonly'
                    } else if (privilage == '管理员用户') {
                        privilage = 'admin'
                    }

                    this.waitForSelector(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[@data-source=\'" + privilage + "\']/..//td[text()=\'" + userName + "\']"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'add user:  ' + userName + ' success !');
                            universe.capturePath(caseName, 'add_' + userName + '_success.png');
                        },
                        function () {
                            universe.capturePath(caseName, 'Error_add_' + userName + '_success.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'Error: add user: ' + userName + " failed !");
                        }, 30000
                    );
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });
};

//删除UDP用户
exports.cms_remove_User = function (caseName, userName) {
    //重新加载页面，等待用户出现
    universe.casper.then(function () {
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[contains(text(),\'" + userName + "\')]"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, userName + ' appear on web page !');
                    universe.capturePath(caseName, userName + '_appear.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, userName + ' not appear on web page !');
                    universe.capturePath(caseName, "Error_" + userName + '_appear.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                240000
            );
        });

    });

    //选择要删除的用户
    universe.casper.then(function () {
        this.test.comment('select the need remove user !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[contains(text(),\'" + userName + "\')]"
            },
            function () {
                class_Name = this.evaluate(function (userName) {
                    return __utils__.getElementByXPath("//table[@id='grid']//td[contains(text(),\'" + userName + "\')]/..").className;
                }, userName);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        this.test.assert(true, userName + ' is selected !');
                        universe.capturePath(caseName, 'selected_user_' + userName + '.png', {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                        break;
                    }
                }
            }
        );
    });

    //判断删除用户按钮是否可以点击,并点击
    universe.casper.then(function () {
        this.test.comment('click the delete user button !')
        if (universe.assertBtnAbleByXpath("//button[@id='remove-user-btn']")) {
            this.thenClick('button#remove-user-btn', function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the delete user button !');
                universe.capturePath(caseName, 'after_click_deleteUser_btn.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            });
        }

    });

    //确认提交对话框出现,点击提交按钮
    universe.casper.then(function () {
        this.test.comment('assert the submit dialog appear !');
        universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']//div[contains(text(),'确定移除用户" + userName + "\')]");
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'clicl the submit button !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');

                //确认删除用户成功
                universe.casper.then(function () {
                    this.waitWhileSelector(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'" + userName + "\']"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'remove user:  ' + userName + ' success !');
                            universe.capturePath(caseName, 'remove_' + userName + '_success.png');
                        },
                        function () {
                            universe.capturePath(caseName, 'Error_remove_' + userName + '_success.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'Error: remove user: ' + userName + " failed !");
                        }, 30000
                    );
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

};

//更改用户权限
exports.cms_modifyUser_permission = function (caseName, userName) {
    //重新加载页面，等待用户出现
    universe.casper.then(function () {
        this.reload(function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid']//td[contains(text(),\'" + userName + "\')]"
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(true, userName + ' appear on web page !');
                    universe.capturePath(caseName, userName + '_appear.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    var myDate = new Date();
                    this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                    this.test.assert(false, userName + ' not appear on web page !');
                    universe.capturePath(caseName, "Error_" + userName + '_appear.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                240000
            );
        });

    });

    //选择要修改权限的用户
    universe.casper.then(function () {
        this.test.comment('select the need remove user !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[contains(text(),\'" + userName + "\')]"
            },
            function () {
                class_Name = this.evaluate(function (userName) {
                    return __utils__.getElementByXPath("//table[@id='grid']//td[contains(text(),\'" + userName + "\')]/..").className;
                }, userName);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, userName + ' is selected !');
                        universe.capturePath(caseName, 'selected_user_' + userName + '.png', {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                        break;
                    }
                }
            }
        );
    });

    //判断修改用户权限按钮是否可以点击
    universe.casper.then(function () {
        this.test.comment('check the modify button able!');
        if (universe.assertBtnAbleByXpath("//button[@id='update-authority-btn']")) {
            this.thenClick('button#update-authority-btn', function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the modify button success !');
                universe.capturePath(caseName, 'modify_rootUser.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            });
        }
    });

    //选择权限
    universe.casper.then(function () {
        this.test.comment('select the modify !');
        universe.select_checkbox_user_permission(caseName, '添加告警通道');
        universe.select_checkbox_user_permission(caseName, '标记为已知');
        universe.select_checkbox_user_permission(caseName, '测试告警设置');
        universe.select_checkbox_user_permission(caseName, '提交告警阈值');
        universe.select_checkbox_user_permission(caseName, '归档数据');
        universe.select_checkbox_user_permission(caseName, '执行批处理命令');
        universe.select_checkbox_user_permission(caseName, '同步MGR缓存');
        universe.select_checkbox_user_permission(caseName, '添加数据库组');
        universe.select_checkbox_user_permission(caseName, '提交巡检报告配置');
        universe.select_checkbox_user_permission(caseName, '收集许可信息');
        universe.select_checkbox_user_permission(caseName, '搜索日志');
        universe.select_checkbox_user_permission(caseName, '提交变更配置');
        universe.select_checkbox_user_permission(caseName, '添加MongoDb组');
        universe.select_checkbox_user_permission(caseName, '提交监控配置流');
        universe.select_checkbox_user_permission(caseName, '提交监控配置项');
        universe.select_checkbox_user_permission(caseName, '添加服务器');
        universe.select_checkbox_user_permission(caseName, '添加SIP');
        universe.select_checkbox_user_permission(caseName, '添加SLA模板');
        universe.select_checkbox_user_permission(caseName, '按QueryTime查询');
        universe.select_checkbox_user_permission(caseName, '删除记录');
        universe.select_checkbox_user_permission(caseName, '提交审核');
        universe.select_checkbox_user_permission(caseName, 'SQL上线');
        universe.select_checkbox_user_permission(caseName, '提交审核规则');
        universe.select_checkbox_user_permission(caseName, '添加Uproxy组');
        universe.select_checkbox_user_permission(caseName, 'Uproxy实时会话');
        universe.select_checkbox_user_permission(caseName, '添加后端');
        universe.select_checkbox_user_permission(caseName, '查看详情');
        universe.select_checkbox_user_data_permission(caseName, '数据恢复');
        universe.select_checkbox_user_permission(caseName, '添加转储设备');
        universe.select_checkbox_user_permission(caseName, '添加备份规则');
        universe.select_checkbox_user_permission(caseName, '强制编排');
        universe.select_checkbox_user_permission(caseName, '增加用户');
        universe.select_checkbox_user_permission(caseName, '添加组');
        universe.select_checkbox_user_permission(caseName, '提交分片配置');
        universe.select_checkbox_user_permission(caseName, '提交并重载');
        universe.select_checkbox_user_permission(caseName, '下载审计日志');
    });

    //点击更改用户使用权限
    universe.casper.then(function () {
        this.test.comment('click the user modify !');
        this.thenClick('div#update-authority-modal button.btn.save.saveAuthority', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click modify user permission button !');
            universe.capturePath(caseName, 'modify_user_permission.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
        });
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click submit button success!');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //检查测修改的权限是否正确
                universe.casper.then(function () {
                    this.waitForSelector(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'" + userName + "\']/../td[contains(text(),'添加告警通道, 标记为已知," +
                                " 测试告警设置, 提交告警阈值, 归档数据, 执行批处理命令, 同步MGR缓存, 添加数据库组, 提交巡检报告配置, " +
                                "收集许可信息, 搜索日志, 提交变更配置, 添加MongoDb组, 提交监控配置流, 提交监控配置项, 添加服务器," +
                                " 添加SIP, 添加SLA模板, 按QueryTime查询, 删除记录, 提交审核, SQL上线, 提交审核规则, 添加Uproxy组," +
                                " Uproxy实时会话, 添加后端, 查看详情, 数据恢复, 添加转储设备, 添加备份规则, 强制编排, 增加用户," +
                                " 添加组, 提交分片配置, 提交并重载, 下载审计日志')]"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'permission is right !');
                            universe.capturePath(caseName, 'finished_add_permission.png', {
                                top: 0,
                                left: 0,
                                width: 1440,
                                height: 1024
                            });
                        },
                        function () {
                            universe.capturePath(caseName, 'Error_finished_add_permission.png', {
                                top: 0,
                                left: 0,
                                width: 1440,
                                height: 1024
                            });
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'permission is Error !');
                        }, 240000
                    );

                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });


};

//添加SIP
exports.add_sip = function (caseName, sip, sip_1, sip_2, sip_3, sip_4, sip_5, sip_6, sip_7, sip_8) {
    //等待添加sip按钮出现
    universe.casper.then(function () {
        this.test.comment('wait the add sip button appear !');
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//button[@id='add-sip']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'add sip button appear !');
                universe.capturePath(caseName, 'sip_button.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_sip_button.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'add sip button not appear !');
            }, 240000);
    });

    //点击添加sip按钮
    universe.casper.then(function () {
        this.test.comment('click add sip button !');
        this.thenClick('button#add-sip', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click add the sip button success !');
        });
    });

    //等待添加sip对话框出现,填写ip
    universe.casper.then(function () {
        universe.waitForPageElementByXpath(caseName, "//div[@id='sip-pool-add']", 240000);
    });

    universe.casper.then(function () {
        this.wait(1000); //for capture
        this.test.comment('fill sip ' + sip);
        this.sendKeys('div#sip-pool-add form textarea#sip', sip);
        // this.fillSelectors('div#sip-pool-add form',
        //     {
        //         'textarea#sip': sip
        //     }, false);
        universe.capturePath(caseName, 'finished_fill_ip.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[contains(text(),'保存')]"
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the save button success !');
                universe.capturePath(caseName, 'after_click_save.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            });
    });

    universe.casper.then(function () {
        universe.waitForPageElementByXpath(caseName, "//div[contains(text(),'操作清单')]", 240000);
    });
    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick({
            type: 'xpath',
            path: "//div[contains(text(),'执行')]"
        }, function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the submit button success !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //等待Sip添加成功

                // universe.casper.then(function () {
                //     this.waitForSelector(
                //         {
                //             type: 'xpath',
                //             path: "//table[@id='grid']//td[@data='sip'][contains(text(),\'" + sip + "\')]"
                //         },
                //         function () {
                //             this.test.assert(true, 'add sip:  ' + sip + ' success !');
                //             universe.capturePath(caseName, 'add_sip_success.png');
                //         },
                //         function () {
                //             universe.capturePath(caseName, 'Error_add_success.png');
                //             this.test.assert(false, 'Error: add sip: ' + sip + " failed !");
                //         }, 30000
                //     );
                // });
                universe.waitForPageElementByXpath(caseName, "//td[contains(text(),\'" + sip_1 + "\')]", 20000);
                universe.waitForPageElementByXpath(caseName, "//td[contains(text(),\'" + sip_2 + "\')]", 20000);
                universe.waitForPageElementByXpath(caseName, "//td[contains(text(),\'" + sip_3 + "\')]", 20000);
                universe.waitForPageElementByXpath(caseName, "//td[contains(text(),\'" + sip_4 + "\')]", 20000);
                universe.waitForPageElementByXpath(caseName, "//td[contains(text(),\'" + sip_5 + "\')]", 20000);
                universe.waitForPageElementByXpath(caseName, "//td[contains(text(),\'" + sip_6 + "\')]", 20000);
                universe.waitForPageElementByXpath(caseName, "//td[contains(text(),\'" + sip_7 + "\')]", 20000);
                universe.waitForPageElementByXpath(caseName, "//td[contains(text(),\'" + sip_8 + "\')]", 20000);
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });

    // //切换到配置元数据
    // universe.casper.then(function () {
    //     universe.navigate_to_aLink_Path(caseName, '/config_metadata');
    // });

    // //等待跳转url成功
    // universe.casper.then(function () {
    //     this.waitForUrl(/\/config_metadata/,
    //         function () {
    //             this.test.assert(true,'Go to url:config_metadata success !');
    //             universe.capturePath(caseName,'url_jump_success.png');
    //         },
    //         function () {
    //             universe.capturePath(caseName,'Error_url_jump_failed.png');
    //             this.test.assert(false,'Go to url:config_metadata fail !');
    //         },
    //         240000
    //     );
    // });
    //
    // //等待sips在页面上出现
    // universe.casper.then(function () {
    //     universe.waitForPageElementByXpath(caseName,"//table[@id='grid']//td[@data-origin='sips']//i",20000);
    // });
    //
    // //点击扩展图标
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type:'xpath',
    //             path:"//table[@id='grid']//td[@data-origin='sips']//i"
    //         },
    //         function () {
    //             this.test.assert(true,'expand sips success !');
    //             universe.capturePath(caseName,'expand_sips.png');
    //             universe.waitForPageElementByXpath(caseName,"//table[@id='grid']//td[@class='all'][text()=\'"+sip_1+"\']",30000);
    //             universe.waitForPageElementByXpath(caseName,"//table[@id='grid']//td[@class='all'][text()=\'"+sip_2+"\']",30000);
    //             universe.waitForPageElementByXpath(caseName,"//table[@id='grid']//td[@class='all'][text()=\'"+sip_3+"\']",30000);
    //             universe.waitForPageElementByXpath(caseName,"//table[@id='grid']//td[@class='all'][text()=\'"+sip_4+"\']",30000);
    //             universe.waitForPageElementByXpath(caseName,"//table[@id='grid']//td[@class='all'][text()=\'"+sip_5+"\']",30000);
    //             universe.waitForPageElementByXpath(caseName,"//table[@id='grid']//td[@class='all'][text()=\'"+sip_6+"\']",30000);
    //             universe.waitForPageElementByXpath(caseName,"//table[@id='grid']//td[@class='all'][text()=\'"+sip_7+"\']",30000);
    //             universe.waitForPageElementByXpath(caseName,"//table[@id='grid']//td[@class='all'][text()=\'"+sip_8+"\']",30000);
    //         }
    //     );
    // });
};

//删除SIP
exports.remove_sip = function (caseNme, sip) {
    //重新加载页面等待页面元素出现
    universe.casper.then(function () {
        this.reload(function () {
            universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[contains(text(),\'" + sip + "\')]", 1000);
        });
    });

    //选择sip
    universe.casper.then(function () {
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[contains(text(),\'" + sip + "\')]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'selected sip !');
                universe.capturePath(caseNme, 'selected_sip.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            }
        );

    });

    //判断删除按钮是否可以点击
    universe.casper.then(function () {
        if (universe.assertBtnAbleByXpath("//button[@id='remove-sip-btn']")) {
            this.thenClick('button#remove-sip-btn', function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click remove button success !');
            });
        }
    });

    //等待提交对话框出现，点击提交
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        universe.waitForPageElementByXpath(caseNme, "//div[@class='dialog confirm']//div[text()='确定删除所选的SIP？']", 240000);
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click submit button success !');
        });
    });

    //等待操作成提示
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            },
            function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                //等待删除SIP成功
                universe.casper.then(function () {
                    this.waitWhileSelector(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[@data='sip'][contains(text(),\'" + sip + "\')]"
                        },
                        function () {
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(true, 'remove sip:  ' + sip + ' success !');
                            universe.capturePath(caseName, 'remove_sip_success.png');
                        },
                        function () {
                            universe.capturePath(caseName, 'Error_remove_success.png');
                            var myDate = new Date();
                            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                            this.test.assert(false, 'Error: remove sip: ' + sip + " failed !");
                        },
                        20000
                    );

                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 120000
        );
    });
};


