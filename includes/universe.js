var require = patchRequire(require);
var commonFun = require("./commonFun.js");
var cnf_global = require('../configs/cnf_global').cnf;

exports.casper = {};
exports.capture_counter = 0;

//navigate to top level navigation
exports.navigate_to_aLink = function (href) {
    exports.casper.click('span.title');
    exports.casper.thenClick('a[href="' + href + '"]', function () {
        exports.capture(href + '.png', {top: 0, left: 0, width: 1000, height: 1000});
        exports.casper.test.assert(true, "open " + href);
    });
};

exports.navigate_to_aLink_Path = function (path, href) {
    //exports.casper.click('div.header_bar');
    exports.casper.thenClick('a[href="' + href + '"]', function () {
        exports.capturePath(path, href + '.png');
        exports.casper.test.assert(true, "open " + href);
    });
};

exports.assertBtnAble = function (selector, isAble) {
    var classNames = document.querySelector(selector).className;
    var clsAry = classNames.split(' ')
    var tmp = isAble;
    for (var i = 0, len = clsAry.length; i < len; i++) {
        if (clsAry[i] == 'disabled') {
            tmp = false;
            break;
        }
    }

    return tmp == isAble;
};

//通过xPath判断按钮是否可以点击,如果可以点击返回true,否则返回false
//更新-zjw
exports.assertBtnAbleByXpath = function (xpathSelect) {
    var tempClassName, arr;
    tempClassName = exports.casper.evaluate(function (xpathSelect) {
        return __utils__.getElementByXPath(xpathSelect).className;
    }, xpathSelect);
    arr = tempClassName.split(" ");
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] == 'disabled') {
            tmp = false;
            break;
        }
        else {
            tmp = true;
        }
    }
    return tmp;
};

exports.getRowIdxByText = function (selector, txt, col) {
    if (col === undefined) {
        col = 0;
    }
    var j = -1;
    var trAry = document.querySelector(selector).getChildren();
    for (var i = 0, len = trAry.length; i < len; i++) {
        var realTxt = trAry[i].getChildren()[col].innerText.trim();
        if (realTxt == txt) {
            j = i;
            break;
        }
    }
    return j + 1;
};

exports.jump_to_page = function (target_url) {
    exports.casper.waitForUrl(target_url, function () {
        exports.casper.test.assert(true, "jump to page " + target_url + " success!");
    }, function () {
        this.reload(function () {
            exports.casper.test.assert(false, "jump to page " + target_url + " failed in 10s");
        });
    }, 240000);
};

exports.capture = function (name, size) {
    doCapture = true//todo, config it on cmdline
    if (doCapture) {
        if (name.indexOf('/') == 0) {
            name = name.replace(/^\/+/, '');
        }
        name = name.replace(/\s+/g, '_');
        exports.casper.capture("captures/" + exports.capture_counter++ + "_" + name, size);
    }
};

//将截图存放到指定的文件夹中
//更新-zjw
exports.capturePath = function (path, name, size) {
    doCapture = true//todo, config it on cmdline
    if (doCapture) {
        if (name.indexOf('/') == 0) {
            name = name.replace(/^\/+/, '');
        }
        name = name.replace(/\s+/g, '_');
        //exports.casper.capture("/var/log/result/" + path + '/' + exports.capture_counter++ + "_" + name, size);
        exports.casper.capture("captures/" + path + '/' + exports.capture_counter++ + "_" + name, size);
    }
};

//将截图存放到指定的文件夹中
//更新-zjw
exports.captureSelectorPath = function (path, name, selector) {
    doCapture = true//todo, config it on cmdline
    if (doCapture) {
        if (name.indexOf('/') == 0) {
            name = name.replace(/^\/+/, '');
        }
        name = name.replace(/\s+/g, '_');
        exports.casper.captureSelector("captures/" + path + '/' + exports.capture_counter++ + '_' + name, selector);
    }
};

exports.captureSelector = function (name, selector) {
    doCapture = true//todo, config it on cmdline
    if (doCapture) {
        if (name.indexOf('/') == 0) {
            name = name.replace(/^\/+/, '');
        }
        name = name.replace(/\s+/g, '_');
        exports.casper.captureSelector("captures/" + exports.capture_counter++ + '_' + name, selector);
    }
};

exports.login_succeed = function () {
    var login_url = cnf_global.page_login.url;
    var form = cnf_global.page_login.form;

    exports.casper.then(function () {
        exports.casper.start(login_url, function () {
            exports.casper.test.comment("open login page");
            this.test.comment('tesing......');
            this.test.assertExists('div.dl-title-text');
            this.test.assertSelectorHasText('div.dl-title-text', cnf_global.title);
            this.test.assertExists('input[name="user"]');
            this.test.assertExists('input[name="password"]');
            this.fillSelectors('div#login-modal form',
                {
                    'input#user': form.user,
                    'input#password': form.password
                }, false);

            this.thenClick('div.save');
        });
    });

    exports.casper.then(function () {
        this.evaluateOrDie(function () {
            return /正在登入.../.test(document.querySelector('div.loginTxt').innerText);
        }, 'ajax request failed');
        exports.capture("logining.png");
    });

    exports.casper.then(function () {
        this.test.comment("In logining ...")
    });

    exports.casper.then(function () {
        var server_url = cnf_global.page_server;
        exports.jump_to_page(server_url);
        this.waitForText("DMP",
            function () {
                exports.captureSelector("success_login.png", 'body');
            }, 240000)
    });
};

exports.login_out_succeed = function (test) {
    exports.casper.thenClick('.fa-sign-out', function () {
        exports.casper.test.assertVisible('div.dialog.confirm', 'popup confirm layer');
    });

    exports.casper.thenClick('.dialog button.confirm', function () {
        exports.casper.test.assertUrlMatch(cnf_global.page_login.url, "login out redirect to login page");
    })
}

exports.confirmLayerPopped = function (selector) {
    exports.casper.thenClick(selector, function () {
        var captureSelector = selector.split(' ')[0];
        exports.captureSelector(selector + ".png", captureSelector);
        exports.casper.test.assertVisible('div.dialog.confirm', 'confirm layer is popped correctly');
    })
}

exports.jsonActionCmp = function (expectAction) {
    exports.casper.thenClick('button.view-json', function () {
        var txt = this.fetchText('div.dl-json div');
        var json_txt = JSON.parse(txt);
        var action = json_txt[0].url;
        exports.casper.test.assertEquals(expectAction, action, 'request action is right');
    });
};

exports.confirmForm = function (confirmBtn, expectData) {
    exports.casper.then(function () {
        if (isTest) {
            exports.casper.echo('test_id:' + expectData.test_id);
            exports.casper.evaluate(function (test_id) {
                document.getElementById('test_id').value = test_id;
            }, expectData.test_id)
        }
    });
    exports.casper.thenClick(confirmBtn, function () {
        var expectAction = expectData.action;
        var url;
        if (expectAction.indexOf('/') == 0) {
            url = cnf_global.domain + expectAction;
        } else {
            url = cnf_global.domain + "/" + expectAction;
        }
        exports.casper.log('current action:' + url, 'debug');
        requestData = exports.getRequestDataByUrl(url);
        var hasRequestData = requestData != undefined;
        if (hasRequestData) {
            exports.casper.test.assert(true, "requestData is found");
            realData = requestData.postData;
            exports.doCompare(realData, expectData);
            exports.casper.test.assert(true, 'request data is as expected');
        } else {
            exports.capture('request_err.png', {top: 0, left: 0, width: 1000, height: 1000});
            exports.casper.test.assert(false, "requestData is found");
        }
    });
};

exports.waitForExpectText = function (txt) {
    if (isTest) {
        txt = "测试完成"
    }
    exports.casper.waitForText(txt, function () {
        exports.captureSelector("div_dialog_global.png", 'div.dialog.global');
        exports.casper.test.assert(true, txt + " occurred!");
    }, function onTimeout() {
        exports.captureSelector("div_dialog_global.png", 'div.dialog.global');
        exports.casper.test.assert(false, txt + 'does not occur in 5min!');
    }, 300000)
};

exports.closePopLayer = function (selector) {
    exports.casper.thenClick(selector, function () {
        exports.casper.test.assert(true, "close popLayer");
        exports.captureSelector("finished.png", '.content');
    })
};

exports.parseForm = function (form) {
    var bm = form.base_model;
    if (bm) {
        for (var k in bm) {
            if (!form.hasOwnProperty(k)) {
                form[k] = bm[k];
            }
        }
        delete form.base_model;
    }
};

//等待页面元素出现byXpath
//更新-zjw
/*
参数说明:caseName-测试案例名称
 */
exports.waitForPageElementByXpath = function (caseName, xpathStr, timeOut) {
    exports.casper.waitUntilVisible(
        {
            type: 'xpath',
            path: xpathStr
        },
        function () {
            exports.casper.test.assert(true, "Except element: " + xpathStr + " appear!");
            exports.capturePath(caseName, 'except_element_appear.png', {top: 0, left: 0, width: 1440, height: 1024});
        },
        function () {
            exports.capturePath(caseName, 'Error_except_element_appear.png', {
                top: 0,
                left: 0,
                width: 1440,
                height: 1024
            });
            exports.casper.test.assert(false, "Error: Except element: " + xpathStr + "  not appear!");
        },
        timeOut
    );
};

//等待页面元素出现byCss
//更新-zjw
/*
参数说明:caseName-测试案例名称
 */
exports.waitForPageElementByCss = function (caseName, cssStr, timeOut) {
    exports.casper.waitUntilVisible(cssStr,
        function () {
            exports.casper.test.assert(true, 'except element appear!');
            exports.capturePath(caseName, 'except_element_appear.png', {top: 0, left: 0, width: 2000, height: 950});
        },
        function () {
            exports.capturePath(caseName, 'Error_except_element_appear.png', {
                top: 0,
                left: 0,
                width: 2000,
                height: 950
            });
            exports.casper.test.assert(false, 'except element not appear!');
        },
        timeOut
    );
};

//等待指定时间，查看页面元素是否消失
exports.checkElementDisappearByXpath = function (xpathStr, timeOut) {
    exports.casper.then(function () {
        this.test.comment('reload the page find the element whether disappear !');
        this.reload(function () {
            this.wait(timeOut, function () {
                this.test.comment('wait 10s ....');
            }).then(function () {
                exports.casper.test.assertDoesntExist(
                    {
                        type: 'xpath',
                        path: xpathStr
                    }, 'element disappear from page !');
                exports.capturePath(caseName, 'element_disappear_from_page.png', {
                    top: 0,
                    left: 0,
                    width: 2000,
                    height: 950
                });
            });
        });
    });


};

//检测IPMI组件状态
exports.checkIPMI_ModuleStatus = function (caseName, serverIp, moduleEle, exceptStr) {

    if (exceptStr == "运行") {
        tempStatus = 'running';
    }
    status = exports.casper.evaluate(function (serverIp, moduleEle) {
        return __utils__.getElementByXPath("//table[@id='grid']//td[text()=\'" + serverIp + "\']/../td[@data=\'" + moduleEle + "\']").innerText;
    }, serverIp, moduleEle);

    if (status == exceptStr) {
        exports.casper.test.assert(true, moduleEle + ' is ' + tempStatus);
        exports.capturePath(caseName, moduleEle + '_is_' + tempStatus + '.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
        return 1;
    } else {
        exports.casper.test.comment(moduleEle + ' is not running !');
        exports.capturePath(caseName, moduleEle + '_is_notRunning.png', {
            top: 0,
            left: 0,
            width: 1440,
            height: 1024
        });
        return 0;
    }

};

//选择用户权限
exports.select_checkbox_user_permission = function (caseName, permission) {
    exports.casper.thenClick(
        {
            type: 'xpath',
            path: "//div[@id='update-authority-modal']//label[contains(text(),\'" + permission + "\')]"
        },
        function () {
            exports.capturePath(caseName, 'selected_checkbox.png', {
                top: 0,
                left: 0,
                width: 2000,
                height: 950
            });

        }
    );
};

//选择 数据恢复用户
exports.select_checkbox_user_data_permission = function (caseName, permission) {
    exports.casper.thenClick(
        {
            type: 'xpath',
            path: "//div[@id='update-authority-modal']//td[@data-view='urman_data_recovery']//label[contains(text(),\'" + permission + "\')]"
        },
        function () {
            exports.capturePath(caseName, 'selected_checkbox.png', {
                top: 0,
                left: 0,
                width: 2000,
                height: 950
            });

        }
    );
};

//检测文件或问价夹是否存在
exports.checkFolder = function (userName, ip, cmd, cmdview, exfolderName) {
    var getComponents, getViewCmd, right = 0, wrong = 0;
    exports.casper.then(function () {
        this.test.comment('check user and userGroup .......');
        getComponents = commonFun.ssh(userName, ip, cmd);
        getViewCmd = commonFun.ssh(userName, ip, cmdview);
    });
    exports.casper.then(function () {
        this.waitFor(getComponents.wait);
        this.waitFor(getViewCmd.wait);
    });
    exports.casper.then(function () {
        this.test.comment(getViewCmd.output());
        var str = getComponents.output();
        //去掉全角半角空格，将换行符用' '代替，然后按照空格符分割
        var arr = str.replace(/^[\s　]+|[\s　]+$/g, "").replace(/[\r\n]/g, " ").split(' ');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == exfolderName) {
                right = 1;
            } else {
                wrong = 2;
            }
        }
        if (right + wrong == 1) {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, 'back up file is exist !');
        } else {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, "Error:  back up file is not exist !");
        }
    });
};


//检测文件或问价夹是否存在
exports.checkFolderNotExit = function (userName, ip, cmd, cmdview, exfolderName) {
    var getComponents, getViewCmd, right = 0, wrong = 0;
    exports.casper.then(function () {
        this.test.comment('check user and userGroup .......');
        getComponents = commonFun.ssh(userName, ip, cmd);
        getViewCmd = commonFun.ssh(userName, ip, cmdview);
    });
    exports.casper.then(function () {
        this.waitFor(getComponents.wait);
        this.waitFor(getViewCmd.wait);
    });
    exports.casper.then(function () {
        this.test.comment(getViewCmd.output());
        var str = getComponents.output();
        //去掉全角半角空格，将换行符用' '代替，然后按照空格符分割
        var arr = str.replace(/^[\s　]+|[\s　]+$/g, "").replace(/[\r\n]/g, " ").split(' ');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == exfolderName) {
                right = 1;
            } else {
                wrong = 2;
            }
        }
        if (right + wrong == 1) {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, 'Error: back up file is exist !');
        } else {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, " back up file non-existent !");
        }
    });
};

//检测文件夹或文件的权限
exports.checkUserOrGroup = function (userName, ip, cmd, cmdview, exUser, exGroup, folderName) {
    var getComponents, getViewCmd, right = 0, wrong = 0;
    exports.casper.then(function () {
        this.test.comment('check user and userGroup .......');
        getComponents = commonFun.ssh(userName, ip, cmd);
        getViewCmd = commonFun.ssh(userName, ip, cmdview);
    });
    exports.casper.then(function () {
        this.waitFor(getComponents.wait);
        this.waitFor(getViewCmd.wait);
    });
    exports.casper.then(function () {
        this.test.comment(getViewCmd.output());
        var str = getComponents.output();
        //去掉全角半角空格，将换行符用' '代替，然后按照空格符分割
        var arr = str.replace(/^[\s　]+|[\s　]+$/g, "").replace(/[\r\n]/g, " ").split(' ');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == exUser || arr[i] == exGroup) {
                right = 1;
            } else {
                wrong = 2;
            }
        }
        if (right + wrong == 1) {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, folderName + ' folders/files permission(user:actiontech-universe,group:actiontech) are right!');
        } else {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, "Error: " + folderName + ' folders/files permission(user:actiontech-universe,group:actiontech) are wrong !')
        }
    });
};

//检测进程是否存在
exports.checkProcessExit = function (userName, ip, cmd, cmdview, result) {
    var getProcess, getViewProcess;
    exports.casper.then(function () {
        this.test.comment('check process exit .......');
        getProcess = commonFun.ssh(userName, ip, cmd);
        getViewProcess = commonFun.ssh(userName, ip, cmdview);
    });
    exports.casper.then(function () {
        this.waitFor(getProcess.wait);
        this.waitFor(getViewProcess.wait);
    });
    exports.casper.then(function () {
        this.test.comment(getViewProcess.output().replace(/[\r\n]/g, ""));
        //去掉全角半角空格，将换行符用''代替，
        var str = getProcess.output().replace(/^[\s　]+|[\s　]+$/g, "").replace(/[\r\n]/g, "");
        if (str == result) {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, "Process : " + result + " is exist !");
        } else {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, "Error: Process : " + result + " is not exist !");
        }
    });
};

//查看机器下面的sip绑定情况
exports.getNodeSip = function (userName, ip, cmdview) {
    var getViewProcess;
    exports.casper.then(function () {
        this.test.comment('check process exit .......');
        getViewProcess = commonFun.ssh(userName, ip, cmdview);
    });
    exports.casper.then(function () {
        this.waitFor(getViewProcess.wait);
    });
    exports.casper.then(function () {
        this.test.comment(getViewProcess.output());
    });
};


//kill进程
exports.killMasterInstance = function (userName, ip, cmd) {

    var getProcess, killProcess, tempProcess_1, tempProcess_2, tempProcess_3;
    exports.casper.then(function () {
        this.test.comment('get process id .......');
        getProcess = commonFun.ssh(userName, ip, cmd);
    });
    exports.casper.then(function () {
        this.waitFor(getProcess.wait);
    });
    exports.casper.then(function () {
        tempProcess_1 = getProcess.output();
        this.test.comment('kill process id :' + tempProcess_1);
        killProcess = commonFun.ssh(userName, ip, "kill -9 " + getProcess.output())
    });

    exports.casper.then(function () {
        this.waitFor(killProcess.wait);
    });

    exports.casper.then(function () {
        this.wait(30000, function () {
            this.test.comment('get process id .......');
            getProcess = commonFun.ssh(userName, ip, cmd);
        });

    });

    exports.casper.then(function () {
        this.waitFor(getProcess.wait);
    });

    exports.casper.then(function () {
        tempProcess_2 = getProcess.output();
        this.test.comment('got process id :' + tempProcess_2);

        if (tempProcess_1 != tempProcess_2) {
            this.test.comment("Master instance is abnormal ,HA restart mysql is success !");
            killProcess = commonFun.ssh(userName, ip, "kill -9 " + tempProcess_2);
        }
    });

    exports.casper.then(function () {
        this.wait(30000, function () {
            this.test.comment('get process id .......');
            getProcess = commonFun.ssh(userName, ip, cmd);
        });

    });

    exports.casper.then(function () {
        this.waitFor(getProcess.wait);
    });

    exports.casper.then(function () {
        tempProcess_3 = getProcess.output();
        this.test.comment('got process id :' + tempProcess_3);

        if (tempProcess_2 != tempProcess_3) {
            this.test.comment("Master instance is abnormal !");
            killProcess = commonFun.ssh(userName, ip, "kill -9 " + tempProcess_3);
        }
    });


};

//检测用户组id
exports.checkUserGroudId = function (userName, ip, cmd, result) {
    var getID;
    exports.casper.then(function () {
        this.test.comment('check process exit .......');
        getID = commonFun.ssh(userName, ip, cmd);
    });
    exports.casper.then(function () {
        this.waitFor(getID.wait);
    });

    exports.casper.then(function () {
        var str = getID.output().replace(/^[\s　]+|[\s　]+$/g, "").replace(/[\r\n]/g, "");
        this.test.comment(str);
        if (str == result) {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, "user or userGroup is " + str + " !");
        } else {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, "Error: user or userGroup is " + str + " !");
        }

    });

};

//检测cmd结果
exports.checkRemoteCmdResult = function (userName, ip, cmd, result) {
    var getResult;
    exports.casper.then(function () {
        this.test.comment('check process exit .......');
        getResult = commonFun.ssh(userName, ip, cmd);
    });
    exports.casper.then(function () {
        this.waitFor(getResult.wait);
    });

    exports.casper.then(function () {
        var str = getResult.output().replace(/^[\s　]+|[\s　]+$/g, "").replace(/[\r\n]/g, "");
        this.test.comment(str);
        if (str == result) {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(true, "cmd result is : " + str + "!");
        } else {
            var myDate = new Date();
            this.test.comment(myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds());
            this.test.assert(false, "Error: " + "cmd result is : " + str + "!");
        }

    });

};


//拷贝组件到指定服务器
exports.scpComponents = function (userName, ip, version, remotePath) {
    var components_path = "../test_suits/components/", scpVerRet;
    //scp到远端
    exports.casper.then(function () {
        scpVerRet = commonFun.scp(userName, ip, components_path + version, remotePath);
    });

    exports.casper.then(function () {
        this.waitFor(scpVerRet.wait);
    });

    exports.casper.then(function () {
        this.test.assertEquals(scpVerRet.wait(), true, "scp installation package  to the umc-1 node success !");
    });
};

//执行指定cmd命令
exports.execCmd = function (userName, ip, cmd) {
    var getComponents;
    exports.casper.then(function () {
        this.test.comment('Exec command .......');
        getComponents = commonFun.ssh(userName, ip, cmd);
    });

    exports.casper.then(function () {
        this.waitFor(getComponents.wait);
    });

    exports.casper.then(function () {
        this.test.assertEquals(getComponents.wait(), true);
    });
};

//刷新等待运行元素出现
exports.refreshWaitElement = function (caseName, server_ip, data, exceptEle, times) {
    var text;
    exports.casper.wait(3600*2);

    text = exports.casper.evaluate(function (server_ip, data) {
        return __utils__.getElementByXPath("//table[@id='grid']//td[text()=\'" + server_ip + "\']/../td[@data=\'" + data + "\']").innerText;
    }, server_ip, data);
    times++;
    //exports.casper.test.comment("times:" + times + text);
    if (text == exceptEle) {
        exports.capturePath(caseName, data + '_OK.png');
        exports.casper.test.assert(true, "Find " + data + " is  running!");
    } else if (text != exceptEle && times < 10) {
        exports.casper.thenClick('i.refresh', function () {
            exports.casper.wait(240000, function () {
                return exports.refreshWaitElement(caseName, server_ip, data, exceptEle, times);
            });
        });
    } else {
        exports.capturePath(caseName, "Error_" + data + '_OK.png');
        exports.casper.test.assert(false, "Error: Find " + data + " is " + text + "!")
    }
};

//刷新等待角色更改出现
exports.refreshRoleElement = function (caseName, mysql_alias, exceptEle, times) {
    var text;
    exports.casper.wait(40000);
    text = exports.casper.evaluate(function (mysql_alias) {
        return __utils__.getElementByXPath("//td[@data-source=\'" + mysql_alias + "\']/../td[@data='role']").innerText;
    }, mysql_alias);
    times++;
    exports.casper.test.comment("times:" + times + text);
    exports.casper.test.comment("//td[@data-source=\'" + mysql_alias + "\']/../td[@data='role']");
    if (text == exceptEle) {
        exports.capturePath(caseName, mysql_alias + '_OK.png');
        exports.casper.test.assert(true, "Find " + mysql_alias + " is " + text + "!");
    } else if (text != exceptEle && times < 10) {
        exports.casper.thenClick('div.dataContainer.instance div.actionBtn button.btn.refresh', function () {
            exports.casper.wait(240000, function () {
                return exports.refreshRoleElement(caseName, mysql_alias, exceptEle, times);
            });
        });
    } else {
        exports.capturePath(caseName, "Error_" + mysql_alias + '_pass.png');
        exports.casper.test.assert(false, "Error: Find " + mysql_alias + " is " + text + "!")
    }
};

//刷新检测元素出现
exports.refreshCheckDelay = function (caseName, mysql_alias, times) {
    var text, number;
    text = exports.casper.evaluate(function (mysql_alias) {
        return __utils__.getElementByXPath("//td[@data-source='" + mysql_alias + "']/..//td[@data='replication_delay']").innerText;
    }, mysql_alias);
    times++;
    number = text.replace('s', '');
    exports.casper.test.comment("times:" + times + " : " + number);

    if (number < 240000) {
        exports.capturePath(caseName, 'Copy_delay_pass.png');
        exports.casper.test.assert(true, "Copy delay is pass !");
    } else if (number > 240000 && times < 10) {
        exports.casper.thenClick('div.dataContainer.instance button.btn.refresh', function () {
            exports.casper.wait(240000, function () {
                return exports.refreshCheckDelay(caseName, mysql_alias, times);
            });
        });
    } else if (number == '未知状态' && times < 10) {
        exports.casper.thenClick('div.dataContainer.instance button.btn.refresh', function () {
            exports.casper.wait(240000, function () {
                return exports.refreshCheckDelay(caseName, mysql_alias, times);
            });
        });
    } else {
        exports.capturePath(caseName, "Error_try_times_to_many_or_to_long.png");
        exports.casper.test.assert(false, "Error: try times is to many or to long !")
    }
};

//刷新检测期望元素出现
exports.refreshCheckEle = function (caseName, mysql_alias, exceptEle, times) {
    var text;
    text = exports.casper.evaluate(function (mysql_alias) {
        return __utils__.getElementByXPath("//td[@data-source='" + mysql_alias + "']/..//td[@data='replication_delay']").innerText;
    }, mysql_alias);
    times++;

    exports.casper.test.comment("times:" + times + " : " + text);

    if (text == exceptEle) {
        exports.capturePath(caseName, exceptEle + '_pass.png');
        exports.casper.test.assert(true, exceptEle + "is pass !");
    } else if (text != exceptEle && times < 10) {
        exports.casper.thenClick('div.dataContainer.instance button.btn.refresh', function () {
            exports.casper.wait(240000, function () {
                return exports.refreshCheckEle(caseName, mysql_alias, exceptEle, times);
            });
        });
    } else {
        exports.capturePath(caseName, "Error_try_times_to_many.png");
        exports.casper.test.assert(false, "Error: try times is to many !")
    }
};


//刷新检测期望元素出现
exports.refreshCheckEleByXpath = function (caseName, mysql_aliasByXpath, exceptEle, times) {
    var text;
    text = exports.casper.evaluate(function (mysql_aliasByXpath) {
        return __utils__.getElementByXPath(mysql_aliasByXpath).innerText;
    }, mysql_aliasByXpath);
    times++;

    exports.casper.test.comment("times:" + times + " : " + text);

    if (text == exceptEle) {
        exports.capturePath(caseName, exceptEle + '_pass.png');
        exports.casper.test.assert(true, exceptEle + " is pass !");
    } else if (text != exceptEle && times < 10) {
        exports.casper.thenClick('div.dataContainer.instance button.btn.refresh', function () {
            this.wait(60000, function () {
                exports.waitForPageElementByXpath(caseName, mysql_aliasByXpath, 2400000);
            }).then(function () {
                    return exports.refreshCheckEleByXpath(caseName, mysql_aliasByXpath, exceptEle, times);
                }
            )
        });

    } else {
        exports.capturePath(caseName, "Error_try_times_to_many.png");
        exports.casper.test.assert(false, "Error: try times is to many !")
    }
};

