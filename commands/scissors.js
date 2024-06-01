const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {

	data: new SlashCommandBuilder()
		.setName('찌')
		.setDescription('가위 이미지 불러오기'),

	async execute(interaction) {

        //https://discordjs.guide/popular-topics/embeds.html#embed-preview
        const embed = new EmbedBuilder()
        .setColor(0x8B0000) //왼쪽에 세겨지는 색상바 : dark red color
        //.setTitle("✌️")
        .setImage('https://cdn.pixabay.com/photo/2016/09/29/02/17/hand-1701984_1280.jpg')   //키워드 승리
        .setTimestamp();//작성된 날짜

        await interaction.reply({ embeds: [embed] });
	},
};