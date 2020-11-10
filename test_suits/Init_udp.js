//智能平台管理页面
///////////zjw----------
//var child_process = require('@addons-sdk/sdk/system/child_process');
//const { exec } = require('@addons-sdk/sdk/system/child_process');

//var ls = spawn("/bin/sh", ["-c", " sshpass -p sshpass scp -o LogLevel=quiet -o 'UserKnownHostsFile=/dev/null' -o StrictHostKeyChecking=no ./components/umc-9.9.9.9-qa.x86_64.rpm root@172.100.10.1:/opt/"]);
var cnf_global = require('../configs/cnf_global');
var downloads = cnf_global.downloads;
var commonFun = require("../includes/commonFun.js");

var remote_umc_path = '/opt/';
var remote_components_path = "/opt/umc/components/";
var components_path = "./components/";

var getUmc = " mkdir -p  " + components_path + "  cd " + components_path + "  ; wget " + downloads.ftp_umc + downloads.umc_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.umc_version;
var getUcore = "mkdir -p " + components_path + " ;  wget " + downloads.ftp_ucore + downloads.ucore_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.ucore_version;
var getUagent = "mkdir -p " + components_path + " ; wget " + downloads.ftp_uagent + downloads.uagent_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.uagent_version;
var getUdeploy = "mkdir -p " + components_path + "  ; wget " + downloads.ftp_udeploy + downloads.udeploy_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.udeploy_version;
var getUproxy = "mkdir -p " + components_path + " ; wget " + downloads.ftp_uproxy + downloads.uproxy_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.uproxy_version;
var getUstats = "mkdir -p " + components_path + " ; wget " + downloads.ftp_ustats + downloads.ustats_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.ustats_version;
var getUmon = "mkdir -p " + components_path + "  ; wget " + downloads.ftp_umon + downloads.umon_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.umon_version;
var getUrman_agent = "mkdir -p " + components_path + "  ; wget " + downloads.ftp_urman_agent + downloads.urman_agent_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.urman_agent_version;
var getUrman_mgr = "mkdir -p " + components_path + "  ; wget " + downloads.ftp_urman_mgr + downloads.urman_mgr_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.urman_mgr_version;
var getUguard_agent = "mkdir -p " + components_path + "  * ; wget " + downloads.ftp_uguard_agent + downloads.uguard_agent_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.uguard_agent_version;
var getUguard_mgr = "mkdir -p " + components_path + "  * ; wget " + downloads.ftp_uguard_mgr + downloads.uguard_mgr_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.uguard_mgr_version;
var getUelasticsearch = "mkdir -p " + components_path + "  ; wget " + downloads.ftp_uelasticsearch + downloads.uelasticsearch_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.uelasticsearch_version;
var getUlogstash = "mkdir -p " + components_path + "  ; wget " + downloads.ftp_ulogstash + downloads.ulogstash_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.ulogstash_version;
var getUshard = "mkdir -p " + components_path + " ; wget " + downloads.ftp_ushard + downloads.ushard_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.ushard_version;
var getUterm = "mkdir -p " + components_path + "  ; wget " + downloads.ftp_uterm + downloads.uterm_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.uterm_version;
var getUsql = "mkdir -p " + components_path + " ; wget " + downloads.ftp_usql + downloads.usql_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.usql_version;
var getUrds = "mkdir -p " + components_path + "  ; wget " + downloads.ftp_urds + downloads.urds_version + " --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + downloads.urds_version;
var mysql5_6 = "mkdir -p " + components_path + "  ; wget ftp://ftp:ftp@10.186.17.201/mysql-tarball/mysql-5.6.26-linux-glibc2.5-x86_64.tar.gz --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + "mysql-5.6.26-linux-glibc2.5-x86_64.tar.gz";
var mysql5_7 = "mkdir -p " + components_path + "  ; wget ftp://ftp:ftp@10.186.17.201/mysql-tarball/mysql-5.7.21-linux-glibc2.12-x86_64.tar.gz  --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + "mysql-5.7.21-linux-glibc2.12-x86_64.tar.gz";
var mongodb = "mkdir -p " + components_path + "  ; wget ftp://ftp:ftp@10.186.17.201/mysql-tarball/mongodb-linux-x86_64-3.4.9.tgz --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + "mongodb-linux-x86_64-3.4.9.tgz";
var pt = "mkdir -p " + components_path + "  ; wget ftp://ftp:ftp@10.186.17.201/tools/pt-archiver --ftp-user=ftp  --ftp-password=ftp  -O " + components_path + "/" + "pt-archiver";

var downloadComponents = function (userName, ip, cmd, version, remotePath) {

    //下载到本地Casperjs_autotest
    var getVerRet, scpVerRet;
    casper.then(function () {
        getVerRet = commonFun.exec_command(cmd);
    });

    casper.then(function () {
        this.waitFor(getVerRet.wait);
    });

    casper.then(function () {
        this.test.assertEquals(getVerRet.wait(), true, "Download umc components success !");
	casper.wait(2000);
    });

    //scp到远端
    casper.then(function () {
        scpVerRet = commonFun.scp(userName, ip, components_path + version, remotePath);
    });

    casper.then(function () {
        this.waitFor(scpVerRet.wait);
    });

    casper.then(function () {
        this.test.assertEquals(scpVerRet.wait(), true, "scp installation package  to the umc-1 node success !");
    });

};

casper.test.begin('Install DMP!', 43, function () {
    var sshRet;
    var rpmRet;

    //yum安装依赖组件
    casper.then(function () {
        casper.wait(20000);
        sshRet = commonFun.ssh(downloads.umc_1_user, downloads.umc_1_ip, "yum install -y sudo vi less which wget net-tools fontconfig libaio lsof perl-Data-Dumper");
    });
    casper.then(function() {
	this.waitFor(sshRet.wait);
    });

    //下载umc
    downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUmc, downloads.umc_version, remote_umc_path);

    //安装umc-1
    casper.then(function () {
        rpmRet = commonFun.ssh(downloads.umc_1_user, downloads.umc_1_ip, "rpm -ivh /opt/umc-9.9.9.9-qa.x86_64.rpm  --prefix=/opt/umc");
    });

    casper.then(function () {
        this.waitFor(rpmRet.wait);
    });

    casper.then(function () {
        this.test.assertEquals(rpmRet.wait(), true, "install umc success !");
    });

    //启动umc-1
    var startUmcRet;
    casper.then(function () {
        this.test.comment("start umc ......");
        startUmcRet = commonFun.ssh(downloads.umc_1_user, downloads.umc_1_ip, "cd /opt/umc/  ; nohup ./bin/umc > ./bin/umc.log 2>&1");
    });

    casper.then(function () {
        this.waitFor(startUmcRet.wait);
    });

    casper.then(function () {
        this.wait(3000);
    });

    casper.then(function () {
        //下载umc到 /opt/umc/components/
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUmc, downloads.umc_version, remote_components_path);
    });


    casper.then(function () {
        //下载ucore
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUcore, downloads.ucore_version, remote_components_path);
    });

    casper.then(function () {
        //下载uagent
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUagent, downloads.uagent_version, remote_components_path);
    });

    casper.then(function () {
        //下载udeploy
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUdeploy, downloads.udeploy_version, remote_components_path);
    });

    casper.then(function () {
        //下载uproxy
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUproxy, downloads.uproxy_version, remote_components_path);
    });
    casper.then(function () {
        //下载ustats
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUstats, downloads.ustats_version, remote_components_path);
    });
    casper.then(function () {
        //下载umon
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUmon, downloads.umon_version, remote_components_path);
    });
    casper.then(function () {
        //下载urman_agent
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUrman_agent, downloads.urman_agent_version, remote_components_path);
    });
    casper.then(function () {
        //下载urman_mgr
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUrman_mgr, downloads.urman_mgr_version, remote_components_path);
    });
    casper.then(function () {
        //下载uguard_mgr
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUguard_mgr, downloads.uguard_mgr_version, remote_components_path);
    });
    casper.then(function () {
        //下载uguard_agent
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUguard_agent, downloads.uguard_agent_version, remote_components_path);

    });
    casper.then(function () {
        //下载Uelasticsearch
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUelasticsearch, downloads.uelasticsearch_version, remote_components_path);
    });
    casper.then(function () {
        //下载ulogstash
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUlogstash, downloads.ulogstash_version, remote_components_path);
    });
    casper.then(function () {
        //下载Ushard
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUshard, downloads.ushard_version, remote_components_path);
    });

    casper.then(function () {
        //下载Uterm
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUterm, downloads.uterm_version, remote_components_path);
    });

    casper.then(function () {
        //下载usql
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUsql, downloads.usql_version, remote_components_path);
    });

    casper.then(function () {
        //下载urds
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, getUrds, downloads.urds_version, remote_components_path);
    });

    // casper.then(function () {
    //     //下载mysql5.6
    //     downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, mysql5_6, "mysql-5.6.26-linux-glibc2.5-x86_64.tar.gz", remote_components_path);
    // });

    casper.then(function () {
        //下载mysql5.7
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, mysql5_7, "mysql-5.7.21-linux-glibc2.12-x86_64.tar.gz ", remote_components_path);
    });

    casper.then(function () {
        //下载mongodb
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, mongodb, "mongodb-linux-x86_64-3.4.9.tgz", remote_components_path);
    });

    casper.then(function () {
        //下载mongodb
        downloadComponents(downloads.umc_1_user, downloads.umc_1_ip, pt, "pt-archiver", remote_components_path);
    });


    //启动测试案例
    casper.run(function () {
        this.test.done();
    });

});
