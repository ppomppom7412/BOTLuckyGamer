const { SlashCommandBuilder , EmbedBuilder } = require('discord.js');
const { cypherAppKey } = require('../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('샆')
		.setDescription('플레이어 검색')
		.addStringOption((Option)=>Option.setName("닉네임")
			.setDescription("플레이어의 닉네임")
			.setRequired(true)),
	async execute(interaction) {
		const nickname = interaction.options.getString("닉네임");
		//                          https://api.neople.co.kr/cy/players?nickname=  &wordType=  &apikey=  
        let nickdata = await fetch(`https://api.neople.co.kr/cy/players?nickname=${nickname}&wordType=match&apikey=${cypherAppKey}`);
        let playdata = await nickdata.json();
		console.log(`플레이어ID : ${playdata.rows[0].playerId}`);

		if (playdata.rows[0]===""){
				await interaction.reply(`${nickname}님은 확인할 수 없습니다.`);
		}
		else{
			//플레이어 데이터 확인
			//                        https://api.neople.co.kr/cy/players/   ?apikey=   
			let iddata = await fetch(`https://api.neople.co.kr/cy/players/${playdata.rows[0].playerId}?apikey=${cypherAppKey}`);
			let userdata = await iddata.json();

			if (userdata.tierName === null)
				userdata.tierName = "-";
			
			const playerEmbed = new EmbedBuilder()
			.setColor(0xFF0000) //red color
			.setTitle(`[플레이어 검색 정보]`)
			.setURL(`https://cyphers.nexon.com/game/record/search/1/${nickname}/1`)
			.addFields(
				{name : `${nickname}`, value : `${userdata.grade}급`, inline: true},
				{name : '티어', value : `${userdata.tierName}`, inline: true},
				{name : ' ', value : ` `},
				{name : '소속 클랜', value : `${userdata.clanName}`, inline: true},
				{name : '대표 캐릭터', value : `${userdata.represent.characterName}`, inline: true}
			) 
			.addFields(
				{name : ' ', value : ` `},
				{name: '최근 전적', value: ' ' },
				{name : ' ', value : `공식전 : 승 ${userdata.records[0].winCount} / 패 ${userdata.records[0].loseCount} / 중단 ${userdata.records[0].stopCount}`},
				{name : ' ', value : `일반전 : 승 ${userdata.records[1].winCount} / 패 ${userdata.records[1].loseCount} / 중단 ${userdata.records[1].stopCount}`}
			) 
			.setThumbnail(`https://img-api.neople.co.kr/cy/characters/${userdata.represent.characterId}?zoom=3`);

			await interaction.reply({ embeds: [playerEmbed] });
		}
    },
};