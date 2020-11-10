#!/usr/bin/bash
CASPERJS='casperjs test --engine=slimerjs --headless --fail-fast'
$CASPERJS Init_udp.js --pre=../includes/Initdmp.js >&1 | tee -a  ./log/Init_udp.log ; test ${PIPESTATUS[0]} -eq 0 &&
$CASPERJS Init_udp_config.js --pre=../includes/Initdmp.js  >&1 | tee -a  ./log/Init_udp_config.log ; test ${PIPESTATUS[0]} -eq 0 &&
$CASPERJS --pre=../includes/setup.js ./Platform/IPMI_addServer.js  ./Platform/IPMI_addServerManual.js \
./Platform/IPMI_oneKey_reg_avbManage.js  ./Platform/IPMI_oneKey_reg_avbClient.js ./Platform/IPMI_install_single_uMon_module.js \
./Platform/IPMI_SIP_add.js ./MySQL/DB_addDB_group.js  ./MySQL/DB_addMysql_instances.js ./MySQL/DB_addUmcService.js \
./MySQL/DB_backUp_mysql_instance.js  ./MySQL/DB_addMysql_instances_baseBackup.js ./MySQL/DB_start_HA_mysql_master.js \
./MySQL/DB_start_HA_mysql_slave.js ./MySQL/DB_addBackUp_rule.js  ./MySQL/DB_deleteBackUp_rule.js ./MySQL/DB_stop_HA_mysql_slave.js \
./MySQL/DB_reset_Slave_Mysql_instance.js ./MySQL/DB_start_HA_mysql_slave.js \
./MySQL/DB_close_monitorData.js  ./MySQL/DB_start_monitorData.js \
./MySQL/DB_modify_mysqlInstance_parameter.js ./MySQL/DB_switch_MasterSlave_mysql_instance.js --xunit=./log/dmp_log.xml >&1 | tee -a ./log/dmp_log.log   ; test ${PIPESTATUS[0]} -eq 0 

if [ $? -ne 0 ]; then
   echo "run remote_script wrong:get module logs"
   docker cp umc-1:/opt/ucore/logs/detail.log  ./log/umc_1_ucore_detail.log
   docker cp umc-1:/opt/umc/logs/detail.log  ./log/umc_1_umc_detail.log
   docker cp umc-1:/opt/uagent/logs/detail.log  ./log/umc_1_uagent_detail.log
   docker cp umc-1:/opt/udeploy/logs/detail.log  ./log/umc_1_udeploy_detail.log
   docker cp umc-2:/opt/uagent/logs/detail.log  ./log/umc_2_uagent_detail.log
   docker cp umc-2:/opt/uguard-agent/logs/detail.log  ./log/umc_2_uguard_agent_detail.log
   docker cp umc-2:/opt/uguard-mgr/logs/detail.log  ./log/umc_2_uguard_mgr_detail.log
   docker cp umc-3:/opt/uagent/logs/detail.log  ./log/umc_3_uagent_detail.log
   docker cp umc-3:/opt/uguard-agent/logs/detail.log  ./log/umc_3_uguard_agent_detail.log
   docker cp umc-3:/opt/uguard-mgr/logs/detail.log  ./log/umc_3_uguard_mgr_detail.log
   exit 1
fi
