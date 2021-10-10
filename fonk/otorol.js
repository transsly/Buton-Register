//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const db = require('quick.db')
const ayarlar = require('../ayarlar');
const client = global.visteria

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

module.exports = async (member) => {

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const botayar = ayarlar.bot
const kanallar = ayarlar.kanallar
const roller = ayarlar.roller
const botconfig = ayarlar.config
const prefix = botconfig.prefix
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${botconfig.footer}`, member.user.avatarURL({ dynamic: true, size: 2048 })).setTimestamp()
const dikkat = client.emojis.cache.get(ayarlar.emojiler.discow_carpi)
const tik = client.emojis.cache.get(ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.get(ayarlar.emojiler.discow_ok)
const msunucu = member.guild
const muye = member.guild.members.cache.get(member.id)
const msahip = member

const discow000 = client.emojis.cache.get(ayarlar.emojiler.discow000)
const discow001 = client.emojis.cache.get(ayarlar.emojiler.discow001)
const discow002 = client.emojis.cache.get(ayarlar.emojiler.discow002)
const discow003 = client.emojis.cache.get(ayarlar.emojiler.discow003)
const discow004 = client.emojis.cache.get(ayarlar.emojiler.discow004)
const discow005 = client.emojis.cache.get(ayarlar.emojiler.discow005)
const discow006 = client.emojis.cache.get(ayarlar.emojiler.discow006)
const discow007 = client.emojis.cache.get(ayarlar.emojiler.discow007)
const discow008 = client.emojis.cache.get(ayarlar.emojiler.discow008)
const discow009 = client.emojis.cache.get(ayarlar.emojiler.discow009)

if(member.guild.id != botconfig.botswid) return;

var uyesayi = member.guild.memberCount.toString().replace(/ /g, "    ")
var us = uyesayi.match(/([0-9])/g)
  uyesayi = uyesayi.replace(/([a-zA-Z])/g, "Bilinmiyor").toLowerCase()
    if(us) {
  uyesayi = uyesayi.replace(/([0-9])/g, d => {
return {
  '0': `${discow000}`,
  '1': `${discow001}`,
  '2': `${discow002}`,
  '3': `${discow003}`,
  '4': `${discow004}`,                       
  '5': `${discow005}`,
  '6': `${discow006}`,
  '7': `${discow007}`,
  '8': `${discow008}`,
  '9': `${discow009}`
}[d];
})}

const rgun = moment(new Date().toISOString()).format('DD')
const ray = moment(new Date().toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const ryıl = moment(new Date().toISOString()).format('YYYY')
const rsaat = moment(new Date().toISOString()).format('HH:mm:ss')
const rcre = `${rgun} ${ray} ${ryıl} | ${rsaat}` 

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const kurulus = new Date().getTime() - member.user.createdAt.getTime();  
const gecen = moment.duration(kurulus).format(`YY [Yıl,] DD [Gün,] HH [Saat,] mm [Dakika,] ss [Saniye]`) 

var kontrol;
if (kurulus > 1296000000) {
    await member.roles.add(roller.kayitsiz);
    await member.setNickname(`${botconfig.tag} İsim | Yaş`);
      if(member.user.username.includes(botconfig.tag)) {
    await client.channels.cache.get(kanallar.taglilog).send(discow.setTitle(`${client.guilds.cache.get(ayarlar.config.botswid).name}`).setDescription(`${ok} **${member}, Aramıza** **\`Taglı\`** **Şekilde Katıldı.** ${tik}`))
    await member.roles.add(roller.tagli);
}
    await client.channels.cache.get(kanallar.otorollog).send(discow.setTitle(`${client.guilds.cache.get(ayarlar.config.botswid).name}`).setDescription(`${ok} **${member} Aramıza Katıldı.**
**Sunucuda Toplam** ${uyesayi} **Kişi Bulunuyor.** ${tik}`))
} else {
    await member.roles.set(roller.cezali);
    await member.setNickname(`Şüpheli Hesap`);
        if(member.user.username.includes(botconfig.tag)) {
    await client.channels.cache.get(kanallar.taglilog).send(discow.setTitle(`${client.guilds.cache.get(ayarlar.config.botswid).name}`).setDescription(`${ok} **${member}, Aramıza** **\`Taglı\`** **Şekilde Katıldı.** ${tik}`))
    await member.roles.add(roller.tagli);
}
    await client.channels.cache.get(kanallar.otorollog).send(discow.setTitle(`${client.guilds.cache.get(ayarlar.config.botswid).name}`).setDescription(`${ok} **${member} Aramıza Katıldı.**
**Sunucuda Toplam** ${uyesayi} **Kişi Bulunuyor.** ${tik}`))
}
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

}
module.exports.conf = {
  name: "guildMemberAdd"
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------