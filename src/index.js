var Alexa = require('alexa-sdk');
var handlers = require('./handlers');

exports.handler = function(event, context, callback){
	var alexa = Alexa.handler(event, context);
	alexa.appId = "amzn1.ask.skill.3228154f-46d4-498f-841d-09e8830ba2b0";
	alexa.registerHandlers(handlers);
	alexa.execute();
};