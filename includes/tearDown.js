casper.test.begin('clear test instance !', 0, {
    test: function (test) {
        casper.clear();
        casper.run(function () {
            test.done();
        })
    }
});
