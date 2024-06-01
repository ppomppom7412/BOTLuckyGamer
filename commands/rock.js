const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {

	data: new SlashCommandBuilder()
		.setName('묵')
		.setDescription('주먹 이미지 불러오기'),

	async execute(interaction) {

        //https://discordjs.guide/popular-topics/embeds.html#embed-preview
        const embed = new EmbedBuilder()
        .setColor(0x00FF00) //왼쪽에 세겨지는 색상바 : lime color
        //.setTitle("✊")
        .setImage('https://cdn.pixabay.com/photo/2017/09/01/11/56/hand-2704013_1280.jpg')   //키워드 주먹
        .setTimestamp();//작성된 날짜

        await interaction.reply({ embeds: [embed] });
	},
};