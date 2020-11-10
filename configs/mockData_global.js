//don't change test_id if you are unknown about what you are doing
/*
var page_db_server_ip = '10.186.30.135'
var page_db_port = 3310;
var page_db_group = "g1";
var page_db_server_id = "server-135";

var db_instance_model = {
    group_id: page_db_group,
    port: page_db_port,
    server_id: page_db_server_id,
    mysql_id: '',
    mysql_alias: 'g1m1',
    install_standard: 'uguard_semi_sync',
    init_data: '',
    mysql_root_init_password: '111111',
    mysql_tarball_path: 'mysql-5.7.19-linux-glibc2.12-x86_64.tar.gz',
    mysql_base_path: '/opt/mysql/base/5.7.19',
    mysql_data_path: '/opt/mysql/data/',
    mysql_binlog_path: '/opt/mysql/binlog/',
    mysql_tmp_path: '/opt/mysql/innerdocker/',
    backup_path: '/opt/mysql/backup/',
    mycnf_path: '/opt/mysql/etc/my.cnf',
    version: '5.7.19',
    is_create_ustats_user: 'true',
    ustats_user: 'ustats',
    ustats_host: '127.0.0.1',
    ustats_password: '',
    ustats_privilege: "super on *.*\nselect on performance_schema.*\nselect on mysql.*\nselect, execute on sys.*\nprocess on *.*\nevent on *.*",
    run_user: 'actiontech-mysql',
    serverID: '',
    umask: '0640',
    umask_dir: '0750',
    resource: '0',
    check_mycnf_path: './mycnfs/my.cnf.5.7',
    mycnf_config: '',
    action: 'database/add_instance'
};
*/

exports.data = {
    /*
    page_login: {
        form: {
            user: "admin",
            password: "admin"
        }
    },

    page_server: {
        form_add_server: {
            uagent_install_method: "ssh",
            server_ip: "10.186.30.101",
            ssh_port: "22",
            ssh_user: "root",
            ssh_password: "sshpass",
            hostname: "",
            server_id: "server-101",
            uagent_path: "/opt/uagent",
            uagent_id: "uagent-1",
            uagent_install_file: "uagent-2.17.10.0-qa.x86_64.rpm",
            action: "server/add"
        }
    },
    page_database_instance: {
        form_add_group: {
            group_id: page_db_group,
            sip: "",
            port: page_db_port,
            action: "database/add_group"
        },
        form_remove_group: {
            group_id: page_db_group,
            action: "database/remove_group"
        },
        form_add_instance: db_instance_model,
        form_add_instance_not_first: {
            base_model: db_instance_model,
            mysql_alias: "g1s1",
            server_id: "server-101",
            mysql_root_init_password: "",
            is_create_ustats_user: "false"
        },
        form_detach_instance: {
            mysql_alias: "g1m1",
            action: "database/detach_instance"
        },
        form_attach_instance: {
            group_id: page_db_group,
            server_id: page_db_server_id,
            server_ip: page_db_server_ip,
            mysql_alias: "g1s1",
            install_standard: "uguard_semi_sync",
            mysql_user: "root",
            mysql_password: "111111",
            mysql_socket_path: "/opt/mysql/data/mysqld.sock",
            mysql_tarball_path: "mysql-5.7.19-linux-glibc2.12-x86_64.tar.gz",
            backup_path: "/opt/mysql/backup/",
            mycnf_path: "/opt/mysql/etc/my.cnf",
            mysql_connect_type: "socket",
            version: "5.7.19",
            umask: '0640',
            run_user: 'actiontech-mysql',
            umask_dir: '0750',
            resource: '0',
            mysql_need_restart: 'true',
            is_create_ustats_user: "false",
            ustats_privilege: "super on *.*\nselect on performance_schema.*\nselect on mysql.*\nselect, execute on sys.*\nprocess on *.*\nevent on *.*",
            action: "database/takeover_instance"
        },
        form_delete_instance: {
            mysql_alias: "g1s1",
            server_id: page_db_server_id,
            group_id: "mysql-g1",
            action: "database/delete_instance"
        },
        form_manual_backup: {
            mysql_alias: "g1s1",
        }
    },
    page_uproxy: {
        form_add_group: {
            group_id: "g1",
            sip: "",
            port: 12345,
            is_autocommit: 1,
            admin_user: "admin",
            admin_password: "admin",
            action: "uproxy/add_group",
            test_id: 1
        },
        form_remove_group: {
            group_id: "g1",
            action: "uproxy/remove_group",
            test_id: 4
        },
        form_add_instance: {
            server_id: "server-2",
            smp: 4,
            uproxy_id: 1,
            uproxy_path: "/data/uproxy",
            uproxy_glibc_install_file: "",
            uproxy_install_file: "uproxy-9.9.9.9-qa.x86_64.rpm",
            action: "uproxy/add_instance",
            test_id: 2
        },
        form_remove_instance: {
            uproxy_id: 1,
            server_id: "server-2",
            action: "uproxy/remove_instance",
            test_id: 3
        }
    },
    page_sippool: {
        form_add_sip: {
            sip: "10.186.30.232",
            action: "/sippool/add"
        },
        form_remove_sip: {
            sip: "10.186.30.232",
            action: "/sippool/remove"
        }
    },
    page_urman_resource: {
        form_add_dump_device: {
            dev_id: 'zhj',
            dev_type: 'file',
            url: '10.186.30.93:/opt/backup86',
            trans_user: 'zhaohongjie',
            private_key_path: '/home/zhaohongjie/.ssh/id_rsa',
            action: 'urman_resource/add_resource_dev'
        },
        form_remove_dump_device: {
            dev_id: 'zhj',
            action: 'urman_resource/remove_resource_dev'
        },
        form_add_exercise_resource: {
            server_id: 'server-2',
            exercise_id: 'action',
            exercise_path: '/yanlian',
            exercise_max_concurrency_num: '2',
            mysql_tarball_path: 'mysql-5.7.19-linux-glibc2.12-x86_64.tar.gz',
            mysql_base_path: '/opt/mysql/base/5.7.19',
            exercise_mycnf_path: '/yanlian/my.cnf',
            run_user: 'actiontech-mysql',
            version: '5.7.19',
            action: 'urman_resource/add_exercise_resource'
        },
        form_remove_exercise_device: {
            exercise_id: 'action',
            action: "urman_resource/remove_exercise_resource"
        }
    },
  */
    //zjw-add----------------------------------
    page_uproxy_backend: {
        form_add_user: {
            uproxy_groupUser:"uproxy-autotest_group",
            max_frontend_connect_num: "20",
            router_user: "autotest",
            router_password: "autotest"
        },
        form_fill_data: {
            mysql_group_id: "mysql-auto_test",
            max_con_1:'10',
            max_con_2:'9',
            admin_password: "root",
            mysql_user: "autotest",
            mysql_password: "autotest",
            privilege: "所有权限",
            user_host: "%"
        },
        form_instances_data:{
            mysql_instance_ip_1:'10.186.30.109:3306',
            mysql_instance_ip_2:'10.186.30.07:3306'
        },
        form_fill_update:{
            mysql_group_max_con:'10',
            mysql_group_password:'modifytest',
            max_backend_con_1:'40',
            max_backend_con_2:'50'
        }
    },
    uProxy_instance_data:{
        instance_Group_Name:'autotest_group',
        uProxy_Port:'7000',
        auto_commit:'1',
        uProxy_admin_user:'uproxyroot',
        uProxy_admin_pwd:'uproxyroot',
        instance_host_name:'server-umc-3',
        cpuCore:'1',
        uProxy_instance_name:'autotest_instance',
        uproxy_path:'/opt/uproxy',
        uproxy_glibc_install_file:'',
        uproxy_install_file:'uproxy-9.9.9.9-qa.x86_64.rpm'
    },
    IPMI_server: {
        form_add_server_1: {
            uagent_install_method: "SSH",
            uagent_install_method_manual:'手工安装',
            server_ip_1: "172.100.10.1",
            server_ip: "172.100.10.2",
            server_ip_manu: "172.100.10.5",
            ssh_port: "22",
            ssh_user: "root",
            ssh_password: "sshpass",
            hostname: "umc-2",
            hostname_manu: "umc-5",
            uagent_path: "/opt/uagent",
            uagent_id: "umc-2",
            uagent_id_manu: "umc-5",
            uagent_install_file:"uagent-9.9.9.9-qa.x86_64.rpm",
            ustats_path:'/opt/ustats',
            ustats_id:'ustats-2',
            ustats_install_file:'ustats-9.9.9.9-qa.x86_64.rpm',

            waittime:'30000',
            uagent_data:'uagent_status'
        },
        form_server_client_list:{
            reg_ha_udeploy_path: '/opt/udeploy',
            reg_ha_udeploy_id: 'umc-2',
            reg_ha_udeploy_install_file: 'udeploy-9.9.9.9-qa.x86_64.rpm',
            reg_ha_ustats_path: '/opt/ustats',
            reg_ha_ustats_id: 'umc-2',
            reg_ha_ustats_install_file: 'ustats-9.9.9.9-qa.x86_64.rpm',
            reg_ha_uguard_agent_path: '/opt/uguard-agent',
            reg_ha_uguard_agent_id: 'umc-2',
            reg_ha_uguard_agent_install_file: 'uguard-agent-9.9.9.9-qa.x86_64.rpm',
            reg_ha_urman_agent_path: '/opt/urman-agent',
            reg_ha_urman_agent_id: 'umc-2',
            reg_ha_urman_agent_install_file: 'urman-agent-9.9.9.9-qa.x86_64.rpm',
            reg_ha_max_backup_concurrency_num: '2'
        },
        form_server_manager_list:{
            mgr_ha_uguard_mgr_path:'/opt/uguard-mgr',
            mgr_ha_uguard:'umc-2',
            mgr_ha_uguard_mgr_install_file:'uguard-mgr-9.9.9.9-qa.x86_64.rpm',
            mgr_ha_urman_mgr_path:'/opt/urman-mgr',
            mgr_ha_urman_mgr_id:'umc-2',
            mgr_ha_urman_mgr_install_file:'urman-mgr-9.9.9.9-qa.x86_64.rpm'
        },
        uninstall_module:{
            Uguard_mgr:'Uguard-mgr',
            Urman_mgr:'Urman-mgr',
            Uguard_agent:'Uguard-agent',
            Urman_agent:'Urman-agent',
            Udeploy:'Udeploy',
            Ustats:'Ustats',
            Umc:'Umc',
            Umon:'Umon',
            Ulogstash:'Ulogstash',
            Uelasticsearch:'Uelasticsearch',
            Uterm:'Uterm',
            Usql:'Usql',
            Urds:'Urds',

            Uguard_data:'uguard-mgr_status',
            Uguard_agent_data:'uguard-agent_status',
            Urman_mgr_data:'urman-mgr_status',
            Urman_agent_data:'urman-agent_status',
            Udeploy_data:'udeploy_status',
            Ustats_data:'ustats_status',
            Umc_data:'umc_status',
            Umon_data:'umon_status',
            Ulogstash_data:'ulogstash_status',
            Uelasticsearch_data:'uelasticsearch_status',
            Uterm_data:'uterm_status',
            Usql_data:'usql_status',
            Urds_data:'urds_status'
        },
        install_single_uDeploy_module:{
            install_component:'udeploy',
            udeploy_path:'/opt/udeploy',
            udeploy_id:'umc-2',
            udeploy_install_file:'udeploy-9.9.9.9-qa.x86_64.rpm',
            udeploy_data:'udeploy_status'
        },
        install_single_umc_module:{
            install_component:'umc',
            umc_path:'/opt/umc',
            umc_id:'umc-2',
            umc_install_file:'umc-new_ui-qa.x86_64.rpm',
            umc_data:'umc_status'
        },
        install_single_uGuard_mgr_module:{
            install_component:'uguard-mgr',
            uguard_mgr_path:'/opt/uguard-mgr',
            uguard_mgr_id:'umc-2',
            uguard_mgr_install_file:'uguard-mgr-9.9.9.9-qa.x86_64.rpm',
            uguard_data:'uguard-mgr_status'
        },
        install_single_uGuard_agent_module:{
            install_component:'uguard-agent',
            uguard_agent_path:'/opt/uguard-agent',
            uguard_agent_id:'umc-2',
            uguard_agent_install_file:'uguard-agent-9.9.9.9-qa.x86_64.rpm',
            uguard_agent_data:'uguard-agent_status'
        },
        install_single_uStats_module:{
            install_component:'ustats',
            ustats_path:'/opt/ustats',
            ustats_id:'umc-2',
            ustats_install_file:'ustats-9.9.9.9-qa.x86_64.rpm',
            ustats_status:'ustats_status'
        },
        install_single_uMon_module:{
            install_component:'umon',
            umon_path:'/opt/umon',
            umon_id:'umc-1',
            umon_install_file:'umon-9.9.9.9-qa.x86_64.rpm',
            umon_status:'umon_status'
        },
        install_single_uLogStash_module:{
            install_component:'ulogstash',
            ulogstash_path:'/opt/ulogstash',
            ulogstash_id:'umc-2',
            ulogstash_install_file:'ulogstash-9.9.9.9-qa.x86_64.rpm',
            ulogstash_status_data:'ulogstash_status'
        },
        install_single_uElasticSearch_module:{
            install_component:'uelasticsearch',
            uelasticsearch_path:'/opt/uelasticsearch',
            uelasticsearch_id:'umc-2',
            uelasticsearch_install_file:'uelasticsearch-5.0.1.2-qa.x86_64.rpm',
            uelasticsearch_status_data:'uelasticsearch_status'
        },
        install_single_urMan_mgr_module:{
            install_component:'urman-mgr',
            urman_mgr_path:'/opt/urman-mgr',
            urman_mgr_id:'umc-2',
            urman_mgr_install_file:'urman-mgr-9.9.9.9-qa.x86_64.rpm',
            urman_mgr_status_data:'urman-mgr_status'
        },
        install_single_urMan_agent_module:{
            install_component:'urman-agent',
            urman_agent_path:'/opt/urman-agent',
            urman_agent_id:'umc-2',
            urman_agent_install_file:'urman-agent-9.9.9.9-qa.x86_64.rpm',
            max_num:'2',
            urman_agent_status_data:'urman-agent_status'
        },
        install_single_uTerm_agent_module:{
            install_component:'uterm',
            uterm_path:'/opt/uterm',
            uterm_id:'umc-2',
            uterm_install_file:'uterm-9.9.9.9-qa.x86_64.rpm',
            uterm_status:'uterm_status'
        },
        install_single_uSql_module:{
            install_component:'usql',
            usql_path:'/opt/usql',
            usql_id:'umc-2',
            usql_install_file:'usql-9.9.9.9-qa.x86_64.rpm',
            usql_status:'usql_status'
        },
        install_single_uRds_module:{
            install_component:'urds',
            urds_path:'/opt/urds',
            urds_id:'umc-2',
            urds_install_file:'urds-9.9.9.9-qa.x86_64.rpm',
            urds_status:'urds_status'
        },
        update_module_udeploy:{
            module_name:'udeploy',
            module_file:'udeploy-9.9.9.9-qa.x86_64.rpm'
        },
        update_module_uguard_mgr:{
            module_name:'uguard-mgr',
            module_file:'uguard-mgr-9.9.9.9-qa.x86_64.rpm'
        },
        update_module_uguard_agent:{
            module_name:'uguard-agent',
            module_file:'uguard-agent-9.9.9.9-qa.x86_64.rpm'
        },
        update_module_ustats:{
            module_name:'ustats',
            module_file:'ustats-9.9.9.9-qa.x86_64.rpm'
        },
        update_module_urman_mgr:{
            module_name:'urman-mgr',
            module_file:'urman-mgr-9.9.9.9-qa.x86_64.rpm'
        },
        update_module_urman_agent:{
            module_name:'urman-agent',
            module_file:'urman-agent-9.9.9.9-qa.x86_64.rpm'
        },
        update_module_umon:{
            module_name:'umon',
            module_file:'umon-9.9.9.9-qa.x86_64.rpm'
        },
        update_module_ulogstash:{
            module_name:'ulogstash',
            module_file:'ulogstash-9.9.9.9-qa.x86_64.rpm'
        },
        update_module_uterm:{
            module_name:'uterm',
            module_file:'uterm-5.0.1.2-qa.x86_64.rpm'
        },
        update_module_uelasticsearch:{
            module_name:'uelasticsearch',
            module_file:'uelasticsearch-5.0.1.2-qa.x86_64.rpm'
        },
        update_module_usql:{
            module_name:'usql',
            module_file:'usql-9.9.9.9-qa.x86_64.rpm'
        },
        update_module_urds:{
            module_name:'urds',
            module_file:'urds-9.9.9.9-qa.x86_64.rpm'
        },
        update_module_umc:{
            module_name:'umc',
            module_file:'umc-new_ui-qa.x86_64.rpm'
        }

    },
    IPMI_CMS_User:{
        add_User_readOnly:{
            userName:'autotest',
            password:'autotest',
            privilage:'只读用户'
        },
        add_User_admin:{
            userName:'autoadmin',
            password:'autoadmin',
            privilage:'管理员用户'
        },
        add_User_root:{
            userName:'autoroot',
            password:'autoroot',
            privilage:'权限用户'
        },
        modify_User:{
            userName:'autoroot',
            password:'autoroot',
            privilage:'权限用户'
        }

    },
    IPMI_SIP:{
        add_sip:{
            ip:'172.100.10.7-172.100.10.14',
            ip_7:'172.100.10.7',
            ip_8:'172.100.10.8',
            ip_9:'172.100.10.9',
            ip_10:'172.100.10.10',
            ip_11:'172.100.10.11',
            ip_12:'172.100.10.12',
            ip_13:'172.100.10.13',
            ip_14:'172.100.10.14'
        },
        remove_sip:{
            ip:'172.100.10.7'
        }
    },
    DB_cfg:{
        DB_add_server_3: {
            uagent_install_method: "SSH",
            server_ip: "172.100.10.3",
            ssh_port: "22",
            ssh_user: "root",
            ssh_password: "sshpass",
            hostname: "umc-3",
            uagent_path: "/opt/uagent",
            uagent_id: "uagent-3",
            uagent_install_file:"uagent-9.9.9.9-qa.x86_64.rpm",
            ustats_path:'/opt/ustats',
            ustats_id:'ustats-3',
            waittime:'30000',
            uagent_data:'uagent_status'
        },
        form_server_client_list_3:{
            reg_ha_udeploy_path: '/opt/udeploy',
            reg_ha_udeploy_id: 'umc-3',
            reg_ha_udeploy_install_file: 'udeploy-9.9.9.9-qa.x86_64.rpm',
            reg_ha_ustats_path: '/opt/ustats',
            reg_ha_ustats_id: 'umc-3',
            reg_ha_ustats_install_file: 'ustats-9.9.9.9-qa.x86_64.rpm',
            reg_ha_uguard_agent_path: '/opt/uguard-agent',
            reg_ha_uguard_agent_id: 'umc-3',
            reg_ha_uguard_agent_install_file: 'uguard-agent-9.9.9.9-qa.x86_64.rpm',
            reg_ha_urman_agent_path: '/opt/urman-agent',
            reg_ha_urman_agent_id: 'umc-3',
            reg_ha_urman_agent_install_file: 'urman-agent-9.9.9.9-qa.x86_64.rpm',
            reg_ha_max_backup_concurrency_num: '2'
        },
        form_server_manager_list_3:{
            mgr_ha_uguard_mgr_path:'/opt/uguard-mgr',
            mgr_ha_uguard:'umc-3',
            mgr_ha_uguard_mgr_install_file:'uguard-mgr-9.9.9.9-qa.x86_64.rpm',
            mgr_ha_urman_mgr_path:'/opt/urman-mgr',
            mgr_ha_urman_mgr_id:'umc-3',
            mgr_ha_urman_mgr_install_file:'urman-mgr-9.9.9.9-qa.x86_64.rpm'
        },
        DB_add_server_4: {
            uagent_install_method: "SSH",
            server_ip: "172.100.10.4",
            ssh_port: "22",
            ssh_user: "root",
            ssh_password: "sshpass",
            hostname: "umc-4",
            uagent_path: "/opt/uagent",
            uagent_id: "uagent-4",
            uagent_install_file:"uagent-9.9.9.9-qa.x86_64.rpm",
            waittime:'30000',
            uagent_data:'uagent_status'
        },
        form_server_client_list_4:{
            reg_ha_udeploy_path: '/opt/udeploy',
            reg_ha_udeploy_id: 'umc-4',
            reg_ha_udeploy_install_file: 'udeploy-9.9.9.9-qa.x86_64.rpm',
            reg_ha_ustats_path: '/opt/ustats',
            reg_ha_ustats_id: 'umc-4',
            reg_ha_ustats_install_file: 'ustats-9.9.9.9-qa.x86_64.rpm',
            reg_ha_uguard_agent_path: '/opt/uguard-agent',
            reg_ha_uguard_agent_id: 'umc-4',
            reg_ha_uguard_agent_install_file: 'uguard-agent-9.9.9.9-qa.x86_64.rpm',
            reg_ha_urman_agent_path: '/opt/urman-agent',
            reg_ha_urman_agent_id: 'umc-4',
            reg_ha_urman_agent_install_file: 'urman-agent-9.9.9.9-qa.x86_64.rpm',
            reg_ha_max_backup_concurrency_num: '2'
        },
        form_server_manager_list_4:{
            mgr_ha_uguard_mgr_path:'/opt/uguard-mgr',
            mgr_ha_uguard:'umc-4',
            mgr_ha_uguard_mgr_install_file:'uguard-mgr-9.9.9.9-qa.x86_64.rpm',
            mgr_ha_urman_mgr_path:'/opt/urman-mgr',
            mgr_ha_urman_mgr_id:'umc-4',
            mgr_ha_urman_mgr_install_file:'urman-mgr-9.9.9.9-qa.x86_64.rpm'
        },
        DB_add_group:{
            groupName:'auto_test',
            sip:'172.100.10.7',
            app_Eg_name:'appEnglishName',
            app_name:'appName',
            sql_purpose:'dbusage',
            node_detail:'appNode',
            app_grade:'appLevel',
            disaster_garde:'disasterLevel'
        },
        DB_remove_group:{
            groupName:'auto_test'
        },
        DB_add_mysql_instance:{
            host_ip:'10.186.17.201',//CI:10.186.30.150
            port_ip:'7019',
            groupName:'auto_test',
            hostName:'server-umc-2',
            port:'3306',
            mysql_alias:'automationMysql_1',
            install_standard:'高可用-半同步',
            init_data:'',
            mysql_user:'root',
            password:'root',
            mysql_tarball_path:'mysql-5.7.21-linux-glibc2.12-x86_64.tar.gz',
            mysql_base_path:'/opt/mysql/base/5.7.21',
            mysql_data_path:'/opt/mysql/data/3306',
            mysql_binlog_path:'/opt/mysql/log/binlog/3306',
            mysql_relaylog_path:'/opt/mysql/log/relaylog/3306',
            mysql_redolog_path:'/opt/mysql/log/redolog/3306',
            mysql_tmp_path:'/opt/mysql/innerdocker/3306',
            backup_path:'/opt/mysql/backup/3306',
            mycnf_path:'/opt/mysql/etc/3306/my.cnf',
            all_user:'universe_op',
            all_host:'%',
            all_password:'autoroot',
            run_user:'actiontech-mysql',
            run_user_group:'',
            mysql_uid:'',
            mysql_gid:'',
            serverID:'655088454',
            umask:'0640',
            umask_dir:'0750'
        },
        DB_backUp_mysql_instance:{
            groupName:'auto_test',
            mysql_alias:'automationMysql_1',
            backUp_tools:'XtraBackup'

        },
        DB_add_mysql_instance_backUp:{
            groupName:'auto_test',
            hostName:'server-umc-3',
            port:'3306',
            mysql_alias:'automationMysql_2',
            install_standard:'高可用-半同步',
            mysql_tarball_path:'mysql-5.7.21-linux-glibc2.12-x86_64.tar.gz',
            mysql_base_path:'/opt/mysql/base/5.7.21',
            mysql_data_path:'/opt/mysql/data/3306',
            mysql_binlog_path:'/opt/mysql/log/binlog/3306',
            mysql_relaylog_path:'/opt/mysql/log/relaylog/3306',
            mysql_redolog_path:'/opt/mysql/log/redolog/3306',
            mysql_tmp_path:'/opt/mysql/innerdocker/3306',
            backup_path:'/opt/mysql/backup/3306',
            mycnf_path:'/opt/mysql/etc/3306/my.cnf',
            run_user:'actiontech-mysql',
            run_user_group:'',
            mysql_uid:'',
            mysql_gid:'',
            serverID:'1292318094',
            umask:'0640',
            umask_dir:'0750'
        },
        DB_start_HA_mysql_master:{
            groupName:'auto_test',
            mysql_alias:'automationMysql_1'
        },
        DB_start_HA_mysql_slave:{
            groupName:'auto_test',
            mysql_alias:'automationMysql_2'
        },
        DB_back_up_rule:{
            backUp_rule_name:'backupAutotest',
            backUp_tool:'XtraBackup',
            Operation_duration:'24'
        }
    }

};
