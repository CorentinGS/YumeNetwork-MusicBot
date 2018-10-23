const Discord = require("discord.js");

module.exports.titleCase = (str) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
}

module.exports.errorMsg = (message) => {
    var err = new Discord.RichEmbed()
    .setDescription(":x: Error : "+message)
    .setColor("#c0392b")
    return err;
}

module.exports.successMsg = (message) => {
    var err = new Discord.RichEmbed()
    .setDescription("✅ : "+message)
    .setColor("#27ae60")
    return err;
}

module.exports.erroriMsg = (action, error) => {
    var msg = new Discord.RichEmbed()
    .setTitle('An error was occured :')
    .addField('Action :', action)
    .addField('Error :', error)
    .addField("Solution :", "If you are a good man, send this error here : https://github.com/OnDebian/YumeNetwork-MusicBot/issues")
    .setColor('#c0392b');
    return msg;
}