var domain = "http://172.100.10.1:5799";
//var domain = "http://10.186.30.150:7010";
//var domain = "http://10.186.30.94:5799";
exports.cnf = {
    domain: domain,
    title: "Database Management Platform",
    debug_action_pre: "/test/output",
    page_login: {
        url: domain + "/login",
        form: {
            user: "admin",
            password: "admin"
        }
    },
    page_server: domain + "/statistics"
};
exports.downloads={
    umc_1_user:"root",
    umc_1_ip:"172.100.10.1",

    umc_2_user:"root",
    umc_2_ip:"172.100.10.2",

    umc_3_user:"root",
    umc_3_ip:"172.100.10.3",

    umc_5_user:"root",
    umc_5_ip:"172.100.10.5",

    ftp_ucore:"ftp://ftp:ftp@10.186.17.201/actiontech-ucore/qa/9.9.9.9/",
    ucore_version:"ucore-9.9.9.9-qa.x86_64.rpm",

    ftp_uagent:"ftp://ftp:ftp@10.186.17.201/actiontech-uagent/qa/9.9.9.9/",
    uagent_version:"uagent-9.9.9.9-qa.x86_64.rpm",

    ftp_umc:"ftp://ftp:ftp@10.186.17.201/actiontech-umc/qa/9.9.9.9/",
    umc_version:"umc-9.9.9.9-qa.x86_64.rpm",

    ftp_udeploy:"ftp://ftp:ftp@10.186.17.201/actiontech-udeploy/qa/9.9.9.9/",
    udeploy_version:"udeploy-9.9.9.9-qa.x86_64.rpm",

    ftp_uproxy:"ftp://ftp:ftp@10.186.17.201/actiontech-uproxy/qa/9.9.9.9/",
    uproxy_version:"uproxy-9.9.9.9-qa.x86_64.rpm",

    ftp_ustats:"ftp://ftp:ftp@10.186.17.201/actiontech-ustats/qa/9.9.9.9/",
    ustats_version:"ustats-9.9.9.9-qa.x86_64.rpm",

    ftp_umon:"ftp://ftp:ftp@10.186.17.201/actiontech-umon/qa/9.9.9.9/",
    umon_version:"umon-9.9.9.9-qa.x86_64.rpm",

    ftp_urman_agent:"ftp://ftp:ftp@10.186.17.201/actiontech-urman/qa/9.9.9.9/",
    urman_agent_version:"urman-agent-9.9.9.9-qa.x86_64.rpm",

    ftp_urman_mgr:"ftp://ftp:ftp@10.186.17.201/actiontech-urman/qa/9.9.9.9/",
    urman_mgr_version:"urman-mgr-9.9.9.9-qa.x86_64.rpm",

    ftp_uguard_agent:"ftp://ftp:ftp@10.186.17.201/actiontech-uguard/qa/9.9.9.9/",
    uguard_agent_version:"uguard-agent-9.9.9.9-qa.x86_64.rpm",

    ftp_uguard_mgr:"ftp://ftp:ftp@10.186.17.201/actiontech-uguard/qa/9.9.9.9/",
    uguard_mgr_version:"uguard-mgr-9.9.9.9-qa.x86_64.rpm",

    ftp_uelasticsearch:"ftp://ftp:ftp@10.186.17.201/actiontech-uelasticsearch/qa/5.0.1.2/",
    uelasticsearch_version:"uelasticsearch-5.0.1.2-qa.x86_64.rpm",

    ftp_ulogstash:"ftp://ftp:ftp@10.186.17.201/actiontech-ulogstash/qa/9.9.9.9/",
    ulogstash_version:"ulogstash-9.9.9.9-qa.x86_64.rpm",

    ftp_ushard:"ftp://ftp:ftp@10.186.17.201/actiontech-ushard/qa/9.9.9.9/",
    ushard_version:"ushard-9.9.9.9-enterprise-qa.x86_64.rpm",

    ftp_uterm:"ftp://ftp:ftp@10.186.17.201/actiontech-uterm/qa/9.9.9.9/",
    uterm_version:"uterm-9.9.9.9-qa.x86_64.rpm",

    ftp_usql:"ftp://ftp:ftp@10.186.17.201/actiontech-usql/qa/9.9.9.9/",
    usql_version:"usql-9.9.9.9-qa.x86_64.rpm",

    ftp_urds:"ftp://ftp:ftp@10.186.17.201/actiontech-urds/qa/9.9.9.9/",
    urds_version:"urds-9.9.9.9-qa.x86_64.rpm"

};

