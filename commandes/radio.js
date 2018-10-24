const Discord = require('discord.js');
const core = require("../yume_modules/core.js");
const radios = require("../data/radios.js");

module.exports = {
    run : (bot, message, command, args, config, player) => {
        if(!args[0]) return message.channel.send(core.errorMsg("No option given"));
        if(args[0] == "list"){
            var list_msg = new Discord.RichEmbed()
            .setTitle("List of radios :");
            Object.keys(radios).map(function(key, index) {
                list_msg.addField(radios[key].name, config.prefix+""+command+" "+key, true);
            });
            message.channel.send(list_msg);
        }else{
            if(!radios[args.join(" ")]) return message.channel.send(core.errorMsg("Invalid radio"));
            if(!message.member.voiceChannel) return message.channel.send(core.errorMsg("You are not in a voice channel"));
            var voiceConnection = bot.voiceConnections.find(val => val.channel.guild.id == message.guild.id);
            if(!player[message.guild.id]){
                player[message.guild.id] = {queue: [], volume: 10, radio: true}
            }else{
                player[message.guild.id].radio = true;
            }
            if(voiceConnection){
                player[message.guild.id].queue = [];
                voiceConnection.disconnect();
            }
            setTimeout(() => {
                message.member.voiceChannel.join().then(conn => {
                    let dispatcher = conn.playArbitraryInput(radios[args.join(" ")].url, {volume: parseInt(player[message.guild.id].volume)/100});
                    dispatcher.on('end', () => {
                    });
                    message.channel.send(core.successMsg("Playing : "+radios[args.join(" ")].name));
                });
            }, 2000)
        }
    }
}