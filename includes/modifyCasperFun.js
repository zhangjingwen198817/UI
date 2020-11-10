exports.modifyCasper = function (casper) {
    casper.open_page = function (url) {
        casper.options.waitTimeout = 480000; //构造casper的时候传递的一些参数，可以修改值
        casper.start(url + 'login', function () {
            this.test.assert(this.getCurrentUrl() === url + 'login', '打开网址正确---' + url + 'login');
            this.test.assertHttpStatus(200, '打开网址正确---http请求状态正常');
        });
    };

    casper.wait_set = function (time) {
        casper.wait(time, function () {
            this.echo("waitting...");
        });
    }
    casper._page_screen = function (page_screen) {
        casper.wait(1000, function () {
            casper.capture(page_screen + ".png");
        });
    };

    casper._click = function (id) {   //重写click函数，因为casper的click函数有些元素不支持，换成jquery的click函数，该函数支持所有的元素
        casper.evaluate(function (id2) {  //evalute为了能写jQuery的函数，casper会启动假的浏览器，evaluate将函数的返回值返回给casper
            $(id2).click();
        }, id);
    };

    casper.ssh_cmd = function (server_data, cmdErrorStep) {
        var getVerRet;

        // set error step
        casper.then(function () {
            getVerRet = commonFun.ssh(server_data.ssh_account, server_data.server_ip, cmdErrorStep);
        })

        casper.then(function () {
            this.waitFor(getVerRet.wait);
        })

        casper.then(function () {
            this.test.assertEquals(getVerRet.wait(), true);
        })
    };
    casper.ssh_cmd_check_return_value = function (server_data, cmdErrorStep, ruturn_value) {
        var getVerRet;

        // set error step
        casper.then(function () {
            getVerRet = commonFun.ssh(server_data.ssh_account, server_data.server_ip, cmdErrorStep);
        })

        casper.then(function () {
            this.waitFor(getVerRet.wait);
        })

        casper.then(function () {
            this.test.assertEquals(getVerRet.output(), ruturn_value);
        })
    };

    casper.run_test_case = function () {
        casper.run(function () {
            this.test.done();
            //this.exit();
        });
    };
}