'use strict'

var Alexa = require('alexa-sdk');
var http = require('http');

var instructionSpeech = "To use this skill, please say a number."
var handlers = {
	"LaunchRequest": function(){
		this.emit(':ask', "Welcome to Number Facts. " + instructionSpeech);
	},
	"RandomFactIntent": function(){
		var number = parseInt(this.event.request.intent.slots.Number.value);
		if(number){
			var self = this;
			http.get("http://numbersapi.com/" + number,  function(res){
				if(res.statusCode !== 200){
					self.emit('Unhandled');
				} else {
					res.on('data', (d) => {
						self.emit(":ask", d + ". Please say another number.");
				  	});
				}
			}).on('error', function(e){
				self.emit('Unhandled');
			});	
		} else {
			this.emit('Unhandled');
		}
	},
	"AMAZON.HelpIntent": function(){
		this.emit(':ask', instructionSpeech);
	},
	"AMAZON.StopIntent": function(){
		this.emit('AMAZON.CancelIntent');
	},
	"AMAZON.CancelIntent": function(){
		this.emit(':tell', "Thank you for using Number Facts");
	},
	"Unhandled": function(){
		var speech = "Sorry, I could not understand. Please say a number.";
		this.response.speak(speech).listen(speech);
		this.emit(':responseReady');
	}
};

module.exports = handlers;