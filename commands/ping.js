//commands/pong.js
const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping') 
		.setDescription('핑하면 퐁하고 우는 대답'),
	async execute(interaction) {
		await interaction.deferReply({ephemeral: true});	
		await wait(2_000);
		await interaction.editReply('Ping');
		await wait(2_000);
		await interaction.followUp('Pong');
	},
};