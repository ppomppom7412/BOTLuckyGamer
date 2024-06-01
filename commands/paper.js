const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {

	data: new SlashCommandBuilder()
		.setName('빠')
		.setDescription('보 이미지 불러오기'),

	async execute(interaction) {

        //https://discordjs.guide/popular-topics/embeds.html#embed-preview
        const embed = new EmbedBuilder()
        .setColor(0x4169E1) //왼쪽에 세겨지는 색상바 : royal blue color
        //.setTitle("✋")
        .setImage('https://cdn.pixabay.com/photo/2016/09/29/02/16/hand-1701979_1280.jpg')   //키워드 손금..? 
        .setTimestamp();//작성된 날짜

        await interaction.reply({ embeds: [embed] });
	},
};