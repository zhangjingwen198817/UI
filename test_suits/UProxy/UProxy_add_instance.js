///////////zjw----------
var universe = require('../includes/universe.js');
var uproxy_instance_cfg = require('../sources/uproxy_instance_s_cfg.js');
var uProxy_instance_data = mockData_global.uProxy_instance_data;

var caseName='UProxy_add_instance';

casper.test.begin(' UProxy add instance group!',11,function () {

    casper.then(function () {
        //打开路由配置组的地址
        universe.navigate_to_aLink_Path(caseName,'/uproxy');
    });

    //添加uProxy_instance group
    casper.then(function () {

        uproxy_instance_cfg.add_uProxy_instance_group(caseName,uProxy_instance_data.instance_Group_Name,uProxy_instance_data.uProxy_Port,
            uProxy_instance_data.uProxy_admin_user,uProxy_instance_data.uProxy_admin_pwd,uProxy_instance_data.auto_commit);

    });

    //添加uProxy实例
    casper.then(function () {
        uproxy_instance_cfg.add_uProxy_Instance(caseName, uProxy_instance_data.instance_Group_Name, uProxy_instance_data.instance_host_name,
            uProxy_instance_data.cpuCore, uProxy_instance_data.uProxy_instance_name,uProxy_instance_data.uproxy_path,
            uProxy_instance_data.uproxy_glibc_install_file, uProxy_instance_data.uproxy_install_file);
    });

    casper.run(function () {
        this.test.done();
    });


});