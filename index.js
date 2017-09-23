var Botkit = require('botkit');
var watson = require('watson-developer-cloud');

var controller = Botkit.slackbot({
  debug: false
});

controller.spawn({
  token: 'xoxb-143995745172-i4E6InUXrpI7G4p1ZkG0yIFr', // slack API token
}).startRTM()

// bluemix creds
var conversation = watson.conversation({
  username: '755972e4-3da8-48a8-989a-0d55fc95c8b5',
  password: '4jbELozXKCjq',
  version: 'v1',
  version_date: '2017-02-03'
});

var context = {};

controller.hears('(.*)',['direct_message','direct_mention'],function(bot,message) {

  conversation.message({
    workspace_id: 'a742b97c-159b-4761-b740-98d3dc754318', // workspace id from watson
    input: {'text': message.text},
    context: context
  }, function(err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
      if (response.output.text[0]){
        bot.reply(message,response.output.text[0]);
      } else {
        bot.reply(message,'I am not smart enough yet to know what that means.');
      }
  });

});
