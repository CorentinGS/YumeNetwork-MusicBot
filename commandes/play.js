const Discord = require('discord.js');
const core = require("../yume_modules/core.js");
const ytdl = require('ytdl-core');
const search = require('youtube-search');

module.exports = {
    run : (bot, message, command, args, config, player) => {
        play = (music) => {
            if(!voiceConnection){
                var channel = message.member.voiceChannel;
            }else{
                var channel = message.guild.member(bot.user).voiceChannel;
            }
            channel.join().then(conn => {
                let dispatcher = conn.playStream(ytdl(music, {filter: 'audioonly'}), {seek: 0, volume: parseInt(player[message.guild.id].volume)/100});
                ytdl.getInfo(music, (err, info) => {
                    var title = info.title;
                    var channel = info.author.name;
                    var duration = info.length_seconds
                    var date = new Date(null);
                    date.setSeconds(duration);
                    var result = date.toISOString().substr(11, 8);
                    message.channel.send(core.successMsg("Playing : "+title+" - "+channel+" *("+result+")*"));
                    dispatcher.on('end', () => {
                        setTimeout(() => {
                            if(player[message.guild.id].queue.length < 1){
                                conn.disconnect();
                                message.channel.send(core.successMsg("All musics has been played"));
                            }else{
                                play(player[message.guild.id].queue[0]);
                                player[message.guild.id].queue.shift();
                            }
                        }, 1000);
                    })
                });
            })
        }
        if(!args[0]) return message.channel.send(core.errorMsg("No option given"));
        if(!ytdl.validateURL(args[0])){
            search(args.join(" "), {maxResults: 1, key: config.api.google, type: "video"}, function(err, results) {
                if(err) return message.channel.send(core.errorMsg("Invalid search"));
                if(results.length < 1) return message.channel.send(core.errorMsg("Invalid search"));
                args[0] = results[0].link;
            });
        }
        if(!message.member.voiceChannel) return message.channel.send(core.errorMsg("You are not in a voice channel"));
        if(!player[message.guild.id]){
            player[message.guild.id] = {queue: [], volume: 10, radio: false}
        }
        var voiceConnection = bot.voiceConnections.find(val => val.channel.guild.id == message.guild.id);
        if(!voiceConnection || player[message.guild.id].radio == true){
            setTimeout(() => {
                ytdl.getInfo(args[0], (err, info) => {
                    player[message.guild.id].radio = false;
                    if(!info) return message.channel.send(core.errorMsg("Invalid URL"));
                    message.channel.send(core.successMsg("Music started !"));
                    play(args[0]);
                });
            }, 2000);
        }else{
            setTimeout(() => {
                ytdl.getInfo(args[0], (err, info) => {
                    if(!info) return message.channel.send(core.errorMsg("Invalid URL"));
                    var title = info.title;
                    var channel = info.author.name;
                    var duration = info.length_seconds
                    var date = new Date(null);
                    date.setSeconds(duration);
                    var result = date.toISOString().substr(11, 8);
                    message.channel.send(core.successMsg("Music added to queue : "+title+" - "+channel+" *("+result+")*"));
                    player[message.guild.id].queue.push(args[0]);
                });
            }, 2000);
        }
    }
}