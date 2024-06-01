const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('주사위')
		.setDescription('1~99까지의 주사위 값을 랜덤으로 출력')
		.addIntegerOption((Option)=>Option.setName("최대값")
			.setDescription("주사위의 최대값을 입력하세요. (2 ~ 99999)")
			.setRequired(false))
		,
	async execute(interaction) {
		const maxvalue = interaction.options.getInteger("최대값");

		if (maxvalue < 2)
			maxvalue = 99;
		else if (maxvalue > 99999)
			maxvalue = 99999;

        const dice = Math.floor(Math.random() * (maxvalue-1)) +1; //1~99

		await interaction.reply(`${interaction.user.username} 님이 주사위를 굴려 🎲${dice}가 나왔습니다.`);
    },
};