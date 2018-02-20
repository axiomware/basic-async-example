// Copyright 2017,2018 Axiomware Systems Inc. 
//
// Licensed under the MIT license <LICENSE-MIT or 
// http://opensource.org/licenses/MIT>. This file may not be copied, 
// modified, or distributed except according to those terms.
//


//Add external modules dependencies
var netrunr = require('netrunr-gapi-async');
var chalk = require('chalk');
var figlet = require('figlet');

const gapiAsync = new netrunr('');//Create a Netrunr gateway object instance

//User configuration
var userConfig = {           
    'username': '<ENTER-YOUR-USERNAME>', //Valid username to your Axiomware account
    'pwd': '<ENTER-YOUR-PASSWORD>' //Valid password to your Axiomware account
};

//Monitor ctrl-c events and exit program
process.on("SIGINT", function () {
    axShutdown("Received Ctrl-C - shutting down.. please wait");
});

// Ensure any unhandled promise rejections get logged.
process.on('unhandledRejection', err => {
    console.log("Unhandled promise rejection - shutting down.. " + JSON.stringify(err, Object.getOwnPropertyNames(err)));
    process.exit();
})

//Application start - startup banner
console.log(chalk.green.bold(figlet.textSync('NETRUNR GATEWAY', { horizontalLayout: 'default' })));
console.log(chalk.green.bold('Basic Login Application Using Async SDK'));
console.log(chalk.red.bold('Press Ctrl-C to exit'));
axLogin(userConfig.username, userConfig.pwd); // Call main function


/**
 * Main program entry point
 * 
 * @param {string} user - username of axiomware account
 * @param {string} pwd - password of axiomware account
 */
async function axLogin(user, pwd) {
    try {
        let gwList = await gapiAsync.login({ 'user': user, 'pwd': pwd });//login
        console.log('Login success [user:' + user + ']');
        if(gwList.gwid.length>0) {
            console.log('Found ' + gwList.gwid.length + ' Gateway(s)');
            gwList.gwid.forEach(function (gw) { console.log(gw) }); // print gateway list

            let gwid = gwList.gwid[0];//Select the first gateway to connect
            gapiAsync.config({ 'gwid': gwid });  //select gateway first in the list
            await gapiAsync.open({});  //open connection to gateway
            console.log('Connection open to Netrunr gateway [' + gwid + '] success!')

            console.log('Fetching version info of [gwid:' + gwid + ']');
            let robj = await gapiAsync.version(5000);                              //Check gateway version - if gateway is not online(err), exit 
            axShutdown('Netrunr gateway [' + gwid + '] version = ' + robj.version + '\nAll Done! Exiting program...');//All done.. exit program
        }
        else {
            await axShutdown('Found no gateways - exiting (nothing to do)');
        }
    } catch (err) {
        await axShutdown('Error! Exiting... ' + JSON.stringify(err, Object.getOwnPropertyNames(err)));//Error - exit
    }
}

/**
 * Gracefully shutdown the connection and logout of the account
 * 
 * @param {string} prnStr - Print this string to console before exiting
 */
async function axShutdown(prnStr) {
    console.log(prnStr);

    if (gapiAsync.isOpen) {
        await gapiAsync.close({});//close
    }
    if (gapiAsync.isLogin) {
        await gapiAsync.logout({});//logout
    }
    process.exit();//exit the process
};
