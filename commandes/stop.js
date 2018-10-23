const Discord = require('discord.js');
const core = require("../yume_modules/core.js");
const ytdl = require('ytdl-core');
const search = require('youtube-search');

module.exports = {
    run : (bot, message, command, args, config, player) => {
        if(!message.member.voiceChannel) return message.channel.send(core.errorMsg("You are not in a voice channel"));
        const voiceConnection = bot.voiceConnections.find(val => val.channel.guild.id == message.guild.id);
        if(!voiceConnection) return message.channel.send(core.errorMsg("It does not play music"));
        player[message.guild.id].queue = [];
        voiceConnection.disconnect();
    }
}