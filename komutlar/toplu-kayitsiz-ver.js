//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const db = require('quick.db')
const ayarlar = require('../ayarlar');

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

exports.run = async (client, message, args) => {

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

function gonder(mesaj) {
  mkanal.send(discow.setDescription(mesaj)).then(x => x.delete({ timeout: 15000 }))
}

function hata(mesaj) {
  mkanal.send(discow.setDescription(`${dikkat} ${mesaj} ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

    //if(!botayar.sahipler.includes(msahip.id)) return hata(`**Bu Komutu Sadece \`Sahibim\` Kullanabilir.**`)
    //if(!muye.roles.cache.get(roller.yetkilistaff) && !muye.hasPermission("ADMINISTRATOR") && !botayar.sahipler.includes(msahip.id)) return hata(`**Bu Komutu Sadece \`Yetkililer\` Kullanabilir.**`)
      if(!muye.hasPermission("ADMINISTRATOR") && !botayar.sahipler.includes(msahip.id)) return hata(`**Bu Komutu Sadece \`Yöneticiler\` Kullanabilir.**`)

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

gonder(`**Şu Kişilere Kayıtsız Rolü Verilecek :\n${message.guild.members.cache.filter(x => !x.hasPermission("ADMINISTRATOR") && (x.roles.cache.size.toString() <= 1) && !x.roles.cache.get(roller.erkek3) && !x.roles.cache.get(roller.kiz3) && !x.roles.cache.get(roller.kayitsizv)).map(x => `${x}`).join("\n")}**`)
message.guild.members.cache.filter(x => !x.hasPermission("ADMINISTRATOR") && (x.roles.cache.size.toString() <= 1) && !x.roles.cache.get(roller.erkek3) && !x.roles.cache.get(roller.kiz3) && !x.roles.cache.get(roller.kayitsiz)).forEach(async x => {
await x.roles.add(roller.kayitsiz)
await x.setNickname(botconfig.tag+" İsim | Yaş")
})
 
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

}
exports.conf = {
  aliases: ['rolsüzver', 'rolsüz-ver', 'rolsüz', 'rolsuz', 'rolsuz-ver', 'rolsuzver'],
};
  
exports.help = {
  name: 'Senkronizee2 Komutu',
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------