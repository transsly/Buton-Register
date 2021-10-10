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

const kurallar = client.emojis.cache.get(ayarlar.emojiler.discow_kurallar)
const kristal = client.emojis.cache.get(ayarlar.emojiler.discow_kristal)
const yetkili = client.emojis.cache.get(ayarlar.emojiler.discow_yetkili)
const ses = client.emojis.cache.get(ayarlar.emojiler.discow_ses)

const registerchat = client.channels.cache.get(kanallar.registerchat)

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

const rcreated = member.user.createdAt
const rgun = moment(new Date(rcreated).toISOString()).format('DD')
const ray = moment(new Date(rcreated).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const ryıl = moment(new Date(rcreated).toISOString()).format('YYYY')
const rsaat = moment(new Date(rcreated).toISOString()).format('HH:mm')
const rcre = `${rgun} ${ray} ${ryıl} | ${rsaat}`  

const kurulus = new Date().getTime() - member.user.createdAt.getTime();  
const gecen = moment.duration(kurulus).format(`YY [Yıl,] DD [Gün,] HH [Saat,] mm [Dakika,] ss [Saniye]`) 

var kontrol;
  if (kurulus < 1296000000) kontrol = `**\`Güvenli Değil\`** ${dikkat}`
  if (kurulus > 1296000000) kontrol = `**\`Güvenli\`** ${tik}`

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const voiceChannels = member.guild.channels.cache.filter(c => c.type === 'voice');
let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

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

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
  
var sessayı = count.toString().replace(/ /g, "    ")
var üs2 = sessayı.match(/([0-9])/g)
  sessayı = sessayı.replace(/([a-zA-Z])/g, "Bilinmiyor").toLowerCase()
    if(üs2) {
  sessayı = sessayı.replace(/([0-9])/g, d => {
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

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

if(member.guild.id != botconfig.botswid) return;
  
const discows = new Discord.MessageEmbed()
.setColor('BLACK')
.setFooter(botconfig.footer, member.user.avatarURL({ dynamic: true }))
.setTimestamp()

    if(!member.user.bot) {

  await client.channels.cache.get(kanallar.registerchat).send(`**<@&${roller.registerstaff}> - ${member}**`, discows
.setDescription(`${ok} **${member}, Sunucumuza Hoşgeldin.**
  
${ses} **Seninle Beraber** ${uyesayi} **Kişi Olduk. / Şuanda Sunucumuzun Ses Kanallarında** ${sessayı} **Kişi Bulunmakta.**
  
${yetkili} **Kayıt Olmak İçin Sol Tarafta Bulunan <#${kanallar.welcome1}> Odasını Girip** **\`Ses Teyit\`** **Verebilirsin.**

${kristal} **Eğer Sende Ailemizden Olmak İstersen Tagımızı Alabilirsin.** **[** **\`${botconfig.tag}\`** **]**

${kurallar} **Sunucu Kurallarımız <#${kanallar.kurallar}> Kanalında Belirtilmiştir. Unutma Sunucu İçerisindeki \`Ceza İşlemlerin Kuralları Okuduğunu Varsayarak Uygulanacak\`.**

${ok} **Hesabın** **\`${gecen}\`** **Önce Oluşturulmuş.**

**——————————————————————————————————————**`)
.addField(`Hesabın Oluşturulma Tarihi :`, `**\`${rcre}\`**`, true)
.addField(`Hesap Güvenlimi :`, `${kontrol}`, true))
  
} if(member.user.bot) {

  await client.channels.cache.get(kanallar.registerchat).send(discows
.setDescription(`${ok} **Sunucuya Bir Bot Eklendi.**`)
.addField(`${ok} **Bot :**`, `**${member} / \`${member.user.username}\`**`)
.addField(`${ok} **Bot ID :**`, `\`${member.id}\``)
.addField(`Hesap Oluşturulma Tarihi :`, `**\`${rcre}\`**`, true))

  await client.channels.cache.get(kanallar.registerchat).send(`**${botayar.sahipler.map(x => `<@${x}>`).join("\n")} | <@${member.guild.owner.id}>**`)

  await member.roles.set(roller.botlar);
  
  await member.setNickname("Yeni Bot")

}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

}
module.exports.conf = {
  name: "guildMemberAdd"
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------