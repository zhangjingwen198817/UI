///////////zjw----------
var universe = require('../includes/universe.js');
var route_s_cfg = require('../sources/route_s_cfg.js');
var page_uproxy_backend = mockData_global.page_uproxy_backend;
var form = page_uproxy_backend.form_add_user;
var form_fill_update=page_uproxy_backend.form_fill_update;

var caseNmae='UProxy_modifyGroup';

casper.test.begin('UProxy modifyGroup!', 15, function () {


    casper.then(function () {
        //打开路由配置组的地址
        universe.navigate_to_aLink_Path(caseNmae,'/uproxy_router');
    });

    //添加路由组
    /*
    参数说明：form.uproxy_groupUser-路由组名，form.max_frontend_connect_num-路由前端最大连接数
              form.router_user-路由组用户名，   form.router_password-路由组用户密码
     */
    casper.then(
        function () {
            route_s_cfg.add_group(caseNmae,form.uproxy_groupUser, form.max_frontend_connect_num, form.router_user, form.router_password);
        }
    );

    //修改路由组最大连接数和密码
    casper.then(
        function () {
            route_s_cfg.modify_router_group(caseNmae,form.router_user,form_fill_update.mysql_group_max_con,form_fill_update.mysql_group_password);
        }
    );

    //移除路由组
    /*
    参数说明:form.router_user-待移除的路由组名
     */
    casper.then(
        function () {
            route_s_cfg.remove_group(caseNmae,form.router_user);
        }
    );

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});