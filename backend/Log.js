var Log = require("log4js");
var Utils = require("./Utils");

Log.configure({
    "replaceConsole": true,
    "appenders": process.env.DEBUG ? [{"type": "console"}] :
        [
            {
                "type": "console"
            },
            {
                "type": "logLevelFilter",
                "level": "ERROR",
                "appender": {
                    "type": "smtp",
                    "recipients": process.env.EMAIL,
                    "sender": process.env.EMAIL,
                    "sendInterval": process.env.LOG_EMAIL_INTERVAL || 30,
                    "transport": "SMTP",
                    "SMTP": Utils.getEmailConfig()
                }
            }
        ]
});

module.exports = Log.getLogger();

