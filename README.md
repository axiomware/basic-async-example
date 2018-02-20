# basic-async-example
Basic Nodejs example of using [Axiomware's](http://www.axiomware.com) [netrunr-gapi-async](https://github.com/axiomware/netrunr-gapi-async-js) Javascript SDK

Program to illustrate Netrunr API functions. The program will perform the following functions: 1) connect to your account, 2) list all gateways associated with this account, 3) connect to the first gateway in the list, 4) open a network connection, 5) get version information from the gateway, and 6) exit program by closing connections and loging out of your account.

**This example uses promises and async/await functionality present in Nodejs version 8.+**.

## SDK, Documentation and examples
- [Netrunr B24C API Documentation](http://www.axiomware.com/apidocs/index.html)
- [Netrunr-gapi SDK](https://github.com/axiomware/netrunr-gapi-js)
  - [List of Netrunr-gapi examples](https://github.com/axiomware/list-of-examples-netrunr-gapi)
- [Netrunr-gapi-async SDK](https://github.com/axiomware/netrunr-gapi-async-js)
  - [List of Netrunr-gapi-async examples](https://github.com/axiomware/list-of-examples-netrunr-gapi-async)


## Requirements

- [Netrunr B24C](http://www.axiomware.com/netrunr-b24c-product.html) gateway
- Axiomware cloud account. See the Netrunr [quick start guide](http://www.axiomware.com/page-netrunr-b24c-qs-guide.html) on creating an account.
- Nodejs (see [https://nodejs.org/en/](https://nodejs.org/en/) for download and installation instructions)
  - Nodejs version 8.x.x is required due to the use of promises/async/await
- NPM (Node package manager - part of Nodejs)   
- Windows, MacOS or Linux computer with access to internet

## Installation

Clone the repo

`git clone https://github.com/axiomware/basic-async-example.git`

or download as zip file to a local directory and unzip.

Install all module dependencies by running the following command inside the directory

  `npm install`

## Customization required before running the program
The basic version of program has no User Interface(UI) to simplify the code.  Credentials to your Axiomware account are hardcoded inside the program. Please modify the following two lines in `appLogin.js` with valid username and password:
```javascript
//User configuration
var userConfig = {           
    'username': '<ENTER-YOUR-USERNAME>', //Valid username to your Axiomware account
    'pwd': '<ENTER-YOUR-PASSWORD>' //Valid password to your Axiomware account
};
```

## Usage

Run the nodejs application:

    node appLogin.js

The program will exit after connecting to the gateway. To force exit, use:

    CTRL-C  

## Error conditions

- If the program is not able to login, check your credentials.
- If the gateway is not listed in your account, it may not have been successfully provisioned. See the Netrunr [quick start guide](http://www.axiomware.com/page-netrunr-b24c-qs-guide.html) for provisioning the gateway.
- Not able to get version information of the gateway. Check if gateway is powered ON and has access to internet. Also, check if firewall is blocking internet access.

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
