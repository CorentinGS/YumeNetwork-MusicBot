const Discord = require('discord.js');
const core = require("../yume_modules/core.js");
const ytdl = require('ytdl-core');
const search = require('youtube-search');

module.exports = {
    run : (bot, message, command, args, config, player) => {
        if(!message.member.voiceChannel) return message.channel.send(core.errorMsg("You are not in a voice channel"));
        const voiceConnection = bot.voiceConnections.find(val => val.channel.guild.id == message.guild.id);
        if(!voiceConnection) return message.channel.send(core.errorMsg("It does not play music"));
        if(!args[0]) return message.channel.send(core.errorMsg("No option given"));
        if(isNaN(args[0])) return message.channel.send(core.errorMsg("Option must be a number"));
        if(parseInt(args[0]) < 0 || parseInt(args[0]) > 100)  return message.channel.send(core.errorMsg("Invalid option *(Under 0 and 100)*"));
        const dispatcher = voiceConnection.player.dispatcher;
        player[message.guild.id].volume = parseInt(args[0]);
        dispatcher.setVolume(parseInt(args[0])/100);
    }
}