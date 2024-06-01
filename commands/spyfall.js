const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const Sequelize = require('sequelize');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('스파이폴')
		.setDescription('키워드가 다른 사람을 찾으세요.')

        .addSubcommand(subcommand => subcommand
            .setName('설명')
            .setDescription('하는 법 알려주기'))

        .addSubcommand(subcommand => subcommand
            .setName('시작')
            .setDescription('아무 시드의 따른 역할 획득'))

        .addSubcommand(subcommand => subcommand
            .setName('공개')
            .setDescription('자신의 역할 공개'))
    ,   // (,) << async execute(interaction) 연결을 위함

	async execute(interaction) {

        const infoembed = new EmbedBuilder()
        .setTitle(`스파이폴 설명서`)
        .addFields(
            {name : '배경', value : `당신은 어느 장소에 각자의 역할을 가지고 있습니다.\n그러나 이 곳엔 스파이가 존재합니다. \n스파이는 당신이 있는 장소를 알아내고 당신을 스파이를 찾아내야합니다.`},
            {name : '룰', value : `릴레이 1대1의 질문을 통해 추리하세요.\n정해진 시간 안에 질문을 끝마치세요.\n각자의 역할에 맞게 대화하세요.`},
            {name : '주의사항', value : '질문 했던 사람은 곧바로 자신에게 물었던 사람에게 질문 할 수 없습니다.'},
            {name : '커맨드 사용법', value : '1. [참가]를 하여 리스트에 자신을 추가하기 \n2. [시작]하여 시간 초 및 역할부여 받기 \n3. [공개]를 통해 스파이 확인하기'},
        );

        const spyembed = new EmbedBuilder()
        .setColor(0x800000) //색상바 : 스파이는 빨강
        .setTitle(`당신은 스파이 입니다.`)
        .addFields(
            {name : '장소를', value : `찾아봅시다.`}
        )        
        .setTimestamp();//작성된 날짜

        const emplembed = new EmbedBuilder()
        .setColor(0x0000CD) //색상바 : 일반은 파랑
        .setTitle(`당신은 ${role}입니다.`)
        .addFields(
            {name : '장소는', value : `${pos}입니다.`}
        )        
        .setTimestamp();

        const openembed = new EmbedBuilder()
        .setTitle(`이번 판의 결과`)
        .addFields(
            {name : '장소는', value : `${pos}입니다.`},
            {name : '스파이는', value : `${target}입니다.`}
        )        
        .setTimestamp();

        //서브 커맨드에 따른 출력 설정
        if (interaction.options.getSubcommand() === '설명') {
            await interaction.reply({ embeds: [infoEmbed], ephemeral: true });
        }
        else if (interaction.options.getSubcommand() === '시작') {

            Sequelize.create

            //스파이라면
            await interaction.reply({ embeds: [spyembed], ephemeral: true });
            //아니라면
            await interaction.reply({ embeds: [emplembed], ephemeral: true });
        }
        else if (interaction.options.getSubcommand() === '공개') {
            await interaction.reply({ embeds: [openembed] });
        }
        else
            // //나만 보이는 대답 설정
		    await interaction.reply({ content:'옳바르지 않은 대답이 응답되었습니다.', ephemeral: true });
	},
};