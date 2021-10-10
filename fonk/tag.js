//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const db = require('quick.db')
const ayarlar = require('../ayarlar');
const client = global.visteria

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

module.exports = async (message) => {

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const botayar = ayarlar.bot
const kanallar = ayarlar.kanallar
const roller = ayarlar.roller
const botconfig = ayarlar.config
const prefix = botconfig.prefix
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${botconfig.footer}`, message.author.avatarURL({ dynamic: true, size: 2048 })).setTimestamp()
const dikkat = client.emojis.cache.get(ayarlar.emojiler.discow_carpi)
const tik = client.emojis.cache.get(ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.get(ayarlar.emojiler.discow_ok)
const msunucu = message.guild
const muye = message.member
const msahip = message.author
const mkanal = message.channel

const rgun = moment(new Date().toISOString()).format('DD')
const ray = moment(new Date().toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const ryıl = moment(new Date().toISOString()).format('YYYY')
const rsaat = moment(new Date().toISOString()).format('HH:mm:ss')
const rcre = `${rgun} ${ray} ${ryıl} | ${rsaat}` 

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

if(message.author.bot) return;
if(!message.guild) return;

if(message.content.toLowerCase() === "tag") {
    mkanal.send(`**\`${botconfig.tag}\`**`)
}

if(message.content.toLowerCase() === "!tag") {
    mkanal.send(`**\`${botconfig.tag}\`**`)
}

if(message.content.toLowerCase() === "+tag") {
    mkanal.send(`**\`${botconfig.tag}\`**`)
}

if(message.content.toLowerCase() === "-tag") {
    mkanal.send(`**\`${botconfig.tag}\`**`)
}

if(message.content.toLowerCase() === "/tag") {
    mkanal.send(`**\`${botconfig.tag}\`**`)
}

if(message.content.toLowerCase() === "*tag") {
    mkanal.send(`**\`${botconfig.tag}\`**`)
}

if(message.content.toLowerCase() === "%tag") {
    mkanal.send(`**\`${botconfig.tag}\`**`)
}

if(message.content.toLowerCase() === "&tag") {
    mkanal.send(`**\`${botconfig.tag}\`**`)
}

if(message.content.toLowerCase() === "?tag") {
    mkanal.send(`**\`${botconfig.tag}\`**`)
}

if(message.content.toLowerCase() === "<tag") {
    mkanal.send(`**\`${botconfig.tag}\`**`)
}

if(message.content.toLowerCase() === ">tag") {
    mkanal.send(`**\`${botconfig.tag}\`**`)
}

if(message.content.toLowerCase() === "_tag") {
    mkanal.send(`**\`${botconfig.tag}\`**`)
}

if(message.content.toLowerCase() === ".tag") {
    mkanal.send(`**\`${botconfig.tag}\`**`)
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

}
module.exports.conf = {
  name: "message"
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------