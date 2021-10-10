//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const db = require('quick.db')
const ayarlar = require('../ayarlar');
const client = global.visteria

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

module.exports = async (eski, yeni) => {

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const botayar = ayarlar.bot
const kanallar = ayarlar.kanallar
const roller = ayarlar.roller
const botconfig = ayarlar.config
const prefix = botconfig.prefix
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${botconfig.footer}`, yeni.avatarURL({ dynamic: true, size: 2048 })).setTimestamp()
const dikkat = client.emojis.cache.get(ayarlar.emojiler.discow_carpi)
const tik = client.emojis.cache.get(ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.get(ayarlar.emojiler.discow_ok)

const rgun = moment(new Date().toISOString()).format('DD')
const ray = moment(new Date().toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const ryıl = moment(new Date().toISOString()).format('YYYY')
const rsaat = moment(new Date().toISOString()).format('HH:mm:ss')
const rcre = `${rgun} ${ray} ${ryıl} | ${rsaat}` 

console.log(`Bir Kullanıcı Update Yaptı | ${yeni.tag} / ${eski.tag} | ${yeni.id}`)

const uye = client.guilds.cache.get(botconfig.botswid).members.cache.get(yeni.id)

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

if(yeni.username.includes(botconfig.tag) && !uye.roles.cache.get(roller.tagli)) {
  await client.channels.cache.get(kanallar.taglilog).send(discow.setTitle(`${client.guilds.cache.get(ayarlar.config.botswid).name}`).setDescription(`${ok} **${yeni}, Tagımızı Aldı Ve** **\`Taglı\`** **Rolüne Sahip Oldu.** ${tik}`))
  await uye.roles.add(roller.tagli);
  await uye.setNickname((uye.displayName).replace(botconfig.tagg, botconfig.tag))
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

if(!yeni.username.includes(botconfig.tag) && uye.roles.cache.get(roller.tagli)) {
  await client.channels.cache.get(kanallar.taglilog).send(discow.setTitle(`${client.guilds.cache.get(ayarlar.config.botswid).name}`).setDescription(`${ok} **${yeni}, Tagımızı Çıkardı Ve** **\`Taglı\`** **Rolü Kendisinden Alındı.** ${tik}`))
  await uye.roles.remove(roller.tagli);
  await uye.setNickname((uye.displayName).replace(botconfig.tag, botconfig.tagg))
}

}
module.exports.conf = {
  name: "userUpdate"
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------