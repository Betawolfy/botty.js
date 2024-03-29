/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Commande pour pleurer.",
	async execute (message) {

		if (message.guild.id !== "933639832255750205") return message.reply(":x: commande en cours de maintenance pour cause de plainte, veuillez réessayer plus tard. !!");

		const responses = [
			"https://i.pinimg.com/originals/b4/b1/64/b4b1640525ecadfa1030e6096f3ec842.gif",
			"https://media.tenor.com/images/7e623e17dd8c776aee5e0c3e0e9534c9/tenor.gif",
			"https://i.pinimg.com/originals/d4/96/7f/d4967fd1672fecb50f7f7c400ddef92c.gif",
			"https://media.tenor.com/images/19089cd2b4970740debff2cdfc43329a/tenor.gif",
			"https://thumbs.gfycat.com/FaroffMistyBackswimmer-size_restricted.gif",
			"https://i.pinimg.com/originals/9f/6b/7b/9f6b7bf8ba47fe7915e34b44a9db105c.gif",
			"https://lh6.googleusercontent.com/proxy/7q2CkQrw07p23Pbl5PCmKjTEE4PWboqDVzf804ki1NWyZHgy9Y0TLchsX1z2gOo0JE5OD1fBwTe3d6wtvD_RkS919T0au_sqkc4GDe3DUy7Us1Y=s0-d",
		];

		const response = responses[Math.floor(Math.random() * responses.length)];
		const preResponse = `${message.author.username} pleure...`;

		await message.channel.send({
			content: `${preResponse} ${response}`
		});
	}
};
