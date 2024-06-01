//messages/hello.js
exports.name = "hello";

module.exports.run = async (client, message, args) => {
    await client.reply({content: "어서오세요.", ephemeral: true});
};