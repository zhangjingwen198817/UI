///////////zjw----------
var require = patchRequire(require);
var universe = require('../includes/universe.js');


//添加uProxy实例组
/*
参数说明：caseName-案例名称，instance_Group_Name-uProxy-组实例名称,
          uProxy_Port-uProxy端口号，auto_commit-自动提交
          uProxy_admin_user-uProxy管理员用户名称，uProxy_admin_pwd-uProxy管理员用户密码
 */
exports.add_uProxy_instance_group = function (caseName, instance_Group_Name, uProxy_Port, uProxy_admin_user, uProxy_admin_pwd, auto_commit) {
    //点击添加uProxy组按钮
    universe.casper.then(function () {
        this.thenClick("button#add-uproxy-group-btn", function () {
            this.waitUntilVisible("div#add-uproxy-group-modal form",
                function () {
                    this.test.assert(true, "add uProxy group appear!");
                    universe.capturePath(caseName, 'popUp_Uproxy_group.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_popUp_Uproxy_group.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    this.test.assert(false, "add uProxy group appear!");
                },
                240000
            );
        });
    });

    //填写表单
    universe.casper.then(function () {
        universe.casper.fillSelectors("div#add-uproxy-group-modal form",
            {
                "div#add-uproxy-group-modal input#group_id": instance_Group_Name,
                "div#add-uproxy-group-modal input#port": uProxy_Port,
                "div#add-uproxy-group-modal input#admin_user": uProxy_admin_user,
                "div#add-uproxy-group-modal input#admin_password": uProxy_admin_pwd
            }, false).then(function () {

            //auto_commit
            tempNum = universe.casper.evaluate(function () {
                return document.querySelector("div#add-uproxy-group-modal span.sliderItem input").value;
            });
            if (auto_commit != tempNum) {
                universe.casper.thenClick("div#add-uproxy-group-modal span.sliderItem", function () {
                    universe.capturePath(caseName, "finish_fill_uProxy_1.png", {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                });
            }
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        universe.casper.thenClick("div#add-uproxy-group-modal button.btn.save",
            function () {
                universe.casper.waitUntilVisible(
                    {
                        type: 'xpath',
                        path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
                    },
                    function () {
                        universe.casper.test.assert(true, 'submit list popUp correctly');
                        universe.capturePath(caseName, 'submit_list_popUp.png', {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                    },
                    function () {
                        universe.capturePath(caseName, 'Error_submit_list_popUp.png', {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                        universe.casper.test.assert(false, 'submit list not popUp.png');
                    },
                    240000
                );
            });
    });

    //点击提交
    universe.casper.then(function () {
        universe.casper.thenClick("div.dialog.confirm button.btn.confirm",
            function () {
                this.test.assert(true, 'click the submit button success !');
                this.wait(5000);
            });
    });

    //检测uProxy实例组是否出现
    universe.casper.then(function () {
        this.test.comment('wait the uProxy group !');
        universe.waitForPageElementByXpath(caseName,
            "//table[@id='grid-group']//td[@data-source='uproxy-" + instance_Group_Name + "\']", 30000);
    });

}


//添加uProxy实例
/*
参数说明:instance_Group_Name-组实例名称,instance_Group_Name-主机名，smp-cpu核数,uproxy_id-Uproxy实例名,
         uproxy_path-Uproxy安装路径,uproxy_glibc_install_file-Uproxy-glibc安装文件,uproxy_install_file-Uproxy安装文件
 */
exports.add_uProxy_Instance = function (caseName, instance_Group_Name, server_id, smp, uproxy_id, uproxy_path, uproxy_glibc_install_file, uproxy_install_file) {
    //重现加载页面，等待instance_Group_Name出现
    universe.casper.then(function () {
        universe.casper.reload(function () {
            universe.casper.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid-group']//td[@data-source='uproxy-" + instance_Group_Name + "\']"
                },
                function () {
                    universe.casper.test.assert(true, 'uProxy group appear!');
                    universe.capturePath(caseName, 'uProxy_group_appear.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_uProxy_group_appear.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    universe.casper.test.assert(false, 'uProxy group not appear!');
                },
                240000
            );
        });
    });

    //点击uProxy组名,获取焦点
    universe.casper.then(function () {
        universe.casper.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid-group']//td[@data-source='uproxy-" + instance_Group_Name + "\']"
            },
            function () {
                //检测uproxy组是否获取焦点
                class_Name = universe.casper.evaluate(function (instance_Group_Name) {
                    return __utils__.getElementByXPath("//table[@id='grid-group']//td[@data-source='uproxy-" + instance_Group_Name + "\']/..").className;
                }, instance_Group_Name);
                var arr = class_Name.split(' ');
                for (var i = 0, len = arr.length; i < len; i++) {
                    if (arr[i] == 'select') {
                        this.test.assert(true, 'instance group got focus!');
                        universe.capturePath(caseName, 'instance_group_got_focus.png', {
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
    }).then(function () {
        //判断添加uProxy实例按钮是否可以点击
        if (universe.assertBtnAbleByXpath("//button[@id='add-uproxy-instance-btn']")) {
            //点击添加uProxy实例按钮
            universe.casper.thenClick("button#add-uproxy-instance-btn", function () {
                universe.casper.waitUntilVisible("button#add-uproxy-instance-btn",
                    function () {
                        universe.casper.test.assert(true, 'popUp add uProxy instance!');
                        universe.capturePath(caseName, 'add_uProxy_instance.png', {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                    },
                    function () {
                        universe.capturePath(caseName, 'Error_add_uProxy_instance.png', {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                        universe.casper.test.assert(false, 'no popUp add uProxy instance!');
                    }, 240000);
            });
        }
        else {
            universe.capturePath(className, 'btn_disable.png', {top: 0, left: 0, width: 1440, height: 1024});
            universe.casper.test.assert(false, 'add uproxy instance btn disable!');
        }

    });

    //填写表单
    universe.casper.then(function () {
        universe.casper.fillSelectors("div#add-uproxy-instance-modal form",
            {
                "div#add-uproxy-instance-modal input[name='server_id']": server_id,
                "div#add-uproxy-instance-modal input[id='smp']": smp,
                "div#add-uproxy-instance-modal input[id='uproxy_id']": uproxy_id,
                "div#add-uproxy-instance-modal input[id='uproxy_path']": uproxy_path,
                "div#add-uproxy-instance-modal select[name='uproxy_glibc_install_file']": uproxy_glibc_install_file,
                "div#add-uproxy-instance-modal select[id='uproxy_install_file']": uproxy_install_file
            }, false).then(
            function () {
                universe.capturePath(caseName, 'finished_fill_instance.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            }
        );
    });

    //点击保存按钮
    universe.casper.then(function () {
        universe.casper.thenClick('div#add-uproxy-instance-modal button.btn.save', function () {
            universe.casper.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//div[@class='dialog confirm']//h3[text()='操作清单']"
                },
                function () {
                    universe.casper.test.assert(true, 'popUp submit dialog!');
                    universe.capturePath(caseName, 'after_click_save.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                },
                function () {
                    universe.capturePath(caseName, 'Error_after_click_save.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    universe.casper.test.assert(false, 'no popUp submit dialog!');
                }, 240000);
        });
    });

    //点击提交
    universe.casper.then(function () {
        universe.casper.thenClick('div.dialog.confirm button.btn.confirm', function () {
            this.test.assert(true, 'click the submit button success !');
            this.wait(3000);
        });
    });

    //等待uProxy实例出现
    universe.casper.then(function () {
        this.test.comment('wait the Uproxy: ' + uproxy_id);
        universe.waitForPageElementByXpath(caseName,"//table[@id='grid']//td[text()=\'uproxy-" + uproxy_id + "\']",30000);
    });

};


//移除uProxy实例
/*
参数说明:caseName-案例名称，uproxy_id-要删除的uproxy实例名
 */
exports.remove_uProxy_Instance = function (caseName, uproxy_id) {
    //选中要删除的uProxy实例
    universe.casper.test.comment('select need to remove instance!');
    //刷新页面
    universe.casper.reload(function () {
        //等待要删除的实例出现
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()='uproxy-" + uproxy_id + "\']"
            },
            function () {
                this.test.assert(true, 'need remove instance appear!');
                universe.capturePath(caseName, 'need_remove_instance_appear.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_need_remove_instance_appear.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                this.test.assert(false, 'need remove instance not appear!');

            }, 240000);

    });

    //点击待删除的实例名
    universe.casper.then(function () {
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()='uproxy-" + uproxy_id + "\']"
            },
            function () {
                universe.capturePath(caseName, 'after_select_instnce.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            });

    });

    //判断移除实例按钮是否可点击，并点击
    universe.casper.then(function () {
        if (universe.assertBtnAbleByXpath("//button[@id='remove-uproxy-instance-btn']")) {
            this.thenClick("button#remove-uproxy-instance-btn", function () {
                this.test.assert(true, 'click remove uProxy button!');
            });
        }
        else {
            universe.capturePath(caseName, 'uProxy_instance_disable.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            this.test.assert(false, 'remove uProxy instance disable!');
        }
    });

    //判断确认删除dialog是否弹出
    universe.casper.then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//div[@class='dialog confirm']//div[@class='dl-msg']/div[contains(text(),'确定删除Uproxy实例')]"
            },
            function () {
                this.test.assert(true, 'remove dialog is appear!');
                universe.capturePath(caseName, 'remove_dialog_popUp.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_remove_dialog_popUp.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                this.test.assert(false, 'remove dialog is not appear!');
            }, 240000);

    });

    //点击确定按钮
    universe.casper.then(function () {
        this.thenClick("div.dialog.confirm button.btn.confirm.confirmDone ", function () {
            this.test.assert(true, "after click submit button!");
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
                this.test.assert(true, 'task success !');
                //判断页面元素是否消失
                universe.casper.then(function () {
                    universe.casper.waitWhileVisible(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid']//td[text()=\'uproxy-" + uproxy_id + "\']"
                        },
                        function () {
                            universe.casper.test.assert(true,"uproxy-" + uproxy_id + ' disappear from web page!');
                            universe.capturePath(caseName, 'uProxy_instance_disappear.png');
                        },
                        function () {
                            universe.casper.test.assert(false,"uproxy-" + uproxy_id + ' appear on web page!');
                            universe.capturePath(caseName, 'Error_uProxy_instance_disappear.png');
                        },30000);
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                this.test.assert(false, 'Error: task fail !');
            }, 240000
        );
    });

};

//移除uProxy组
/*
参数说明:caseName-案例名称，instance_Group_Name-组实例名称
 */
exports.remove_uProxy_group = function (caseName, instance_Group_Name) {
    //删除uProxy组
    universe.casper.test.comment('remove uProxy group!');
    //刷新页面，等待要删除组出现
    universe.casper.reload(function () {
        //等待要删除的实例出现
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//table[@id='grid-group']//td[contains(text(),'uproxy-" + instance_Group_Name + "\')]"
            },
            function () {
                this.test.assert(true, 'need remove uProxy group appear!');
                universe.capturePath(caseName, 'need_remove_group_appear.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_need_remove_group_appear.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                this.test.assert(false, 'need remove uProxy group not appear!');

            }, 240000);

    });

    //选中要删除的uProxy组
    universe.casper.then(function () {
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid-group']//td[contains(text(),'uproxy-" + instance_Group_Name + "\')]"
            },
            function () {
                this.test.assert(true, 'after click uProxy group!');
                universe.capturePath(caseName, 'after_click_uProxy_group.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                this.wait(4000);
            });
    });

    //判断移除uPorxy组按钮是否可用
    universe.casper.then(function () {
        if (universe.assertBtnAbleByXpath("//button[@id='remove-uproxy-group-btn']")) {
            this.thenClick("button#remove-uproxy-group-btn", function () {
                universe.capturePath(caseName, 'after_click_remove_uproxy_button.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                this.test.assert(true, 'click remove uProxy button!');
            });

        }
        else {
            universe.capturePath(caseName, 'remove_uproxy_button_disable.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            this.test.assert(false, 'remove uProxy button is disable!');
        }
    });

    //点击提交按钮
    universe.casper.then(function () {
        this.thenClick('div.dialog.confirm button.btn.confirm.confirmDone ', function () {
                this.test.assert(true, 'click submit button!');
            }
        );
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
                this.test.assert(true, 'task success !');
                //判断页面元素是否消失
                universe.casper.then(function () {
                    universe.casper.waitWhileVisible(
                        {
                            type: 'xpath',
                            path: "//table[@id='grid-group']//td[text()=\'uproxy-" + instance_Group_Name + "\']"
                        },
                        function () {
                            universe.casper.test.assert(true,"uproxy-" + instance_Group_Name + ' disappear from web page!');
                            universe.capturePath(caseName, 'uProxy_Group_disappear.png');
                        },
                        function () {
                            universe.casper.test.assert(false,"uproxy-" + instance_Group_Name + ' appear on web page!');
                            universe.capturePath(caseName, 'Error_uProxy_Group_disappear.png');
                        },30000);
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_task_success.png');
                this.test.assert(false, 'Error: task fail !');
            }, 240000
        );
    });

};

//暂停或者启动uProxy实例
/*
参数说明:caseName-案例名称,uproxy_id-uproxy实例名,on_off-启动或停止
 */
exports.stop_start_uProxy_instance = function (caseName, uproxy_id, on_off) {

    //重现加载页面
    universe.casper.reload(function () {
        //等待要删除的实例出现
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()='uproxy-" + uproxy_id + "\']"
            },
            function () {
                this.test.assert(true, 'instance appear!');
                universe.capturePath(caseName, 'instance_appear.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            },
            function () {
                universe.capturePath(caseName, 'Error_instance_appear.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
                this.test.assert(false, 'instance not appear!');

            }, 240000);

    });

    //点击实例名
    universe.casper.then(function () {
        this.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid']//td[text()='uproxy-" + uproxy_id + "\']"
            },
            function () {
                universe.capturePath(caseName, 'after_select_instnce.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            });
    });

    //点击启动或暂停按钮
    universe.casper.then(function () {
        innerTxt = universe.casper.evaluate(function (uproxy_id) {
            return __utils__.getElementByXPath("//table[@id='grid']//td[text()='uproxy-" + uproxy_id + "\']/..//td[6]").innerText;
        }, uproxy_id);
        if (on_off == 'on') {
            if (innerTxt == '运行') {
                universe.casper.test.comment('uProxy is running ,no need to click start button!');
                universe.capturePath(caseName, 'running.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });
            } else {
                universe.casper.thenClick('button#start-uproxy-instance-btn', function () {
                    universe.capturePath(caseName, 'after_click_start.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    universe.casper.test.comment('click the start button');
                });
            }
        } else if (on_off == 'off') {
            if (innerTxt == '停止') {

                universe.casper.test.comment('uProxy is stop ,no need to click stop button!');
                universe.capturePath(caseName, 'stop.png', {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 1024
                });


            } else {
                universe.casper.thenClick('button#pause-uproxy-instance-btn', function () {
                    universe.capturePath(caseName, 'after_click_stop.png', {
                        top: 0,
                        left: 0,
                        width: 1440,
                        height: 1024
                    });
                    universe.casper.test.comment('click the stop button');
                });
            }
        }

    });

    //点击提交按钮
    universe.casper.then(function () {
        universe.casper.thenClick("div.dialog.confirm button.btn.confirm", function () {
            universe.casper.test.assert(true, 'click submit button success!');
            this.wait(5000);
        });
    });
};

//刷新times次等待uproxy运行
exports.refresh_btn = function (caseName, uproxy_id, exceptStr, times) {
    for (var i = 0; i < times; i++) {
        universe.casper.reload(function () {

            if (exceptStr == '运行') {
                universe.casper.waitUntilVisible(
                    {
                        type: 'xpath',
                        path: "//table[@id='grid']//td[text()=\'" + exceptStr + "\']"
                    },
                    function () {
                        universe.casper.test.comment("uProxy instance is running!");
                        universe.capturePath(caseName, 'runnin.png', {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                    },
                    function () {
                        universe.casper.test.comment("uProxy instance not running!");
                        universe.capturePath(caseName, 'uProxy_not_running.png', {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                    },
                    20000
                );
            } else if (exceptStr == '停止') {
                universe.casper.waitUntilVisible(
                    {
                        type: 'xpath',
                        path: "//table[@id='grid']//td[text()=\'" + exceptStr + "\']"
                    },
                    function () {
                        universe.casper.test.comment("uProxy instance is stop!");
                        universe.capturePath(caseName, 'stop.png', {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                    },
                    function () {
                        universe.casper.test.comment("uProxy instance not stop!");
                        universe.capturePath(caseName, 'uProxy_not_stop.png', {
                            top: 0,
                            left: 0,
                            width: 1440,
                            height: 1024
                        });
                    },
                    20000
                );

            }
        });
    }
};