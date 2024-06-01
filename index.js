const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

const msg = require('./messages/hello.js');

//디스코드에 접속 시켜줄 클라이언트 생성
const client = new Client({ intents: [
	GatewayIntentBits.GuildMessages, 
	GatewayIntentBits.MessageContent, 
	GatewayIntentBits.Guilds] 
});

//커맨드 등록
client.commands = new Collection();

//커맨드 변경 후엔 deploy-commands.js를 통해 변경
// cmd 창에 입력하기 node deploy-commands.js
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

//이벤트 등록
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//메세지 등록
client.messages = new Collection();

const messagesPath = path.join(__dirname, 'messages');
const messagesFiles = fs.readdirSync(messagesPath).filter(file => file.endsWith('.js'));

for (const file of messagesFiles) {
	const filePath = path.join(messagesPath, file);
	const message = require(filePath);
	client.messages.set(message.name, message);
}

client.login(config.token);

//서버 종료 용도 : 이것만큼 잘 멈춰주는게 없음
//process.exit();