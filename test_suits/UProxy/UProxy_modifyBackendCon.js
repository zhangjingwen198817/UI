///////////zjw----------
var universe = require('../includes/universe.js');
var route_s_cfg = require('../sources/route_s_cfg.js');
var page_uproxy_backend = mockData_global.page_uproxy_backend;
var form = page_uproxy_backend.form_add_user;
var fillform = page_uproxy_backend.form_fill_data;
var backend_instances=page_uproxy_backend.form_instances_data;
var form_fill_update=page_uproxy_backend.form_fill_update;

var caseName='UProxy_modifyBackendCon';

casper.test.begin('UProxy modifyBackendCon!', 42, function () {


    casper.then(function () {
        //打开路由配置组的地址
        universe.navigate_to_aLink_Path(caseName,'/uproxy_router');
    });

    //添加路由组
    /*
    参数说明：form.uproxy_groupUser-路由组名，form.max_frontend_connect_num-路由前端最大连接数
              form.router_user-路由组用户名，   form.router_password-路由组用户密码
     */
    casper.then(
        function () {
            route_s_cfg.add_group(caseName,form.uproxy_groupUser, form.max_frontend_connect_num, form.router_user, form.router_password);
        }
    );

    //添加路由组后端
    /*
    参数说明:form.uproxy_groupUser-路由组名，fillform.mysql_group_id-路由id
             fillform.max_con_1/2-后端最大连接数，fillform.admin_password-数据库root密码
              fillform.master_instance-主实例名，fillform.privilege-权限等级
              fillform.mysql_user-数据库用户名，fillform.user_host-连接方式
              fillform.mysql_password-数据库密码，form.router_user-路由组用户名
     */
    casper.then(
        function () {
            route_s_cfg.add_back_end(caseName, form.uproxy_groupUser, fillform.mysql_group_id,
                fillform.max_con_1, fillform.max_con_2, fillform.admin_password,
                fillform.privilege, fillform.mysql_user, fillform.user_host, fillform.mysql_password, form.router_user);
        }
    );


    //修改路由组后端最大连接数
    /*
    参数说明:
     */
    casper.then(
      function () {
          route_s_cfg.modify_backend_max_conn(caseName,form.router_user,backend_instances.mysql_instance_ip_1,form_fill_update.max_backend_con_1);
          casper.then(function () {
              route_s_cfg.modify_backend_max_conn(caseName,form.router_user,backend_instances.mysql_instance_ip_2,form_fill_update.max_backend_con_2);
              }
          );
      }
    );

    //移除路由后端
    /*
     参数说明：form.uproxy_groupUser-路由组用户，
               backend_instances.mysql_instance_ip_1-待移除的路由用户后端IP
     */
    casper.then(
        function () {
            route_s_cfg.remove_back_end(caseName,form.uproxy_groupUser, backend_instances.mysql_instance_ip_1);
            casper.then(
                function () {
                    route_s_cfg.remove_back_end(caseName,form.uproxy_groupUser, backend_instances.mysql_instance_ip_2);
                }
            );
        }
    );

    //移除路由组
    /*
    参数说明:form.router_user-待移除的路由组名
     */
    casper.then(
        function () {
            route_s_cfg.remove_group(caseName,form.router_user);
        }
    );

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
});