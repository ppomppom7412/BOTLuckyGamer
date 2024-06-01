const { Events } = require('discord.js');
const prefix = '%';

module.exports = {
    name: Events.MessageCreate,
	async execute(interaction) {
		if(interaction.author.bot) return; //다른 봇이면 제외
        if(interaction.channel.type === "dm") return; //dm이면 제외

		console.log(`MessageCreate : ${interaction.content}`);

        //시작하는 코드가 동일한지 확인하고 다르면 제외
        if (!interaction.content.startsWith(prefix)) return; 

        let args = interaction.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();
        
        const message = interaction.client.messages.get(cmd);

        if (!message){
            console.error(`No message matching ${cmd} was found.`);
			return;
        }

        message.run(interaction, interaction.content, args);
	},
};