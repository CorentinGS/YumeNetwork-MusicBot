module.exports.run = (bot, config) => {
    console.log("Connected !")
    console.log("Username: "+bot.user.username)
    console.log("ID: "+bot.user.id)
    var desc = 0;
    var max_desc = parseInt(config.description.length)-1;
    
    setInterval(async () => {
        if(desc > max_desc){
            desc = 0;
        }
        bot.user.setPresence({game:{name:config.description[desc]}});
        desc ++;
    }, 15*1000);
}