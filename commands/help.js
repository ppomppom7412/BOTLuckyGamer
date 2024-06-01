const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {

	data: new SlashCommandBuilder()
		.setName('도움')
		.setDescription('명령어 리스트 표기'),

        //서브 커맨드에 대한 가이드 : https://discordjs.guide/slash-commands/advanced-creation.html#subcommands
        // // 추가 커맨드 설정하기 (단독형)
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('추가 정보')
        //         .setDescription('해당 커맨드가 할 수 있는 종류 알려주기')),   // (,) << async execute(interaction) 연결을 위함

	async execute(interaction) {

        //임배드에 대한 가이드 : https://discordjs.guide/popular-topics/embeds.html#embed-preview
        const HelpEmbed = new EmbedBuilder()
        .setColor(0xFFD700) //왼쪽에 세겨지는 색상바 : gold color
        .setTitle("[명령어 목록]")//가장 위에 큰 글씨로 표기
        .addFields(
            {name : '`[ /묵 ]` `[ /찌 ]` `[ /빠 ]`', value : '관련된 이미지를 불러와줍니다.'},
            {name : '`[ /주사위 ]`', value : '1~99사이의 숫자를 랜덤으로 불러옵니다.'},
            {name : '`[ /스파이폴 ]`', value : '[개발중]\n이 장소에 없는 스파이를 찾는 게임'}
        )        
        .setTimestamp();//작성된 날짜

        // //서브 커맨드에 따른 출력 설정
        // if (interaction.options.getSubcommand() === 'info') {
        //     await interaction.reply({ embeds: [infoEmbed] });
        // }

        //대답에 따른 가이드 : https://discordjs.guide/slash-commands/response-methods.html#ephemeral-responses
        
        // //나만 보이는 대답 설정
        //await interaction.reply({ content: 'Only you!', ephemeral: true });
		await interaction.reply({ embeds: [HelpEmbed] });

        // //요청한 대답에 대한 대답 용도
        //await interaction.followUp('Pong again!');//후속
	},
};