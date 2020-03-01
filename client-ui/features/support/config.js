exports.browserSettings = {
    headless: true,
    slowMo: 0,
    // Comment dumpio in in order to print any console events to STDOUT
    // dumpio: true,
    // Comment devtools in in order to use debuggers (google 'page.evaluate()')
    // devtools: true,
    //args: ['--proxy-server=<proxy-server-url>:<port>',
        //'--proxy-bypass-list=127.0.1,localhost',
        //'--remote-debugging-port=9222'],
    timeout: 60000
};

exports.windowSize = {
    width: 1280,
    height: 1024
};
