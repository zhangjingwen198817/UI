///////////zjw----------

var require = patchRequire(require);
var universe = require('../includes/universe.js');

//添加路由组
/*
参数说明:groupUser-路由用户名,maxConnect-最大链接数,routerUser-路由用户名,routerPassword-路由用户名密码
 */
exports.add_group = function (caseName,groupUser,maxConnect,routerUser,routerPassword) {
    universe.casper.test.comment("route_uproxy add_group!");

    //点击添加uproxy路由按钮
    universe.casper.thenClick("button#add-uproxy-router-btn", function () {

        universe.casper.test.assertVisible("div#add-uproxy-router-modal", "Add group layer is popped correctly");
        this.fillSelectors("div#add-uproxy-router-modal form",
            {
                "select#add_group_id": groupUser,
                "input#max_frontend_connect_num": maxConnect,
                "input#router_user": routerUser,
                "input#router_password": routerPassword
            }, false);

        //等待保存按钮
        this.waitUntilVisible("button.btn.save",
            function () {
                this.test.assert(true,"save button is appear!");
                universe.capturePath(caseName,'save_button.png', {top: 0, left: 0,  width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName,'Error_save_button.png', {top: 0, left: 0,  width: 1440, height: 1024});
                this.test.assert(false,"save button is not appear!");
            },
            240000
        );
        //点击保存按钮
        this.thenClick("button.btn.save", function () {
            universe.capturePath(caseName,'save_finish.png', {top: 0, left: 0,  width: 1440, height: 1024});
        });

        //等待提交按钮出现
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: '//button[text()="提交"]'
            },
            function () {
                this.test.assert(true,"submit button is appear!");
                universe.capturePath(caseName,'submit_button.png', {top: 0, left: 0,  width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName,'Error_submit_button.png', {top: 0, left: 0,  width: 1440, height: 1024});
                this.test.assert(false,"submit button is not appear!");
            },
            240000
        );

        //点击提交按钮
        this.thenClick({
            type: 'xpath',
            path: '//button[text()="提交"]'
        }, function () {
            this.waitUntilVisible(
                {
                    type:'xpath',
                    path:"//div[@class='dialog global']//div[contains(text(),'完成')]"
                },
                function () {
                    this.test.assert(true,'Finish uProxy group added!');
                    universe.capturePath(caseName,'add_uProxy_Group_finished.png', {top: 0, left: 0,  width: 1440, height: 1024});
                },
                function () {
                    universe.capturePath(caseName,'Error_add_uProxy_Group_finished.png', {top: 0, left: 0,  width: 1440, height: 1024});
                    this.test.assert(false,'Fail uProxy group added!')
                },
                240000
            );
        });
    });
}

//添加路由组后端
/*
参数说明:groupUser-路由用户名，mysqlGroupId-路由用户组名，max_con_1，max_con_2-路由用户后端最大链接数
adminPassword-数据库用户管理员密码:root，masterInstance-数据库主实例，privilege-权限模板，mysqlUser-用户名:test3
userHost-用户权限，mysqlPassword-用户密码(test3)，routerUser-路由用户名(test3)
*/
exports.add_back_end = function (caseName,groupUser,mysqlGroupId,max_con_1,max_con_2,
                                 adminPassword,privilege,mysqlUser,userHost,mysqlPassword,routerUser) {
    universe.casper.test.comment("Add the back_end!");
    //重新刷新页面，等待页面元素出现(PhantomJS模拟的web内核不会自动刷新页面，所以不用reload等待再长时间也不会刷新出期望的元素)
    universe.casper.reload(function () {
        universe.casper.waitUntilVisible({
                type: 'xpath',
                path: '//td[text()=\"' + groupUser + '\"]'
            },
            function () {
                this.test.assert(true, "Find added router user!");
                universe.capturePath(caseName,groupUser + '_save.png', {top: 0, left: 0,  width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName,groupUser + 'ERROR_save.png', {top: 0, left: 0,  width: 1440, height: 1024});
                this.test.assert(false,'Can not find added router user!');
            }, 240000);
    });

    //获取用户的焦点
    universe.casper.thenClick({
            type: 'xpath',
            path: "//table//tbody//tr//td[text()=\'" + groupUser + "\']"
        },
        function () {
            universe.capturePath(caseName,groupUser + '_clicked.png', {top: 0, left: 0,  width: 1440, height: 1024});
        });

    //点击添加后端
    universe.casper.thenClick('button#add-backend-btn', function () {
        universe.capturePath(caseName,'add_backend_clicked.png', {top: 0, left: 0,  width: 1440, height: 1024});
    }).then(function () {
        //填写数据库组名
        universe.casper.fillSelectors("div#add-backend-modal form",
            {
                'select#mysql_group_id': mysqlGroupId
            }, false).then(function () {
            universe.capturePath(caseName,"fill_group_id.png", {top: 0, left: 0,  width: 1440, height: 1024});
            this.waitUntilVisible("tr.row:nth-child(1) td[data='mbconnlimit'] input",
                function () {
                    universe.capturePath(caseName,"find_hostIp.png", {top: 0, left: 0,  width: 1440, height: 1024});
                    universe.casper.fillSelectors("div#add-backend-modal form",{
                        "tr.row:nth-child(1) td[data='mbconnlimit'] input":max_con_1,
                        "tr.row:nth-child(2) td[data='mbconnlimit'] input":max_con_2
                    },false).then(
                        function () {
                            universe.capturePath(caseName,"fill_max_conn.png", {top: 0, left: 0,  width: 1440, height: 1024});
                        }
                    );
                },
                function () {
                    universe.capturePath(caseName,"No_find_hostIp.png", {top: 0, left: 0,  width: 1440, height: 1024});
                    universe.casper.test.assert(false,'No find hostIp!');
                },
                240000
                );
        });
    });


    //点击创建数据库用户
    universe.casper.thenClick('button#create-mysql-user-btn', function () {
        universe.capturePath(caseName,'create_mysqlUser.png', {top: 0, left: 0,  width: 1440, height: 1024});
    }).then(function () {
        //获取下拉框主实例名称
        masterInstancName=this.evaluate(function () {
            var optionsText= __utils__.getElementByXPath("//select[@id='create_master_instance']").options[0].text;

           if(optionsText.match('主实例')){
            return optionsText;
           }else
           {
               return  __utils__.getElementByXPath("//select[@id='create_master_instance']").options[1].text;
           }
        });
        //填写表单
        this.fillSelectors('div#create-mysql-user-modal form',
            {
                'input#admin_password': adminPassword,
                'select#create_master_instance': masterInstancName,
                'select#privilege': privilege,
                'input#create_mysql_user': mysqlUser,
                'select[name="user_host"]': userHost,
                'input#create_mysql_user_password': mysqlPassword
            }, false).then(function () {
            universe.capturePath(caseName,"finished_addMysqlUser.png", {top: 0, left: 0,  width: 1440, height: 1024});
        });
    });

    //点击保存按钮
    universe.casper.thenClick({
        type: 'xpath',
        path: "//div[@id=\'create-mysql-user-modal\']//button[@class=\'btn save\']"
    }, function () {
        this.test.assertVisible({
            type: 'xpath',
            path: '//div/h3[text()="操作清单"]'
        }, "Find action list!");
        universe.capturePath(caseName,"popup_Submit.png", {top: 0, left: 0,  width: 1440, height: 1024});
    });

    //点击提交按钮
    universe.casper.thenClick({
            type: 'xpath',
            path: "//div[@class='dialog confirm']//button[text()='提交']"
        }, function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//div[@class='dialog global']//div[contains(text(),'用户 完成')]"
                },
                function () {
                    this.test.assert(true, 'Find the finished create user dialog!');
                    universe.capturePath(caseName,"finished_create_user_dialog.png", {top: 0, left: 0,  width: 1440, height: 1024});
                },
                function () {
                    universe.capturePath(caseName,"ERROR_finished_create_user_dialog.png", {top: 0, left: 0,  width: 1440, height: 1024});
                    this.test.assert(false, 'Can not find the finishied dialog');
                },
                20000
            );
        }
    );


    //点击关闭按钮
    universe.casper.thenClick({
        type: 'xpath',
        path: "//div[@class=\'dialog global\']//button[text()=\'关闭\']"
    }, function () {
        universe.capturePath(caseName,'show_add_backend.png', {top: 0, left: 0,  width: 1440, height: 1024});
    }).then(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//button[@id='create-mysql-user-btn']/following-sibling::button[text()='保存']"
            },
            function () {
                this.test.assertVisible({
                    type: 'xpath',
                    path: "//button[@id='create-mysql-user-btn']/following-sibling::button[text()='保存']"
                }, "Find the save button");
                universe.capturePath(caseName,"save_page_show.png", {top: 0, left: 0,  width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName,"ERROR_save_page_show.png", {top: 0, left: 0,  width: 1440, height: 1024});
                this.test.assert(false, 'Can not find the save button!');
            },
            240000
        );
    });

    //点击保存按钮
    universe.casper.thenClick({
        type: 'xpath',
        path: "//button[@id='create-mysql-user-btn']/following-sibling::button[text()='保存']"
    }, function () {
       this.waitUntilVisible(
           {
               type:'xpath',
               path:"//h3[text()='操作清单']"
           },
           function () {
                universe.capturePath(caseName,'submit_list.png',{top: 0, left: 0,  width: 1440, height: 1024});
                this.test.assert(true,'Find the submit list!');
           },
           function () {
                universe.capturePath(caseName,'ERROR_submit_list.png',{top: 0, left: 0,  width: 1440, height: 1024});
                this.test.assert(false,'Can not find the submit list!');
           },
           240000
       );
    });

    //点击提交按钮
    universe.casper.thenClick(
        {
            type:'xpath',
            path:"//h3[text()='操作清单']/..//button[@class='btn confirm']"
        },
        function () {
            this.waitUntilVisible(
                {
                type:"xpath",
                path:"//div[@class='dialog global']//div[contains(text(),'添加后端 完成')]"
                },
                function () {
                    universe.capturePath(caseName,"Finished_add_backend.png",{top: 0, left: 0,  width: 1440, height: 1024});
                    this.test.assert(true,"Find the finished dialog!");
                },
                function () {
                    universe.capturePath(caseName,"ERROR_finished_add_backend.png",{top: 0, left: 0,  width: 1440, height: 1024});
                    this.test.assert(false,'Can not find the finished dialog!');
                },
                240000
            );
        }
    );

    //点击关闭按钮
    universe.casper.thenClick(
        {
            type:'xpath',
            path:"//div[@class='dialog global']//button[text()='关闭']"
        },
        function () {
            this.reload(function () {
                //等待获取页面元素出现
                this.waitUntilVisible(
                    {
                        type: 'xpath',
                        path: "//table//tbody//tr//td[text()=\'" + routerUser + "\']"
                    },
                    function () {
                        this.test.assert(true,routerUser+'_appear!');
                        universe.capturePath(caseName,routerUser + '_appear.png', {top: 0, left: 0,  width: 1440, height: 1024});
                    },
                    function () {
                        universe.capturePath(caseName,'Error_'+routerUser + '_appear.png', {top: 0, left: 0,  width: 1440, height: 1024});
                        this.test.assert(false,routerUser+' not appear!');
                    },
                    240000
                );

                //获取用户的焦点
                this.thenClick({
                        type: 'xpath',
                        path: "//table//tbody//tr//td[text()=\'" + routerUser + "\']"
                    },
                    function () {
                        universe.capturePath(caseName,routerUser + '_reClicked.png', {top: 0, left: 0,  width: 1440, height: 1024});
                    });

                this.waitUntilVisible(
                    {
                        type: 'xpath',
                        path: "//table[@id='grid-backend']//td[contains(text(),\'"+routerUser+"\')]"
                    },
                    function () {
                        this.test.assertVisible({
                            type: 'xpath',
                            path: "//table[@id='grid-backend']//td[contains(text(),\'"+routerUser+"\')]"
                        }, 'Find the added instances testXX!');
                        universe.capturePath(caseName,"added_finished_instances.png", {top: 0, left: 0,  width: 1440, height: 1024});
                    },
                    function () {
                        universe.capturePath(caseName,'ERROR_added_finished_instances.png', {top: 0, left: 0,  width: 1440, height: 1024});
                        this.test.assert(false, 'can not find the added instances!');
                    },
                    240000
                );
            });
        }
    );
}

//通过数据库地址-移除路由组后端
/*
参数说明:groupUser-路由用户名,instanceIp-待移除的实例IP地址
 */
exports.remove_back_end=function (caseName,groupUser,instanceIp) {
    universe.casper.test.comment("Remove back end!");

    //重新加载页面,等待路由组名出现
    universe.casper.reload(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//table[@id='grid-frontend']//td[contains(text(),"+"\'"+groupUser+"\')]"
            },
            function () {
                this.test.assert(true,"uProxy group appear!");
                universe.capturePath(caseName,"uPoxy_group_appear.png",{top: 0, left: 0,  width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName,"Error_uProxy_group_appear.png",{top: 0, left: 0,  width: 1440, height: 1024});
                this.test.assert(false,"uProxy group not appear !");
            },
            240000
        );
    });

    //点击路由组，获取焦点
    universe.casper.thenClick(
        {
            type: 'xpath',
            path: "//table[@id='grid-frontend']//td[contains(text(),"+"\'"+groupUser+"\')]"
        },
        function () {
            //等待Uproxy后端实例出现
            this.waitUntilVisible(
                {
                    type:'xpath',
                    path:"//table[@id='grid-backend']//td[contains(text(),"+"\'"+instanceIp+"\')]"
                },
                function () {
                    this.test.assert(true,'uProxy back_end instance is appear!');
                    universe.capturePath(caseName,'uProxy_back_end_instance.png',{top: 0, left: 0,  width: 1440, height: 1024});
                },
                function () {
                    universe.capturePath(caseName,'Error_uProxy_back_end_instance.png',{top: 0, left: 0,  width: 1440, height: 1024});
                    this.test.assert(false,'uProxy back_end instance is not appear!');
                },
                240000
            );
        }
    );

    //点击待删除的后端实例
    universe.casper.thenClick(
        {
            type:'xpath',
            path:"//table[@id='grid-backend']//td[contains(text(),"+"\'"+instanceIp+"\')]"
        },
        function () {
            instance=instanceIp;
            class_Name=this.evaluate(function (instance) {
                return __utils__.getElementByXPath("//table[@id='grid-backend']//td[contains(text(),"+"\'"+instance+"\')]/..").className;

            },instance);
            var arr=class_Name.split(' ');
            for(var i=0,len=arr.length; i<len; i++)
            {
                if(arr[i]=='select'){
                    this.test.assert(true,'back_end got focus!');
                    universe.capturePath(caseName,'back_end_focused.png',{top: 0, left: 0,  width: 1440, height: 1024});
                    break;
                }
            }
        }
    );

    //点击移除后端
    universe.casper.thenClick("button#remove-backend-btn",
        function () {
            this.waitUntilVisible(
                {
                    type:'xpath',
                    path:"//div[@class='dialog confirm']//h3[contains(text(),'确定移除后端数据库')]"
                },
                function () {
                    this.test.assert(true,'popUp remove dialog!');
                    universe.capturePath(caseName,'popUp_remove_dialog.png',{top: 0, left: 0,  width: 1440, height: 1024});
                },
                function () {
                    universe.capturePath(caseName,'Error_popUp_remove_dialog.png',{top: 0, left: 0,  width: 1440, height: 1024});
                    this.test.assert(false,'can not popUp remove dialog!')
                },
                240000
            );
        }
    );

    //点击提交按钮
    universe.casper.thenClick(
        {
            type: 'xpath',
            path: "//div[@class='dialog confirm']//button[@class='btn confirm']"
        },
        function () {
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//div[@class='dialog global']//div[contains(text(),'移除后端 完成')]"
                },
                function () {
                    this.test.assert(true, 'finished remove back end!');
                    universe.capturePath(caseName,'finished_remove_back_end.png',{top: 0, left: 0,  width: 1440, height: 1024});
                },
                function () {
                    universe.capturePath(caseName,'Error_finished_remove_back_end.png',{top: 0, left: 0,  width: 1440, height: 1024});
                    this.test.assert(false, 'can not remove back end!');
                },
                240000
            );
        }
    );

    //点击关闭按钮
    universe.casper.thenClick(
        {
            type:'xpath',
            path:"//div[@class='dialog global']//button[contains(text(),'关闭')]"
        },
        function () {
                instance=instanceIp;
                className=this.evaluate(
                    function (instance) {
                        return __utils__.getElementByXPath("//table[@id='grid-backend']//td[contains(text(),"+"\'"+instance+"\')]/..").className;
                    },instance);
                if(className==null) {
                    this.test.assert(true, 'remove backend instance success!');
                    universe.capturePath(caseName,"after_remove_instance.png",{top: 0, left: 0,  width: 1440, height: 1024});
                }
                else{
                    universe.capturePath(caseName,"Error_after_remove_instance.png",{top: 0, left: 0,  width: 1440, height: 1024});
                    this.test.assert(false,'fail to remove backend instance!');
                }

        }
    );

}

//移除路由组
/*
参数说明：groupUser-待移除的路由用户组名
 */
exports.remove_group=function (caseName,groupUser) {
    //获取待uProxy组的焦点
    universe.casper.test.comment("remove router group!");
    universe.casper.reload(function () {
            //等待路由组的出现
            universe.casper.test.comment("wait router group appear!");
            this.waitUntilVisible(
                {
                    type: 'xpath',
                    path: "//table[@id='grid-frontend']//td[contains(text(),"+"\'"+groupUser+"\')]"
                },
                function () {
                    this.test.assert(true,"uProxy group appear!");
                    universe.capturePath(caseName,"uPoxy_group_appear.png",{top: 0, left: 0,  width: 1440, height: 1024});
                },
                function () {
                    universe.capturePath(caseName,"Error_uPoxy_group_appear.png",{top: 0, left: 0,  width: 1440, height: 1024});
                    this.test.assert(false,"uProxy group not appear!");
                },
                240000
            );

            //点击路由组，获取焦点-并检测路由组是否处于选中状态
            universe.casper.test.comment("click router group, and make sure the group is checked!");
            universe.casper.thenClick(
                {
                    type: 'xpath',
                    path: "//table[@id='grid-frontend']//td[contains(text()," + "\'" + groupUser + "\')]"
                },
                function () {
                    //检测路由组是否处于选中状态
                    tempClassName = universe.casper.evaluate(function (groupUser) {
                        return __utils__.getElementByXPath("//td[contains(text(),\'" + groupUser + "\')]/..").className;
                    }, groupUser);
                    if (tempClassName == "row select") {
                        universe.casper.test.assert(true, 'uProxy group got focus!');
                        universe.capturePath(caseName,'uProxy_group_got_focus.png', {top: 0, left: 0,  width: 1440, height: 1024});
                    }
                    else {
                        universe.capturePath(caseName,'Error_uProxy_group_got_focus.png', {top: 0, left: 0,  width: 1440, height: 1024});
                        universe.casper.test.assert(false, 'uProxy group not got focus!');
                    }
                }
            ).then(function () {
                //检测移除uProxy路由按钮是否是可点击状态，并点击
                universe.casper.test.comment("check the remove uproxy group button is able!");
                temp=universe.assertBtnAbleByXpath("//button[@id='remove-uproxy-router-btn']");

                if (temp==true){
                    universe.casper.thenClick('button#remove-uproxy-router-btn',
                        function () {
                            //等待移除路由组的提交表单
                            universe.casper.test.comment("wait the remove router group sheet!");
                            universe.casper.waitUntilVisible(
                                {
                                    type:'xpath',
                                    path:"//h3[contains(text(),'确定移除路由')]/.."
                                },
                                function () {
                                    universe.casper.test.assert(true,'popUp remove uProxy group!');
                                    universe.capturePath(caseName,"submit_remove_group_dialog.png",{top: 0, left: 0,  width: 1440, height: 1024});
                                },
                                function () {
                                    universe.capturePath(caseName,"Error_submit_remove_group_dialog.png",{top: 0, left: 0,  width: 1440, height: 1024});
                                    universe.casper.test.assert(false,'No popUp remove uProxy group!');
                                },
                                240000
                            );
                        }
                    );
                }
                else {
                    universe.capturePath(caseName,"Error_remove_uProxy_button_disable.png",{top: 0, left: 0,  width: 1440, height: 1024});
                    universe.casper.test.assert(false,"remove uProxy button is disable!");
                }
            });

            //点击提交按钮
            universe.casper.test.comment("click submit buttton!");
            universe.casper.thenClick(
                {
                    type:'xpath',
                    path:"//div[@class='dialog confirm']//button[@class='btn confirm']"
                },
                function () {
                    universe.casper.waitUntilVisible(
                        {
                            type:'xpath',
                            path:"//div[@class='dialog global']//div[contains(text(),'完成')]"
                        },
                        function () {
                            universe.casper.test.assert(true,'remove the group finished!');
                            universe.capturePath(caseName,"remove_group_success.png",{top: 0, left: 0,  width: 1440, height: 1024});
                        },
                        function () {
                            universe.casper.test.assert(false,'remove the group failed!');
                            universe.capturePath(caseName,'Error_remove_group_success.png',{top: 0, left: 0,  width: 1440, height: 1024});
                        },
                        240000
                    );
                }
            );

            //点击关闭按钮
            universe.casper.test.comment("click close button!");
            universe.casper.thenClick(
                {
                    type:'xpath',
                    path:"//div[@class='dialog global']//button[contains(text(),'关闭')]"
                },
                function () {
                        universe.casper.test.assertDoesntExist(
                            {
                                type:'xpath',
                                path:"//table[@id='grid-frontend']//td[text()=\'"+groupUser+"\']"
                             },'remove success,uProxy group disappear from web! ');
                        universe.capturePath(caseName,"uProxy_group_disappear_success.png",{top: 0, left: 0,  width: 1440, height: 1024});
                }
            );
    }
    );
}

//修改uProxy路由组设置
/*
参数说明:groupUser-待移除的路由用户组名,newMaxconn-后端最大连接数，newPassword-后端密码
 */
exports.modify_router_group=function (caseName,groupUser,newMaxconn,newPassword) {
    //重新加载页面等待路由组出现
    universe.casper.reload(function () {
        universe.casper.test.comment("wait router group appear!");
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//table[@id='grid-frontend']//td[contains(text(),"+"\'"+groupUser+"\')]"
            },
            function () {
                this.test.assert(true,"uProxy group appear!");
                universe.capturePath(caseName,"uPoxy_group_appear.png",{top: 0, left: 0,  width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName,"Error_uPoxy_group_appear.png",{top: 0, left: 0,  width: 1440, height: 1024});
                this.test.assert(false,"uProxy group not appear!");
            },
            240000
        );

        //点击路由组，获取焦点-并检测路由组是否处于选中状态
        universe.casper.test.comment("click router group, and make sure the group is checked!");
        universe.casper.thenClick(
            {
                type: 'xpath',
                path: "//table[@id='grid-frontend']//td[contains(text()," + "\'" + groupUser + "\')]"
            },
            function () {
                //检测路由组是否处于选中状态
                tempClassName = universe.casper.evaluate(function (groupUser) {
                    return __utils__.getElementByXPath("//td[contains(text(),\'" + groupUser + "\')]/..").className;
                }, groupUser);
                if (tempClassName == "row select") {
                    universe.casper.test.assert(true, 'uProxy group got focus!');
                    universe.capturePath(caseName,'uProxy_group_got_focus.png', {top: 0, left: 0,  width: 1440, height: 1024});
                }
                else {
                    universe.capturePath(caseName,'Error_uProxy_group_got_focus.png', {top: 0, left: 0,  width: 1440, height: 1024});
                    universe.casper.test.assert(false, 'uProxy group not got focus!');
                }
            }
        ).then(
            function () {
                //检测修改uProxy路由按钮是否是可点击状态，并点击
                universe.casper.test.comment("check the update uproxy group button is able!");
                temp=universe.assertBtnAbleByXpath("//button[@id='update-uproxy-router-btn']");
                if (temp==true){
                    universe.casper.thenClick('button#update-uproxy-router-btn',
                        function () {
                            //等待修改路由组的提交表单
                            universe.casper.test.comment("wait the update router group sheet!");
                            universe.casper.waitUntilVisible(
                                {
                                    type:'xpath',
                                    path:"//h3[contains(text(),'修改Uproxy路由')]/.."
                                },
                                function () {
                                    universe.casper.test.assert(true,'popUp modify uProxy group!');
                                    universe.capturePath(caseName,"submit_modify_group_dialog.png",{top: 0, left: 0,  width: 1440, height: 1024});
                                },
                                function () {
                                    universe.capturePath(caseName,"Error_submit_modify_group_dialog.png",{top: 0, left: 0,  width: 1440, height: 1024});
                                    universe.casper.test.assert(false,'No popUp modify uProxy group!');
                                },
                                240000
                            );
                        }
                    );
                }
                else {
                    universe.capturePath(caseName,"Error_remove_uProxy_button_disable.png",{top: 0, left: 0,  width: 1440, height: 1024});
                    universe.casper.test.assert(false,"remove uProxy button is disable!");
                }

                //填写表单数据
                universe.casper.then(
                    function () {
                        universe.casper.test.comment('fill update uProxy sheet!');
                        universe.casper.fillSelectors("div#update-uproxy-router-modal form",
                            {
                                "div#update-uproxy-router-modal input#update_max_frontend_connect_num":newMaxconn,
                                "div#update-uproxy-router-modal input#update_password":newPassword
                            }, false);
                        universe.capturePath(caseName,'finished_fill_update_sheet.png',{top: 0, left: 0,  width: 1440, height: 1024});
                    }
                );

                //点击保存按钮
                universe.casper.then(function () {
                    universe.casper.thenClick("div#update-uproxy-router-modal button.save",
                        function () {
                            universe.casper.waitUntilVisible("div.confirm button.confirm",
                                function () {
                                    this.test.assert(true,'submit button is visible!');
                                    universe.capturePath(caseName,'submit_button_visible.png',{top: 0, left: 0,  width: 1440, height: 1024});
                                },
                                function () {
                                    universe.capturePath(caseName,'Error_submit_button_visible.png',{top: 0, left: 0,  width: 1440, height: 1024});
                                    this.test.assert(false,'submit button is not visible!');
                                },
                                240000
                            );
                        }
                    );
                });

                //点击提交按钮
                universe.casper.then(function () {
                    universe.casper.thenClick("div.confirm button.confirm",
                        function () {
                            universe.casper.waitUntilVisible(
                                {
                                    type:'xpath',
                                    path:"//div[@class='dialog global']//div[contains(text(),'修改路由 完成')]"
                                },
                                function () {
                                    this.test.assert(true,'got finish popUp dialog!');
                                    universe.capturePath(caseName,'popUp_update_finish_dialog.png',{top: 0, left: 0,  width: 1440, height: 1024});
                                },
                                function () {
                                    universe.capturePath(caseName,'Error_popUp_update_finish_dialog.png',{top: 0, left: 0,  width: 1440, height: 1024});
                                    this.test.assert(false,'got finish popUp dialog!');
                                },
                                240000
                            );
                        }
                    );
                });

                //点击关闭按钮
                universe.casper.then(function () {
                    universe.casper.thenClick("div.global button.done");
                });

            });

    });
}

//修改uProxy路由组后端最大连接数
/*
参数说明：groupUser-要修改的路由组名
          instanceIp-要修改的路由组，后端数据库地址
          newMaxCon-要修改的最大连接数
 */
exports.modify_backend_max_conn=function (caseName,groupUser,instanceIp,newMaxCon) {
    //重新加载页面,等待路由组名出现
    universe.casper.reload(function () {
        this.waitUntilVisible(
            {
                type: 'xpath',
                path: "//table[@id='grid-frontend']//td[contains(text(),"+"\'"+groupUser+"\')]"
            },
            function () {
                this.test.assert(true,"uProxy group appear!");
                universe.capturePath(caseName,"uPoxy_group_appear.png",{top: 0, left: 0,  width: 1440, height: 1024});
            },
            function () {
                universe.capturePath(caseName,"Error_uProxy_group_appear.png",{top: 0, left: 0,  width: 1440, height: 1024});
                this.test.assert(false,"uProxy group not appear!");
            },
            240000
        );
    });

    //点击路由组，获取焦点
    universe.casper.thenClick(
        {
            type: 'xpath',
            path: "//table[@id='grid-frontend']//td[contains(text(),"+"\'"+groupUser+"\')]"
        },
        function () {
            //等待Uproxy后端实例出现
            this.waitUntilVisible(
                {
                    type:'xpath',
                    path:"//table[@id='grid-backend']//td[contains(text(),"+"\'"+instanceIp+"\')]"
                },
                function () {
                    this.test.assert(true,'uProxy back_end instance is appear!');
                    universe.capturePath(caseName,'uProxy_back_end_instance.png',{top: 0, left: 0,  width: 1440, height: 1024});
                },
                function () {
                    universe.capturePath(caseName,'Error_uProxy_back_end_instance.png',{top: 0, left: 0,  width: 1440, height: 1024});
                    this.test.assert(false,'uProxy back_end instance is not appear!');
                },
                240000
            );
        }
    );

    //点击待修改的后端实例
    universe.casper.thenClick(
        {
            type:'xpath',
            path:"//table[@id='grid-backend']//td[contains(text(),"+"\'"+instanceIp+"\')]"
        },
        function () {
            instance=instanceIp;
            class_Name=this.evaluate(function (instance) {
                return __utils__.getElementByXPath("//table[@id='grid-backend']//td[contains(text(),"+"\'"+instance+"\')]/..").className;

            },instance);
            var arr=class_Name.split(' ');
            for(var i=0,len=arr.length; i<len; i++)
            {
                if(arr[i]=='select'){
                    this.test.assert(true,'back_end got focus!');
                    universe.capturePath(caseName,'back_end_focused.png',{top: 0, left: 0,  width: 1440, height: 1024})
                    break;
                }
            }
        }
    );

    //等待更改后端最大连接数可点击，并点击
    universe.casper.then(function () {
        if(universe.assertBtnAbleByXpath("//button[@id='update-max-backend-connect-num-btn']")){
            universe.casper.thenClick('button#update-max-backend-connect-num-btn',function () {
                universe.casper.test.assert(true,'update backend button can click!')
                universe.capturePath(caseName,'update_backend_able.png',{top: 0, left: 0,  width: 1440, height: 1024});
            });
            
        }
        else {
            universe.capturePath(caseName,'Error_update_backend_able.png',{top: 0, left: 0,  width: 1440, height: 1024});
            universe.casper.test.assert(false,'update backend button can not click!');
        }
    });


    //填写表单-最大连接数
    universe.casper.then(function () {
        universe.casper.fillSelectors("div#update-max-backend-connect-num-modal form",
            {
                "input#update_max_backend_connect_num":newMaxCon
            },false).then(function () {
                universe.capturePath(caseName,'update_max_con.png',{top: 0, left: 0,  width: 1440, height: 1024});
        });
    });

    //点击保存按钮
    universe.casper.then(function () {
        universe.casper.thenClick("div#update-max-backend-connect-num-modal button.btn.save",function () {
            universe.casper.waitUntilVisible(
                {
                    type:'xpath',
                    path:"//div[@class='dialog confirm']/h3[text()='操作清单']"
                },
                function () {
                    this.test.assert(true,'submit list is popUp correctly!');
                    universe.capturePath(caseName,'update_max_con_submit.png',{top: 0, left: 0,  width: 1440, height: 1024});
                },
                function () {
                    universe.capturePath(caseName,'Error_update_max_con_submit.png',{top: 0, left: 0,  width: 1440, height: 1024});
                    this.test.assert(false,'submit list is not popUp correctly!');
                },
                240000
            );
        });
        }
    );

    //点击提交按钮
    universe.casper.then(function () {
        universe.casper.thenClick("div.dialog.confirm button.btn.confirm",function () {
            universe.casper.waitUntilVisible(
                {
                    type:'xpath',
                    path:"//div[@class='dialog global']//div[contains(text(),'更改后端最大连接数 完成')]"
                },
                function () {
                    this.test.assert(true,'update backend max con finished!');
                    universe.capturePath(caseName,'update_backend_max_con_finished.png',{top: 0, left: 0,  width: 1440, height: 1024});
                },
                function () {
                    universe.capturePath(caseName,'Error_update_backend_max_con_finished.png',{top: 0, left: 0,  width: 1440, height: 1024});
                    this.test.assert(false,'update backend max con finished!');
                },
                240000
                );
        });
        }
    );

    //点击关闭按钮
    universe.casper.then(function () {
      universe.casper.thenClick("div.dialog.global button.btn.done",function () {
          universe.capturePath(caseName,'after_click_close_button.png',{top: 0, left: 0,  width: 1440, height: 1024});
      });
    });

}


