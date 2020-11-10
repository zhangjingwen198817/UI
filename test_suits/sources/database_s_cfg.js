//智能平台管理页面
///////////zjw----------
var require = patchRequire(require);
var universe = require('../includes/universe.js');
var commonFun = require('../includes/commonFun.js');
var fs = require("fs");

var cnf_global = require('../configs/cnf_global.js');
var downloads = cnf_global.downloads;
var ssh_Command = require("../configs/ssh_Command.js");
var Init_DMP = ssh_Command.cmdData.Init_DMP;

//添加数据库组
exports.add_database_group = function (caseName, groupName, sip, app_Eg_name, app_name, sql_purpose, node_detail,
                                       app_grade, disaster_garde) {
    //等待添加/删除按钮出现
    universe.casper.then(function () {
        universe.waitForPageElementByXpath(caseName, "//div[@id='group-update-btn']", 240000);
        this.thenClick('button#add-database-group-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the addSql button !');
            universe.capturePath(caseName, 'after_click_addSql_btn.png', {top: 0, left: 0, width: 1440, height: 1024});
        });
    });

    //填写数据库组名
    universe.casper.then(function () {
        this.fillSelectors('div#add-database-group-modal form',
            {
                'input#add_group_id': groupName,
                'select#add_sip': sip
            }, false);
        universe.capturePath(caseName, 'fill_sqlGroupName.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //点击属性标签
    universe.casper.then(function () {
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='add-database-group-modal']//li[text()='属性标签']"
            }
            , function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click attribute tag success !');
                universe.capturePath(caseName, 'attribute_tag.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //填写属性标签配置页
    universe.casper.then(function () {
        this.fillSelectors('div#add-database-group-modal form',
            {
                "div.tab-item.tab-dialog.curItem input[placeholder='应用英文名']": app_Eg_name,
                "div.tab-item.tab-dialog.curItem input[placeholder='应用名']": app_name,
                "div.tab-item.tab-dialog.curItem input[placeholder='数据库用途']": sql_purpose,
                "div.tab-item.tab-dialog.curItem input[placeholder='应用节点描述']": node_detail,
                "div.tab-item.tab-dialog.curItem input[placeholder='应用等级']": app_grade,
                "div.tab-item.tab-dialog.curItem input[placeholder='灾备等级']": disaster_garde
            },
            false
        );
        universe.capturePath(caseName, 'fill_cfg.png', {top: 0, left: 0, width: 1440, height: 1024});
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !')
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='add-database-group-modal']//div[@class='tab-item tab-dialog curItem']//button[text()='保存']"
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, ' click the save button success !');
                universe.capturePath(caseName, 'submit_list.png', {top: 0, left: 0, width: 1440, height: 1024});
            });
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('wait the submit dialog popUp,and submit list !');
        universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']//h3[contains(text(),'操作清单')]", 240000);
        this.thenClick("div.dialog.confirm button.btn.confirm", function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click submit button success !');
        });
    });

    //等待添加的数据库组出现
    universe.casper.then(function () {
        this.test.comment('wait the added mysql group appear !');
        universe.waitForPageElementByXpath(caseName, "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']", 240000);

    });

    // //切换到配置元数据
    // universe.casper.then(function () {
    //     universe.navigate_to_aLink_Path(caseName, '/config_metadata');
    // });
    //
    // //等待跳转url成功
    // universe.casper.then(function () {
    //     this.waitForUrl(/\/config_metadata/,
    //         function () {
    //             this.test.assert(true, 'Go to url:config_metadata success !');
    //             universe.capturePath(caseName, 'url_jump_success.png');
    //         },
    //         function () {
    //             universe.capturePath(caseName, 'Error_url_jump_failed.png');
    //             this.test.assert(false, 'Go to url:config_metadata fail !');
    //         },
    //         240000
    //     );
    // });
    //
    // //等待mysql-groups在页面上出现
    // universe.casper.then(function () {
    //     universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@data-origin='mysql-groups']//i", 20000);
    // });
    //
    // //点击扩展图标mysql-groups
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//table[@id='grid']//td[@data-origin='mysql-groups']//i"
    //         },
    //         function () {
    //             this.test.assert(true, 'expand mysql-groups success !');
    //             universe.capturePath(caseName, 'expand_mysql_groups.png');
    //             universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@class='all'][text()=\'mysql-" + groupName + "\']", 30000);
    //         }
    //     );
    // });
    //
    // //点击扩展图标mysql-auto_test
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//table[@id='grid']//td[@data-origin=\'mysql-" + groupName + "\']//i"
    //         },
    //         function () {
    //             this.test.assert(true, 'expand mysql-auto_test success !');
    //             universe.capturePath(caseName, 'expand_mysql_auto_test.png');
    //             universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@class='item'][text()=\'mysql-" + groupName + "\']", 30000);
    //             universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@class='item'][text()=\'" + sip + "\']", 30000);
    //         }
    //     );
    // });
    //
    // //点击扩展图标tags
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//table[@id='grid']//td[@data-origin='tags']//i"
    //         },
    //         function () {
    //             this.test.assert(true, 'expand tags success !');
    //             universe.capturePath(caseName, 'expand_mysql_auto_test.png');
    //             universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@data-origin='492959a517b091e5e1cb19d73e88aeea']//i", 30000);
    //             universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@data-origin='544975cec6a35b24cb98e132db707ec5']//i", 30000);
    //             universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@data-origin='79f087545da4bc1d2aa16bcb12f5147e']//i", 30000);
    //             universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@data-origin='df0c79676ead6fc42b49bdb9b960802f']//i", 30000);
    //             universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@data-origin='ed16f8c39d0b0b29fa6207364de9ebfa']//i", 30000);
    //             universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@data-origin='f99ac3af2c9489b85188b289c5bf1b54']//i", 30000);
    //         }
    //     );
    // });
    //
    // //点击扩展图标492959a517b091e5e1cb19d73e88aeea
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//table[@id='grid']//td[@data-origin='492959a517b091e5e1cb19d73e88aeea']//i"
    //         },
    //         function () {
    //             this.test.assert(true, 'expand tags_child success !');
    //             universe.capturePath(caseName, 'expand_tags_child_test.png');
    //             universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@data-origin='appNode']", 30000);
    //
    //         }
    //     );
    // });
    //
    // //点击扩展图标 544975cec6a35b24cb98e132db707ec5
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//table[@id='grid']//td[@data-origin='544975cec6a35b24cb98e132db707ec5']//i"
    //         },
    //         function () {
    //             this.test.assert(true, 'expand tags_child success !');
    //             universe.capturePath(caseName, 'expand_tags_child_test.png');
    //             universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@data-origin='dbusage']", 30000);
    //
    //         }
    //     );
    // });
    //
    // //点击扩展图标 79f087545da4bc1d2aa16bcb12f5147e
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//table[@id='grid']//td[@data-origin='79f087545da4bc1d2aa16bcb12f5147e']//i"
    //         },
    //         function () {
    //             this.test.assert(true, 'expand tags_child success !');
    //             universe.capturePath(caseName, 'expand_tags_child_test.png');
    //             universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@data-origin='appLevel']", 30000);
    //
    //         }
    //     );
    // });
    //
    // //点击扩展图标 df0c79676ead6fc42b49bdb9b960802f
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//table[@id='grid']//td[@data-origin='df0c79676ead6fc42b49bdb9b960802f']//i"
    //         },
    //         function () {
    //             this.test.assert(true, 'expand tags_child success !');
    //             universe.capturePath(caseName, 'expand_tags_child_test.png');
    //             universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@data-origin='disasterLevel']", 30000);
    //
    //         }
    //     );
    // });
    //
    // //点击扩展图标 ed16f8c39d0b0b29fa6207364de9ebfa
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//table[@id='grid']//td[@data-origin='ed16f8c39d0b0b29fa6207364de9ebfa']//i"
    //         },
    //         function () {
    //             this.test.assert(true, 'expand tags_child success !');
    //             universe.capturePath(caseName, 'expand_tags_child_test.png');
    //             universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@data-origin='appName']", 30000);
    //
    //         }
    //     );
    // });
    //
    // //点击扩展图标 f99ac3af2c9489b85188b289c5bf1b54
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//table[@id='grid']//td[@data-origin='f99ac3af2c9489b85188b289c5bf1b54']//i"
    //         },
    //         function () {
    //             this.test.assert(true, 'expand tags_child success !');
    //             universe.capturePath(caseName, 'expand_tags_child_test.png');
    //             universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@data-origin='appEnglishName']", 30000);
    //
    //         }
    //     );
    // });

};

//删除数据库组
exports.remove_database_group = function (caseName, groupName) {
    //冲洗加载页面等待要是删除的数据库组出现
    universe.casper.then(function () {
        this.test.comment('reload the web page ,and wait the mysql group appear !');
        this.reload(function () {
            universe.waitForPageElementByXpath(caseName, "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']", 1000);
        })
    });

    //选择要删除的数据库组
    universe.casper.then(function () {
        this.test.comment('wait the delete mysql group appear !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']"
            },
            function () {
                class_Name = this.evaluate(function (groupName) {
                    return __utils__.getElementByXPath("//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']/..").className;
                }, groupName);
                this.test.comment(class_Name);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, groupName + ' is selected !');
                        universe.capturePath(caseName, 'selected_' + groupName + ".png", {
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

    //将鼠标移动到添加删除按钮上
    universe.casper.then(function () {
        this.test.comment('move the mouse to add/remove button !');
        this.mouse.move("div#group-update-btn");
        universe.capturePath(caseName, 'button_get_focus.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //判断删除数据库组按钮是否可以点击，并点击删除按钮
    universe.casper.then(function () {
        this.test.comment('assert the delete mysql group able !');
        if (universe.assertBtnAbleByXpath("//button[@id='remove-database-group-btn']")) {
            this.thenClick('button#remove-database-group-btn', function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the remove sql button !');
            });
        }
    });

    //等待提交对话框出现，点击提交按钮
    universe.casper.then(function () {
        this.test.comment('wait the submit dialog appear !');
        universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']//h3[text()='DMP']", 240000);
        this.thenClick('div.dialog.confirm button.btn.confirm.confirmDone', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the OK button !');
        });
    });

    //等待操作成功提示
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
                universe.casper.waitWhileVisible(
                    {
                        type: 'xpath',
                        path: "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']"
                    },
                    function () {
                        universe.capturePath(caseName, 'remove_group_success.png');
                        universe.casper.test.assert(true, groupName + ' remove success !');
                    },
                    function () {
                        universe.capturePath(caseName, 'Error_remove_group_success.png');
                        universe.casper.test.assert(false, 'Error: ' + groupName + ' remove fail !');
                    }, 240000);
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 240000);
    });

};

//添加数据库实例
exports.add_mysql_instance = function (caseName, groupName, hostName, port, mysql_alias, install_standard,
                                       init_data, password, mysql_tarball_path, mysql_base_path, mysql_data_path, mysql_binlog_path,
                                       mysql_relaylog_path, mysql_redolog_path, mysql_tmp_path, backup_path, mycnf_path, all_user, all_host,
                                       all_password, run_user, run_user_group, mysql_uid, mysql_gid, serverID, umask, umask_dir) {

    var globalText;

    //重新加载页面，等待数据库组出现
    universe.casper.then(function () {
        this.reload(function () {
            universe.casper.then(function () {
                this.test.comment('reload the web page ,and wait the mysql group appear !');
                universe.casper.reload(function () {
                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']", 1000);
                })
            });
        });
    });

    //选择数据库组
    universe.casper.then(function () {
        this.test.comment('select  the  mysql group  !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']"
            },
            function () {
                class_Name = this.evaluate(function (groupName) {
                    return __utils__.getElementByXPath("//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']/..").className;
                }, groupName);
                this.test.comment(class_Name);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        this.test.assert(true, groupName + ' is selected !');
                        universe.capturePath(caseName, 'selected_' + groupName + ".png", {
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

    //将鼠标移动待添加删除按钮上
    universe.casper.then(function () {
        this.test.comment('mouse move to add/delete button');
        this.mouse.move('div.dataContainer.instance div#instance-update-btn');
        universe.capturePath(caseName, 'get_focus.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //判断添加数据库实例按钮是否可以点击，并点击
    universe.casper.then(function () {
        this.test.comment('click add mysql instance !');
        if (universe.assertBtnAbleByXpath("//button[@id='add-database-instance-btn']")) {
            this.thenClick('button#add-database-instance-btn', function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click add mysql instance !');
            });
        }
    });

    //等待添加数据库实例对话框是否弹出,并填写信息
    universe.casper.then(function () {
        this.test.comment('wait the add mysql instance dialog popUp !');
        universe.waitForPageElementByXpath(caseName, "//div[@id='add-database-instance-modal']", 240000);


    });

    //填写主机和端口
    universe.casper.then(function () {
        this.fillSelectors('div#add-database-instance-modal form', {
            "div#add-database-instance-modal input[name='server_id']": hostName,
            'div#add-database-instance-modal input#add_port': port
        }, false);
        //等待别名联动成功
        this.wait(5000);
        universe.capturePath(caseName, 'fill_installMysql_hostPort_info.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //填写mysql安装信息
    universe.casper.then(function () {
        this.test.comment('fill the mysql info !');
        this.fillSelectors('div#add-database-instance-modal form',
            {
                'div#add-database-instance-modal input#add_mysql_alias': mysql_alias,
                'div#add-database-instance-modal select#add_install_standard': install_standard,
                //'div#add-database-instance-modal select#init_data': init_data,
                'div#add-database-instance-modal input#mysql_root_init_password': password,
                'div#add-database-instance-modal select#add_mysql_tarball_path': mysql_tarball_path,
                'div#add-database-instance-modal input#add_mysql_base_path': mysql_base_path,
                'div#add-database-instance-modal input#add_mysql_data_path': mysql_data_path,
                'div#add-database-instance-modal input#add_mysql_binlog_path': mysql_binlog_path,
                'div#add-database-instance-modal input#add_mysql_relaylog_path': mysql_relaylog_path,
                'div#add-database-instance-modal input#add_mysql_redolog_path': mysql_redolog_path,
                'div#add-database-instance-modal input#add_mysql_tmp_path': mysql_tmp_path,
                'div#add-database-instance-modal input#backup_path': backup_path,
                'div#add-database-instance-modal input#add_mycnf_path': mycnf_path
            }, false);
        universe.capturePath(caseName, 'fill_installMysql_info.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });

    });

    //点击创建管理用户
    universe.casper.then(function () {
        this.test.comment('click the next page button !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='add-database-instance-modal']//li[text()='创建管理用户']"
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the next page !');
            });
    });

    //等待创建管理用户出现
    universe.casper.then(function () {
        this.test.comment('wait the next page appear !');
        universe.waitForPageElementByXpath(caseName, "//div[@id='add-database-instance-modal']//input[@id='instance_all_user']");
    });

    //填写单用户信息
    universe.casper.then(function () {
        this.test.comment('fill the single user info !');
        this.fillSelectors('div#add-database-instance-modal form',
            {
                'div#add-database-instance-modal input#instance_all_user': all_user,
                "div#add-database-instance-modal input[name='all_host']": all_host,
                "div#add-database-instance-modal input[name='all_password']": all_password
            }, false);
        universe.capturePath(caseName, 'fill_single_user.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击高级配置
    universe.casper.then(function () {
        this.test.comment('click the next page button !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='add-database-instance-modal']//li[text()='高级配置']"
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the next page !');
            });
    });

    //等待高级配置页出现
    universe.casper.then(function () {
        this.test.comment('wait the high cfg page !');
        universe.waitForPageElementByXpath(caseName, "//label[text()='UID']", 240000);

    });

    //填写高级配置信息
    universe.casper.then(function () {
        this.test.comment('fill the high cfg info !');
        this.fillSelectors('div#add-database-instance-modal form',
            {
                'input#add_run_user': run_user,
                'input#add_run_user_group': run_user_group,
                'input#add_mysql_uid': mysql_uid,
                'input#add_mysql_gid': mysql_gid,
                'input#serverID': serverID,
                'input#add_umask': umask,
                'input#add_umask_dir': umask_dir
            },
            false
        );
        universe.capturePath(caseName, 'fill_high_cfg.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击配置模板
    universe.casper.then(function () {
        this.test.comment('click the next page button !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='add-database-instance-modal']//li[text()='配置模板']"
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the next page !');
            });
    });

    //等待配置文件模板出现
    universe.casper.then(function () {
        this.test.comment('wait the cfg platform appear !');
        universe.waitForPageElementByXpath(caseName, "//div[@id='add-database-instance-modal']//label[contains(text(),'配置文件模板')]", 240000);
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.wait(80000);
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='add-database-instance-modal']//button[text()='保存']"
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the save button success !');
                this.wait(3000);
            });
    });

    //等待操作清单出现
    universe.casper.then(function () {
        this.test.comment('wait the action list appear !');
        universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']//h3[text()='操作清单']", 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick("div.dialog.confirm button.btn.confirm", function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the submit button success !');
            //this.wait(240000);
        });
    });

    //等待操作完成
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
                //检测添加的数据库实例是否出现
                universe.casper.then(function () {
                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[contains(text(),\'" + mysql_alias + "\')]", 700000);
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 700000
        );
    });

    // //获取数据库实例ID
    // universe.casper.then(function () {
    //
    //     globalText = universe.casper.evaluate(function (mysql_alias) {
    //         return __utils__.getElementByXPath("//td[@data-source='" + mysql_alias + "']/..//td[@data='mysql_id']").innerText;
    //     }, mysql_alias);
    //     universe.casper.test.comment("Got mysql instance name is :" + globalText);
    // });
    //
    // //切换到配置元数据
    // universe.casper.then(function () {
    //     universe.navigate_to_aLink_Path(caseName, '/config_metadata');
    // });
    //
    // //等待跳转url成功
    // universe.casper.then(function () {
    //     this.waitForUrl(/\/config_metadata/,
    //         function () {
    //             this.test.assert(true, 'Go to url:config_metadata success !');
    //             universe.capturePath(caseName, 'url_jump_success.png');
    //         },
    //         function () {
    //             universe.capturePath(caseName, 'Error_url_jump_failed.png');
    //             this.test.assert(false, 'Go to url:config_metadata fail !');
    //         },
    //         240000
    //     );
    // });
    //
    // //等待mysql-groups出现
    // universe.casper.then(function () {
    //     universe.waitForPageElementByXpath(caseName, "//td[@data-origin=\"mysql-groups\"]", 20000);
    // });
    //
    // //点击扩展图标
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//td[@data-origin='mysql-groups']/span/i"
    //         },
    //         function () {
    //             universe.capturePath(caseName, 'expand_mysqlgroup.png');
    //             this.test.assert(true, 'expand mysql_groups succcess !');
    //         });
    // });
    //
    // //等待mysql-auto_test组出现
    // universe.casper.then(function () {
    //     universe.waitForPageElementByXpath(caseName, "//td[@data-origin='mysql-auto_test']", 20000);
    // });
    //
    // //点击扩展按钮
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//td[@data-origin='mysql-auto_test']//i"
    //         },
    //         function () {
    //             universe.capturePath(caseName, 'mysql-auto_test.png');
    //             this.test.assert(true, 'expand mysql-auto_test succcess !');
    //         }
    //     );
    // });
    //
    //
    // //等待mysqls出现
    // universe.casper.then(function () {
    //     universe.waitForPageElementByXpath(caseName, "//td[@data-origin='mysqls']", 20000);
    // });
    //
    // //点击扩展按钮，等待数据库出现
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//td[@data-origin='mysqls']//i"
    //         },
    //         function () {
    //             universe.waitForPageElementByXpath(caseName,
    //                 "//td[contains(text(),'universe/servers/server-umc-2/mysqls/" + globalText + "')]", 20000);
    //         }
    //     );
    // });

};

//数据库实例手工备份
exports.backUp_mysql_instance = function (caseName, groupName, mysql_alias, backUp_tools) {

    //重新加载页面，等待数据库组出现
    universe.casper.then(function () {
        this.reload(function () {
            universe.casper.then(function () {
                this.test.comment('reload the web page ,and wait the mysql group appear !');
                universe.casper.reload(function () {
                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']", 3600*3);
                })
            });
        });
    });

    //选择数据库组
    universe.casper.then(function () {
        this.test.comment('select  the  mysql group  !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']"
            },
            function () {
                class_Name = this.evaluate(function (groupName) {
                    return __utils__.getElementByXPath("//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']/..").className;
                }, groupName);
                this.test.comment(class_Name);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        this.test.assert(true, groupName + ' is selected !');
                        universe.capturePath(caseName, 'selected_' + groupName + ".png", {
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

    //选择数据库实例
    universe.casper.then(function () {
        this.test.comment('select the mysql instance !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + mysql_alias + "\ ']"
            }, function () {
                class_Name = this.evaluate(function (mysql_alias) {
                    return __utils__.getElementByXPath("//table[@id='grid']//td[text()=\'" + mysql_alias + "\ ']/..").className;
                }, mysql_alias);
                this.test.comment(class_Name);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, mysql_alias + ' is selected !');
                        universe.capturePath(caseName, 'selected_' + mysql_alias + ".png", {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                        break;
                    }
                }
            });


    });

    //选择备份
    universe.casper.then(function () {
        this.test.comment('select the backUp !');
        this.mouse.move("div#instance-backup-btn");
        universe.capturePath(caseName, 'backUp.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //检测手工备份是否可以点击，并点击
    universe.casper.then(function () {
        this.test.comment('check the manual backup button can be clicked!');
        if (universe.assertBtnAbleByXpath("//button[@id='manual-backup-btn']")) {
            this.thenClick('button#manual-backup-btn', function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the manual backUp button !');
            });
        }
    });

    //检测告警对话框
    universe.casper.then(function () {
        this.test.comment("check the warning dialog: add backup rule!");
        universe.waitForPageElementByXpath(caseName, "//div//p[contains(text(),'将创建一个默认备份规则')]", 240000);
    });

    //点击确认按钮
    universe.casper.then(function () {
        this.test.comment('click the confirmDone button !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//div//button[@class='btn confirm confirmDone ']"
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the confirmDone button success !');
                this.wait(1000);
            });
    });

    //检测手工备份对话框是否出现
    universe.casper.then(function () {
        this.test.comment('check manual backUp dialog !');
        universe.waitForPageElementByXpath(caseName, "//div[@id='manual-backup-modal']//h3[text()='手工备份']", 240000);
    });

    //填写备份工具
    universe.casper.then(function () {
        this.test.comment('fill the backUp tools !');
        this.fillSelectors("div#manual-backup-modal form",
            {
                'select#backup_tool': backUp_tools
            }
            , false);
        universe.capturePath(caseName, 'finished_fill_backUp_tools.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //点击备份配置
    universe.casper.then(function () {
        this.test.comment('click the next page button !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='manual-backup-modal']//li[text()='备份配置']"
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the next page button!');
            });
    });

    //等待备份配置模板出现
    universe.casper.then(function () {
        this.test.comment('wait the backUp cfg module !');
        universe.waitForPageElementByXpath(caseName, "//textarea[@id='backup_cnf']", 240000);
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        this.thenClick('div#manual-backup-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button success !');
            this.wait(1000);
        });
    });

    //等待操作清单页面出现
    universe.casper.then(function () {
        this.test.comment('wait the cation list page !');
        universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']//h3[text()='操作清单']", 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the submit button !');
            //this.wait(240000);
        });
    });

    //等待操作成功
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
                //检测备份是否出现
                universe.casper.then(function () {
                    universe.casper.test.comment('check the backUp success ?');
                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[@data='backup_status'][contains(text(),'有')]", 30000);

                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 1200000
        );
    });


};

//基于备份集-添加数据库实例
exports.add_mysql_instance_baseOnBackUp = function (caseName, groupName, hostName, port, mysql_alias, install_standard,
                                                    mysql_tarball_path) {

    var globalText;
    //重新加载页面，等待数据库组出现
    universe.casper.then(function () {
        this.reload(function () {
            universe.casper.then(function () {
                this.test.comment('reload the web page ,and wait the mysql group appear !');
                universe.casper.reload(function () {
                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']", 1000);
                })
            });
        });
    });

    //选择数据库组
    universe.casper.then(function () {
        this.test.comment('select  the  mysql group  !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']"
            },
            function () {
                class_Name = this.evaluate(function (groupName) {
                    return __utils__.getElementByXPath("//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']/..").className;
                }, groupName);
                this.test.comment(class_Name);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, groupName + ' is selected !');
                        universe.capturePath(caseName, 'selected_' + groupName + ".png", {
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

    //将鼠标移动到添加删除按钮上
    universe.casper.then(function () {
        this.test.comment('mouse move to add/delete button');
        this.mouse.move('div.dataContainer.instance div#instance-update-btn');
        universe.capturePath(caseName, 'get_focus.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //判断添加数据库实例按钮是否可以点击，并点击
    universe.casper.then(function () {
        this.test.comment('click add mysql instance !');
        if (universe.assertBtnAbleByXpath("//button[@id='add-database-instance-btn']")) {
            this.thenClick('button#add-database-instance-btn', function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click add mysql instance !');
            });
        }
    });

    //等待添加数据库实例对话框是否弹出,并填写信息
    universe.casper.then(function () {
        this.test.comment('wait the add mysql instance dialog popUp !');
        universe.waitForPageElementByXpath(caseName, "//div[@id='add-database-instance-modal']", 240000);


    });

    //填写主机和端口
    universe.casper.then(function () {

        //获取页面实时信息
        optText = this.evaluate(function () {
            return document.getElementById("init_data").options[1].text;
        });
        this.test.comment(optText);
        //填写表单
        this.fillSelectors('div#add-database-instance-modal form', {
            "div#add-database-instance-modal input[name='server_id']": hostName,
            'div#add-database-instance-modal input#add_port': port,
            'div#add-database-instance-modal select#init_data': optText
        }, false);
        //等待别名联动成功
        this.wait(5000);
        universe.capturePath(caseName, 'fill_installMysql_hostPort_info.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //填写mysql安装信息
    universe.casper.then(function () {
        this.test.comment('fill the mysql info !');
        this.fillSelectors('div#add-database-instance-modal form',
            {
                'input#add_mysql_alias': mysql_alias
                //'div#add-database-instance-modal select#add_install_standard': install_standard,
                //'div#add-database-instance-modal select#add_mysql_tarball_path': mysql_tarball_path
            }, false);
        universe.capturePath(caseName, 'fill_installMysql_info.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });

    });

    //点击创建管理用户
    universe.casper.then(function () {
        this.test.comment('click the next page button !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='add-database-instance-modal']//li[text()='创建管理用户']"
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the next page !');
            });
    });

    //等待创建管理用户出现
    universe.casper.then(function () {
        this.test.comment('wait the next page appear !');
        universe.waitForPageElementByXpath(caseName, "//div[@id='add-database-instance-modal']//input[@id='instance_all_user']");
    });

    //点击高级配置
    universe.casper.then(function () {
        this.test.comment('click the next page button !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='add-database-instance-modal']//li[text()='高级配置']"
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the next page !');
            });
    });

    //等待高级配置页出现
    universe.casper.then(function () {
        this.test.comment('wait the high cfg page !');
        universe.waitForPageElementByXpath(caseName, "//label[text()='UID']", 240000);

    });

    //点击配置模板
    universe.casper.then(function () {
        this.test.comment('click the next page button !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='add-database-instance-modal']//li[text()='配置模板']"
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the next page !');
            });
    });

    //等待配置文件模板出现
    universe.casper.then(function () {
        this.test.comment('wait the cfg platform appear !');
        universe.waitForPageElementByXpath(caseName, "//div[@id='add-database-instance-modal']//label[contains(text(),'配置文件模板')]", 240000);
    });

    //添加等待时间
    universe.casper.then(function () {
        this.test.comment('add wait time!');
        this.wait(60000);
    });


    //点击保存按钮
    universe.casper.then(function () {
        this.test.comment('click the save button !');
        //this.wait(240000);
        this.thenClick('div#add-database-instance-modal div.tab-item.tab-dialog.curItem button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save button success !');
            this.wait(3000);
        });
    });

    //等待操作清单出现
    universe.casper.then(function () {
        this.test.comment('wait the action list appear !');
        universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']//h3[text()='操作清单']", 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick("div.dialog.confirm button.btn.confirm", function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the submit button success !');
            this.wait(60000);
        });
    });

    //等待操作成功
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
                //检测添加的数据库实例是否出现
                universe.casper.then(function () {
                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid']//td[contains(text(),\'" + mysql_alias + "\')]", 700000);
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 700000
        );
    });

    // //获取数据库实例ID
    // universe.casper.then(function () {
    //
    //     globalText = universe.casper.evaluate(function (mysql_alias) {
    //         return __utils__.getElementByXPath("//td[@data-source='" + mysql_alias + "']/..//td[@data='mysql_id']").innerText;
    //     }, mysql_alias);
    //     universe.casper.test.comment("Got mysql instance name is :" + globalText);
    // });

    // //切换到配置元数据
    // universe.casper.then(function () {
    //     universe.navigate_to_aLink_Path(caseName, '/config_metadata');
    // });

    // //等待跳转url成功
    // universe.casper.then(function () {
    //     this.waitForUrl(/\/config_metadata/,
    //         function () {
    //             this.test.assert(true, 'Go to url:config_metadata success !');
    //             universe.capturePath(caseName, 'url_jump_success.png');
    //         },
    //         function () {
    //             universe.capturePath(caseName, 'Error_url_jump_failed.png');
    //             this.test.assert(false, 'Go to url:config_metadata fail !');
    //         },
    //         240000
    //     );
    // });
    //
    // //等待mysql-groups出现
    // universe.casper.then(function () {
    //     universe.waitForPageElementByXpath(caseName, "//td[@data-origin=\"mysql-groups\"]", 20000);
    // });
    //
    // //点击扩展图标
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//td[@data-origin='mysql-groups']/span/i"
    //         },
    //         function () {
    //             universe.capturePath(caseName, 'expand_mysqlgroup.png');
    //             this.test.assert(true, 'expand mysql_groups succcess !');
    //         });
    // });
    //
    // //等待mysql-auto_test组出现
    // universe.casper.then(function () {
    //     universe.waitForPageElementByXpath(caseName, "//td[@data-origin='mysql-auto_test']", 20000);
    // });
    //
    // //点击扩展按钮
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//td[@data-origin='mysql-auto_test']//i"
    //         },
    //         function () {
    //             universe.capturePath(caseName, 'mysql-auto_test.png');
    //             this.test.assert(true, 'expand mysql-auto_test succcess !');
    //         }
    //     );
    // });
    //
    // //等待mysqls出现
    // universe.casper.then(function () {
    //     universe.waitForPageElementByXpath(caseName, "//td[@data-origin='mysqls']", 20000);
    // });
    //
    // //点击扩展按钮，等待数据库出现
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//td[@data-origin='mysqls']//i"
    //         },
    //         function () {
    //             universe.waitForPageElementByXpath(caseName,
    //                 "//td[contains(text(),'universe/servers/server-umc-3/mysqls/" + globalText + "')]", 20000);
    //         }
    //     );
    // });

};

//启动数据库高可用能力
exports.start_HA_mysql = function (caseName, groupName, mysql_alias, exceptStr) {

    //重新加载页面，等待数据库组出现
    universe.casper.then(function () {
        this.reload(function () {
            universe.casper.then(function () {
                this.test.comment('reload the web page ,and wait the mysql group appear !');
                universe.casper.reload(function () {
                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']", 1000);
                })
            });
        });
    });

    //选择数据库组
    universe.casper.then(function () {
        this.test.comment('select  the  mysql group  !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']"
            },
            function () {
                class_Name = this.evaluate(function (groupName) {
                    return __utils__.getElementByXPath("//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']/..").className;
                }, groupName);
                this.test.comment(class_Name);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, groupName + ' is selected !');
                        universe.capturePath(caseName, 'selected_' + groupName + ".png", {
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

    //选择数据库实例
    universe.casper.then(function () {
        this.test.comment('select the mysql instance !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + mysql_alias + "\ ']"
            }, function () {
                class_Name = this.evaluate(function (mysql_alias) {
                    return __utils__.getElementByXPath("//table[@id='grid']//td[text()=\'" + mysql_alias + "\ ']/..").className;
                }, mysql_alias);
                this.test.comment(class_Name);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, mysql_alias + ' is selected !');
                        universe.capturePath(caseName, 'selected_' + mysql_alias + ".png", {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                        break;
                    }
                }
            });
    });

    //鼠标移动到高可用
    universe.casper.then(function () {
        this.test.comment('move mouse to HA');
        this.mouse.move('div#instance-ha-btn');
        universe.capturePath(caseName, 'mouse_move_to_HA.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //判断启动高可用是否可以点击，并点击
    universe.casper.then(function () {
        this.test.comment('click the HA button !');
        if (universe.assertBtnAbleByXpath("//div[@id='instance-ha-btn']//button[@id='start-mysql-ha-btn']")) {
            this.thenClick('div#instance-ha-btn button#start-mysql-ha-btn', function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the start HA button success !');
            });
        }
    });

    //等待提交对话框出现
    universe.casper.then(function () {
        this.test.comment('wait the submit dialog !');
        universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']//h3[text()='DMP']", 240000);
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.test.comment('click the submit button !');
        this.thenClick('div.dialog.confirm button.btn.confirm.confirmDone ', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the OK button success !');
        });
    });

    //等待操作成功提示
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
                //检测高可用配置想是否-已配置
                universe.casper.then(function () {
                    universe.casper.test.comment('check the HA status !');
                    universe.waitForPageElementByXpath(caseName,
                        "//table[@id='grid']//td[contains(text(),\'" + mysql_alias + "\')]//..//td[@data='uguard_status'][text()='已配置']",
                        30000);
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

    //检测角色是否变为主/从实例
    universe.casper.then(function () {
        universe.refreshRoleElement(caseName, mysql_alias, exceptStr, 0);
    });

};

//停止数据库高可用能力
exports.stop_HA_mysql = function (caseName, groupName, mysql_alias) {
    //重新加载页面，等待数据库组出现
    universe.casper.then(function () {
        this.reload(function () {
            universe.casper.then(function () {
                this.test.comment('reload the web page ,and wait the mysql group appear !');
                this.reload(function () {
                    universe.waitForPageElementByXpath(caseName, "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']", 1000);
                })
            });
        });
    });

    //选择数据库组
    universe.casper.then(function () {
        this.test.comment('select  the  mysql group  !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']"
            },
            function () {
                class_Name = this.evaluate(function (groupName) {
                    return __utils__.getElementByXPath("//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']/..").className;
                }, groupName);
                this.test.comment(class_Name);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, groupName + ' is selected !');
                        universe.capturePath(caseName, 'selected_' + groupName + ".png", {
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

    //选择数据库实例
    universe.casper.then(function () {
        this.test.comment('select the mysql instance !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + mysql_alias + "\ ']"
            }, function () {
                class_Name = this.evaluate(function (mysql_alias) {
                    return __utils__.getElementByXPath("//table[@id='grid']//td[text()=\'" + mysql_alias + "\ ']/..").className;
                }, mysql_alias);
                this.test.comment(class_Name);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, mysql_alias + ' is selected !');
                        universe.capturePath(caseName, 'selected_' + mysql_alias + ".png", {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                        break;
                    }
                }
            });
    });

    //鼠标移动到高可用
    universe.casper.then(function () {
        this.test.comment('move mouse to HA');
        this.mouse.move('div#instance-ha-btn');
        universe.capturePath(caseName, 'mouse_move_to_HA.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
    });

    //判断禁用高可用是否可以点击，并点击
    universe.casper.then(function () {
        this.test.comment('click the HA button !');
        if (universe.assertBtnAbleByXpath("//div[@id='instance-ha-btn']//button[@id='stop-mysql-ha-btn']")) {
            this.thenClick('div#instance-ha-btn button#stop-mysql-ha-btn', function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the stop HA button success !');
            });
        }
    });

    //等待提交对话框出现
    universe.casper.then(function () {
        this.test.comment('wait the submit dialog !');
        universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']//h3[text()='DMP']", 240000);
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

    //等待操作成功提示
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
                //检测高可用配置是否-暂停
                universe.casper.then(function () {
                    this.test.comment('check stop HA status !');
                    universe.waitForPageElementByXpath(caseName,
                        "//table[@id='grid']//td[contains(text(),\'" + mysql_alias + "\')]//..//td[@data='uguard_status'][text()='暂停']",
                        30000);

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

//定时自动备份
exports.automatic_BackUp = function (caseName, backUp_rule_name, backUp_tool, Operation_duration) {
    var globalText, system_hour, system_min, back_up_num;
    //重新加载页面，等待添加备份规则按钮出现
    universe.casper.then(function () {
        this.reload(function () {
            universe.casper.then(function () {
                this.test.comment('reload the web page ,and wait back up rule button appear !');
                universe.casper.reload(function () {
                    universe.waitForPageElementByXpath(caseName, "//button[@id='add-backup-rule-btn']", 240000);
                })
            });
        });
    });

    //点击备份规则按钮
    universe.casper.then(function () {
        universe.casper.thenClick("button#add-backup-rule-btn", function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the add back up rule btn success !');
            //等待添加备份规则对话框出现
            universe.waitForPageElementByXpath(caseName, "//h3[text()='添加备份规则']", 240000);
        });
    });

    //点击基本配置
    universe.casper.then(function () {
        universe.casper.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='add-backup-rule-modal']//li[text()='基本配置']"
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, "click the base configuration success !");
                universe.waitForPageElementByXpath(caseName, "//input[@id='backup_rule_id']", 240000);
            });
    });

    //获取实时备份实例名称
    universe.casper.then(function () {
        globalText = universe.casper.evaluate(function () {
            return __utils__.getElementByXPath("//div[@class='tiplistWrap']//li[contains(text(),'(别名：automationMysql_2)')]").innerText;
        });
        universe.casper.test.comment("Got back up instance name is :" + globalText);
    });

    //获取当前时间
    universe.casper.then(function () {
        var myData = new Date();
        system_hour = myData.getHours();
        system_min = myData.getMinutes();
        universe.casper.test.comment('Current system time is: ' + system_hour + ":" + system_min);
    });

    //点击选择备份实例名称
    universe.casper.then(function () {
        this.thenClick(
            {
                type: 'xpath',
                path: '//input[@placeholder="备份实例名"]'
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the back up instance name success !');
                this.thenClick(
                    {
                        type: 'xpath',
                        path: "//li[text()='" + globalText + "']"
                    }, function () {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, 'select the back up instance name success !');
                        universe.capturePath(caseName, 'select_the_backUp_instance.png');
                    }
                );
            });

    });

    //填写配置表单
    universe.casper.then(function () {
        system_min = system_min + 2;
        if (system_min == 60) {
            system_min = 0;
            system_hour = system_hour + 1;
            if (system_hour == 24) {
                system_hour = 0;
            }
        } else if (system_min == 61) {
            system_min = 1;
            system_hour = system_hour + 1;
            if (system_hour == 24) {
                system_hour = 0;
            }
        }
        temp_time = "0 " + system_min + " " + system_hour + " 1/1 * ?";
        universe.casper.test.comment('Current full back up time is:' + temp_time);
        this.fillSelectors("div#add-backup-rule-modal form",
            {
                'input#backup_rule_id': backUp_rule_name,
                'select#backup_tool': backUp_tool,
                'div[id="add-backup-rule-modal"] input[placeholder="全备时间"]': temp_time,
                'div#add-backup-rule-modal input[name="maintain_duration_hour"]': Operation_duration
            }, false);
        universe.capturePath(caseName, 'finish_the_form.png');
    });

    //点击配置备份
    universe.casper.then(function () {
        universe.casper.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='add-backup-rule-modal']//li[text()='备份配置']"
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the config back up success !');
                //等待配置备份模板出现
                universe.waitForPageElementByXpath(caseName, "//div[@id='add-backup-rule-modal']//label[text()='备份配置模板']", 240000)
            });
    });

    //点击保存按钮
    universe.casper.then(function () {
        universe.casper.thenClick(
            {
                type: 'xpath',
                path: "//div[@id='add-backup-rule-modal']//button[@class='btn save']"
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the save button success !');
                //等待操作清单出现
                universe.waitForPageElementByXpath(caseName, "//h3[text()='操作清单']", 240000);
            });
    });

    //点击执行按钮
    universe.casper.then(function () {
        this.thenClick(
            {
                type: 'xpath',
                path: "//button[@class='btn confirm confirmDone ']"
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the confirm button success !');
                //等待确认更新按钮出现
                universe.waitForPageElementByXpath(caseName, "//div[@class='dialog reConfirm']", 240000);
            }
        );
    });

    //点击确认更新按钮，等待添加备份规则成功
    universe.casper.then(function () {
        this.thenClick(
            {
                type: 'xpath',
                path: "//button[text()='确认更新']"
            }, function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the update button success !');
                universe.waitForPageElementByXpath(caseName, "//div[contains(text(),'添加备份规则成功！')]", 240000);
            }
        );
    });

    //点击确定按钮
    universe.casper.then(function () {
        this.thenClick('button.btn.confirmed', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the Ok button success !');
            this.wait(60000);
        });
    });

    //进入备份集管理
    universe.casper.then(function () {
        universe.navigate_to_aLink_Path(caseName, '/urman_backupset');
    });

    //检测自动备份是否成功
    universe.casper.then(function () {
        universe.waitForPageElementByXpath(caseName, "//td[@data-origin='自动备份']", 240000);
    });

    //获取实时备份编号
    universe.casper.then(function () {
        back_up_num = universe.casper.evaluate(function () {
            return __utils__.getElementByXPath("//td[@data-origin='自动备份']/../td[@data='backup_set_id']").innerText;
        });
        universe.casper.test.comment("Got back up number is :" + back_up_num);
    });

    // //跳转到配置元数据
    // universe.casper.then(function () {
    //     universe.navigate_to_aLink_Path(caseName, '/config_metadata');
    // });
    //
    // //等待跳转url成功
    // universe.casper.then(function () {
    //     this.waitForUrl(/\/config_metadata/,
    //         function () {
    //             this.test.assert(true, 'Go to url:config_metadata success !');
    //             universe.capturePath(caseName, 'url_jump_success.png');
    //         },
    //         function () {
    //             universe.capturePath(caseName, 'Error_url_jump_failed.png');
    //             this.test.assert(false, 'Go to url:config_metadata fail !');
    //         },
    //         240000
    //     );
    // });
    //
    // //等待urman出现
    // universe.casper.then(function () {
    //     universe.waitForPageElementByXpath(caseName, "//td[@data-origin='urman']", 20000);
    // });
    //
    // //点击扩展图标
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//td[@data-origin='urman']/span/i"
    //         },
    //         function () {
    //             universe.capturePath(caseName, 'expand_urman.png');
    //             this.test.assert(true, 'expand urman succcess !');
    //         });
    // });
    //
    // //等待max-delay组出现
    // universe.casper.then(function () {
    //     universe.waitForPageElementByXpath(caseName, "//td[@data-origin='max-delay']", 20000);
    //     universe.waitForPageElementByXpath(caseName, "//td[@data-origin='24h']", 20000);
    // });
    //
    // //点击using-backup-sets的扩展按钮
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//td[@data-origin='using-backup-sets']/span/i"
    //         },
    //         function () {
    //             universe.capturePath(caseName, 'expand_using-backup-sets.png');
    //             this.test.assert(true, 'expand using-backup-sets succcess !');
    //         });
    // });
    //
    // //等待备份编号出现
    // universe.casper.then(function () {
    //     universe.waitForPageElementByXpath(caseName, "//td[@data-origin='" + back_up_num + "']", 20000);
    // });

    //在主机上检测备份文件
    universe.casper.then(function () {
        universe.checkFolder(downloads.umc_3_user, downloads.umc_3_ip, Init_DMP.file_3306_Cmd, Init_DMP.file_3306_ViewCmd, back_up_num);
    });

};

//删除备份规则
exports.delete_BackUp_rule = function (caseName, backUp_rule_name) {
    var back_up_num;
    //重新加载页面，等待添加备份规则按钮出现
    universe.casper.then(function () {
        this.reload(function () {
            universe.casper.then(function () {
                this.test.comment('reload the web page ,and wait back up rule appear !');
                universe.casper.reload(function () {
                    universe.waitForPageElementByXpath(caseName, "//td[@data-origin='" + backUp_rule_name + "']", 240000);
                })
            });
        });
    });

    //获取实时备份编号
    universe.casper.then(function () {
        back_up_num = universe.casper.evaluate(function () {
            return __utils__.getElementByXPath("//td[@data-origin='自动备份']/../td[8]").innerText;
        });
        universe.casper.test.comment("Got back up number is :" + back_up_num);
    });

    //点击删除备份规则按钮
    universe.casper.then(function () {
        universe.casper.thenClick("td[data-origin='" + backUp_rule_name + "']", function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'selected the back up rule !');
            //判断移除备份规则按钮是否可以点击
            if (universe.assertBtnAbleByXpath("//button[@id='remove-backup-rule-btn']")) {
                //点击移除按钮
                universe.casper.thenClick('button#remove-backup-rule-btn', function () {
                    universe.casper.test.assert(true, 'click the remove back up rule button success !');
                    //等待确认对话框出现
                    universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']", 240000);
                });
            }

        });
    });

    //点击确认按钮
    universe.casper.then(function () {
        this.thenClick("button.btn.confirm.confirmDone", function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the OK button success !');
            //等待确认更新按钮出现
            universe.waitForPageElementByXpath(caseName, "//div[@class='dialog reConfirm']", 240000);
        });

    });

    //点击确认更新按钮,等待删除备份规则成功对话框出现
    universe.casper.then(function () {
        //等待删除备份规则成功对话框出现
        this.thenClick(
            {
                type: 'xpath',
                path: "//button[text()='确认更新']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the sure update !');
                universe.waitForPageElementByXpath(caseName, "//div[contains(text(),'删除备份规则成功')]", 240000);
            });

    });

    //点击确认按钮
    universe.casper.then(function () {
        this.thenClick('button.btn.confirmed', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the OK button success !');
            //等待删除备份规则目录对话框出现
            universe.waitForPageElementByXpath(caseName, "//div[contains(text(),'是否要删除备份规则')]", 240000);
        });
    });

    //点击确认按钮
    universe.casper.then(function () {
        universe.casper.thenClick('button.btn.confirm.confirmDone', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the Ok button success !');
        });

    });

    //等待操作成功出现
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
                //等待备份规则消失
                this.waitWhileVisible(
                    {
                        type: 'xpath',
                        path: "//td[@data-source='" + backUp_rule_name + "']"
                    },
                    function () {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, 'delete the back up rule success !');
                        universe.capturePath(caseName, 'delete_back_up_rule_success.png');
                    },
                    function () {
                        universe.capturePath(caseName, 'delete_back_up_rule_fail.png');
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(false, 'Error: delete the back up rule failed !');

                    }, 240000
                );

            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 240000);
    });

    //跳转到备份集管理
    universe.casper.then(function () {
        universe.navigate_to_aLink_Path(caseName, '/urman_backupset');
    });

    //等待跳转url成功
    universe.casper.then(function () {
        this.waitForUrl(/\/urman_backupset/,
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'Go to url:urman_backupset success !');
                universe.capturePath(caseName, 'url_jump_success.png');
            },
            function () {
                universe.capturePath(caseName, 'Error_url_jump_failed.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Go to url:config_metadata fail !');
            },
            240000
        );
    });

    //断言自动备份不存在页面上
    universe.casper.then(function () {
        this.test.assertTextDoesntExist('自动备份', 'page body does not contain "autoBackUp"');
        this.wait(30000, function () {
            universe.capturePath(caseName, 'all_backup.png');
        });
    });

    //在主机上检测备份文件
    universe.casper.then(function () {
        universe.checkFolderNotExit(downloads.umc_3_user, downloads.umc_3_ip, Init_DMP.file_3306_Cmd, Init_DMP.file_3306_ViewCmd, back_up_num);
    });

};

//重置数据库实例
exports.reset_Mysql_instance = function (caseName, mysql_alias) {

    //重新加载页面，等待重置按钮出现
    universe.casper.then(function () {
        this.reload(function () {
            universe.casper.then(function () {
                this.test.comment('reload the web page ,and wait reset button appear !');
                universe.casper.reload(function () {
                    universe.waitForPageElementByXpath(caseName, "//div[@id='instance-reset-btn']", 240000);
                })
            });
        });
    });

    //选择要重置的数据库实例
    universe.casper.then(function () {
        this.test.comment('select the mysql instance !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + mysql_alias + "\ ']"
            }, function () {
                class_Name = this.evaluate(function (mysql_alias) {
                    return __utils__.getElementByXPath("//table[@id='grid']//td[text()=\'" + mysql_alias + "\ ']/..").className;
                }, mysql_alias);
                this.test.comment(class_Name);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, mysql_alias + ' is selected !');
                        universe.capturePath(caseName, 'selected_' + mysql_alias + ".png", {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                        break;
                    }
                }
            });
    });


    //点击重置数据库实例按钮
    universe.casper.then(function () {
        this.thenClick('button#reset-database-instance-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the reset button success !');
        });
    });

    //等待重置数据库实例对话框出现
    universe.casper.then(function () {
        universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']", 240000);
    });

    //点击确认按钮
    universe.casper.then(function () {
        this.thenClick("button.btn.confirm.confirmDone", function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the OK button success !');
            //等待重置数据库实例对话框出现
            universe.waitForPageElementByXpath(caseName, "//div[@id='reset-database-instance-modal']", 240000);
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.thenClick("div#reset-database-instance-modal button.btn.save", function () {
            //等待操作清单对话框出现
            universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']", 240000);
        });
    });

    //点击执行按钮
    universe.casper.then(function () {
        this.thenClick("button.btn.confirm.confirmDone", function () {
            //等待操作成功出现
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
                        this.test.assert(true, 'reset the mysql instance success !');
                    },
                    function () {
                        universe.capturePath(caseName, 'Error_task_success.png');
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(false, 'Error: task fail !');
                    }, 180000);
            });
        });
    });
};

//关闭数据库实例监控
exports.close_Mysql_instance_monitor = function (caseName, mysql_alias) {
    //重新加载页面，等待监控按钮出现
    universe.casper.then(function () {
        this.reload(function () {
            universe.casper.then(function () {
                this.test.comment('reload the web page ,and wait instance monitor button appear !');
                universe.casper.reload(function () {
                    universe.waitForPageElementByXpath(caseName, "//div[@id='instance-monitor-btn']", 240000);
                })
            });
        });
    });

    //选择要关闭监控的数据库实例
    universe.casper.then(function () {
        this.test.comment('select the mysql instance !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + mysql_alias + "\ ']"
            }, function () {
                class_Name = this.evaluate(function (mysql_alias) {
                    return __utils__.getElementByXPath("//table[@id='grid']//td[text()=\'" + mysql_alias + "\ ']/..").className;
                }, mysql_alias);
                this.test.comment(class_Name);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, mysql_alias + ' is selected !');
                        universe.capturePath(caseName, 'selected_' + mysql_alias + ".png", {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                        break;
                    }
                }
            });
    });

    //点击 禁用数据库实例监控 按钮
    universe.casper.then(function () {
        this.thenClick('button#pause-monitor-instance-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click pause monitor instance button success !');
            //等待停用数据库实例对话框出现
            universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']//div[contains(text(),'确定停用对数据库实例')]", 240000);
        });
    });

    //点击确定按钮
    universe.casper.then(function () {
        this.thenClick('div.confirm button.confirmDone', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the OK button success !');
        });
    });

    //等待操作成功
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            }, function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                universe.waitForPageElementByXpath(caseName, "//td[@data-source='" + mysql_alias + "']/../td[@data-origin='未监控']", 0);
            }, function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 240000)
    });


};

//关闭数据库组监控
exports.close_Mysql_group_monitor = function (caseName, groupName) {
    //重新加载页面，等待监控按钮出现
    universe.casper.then(function () {
        this.reload(function () {
            universe.casper.then(function () {
                this.test.comment('reload the web page ,and wait group monitor button appear !');
                universe.casper.reload(function () {
                    universe.waitForPageElementByXpath(caseName, "//div[@id='group-monitor-btn']", 240000);
                })
            });
        });
    });

    //选择数据库组
    universe.casper.then(function () {
        this.test.comment('select  the  mysql group  !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']"
            },
            function () {
                class_Name = this.evaluate(function (groupName) {
                    return __utils__.getElementByXPath("//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']/..").className;
                }, groupName);
                this.test.comment(class_Name);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, groupName + ' is selected !');
                        universe.capturePath(caseName, 'selected_' + groupName + ".png", {
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

    //点击 禁用数据库实例监控 按钮
    universe.casper.then(function () {
        this.thenClick('button#pause-monitor-group-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click pause monitor group button success !');
            //等待停用数据库实例对话框出现
            universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']//div[contains(text(),'组的监控')]", 240000);
        });
    });

    //点击确定按钮
    universe.casper.then(function () {
        this.thenClick('div.confirm button.confirmDone', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the OK button success !');
        });
    });

    //等待操作成功
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            }, function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                universe.waitForPageElementByXpath(caseName, "//table[@id='grid-group']//td[@data-origin='未监控']", 0);
            }, function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 240000)
    });

};

//启动数据库组监控
exports.start_Mysql_group_monitor = function (caseName, groupName) {
    //重新加载页面，等待监控按钮出现
    universe.casper.then(function () {
        this.reload(function () {
            universe.casper.then(function () {
                this.test.comment('reload the web page ,and wait group monitor button appear !');
                universe.casper.reload(function () {
                    universe.waitForPageElementByXpath(caseName, "//div[@id='group-monitor-btn']", 240000);
                })
            });
        });
    });

    //选择数据库组
    universe.casper.then(function () {
        this.test.comment('select  the  mysql group  !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']"
            },
            function () {
                class_Name = this.evaluate(function (groupName) {
                    return __utils__.getElementByXPath("//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']/..").className;
                }, groupName);
                this.test.comment(class_Name);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, groupName + ' is selected !');
                        universe.capturePath(caseName, 'selected_' + groupName + ".png", {
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

    //点击 启用数据库实例监控 按钮
    universe.casper.then(function () {
        this.thenClick('button#start-monitor-group-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click start monitor group button success !');
            //等待启用数据库实例对话框出现
            universe.waitForPageElementByXpath(caseName, "//div[@id='start-monitor-group-modal']", 240000);
        });
    });

    //点击确定按钮
    universe.casper.then(function () {
        this.thenClick('div#start-monitor-group-modal button.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the OK button success !');
            //等待操作清单对话框出现
            universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']", 240000);
        });
    });

    //点击 执行 按钮
    universe.casper.then(function () {
        this.thenClick('button.btn.confirm.confirmDone', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click confirm Done button success !');
        });
    });

    //等待操作成功
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            }, function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                universe.waitForPageElementByXpath(caseName, "//table[@id='grid-group']//td[@data-origin='监控中']", 0);
            }, function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 240000)
    });
};

//启动数据库实例监控
exports.start_Mysql_instance_monitor = function (caseName, mysql_alias) {
    //重新加载页面，等待监控按钮出现
    universe.casper.then(function () {
        this.reload(function () {
            universe.casper.then(function () {
                this.test.comment('reload the web page ,and wait instance monitor button appear !');
                universe.casper.reload(function () {
                    universe.waitForPageElementByXpath(caseName, "//div[@id='instance-monitor-btn']", 240000);
                })
            });
        });
    });

    //选择要启动监控的数据库实例
    universe.casper.then(function () {
        this.test.comment('select the mysql instance !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()=\'" + mysql_alias + "\ ']"
            }, function () {
                class_Name = this.evaluate(function (mysql_alias) {
                    return __utils__.getElementByXPath("//table[@id='grid']//td[text()=\'" + mysql_alias + "\ ']/..").className;
                }, mysql_alias);
                this.test.comment(class_Name);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, mysql_alias + ' is selected !');
                        universe.capturePath(caseName, 'selected_' + mysql_alias + ".png", {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                        break;
                    }
                }
            });
    });

    //点击 启动数据库实例监控 按钮
    universe.casper.then(function () {
        this.thenClick('button#start-monitor-instance-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click start monitor instance button success !');
            //等待启用数据库实例对话框出现
            universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']//div[contains(text(),'确定启用对数据库实例')]", 240000);
        });
    });

    //点击确定按钮
    universe.casper.then(function () {
        this.thenClick('div.confirm button.confirmDone', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the OK button success !');
        });
    });

    //等待操作成功
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            }, function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');
                universe.waitForPageElementByXpath(caseName, "//td[@data-source='" + mysql_alias + "']/../td[@data-origin='监控中']", 0);
            }, function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 240000)
    });


};

//查看监控项目
exports.check_Monitor = function (caseName, ip, port, groupName) {
    var json_ip;
    //切换到配置元数据
    universe.casper.then(function () {
        universe.navigate_to_aLink_Path(caseName, '/config_metadata');
    });

    //等待跳转url成功
    universe.casper.then(function () {
        this.waitForUrl(/\/config_metadata/,
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'Go to url:config_metadata success !');
                universe.capturePath(caseName, 'url_jump_success.png');
            },
            function () {
                universe.capturePath(caseName, 'Error_url_jump_failed.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Go to url:config_metadata fail !');
            },
            240000
        );
    });

    //等待V3在页面上出现
    universe.casper.then(function () {
        universe.waitForPageElementByXpath(caseName, "//td[@data-origin='v3']", 20000);
    });

    //点击扩展图标V3
    universe.casper.then(function () {
        this.thenClick(
            {
                type: 'xpath',
                path: "//td[@data-origin='v3']//i"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'expand V3 success !');
                universe.capturePath(caseName, 'expand_V3.png');
                universe.waitForPageElementByXpath(caseName, "//td[@data-origin='configs']", 30000);
            }
        );
    });

    //点击configs扩展图标
    universe.casper.then(function () {
        this.thenClick(
            {
                type: 'xpath',
                path: "//td[@data-origin='configs']//i"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'expand configs success !');
                universe.capturePath(caseName, 'expand_configs.png');
                universe.waitForPageElementByXpath(caseName, "//td[@data-origin='umon-config']", 30000);
            }
        );
    });

    //设置ip和port
    universe.casper.then(function () {

        json_ip = universe.casper.evaluate(function () {
            return __utils__.getElementByXPath("//td[@data-origin='umon-config']/../td[2]").getAttribute('data-origin');
        });
        var obj = eval("(" + json_ip + ")");

        result_ip = json_ip.replace(obj.monitor_ip, ip).replace(obj.monitor_port, port);
    });

    //选择monitor-ip
    universe.casper.then(function () {
        this.thenClick(
            {
                type: 'xpath',
                path: "//td[@data-origin='umon-config']/../td[2]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'select umon-config success !');
                universe.capturePath(caseName, 'selected_umon-config.png');
                //点击修改所选配置项
                universe.casper.thenClick('button#update-item-btn', function () {
                    //等待修改配置项对话框出现
                    universe.waitForPageElementByXpath(caseName, "//div[@id='update-item-modal']", 20000);
                });

            }
        );
    });

    //填写值表单
    universe.casper.then(function () {
        this.fillSelectors('div#update-item-modal form',
            {
                'div#update-item-modal  textarea#update_value': result_ip
            },
            false
        );
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.thenClick('div#update-item-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save butoon success !');
            universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']", 240000);
        });
    });

    //点击执行按钮
    universe.casper.then(function () {
        this.thenClick('button.confirmDone', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the confirmDone !');

        });
    });

    //等待操作成功提示
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
            }, 240000
        );
    });

    //切换到实例配置页面
    universe.casper.then(function () {
        universe.navigate_to_aLink_Path(caseName, '/database');
    });

    //等待跳转url成功
    universe.casper.then(function () {
        this.waitForUrl(/\/database/,
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'Go to url:config_metadata success !');
                universe.capturePath(caseName, 'url_jump_success.png');
            },
            function () {
                universe.capturePath(caseName, 'Error_url_jump_failed.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Go to url:config_metadata fail !');
            },
            240000
        );
    });

    //重新加载页面，等待监控按钮出现
    universe.casper.then(function () {
        this.reload(function () {
            universe.casper.then(function () {
                this.test.comment('reload the web page ,and wait group monitor button appear !');
                universe.casper.reload(function () {
                    universe.waitForPageElementByXpath(caseName, "//div[@id='group-monitor-btn']", 240000);
                })
            });
        });
    });

    //选择数据库组
    universe.casper.then(function () {
        this.test.comment('select  the  mysql group  !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']"
            },
            function () {
                class_Name = this.evaluate(function (groupName) {
                    return __utils__.getElementByXPath("//table[@id='grid-group']//td[text()=\'mysql-" + groupName + "\']/..").className;
                }, groupName);
                this.test.comment(class_Name);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, groupName + ' is selected !');
                        universe.capturePath(caseName, 'selected_' + groupName + ".png", {
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

    //点击 数据库实例监控 按钮
    universe.casper.then(function () {
        var url;
        this.thenClick('button#monitor-database-group-btn', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click monitor database group button success !');
            this.wait(6000, function () {
                url = this.evaluate(function () {
                    return __utils__.getElementByXPath("//div[@id='monitors']/iframe").getAttribute('src');
                });
                this.test.comment(url);
                universe.casper.thenOpen(url, function () {
                    universe.capturePath(caseName, 'monitor.png');
                    //universe.waitForPageElementByXpath(caseName,'//input[@name="username"]',240000);
                });
            });
        });
    });

    universe.casper.then(function () {
        var testText;
        testText = this.evaluate(function () {
            return __utils__.getElementByXPath("//input[@id='inputPassword']").getAttribute('placeholder');
        });
        //universe.casper.test.comment(testText);
        if (testText == 'password') {
            //输入用户名和密码
            universe.casper.then(function () {
                this.fillSelectors('div.login.container  form',
                    {
                        'input[name="username"]': 'universe-view',
                        'input#inputPassword': 'QdtAc4VVZwatwVpJ'
                    }, false);
            });

            //点击登陆按钮
            universe.casper.then(function () {
                this.thenClick('button[type="submit"]', function () {
                    this.test.comment('Loging ......');
                    universe.waitForPageElementByXpath(caseName, "//span[@class='icon-circle sidemenu-icon']//i[@class='gicon gicon-dashboard']", 240000);
                })
            });
        }

    });

    //查找数据库组
    universe.casper.then(function () {
        universe.waitForPageElementByXpath(caseName, "//a[contains(text(),'mysql-" + groupName + "')]", 240000);
    });

    //点击主页按钮
    universe.casper.then(function () {
        this.thenClick(
            {
                type: 'xpath',
                path: "//span[@class='icon-circle sidemenu-icon']//i[@class='gicon gicon-dashboard']"
            },
            function () {
                //导航按钮出现
                universe.waitForPageElementByXpath(caseName, "//a[@class='navbar-page-btn']", 240000);
            }
        );
    });

    //点击导航按钮，检测UDP monitor
    universe.casper.then(function () {
        this.thenClick('a.navbar-page-btn', function () {
            universe.waitForPageElementByXpath(caseName, "//div[text()='UDP monitor']", 240000);
        });

    });


    //选择UDP monitor
    universe.casper.then(function () {
        this.thenClick(
            {
                type: 'xpath',
                path: "//div[text()='UDP monitor']"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the UDP monitor success !');
                universe.waitForPageElementByXpath(caseName, "//span[text()='Servers']/../../../../../../../../..//span[text()='3']", 240000);
                universe.waitForPageElementByXpath(caseName, "//span[text()='MySQLInstances']/../../../../../../../../..//span[text()='3']", 240000);
            }
        )
    });

};

//修改universe/uguard/exercise-task/manual-running=1
exports.modify_manual_running = function (caseName, value_1, userName, ip, localPath, remotePath) {

    var scpVerRet;
    //切换到配置元数据
    universe.casper.then(function () {
        universe.navigate_to_aLink_Path(caseName, '/config_metadata');
    });

    //等待跳转url成功
    universe.casper.then(function () {
        this.waitForUrl(/\/config_metadata/,
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'Go to url:config_metadata success !');
                universe.capturePath(caseName, 'url_jump_success.png');
            },
            function () {
                universe.capturePath(caseName, 'Error_url_jump_failed.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Go to url:config_metadata fail !');
            },
            240000
        );
    });

    //等待V3在页面上出现
    universe.casper.then(function () {
        universe.waitForPageElementByXpath(caseName, "//td[@data-origin='v3']", 20000);
    });

    //点击扩展图标V3
    universe.casper.then(function () {
        this.thenClick(
            {
                type: 'xpath',
                path: "//td[@data-origin='v3']//i"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'expand V3 success !');
                universe.capturePath(caseName, 'expand_V3.png');
                universe.waitForPageElementByXpath(caseName, "//td[@data-origin='configs']", 30000);
            }
        );
    });

    //点击configs扩展图标
    universe.casper.then(function () {
        this.thenClick(
            {
                type: 'xpath',
                path: "//td[@data-origin='configs']//i"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'expand configs success !');
                universe.capturePath(caseName, 'expand_configs.png');
                universe.waitForPageElementByXpath(caseName, "//td[@data-origin='uguard-config']", 30000);
            }
        );
    });

    //设置ManualRunning
    universe.casper.then(function () {

        json_run = universe.casper.evaluate(function () {
            return __utils__.getElementByXPath("//td[@data-origin='uguard-config']/../td[2]").getAttribute('data-origin');
        });
        result_run = json_run.replace('"ManualRunning":false', '"ManualRunning":' + value_1);
    });

    //选择manual-running
    universe.casper.then(function () {
        this.thenClick(
            {
                type: 'xpath',
                path: "//td[@data-origin='uguard-config']/../td[2]"
            },
            function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'select uguard-config success !');
                universe.capturePath(caseName, 'selected_uguard-config.png');
                //点击修改所选配置项
                universe.casper.thenClick('button#update-item-btn', function () {
                    //等待修改配置项对话框出现
                    universe.waitForPageElementByXpath(caseName, "//div[@id='update-item-modal']", 20000);
                });

            }
        );
    });

    //填写值表单
    universe.casper.then(function () {
        this.fillSelectors('div#update-item-modal form',
            {
                'div#update-item-modal  textarea#update_value': result_run
            },
            false
        );
    });

    //点击保存按钮
    universe.casper.then(function () {
        this.thenClick('div#update-item-modal button.btn.save', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the save butoon success !');
            universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']", 240000);
        });
    });

    //点击执行按钮
    universe.casper.then(function () {
        this.thenClick('button.confirmDone', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the confirmDone !');

        });
    });

    //等待操作成功提示
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
            }, 240000
        );
    });

    //等待演练完成
    universe.casper.then(function () {
        this.wait(40000);
    });

    // //等待uguard在页面上出现
    // universe.casper.then(function () {
    //     universe.waitForPageElementByXpath(caseName, "//td[@data-origin='uguard']", 20000);
    // });
    //
    // //点击uguard扩展图标
    // universe.casper.then(function () {
    //     this.thenClick(
    //         {
    //             type: 'xpath',
    //             path: "//td[@data-origin='uguard']//i"
    //         },
    //         function () {
    //             this.test.assert(true, 'expand uguard success !');
    //             universe.capturePath(caseName, 'expand_uguard.png');
    //             universe.waitForPageElementByXpath(caseName, "//td[@data-origin='exercise-task']", 30000);
    //         }
    //     );
    // });

    //等待manual-running 自动变成0
    // universe.casper.then(function () {
    //     universe.waitForPageElementByXpath(caseName, "//td[@data-origin='manual-running']/../td[text()='0']", 30000);
    //     // this.thenClick(
    //     //     {
    //     //         type: 'xpath',
    //     //         path: "//td[@data-origin='exercise-task']//i"
    //     //     },
    //     //     function () {
    //     //         this.test.assert(true, 'expand exercise-task success !');
    //     //         universe.capturePath(caseName, 'expand_exercise-task.png');
    //     //         universe.waitForPageElementByXpath(caseName, "//td[@data-origin='manual-running']/../td[text()='0']", 30000);
    //     //     }
    //     // );
    // });

    //scp log文件到本地
    universe.casper.then(function () {
        scpVerRet = commonFun.scpFromRemoteToLocal(userName, ip, localPath, remotePath);
    });

    //等待scp成功
    universe.casper.then(function () {
        this.waitFor(scpVerRet.wait);
    });

    //读取key.log日志
    universe.casper.then(function () {
        var content = fs.read('log/key.log');
        var tempindex = content.indexOf("promote master for exercise task success");
        if (tempindex != -1) {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, '/opt/uguard-mgr/logs/key.log got message: promote master for exercise task success !');
        } else {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, '/opt/uguard-mgr/logs/key.log has no message: promote master for exercise task success !');
        }
    });

};


//切换数据库主从
exports.switch_mysql_Master_Slave_instance = function (caseName, exceptStr) {
    //重新加载页面，等待主从实例
    var mysql_alias, host_ip, reverse_ip, getResult;
    universe.casper.then(function () {
        this.reload(function () {
            universe.casper.then(function () {
                this.test.comment('reload the web page ,and wait slave instance appear !');
                universe.casper.reload(function () {
                    universe.waitForPageElementByXpath(caseName, "//td[@data-origin='从实例']", 120000);
                })
            });
        });
    });

    //选择要提升为主的数据库实例
    universe.casper.then(function () {
        this.test.comment('select the mysql instance !');
        this.thenClick(
            {
                type: 'xpath',
                path: "//td[@data-origin='从实例']"
            }, function () {
                class_Name = this.evaluate(function () {
                    return __utils__.getElementByXPath("//td[@data-origin='从实例']/..").className;
                });
                this.test.comment(class_Name);
                var arr = class_Name.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == 'select') {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, 'slave is selected !');
                        universe.capturePath(caseName, 'selected_slave.png', {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                        break;
                    }
                }
            });
    });

    //获取从实例的主机名
    universe.casper.then(function () {
        mysql_alias = this.evaluate(function () {
            return __utils__.getElementByXPath("//td[@data-origin='从实例']/../td[@data='mysql_alias']").innerText.replace(/\s*$/, "");
        });

    });

    //点击提升为主按钮
    universe.casper.then(function () {
        if (universe.assertBtnAbleByXpath("//button[@id='promote-to-master-btn']")) {
            this.thenClick('button#promote-to-master-btn', function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the promote to master button success !');
                universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']", 240000);
            });
        }
    });

    //点击确定按钮
    universe.casper.then(function () {
        this.thenClick('button.confirmDone', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the confirmDone button success !');
        });
    });

    //等待操作成功
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//span[text()='操作成功']"
            }, function () {
                universe.capturePath(caseName, 'task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'task success !');

                universe.casper.test.comment(mysql_alias);
                universe.refreshRoleElement(caseName, mysql_alias, exceptStr, 0);

            }, function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(false, 'Error: task fail !');
            }, 240000)
    });

    //自动切换IP
    universe.casper.then(function () {
        if (mysql_alias == 'automationMysql_1') {
            host_ip = "172.100.10.2";
            reverse_ip = "172.100.10.3";
        } else if (mysql_alias == 'automationMysql_2') {
            host_ip = "172.100.10.3";
            reverse_ip = "172.100.10.2";
        }
    });

    //访问数据库
    universe.casper.then(function () {
        this.test.comment('exec sql sql_slave_status  .......');
        getResult = commonFun.ssh(downloads.umc_2_user, reverse_ip, Init_DMP.sql_slave_status);
    });

    universe.casper.then(function () {
        this.waitFor(getResult.wait);
    });

    universe.casper.then(function () {
        if (getResult.output().indexOf('Slave_IO_Running: Yes') != -1 && getResult.output().indexOf('Slave_SQL_Running: Yes') != -1) {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'switch master_slave_success !');
            this.test.comment(getResult.output());
        }
    });

    //kill 主实例进程
    universe.casper.then(function () {
        universe.killMasterInstance(downloads.umc_2_user, host_ip, Init_DMP.kill_Masert_instanc_process);
    });

    //检测主数据库健康状态
    universe.casper.then(function () {
        //universe.waitForPageElementByXpath(casName,"//td[@data-source='"+mysql_alias+"']/../td[@data='mysql_status'][text()='异常']",2400000);
        universe.refreshCheckEleByXpath(caseName, "//td[@data-source='" + mysql_alias + "']/../td[@data='mysql_status']", "异常", 0);
    });

    //获取sip状态
    universe.casper.then(function () {
        this.test.comment("get  umc-2 sip:");
        universe.getNodeSip(downloads.umc_2_user, downloads.umc_2_ip, 'ip a');
        this.test.comment("get  umc-3 sip:");
        universe.getNodeSip(downloads.umc_3_user, downloads.umc_3_ip, 'ip a');
    });

    //检测复制状态
    universe.casper.then(function () {
        universe.refreshCheckEleByXpath(caseName, "//td[@data-source='" + mysql_alias + "']/../td[@data='replication_status']", "未知状态", 0);
    });

    //检测高可用配置
    universe.casper.then(function () {
        universe.refreshCheckEleByXpath(caseName, "//td[@data-source='" + mysql_alias + "']/../td[@data='uguard_status']", "暂停(数据库故障)", 0);
    });


};

//数据库组参数变更
exports.modify_mysqlInstance_parameter = function (caseName, user, password, mysql_group_id, parameter_value) {

    //重新加载页面等待添加变更配置 按钮 出现
    universe.casper.then(function () {
        this.reload(function () {
            universe.casper.then(function () {
                this.test.comment('reload the web page ,and wait add change config button appear !');
                universe.casper.reload(function () {
                    universe.waitForPageElementByXpath(caseName, "//button[@id='add-config-btn']", 120000);
                })
            });
        });
    });

    //点击添加变更配置 按钮
    universe.casper.then(function () {
        if (universe.assertBtnAbleByXpath("//button[@id='add-config-btn']")) {
            this.thenClick('button#add-config-btn', function () {
                var myDate = new Date();
                this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                this.test.assert(true, 'click the promote to master button success !');
                universe.waitForPageElementByXpath(caseName, "//div[@id='add-config-modal']", 240000);
            });
        }
    });

    //填写表单
    universe.casper.then(function () {
        this.fillSelectors("div#add-config-modal form",
            {
                'input#super_user': user,
                'input#super_password': password,
                'input#option_value': parameter_value
            }, false);
    });


    //点击变更数据库
    universe.casper.then(function () {
        this.thenClick('input[name="mysql_id"]', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the change mysql success !');
            universe.casper.then(function () {
                universe.casper.thenClick('li[data="' + mysql_group_id + '"]', function () {
                    universe.capturePath(caseName, 'select_mysql_group.png');
                });
            });
        });
    });

    //点击变更配置参数
    universe.casper.then(function () {
        this.thenClick('dd.form-item.listItem input[name="option"]', function () {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'click the change config parameter success !');
            universe.casper.then(function () {
                universe.casper.thenClick('li[data="slave-net-timeout"]', function () {
                    universe.capturePath(caseName, 'select_config_parameter.png');
                });
            });
        });
    });

    //点击确定按钮
    universe.casper.then(function () {
        this.thenClick('button.btn.save', function () {
            universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']", 240000);
        });
    });

    //点击执行按钮
    universe.casper.then(function () {
        this.thenClick("button.btn.confirm.confirmDone", function () {
            //等待操作成功
            universe.casper.then(function () {
                this.waitUntilVisible(
                    {
                        type: 'xpath',
                        path: "//span[text()='操作成功']"
                    }, function () {
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, 'task success !');
                        universe.capturePath(caseName, 'task_success.png');
                        universe.waitForPageElementByXpath(caseName, "//td[@data-origin='" + mysql_group_id + "']", 30000);
                    }, function () {
                        universe.capturePath(caseName, 'Error_task_success.png');
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(false, 'Error: task fail !');
                    }, 240000)
            });
        });
    });

    //点击提交变更参数按钮
    universe.casper.then(function () {
        this.thenClick('button#save-config-btn', function () {
            universe.waitForPageElementByXpath(caseName, "//div[@class='dialog confirm']", 240000);
        });
    });

    //点击确定按钮
    universe.casper.then(function () {
        this.thenClick('button.btn.confirm.confirmDone', function () {
            //等待操作成功
            universe.casper.then(function () {
                this.waitUntilVisible(
                    {
                        type: 'xpath',
                        path: "//span[text()='操作成功']"
                    }, function () {
                        universe.capturePath(caseName, 'task_success.png');
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(true, 'task success !');
                        universe.waitForPageElementByXpath(caseName, "//td[@data='result'][text()='变更成功']", 240000);
                    }, function () {
                        universe.capturePath(caseName, 'Error_task_success.png');
                        var myDate = new Date();
                        this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
                        this.test.assert(false, 'Error: task fail !');
                    }, 240000)
            });
        });
    });

};