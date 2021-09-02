module.exports = {
  name: 'lock',
  description: 'bloquer un channel',
  execute(message, args) {
    message.channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: false, SEND_MESSAGES: false });
        message.channel.send("Successfully locked **${message.channel.name}**")
  }
  //fin de execute
  
  
};
  //fin de module.exports
