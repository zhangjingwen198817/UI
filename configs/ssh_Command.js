exports.cmdData = {
    Init_DMP: {
        umcCmd: "cd /opt/umc && ls -l|awk 'NR!=1 {print \\$3,\\$4}'",
        umcViewCmd: "cd /opt/umc && ls -l|awk 'NR!=1 {print \\$3,\\$4,\\$9}'",

        uagentCmd: "cd /opt/uagent && ls -l|awk 'NR!=1 {print \\$3,\\$4}'",
        uagentViewCmd: "cd /opt/uagent && ls -l|awk 'NR!=1 {print \\$3,\\$4,\\$9}'",

        ucoreCmd: "cd /opt/ucore && ls -l|awk 'NR!=1 {print \\$3,\\$4}'",
        ucoreViewCmd: "cd /opt/ucore && ls -l|awk 'NR!=1 {print \\$3,\\$4,\\$9}'",

        etc_3306_Cmd: "cd /opt/mysql/etc/3306 && ls -l|awk 'NR!=1 {print \\$3,\\$4}'",
        etc_3306_ViewCmd: "cd /opt/mysql/etc/3306 && ls -l|awk 'NR!=1 {print \\$3,\\$4,\\$9}'",

        id_actiontech_mysql: "id actiontech-mysql|awk '{print \\$3}'|awk \\-F\\, ' {print \\$2}'",

        umcProcess: "ps aux |grep /bin/umc|awk '\\$1==\\\"actiont+\\\" {print \\$11}\'",
        umcViewProcess: "ps aux |grep /bin/umc|awk '\\$1==\\\"actiont+\\\"\'",

        ucoreProcess: "ps aux |grep ucore|awk '\\$1==\\\"actiont+\\\" {print \\$11}\'",
        ucoreViewProcess: "ps aux |grep ucore|awk '\\$1==\\\"actiont+\\\"\'",

        uagentProcess: "ps aux |grep uagent|awk '\\$1==\\\"actiont+\\\" {print \\$11}\'",
        uagentViewProcess: "ps aux |grep uagent|awk '\\$1==\\\"actiont+\\\"\'",

        uguard_mgr_Process: "ps aux |grep uguard-mgr|awk '\\$1==\\\"actiont+\\\" {print \\$11}\'",
        uguard_mgr_ViewProcess: "ps aux |grep uguard-mgr|awk '\\$1==\\\"actiont+\\\"\'",

        uguard_agent_Process: "ps aux |grep uguard-agent|awk '\\$1==\\\"actiont+\\\" {print \\$11}\'",
        uguard_agent_ViewProcess: "ps aux |grep uguard-agent|awk '\\$1==\\\"actiont+\\\"\'",

        urman_mgr_Process: "ps aux |grep urman-mgr|awk '\\$1==\\\"actiont+\\\" {print \\$11}\'",
        urman_mgr_ViewProcess: "ps aux |grep urman-mgr|awk '\\$1==\\\"actiont+\\\"\'",

        urman_agent_Process: "ps aux |grep urman-agent|awk '\\$1==\\\"actiont+\\\" {print \\$11}\'",
        urman_agent_ViewProcess: "ps aux |grep urman-agent|awk '\\$1==\\\"actiont+\\\"\'",

        udeploy_Process: "ps aux |grep udeploy|awk '\\$1==\\\"actiont+\\\" {print \\$11}\'",
        udeploy_ViewProcess: "ps aux |grep udeploy|awk '\\$1==\\\"actiont+\\\"\'",

        ustats_Process: "ps aux |grep ustats|awk '\\$1==\\\"actiont+\\\" {print \\$11}\'",
        ustats_ViewProcess: "ps aux |grep ustats|awk '\\$1==\\\"actiont+\\\"\'",

        umon_Process: "ps aux |grep umon|awk '\\$1==\\\"actiont+\\\" {print \\$11}\'",
        umon_ViewProcess: "ps aux |grep umon|awk '\\$1==\\\"actiont+\\\"\'",

        mysqlProcess: "ps aux |grep /bin/mysqld|awk '\\$1==\\\"actiont+\\\" {print \\$11}\'",
        mysqlViewProcess: "ps aux |grep /bin/mysqld|awk '\\$1==\\\"actiont+\\\"\'",

        userAndGroup: 'id actiontech-universe',

        sipBind: "ip a|awk ' \\$2==\\\"172.100.10.7/32\\\" {print \\$2}'",

        file_3306_Cmd: "cd /opt/mysql/backup/3306 && ls|awk '{print \\$1}'",
        file_3306_ViewCmd: "cd /opt/mysql/backup/3306 && ls|awk '{print \\$1}'",

        kill_Masert_instanc_process: "ps aux|grep mysql |grep '3306'|awk '\\$1==\\\"actiont+\\\" {print \\$2}'",

        sql_slave_net_timeout: "/opt/mysql/base/5.7.21/bin/mysql -uroot -proot  --socket=/opt/mysql/data/3306/mysqld.sock --port=3306 -e 'show variables like \\\"slave_net_timeout\\\"'",
        sql_slave_status:"/opt/mysql/base/5.7.21/bin/mysql -uroot -proot  --socket=/opt/mysql/data/3306/mysqld.sock --port=3306 -e 'show slave status\\G'",
        sql_create_table:"/opt/mysql/base/5.7.21/bin/mysql -uroot -proot  --socket=/opt/mysql/data/3306/mysqld.sock --port=3306 -e 'create table universe.varchar_columns(id int)'",
        sql_query_select:"/opt/mysql/base/5.7.21/bin/mysql -uroot -proot  --socket=/opt/mysql/data/3306/mysqld.sock --port=3306 -e 'select * from universe.varchar_columns'"
    }

};