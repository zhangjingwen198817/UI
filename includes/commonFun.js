exports.ssh = function (account, ip, ssh_args) {
    var command = "sshpass -p sshpass ssh -o LogLevel=quiet -o 'UserKnownHostsFile=/dev/null' -o StrictHostKeyChecking=no " + account + '@' + ip + " \"" + ssh_args + "\"";
    return exports.exec_command(command)
};

exports.exec_command = function (command) {
    const { exec } = require('@addons-sdk/sdk/system/child_process');
    console.log(command);
    var output = "";
    var done = false;
    var retCode = 0;

    callback = function(error, stdout, stderr) {
        if (String(error) == "Error: Command failed: ") {
		exec(command, callback);
        } else {
	    output = stdout + stderr;
            done = true;
            if (error) retCode = 1;
	}
    }
    exec(command, callback);

    return {
        wait: function () {
            return done
        },
        output: function () {
            return output
        },
        isOk: function () {
            return (retCode == 0)
        }
    }
};

//从本地拷贝到远端
exports.scp = function (account, ip, local_file, remote_floder) {
    const { spawn } = require('@addons-sdk/sdk/system/child_process');
    var command = "sshpass -p sshpass scp -o LogLevel=quiet -o 'UserKnownHostsFile=/dev/null' -o StrictHostKeyChecking=no " + local_file + " " + account + '@' + ip + ":" + remote_floder;
    return exports.exec_command(command);
};

//从远端拷贝到本地
exports.scpFromRemoteToLocal = function (account, ip, local_file, remote_floder) {
    const { spawn } = require('@addons-sdk/sdk/system/child_process');
    var command = " sshpass -p sshpass scp -o LogLevel=quiet -o 'UserKnownHostsFile=/dev/null' -o StrictHostKeyChecking=no " + " " + account + '@' + ip + ":" + remote_floder +"  " + local_file;
    console.log(command);
    var output = "";
    var done = false;

    var child = spawn("/bin/sh", ["-c", command]);

    child.stdout.on('data', function (data) {
        output += data;
    });

    child.stderr.on('data', function (data) {
        output += data;
    });


    child.on('close', function (c) {
        done = true;
    });

    return {
        wait: function () {
            return done
        },
        output: function () {
            return output
        }
    }
};

//-------------check  process status ----------------------------------------------

exports.check_process_is_exist = function (casper, server_data, cmd, result, message) {
    var sshRet;
    casper.then(function () {

        sshRet = exports.ssh(server_data.ssh_account, server_data.server_ip, cmd);

    });

    casper.then(function () {
        this.waitFor(sshRet.wait);
    });

    casper.then(function () {
        this.test.assertEquals(sshRet.output(), result, message);
    })
};

