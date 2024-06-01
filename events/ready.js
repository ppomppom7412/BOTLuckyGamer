const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {

		//봇의 활동 상태 지정
		client.user.setActivity('/도움');
		console.log(`준비 완료! ${client.user.tag}`);
		
	},
};