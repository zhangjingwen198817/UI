//don't change test_id if you are unknown about what you are doing
exports.data = {
    page_urman_resource: {
        form_add_dump_device: {
            dev_id: 'zhj2',
            dev_type: 'file',
            url: '10.186.30.93:/opt/backup86',
            trans_user: 'zhaohongjie',
            private_key_path: '/home/zhaohongjie/.ssh/id_rsa',
            action: 'urman_resource/add_resource_dev'
        },
        form_remove_dump_device: {
            dev_id: 'zhj2',
            action: 'urman_resource/remove_resource_dev'
        },
        form_add_exercise_resource: {
            server_id: 'server-3',
            exercise_id: 'action2',
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
            exercise_id: 'action2',
            action: "urman_resource/remove_exercise_resource"
        }
    }
}
