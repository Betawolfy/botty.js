module.exports = {
  data: {
    name: "ping",
    description: "Donne la latence du serveur."
  },
  async execute (message, args) {
    message.channel.send({
      content: "Pong !"
    });
  }
};
