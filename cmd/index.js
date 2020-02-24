/**
 * Input prompt example
 */

'use strict';
var inquirer = require('inquirer');
var chalkPipe = require('chalk-pipe');

var questions = [{
        type: 'input',
        name: 'title',
        message: "微信小程序标题"
    },
    {
        type: 'input',
        name: 'appid',
        message: "微信小程序appid"
    },
    {
        type: 'input',
        name: 'appsecret',
        message: "微信小程序appsecret"
    },
    {
        type: 'input',
        name: 'cloudenv',
        message: "微信云开发环境名称"
    },
    {
        type: 'input',
        name: 'wxpay_appid',
        message: "微信支付appid(选填)"
    },
    {
        type: 'input',
        name: 'wxpay_mch_id',
        message: "微信支付商户号(选填)"
    },
    {
        type: 'input',
        name: 'wxpay_notify_url',
        message: "微信支付回调地址(选填)"
    },
    {
        type: 'input',
        name: 'wxpay_key',
        message: "微信支付Key(选填)"
    },
    // {
    //     type: 'input',
    //     name: 'phone',
    //     message: "What's your phone number",
    //     validate: function (value) {
    //         var pass = value.match(
    //             /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
    //         );
    //         if (pass) {
    //             return true;
    //         }

    //         return 'Please enter a valid phone number';
    //     }
    // }
];

inquirer.prompt(questions).then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
});