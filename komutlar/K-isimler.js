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
        if(!muye.roles.cache.get(roller.yetkilistaff) && !muye.hasPermission("ADMINISTRATOR") && !botayar.sahipler.includes(msahip.id)) return hata(`**Bu Komutu Sadece \`Yetkililer\` Kullanabilir.**`)
    //if(!muye.hasPermission("ADMINISTRATOR") && !botayar.sahipler.includes(msahip.id)) return hata(`**Bu Komutu Sadece \`Yöneticiler\` Kullanabilir.**`)

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!kullanıcı) return hata(`**Lütfen Bir** **\`Kullanıcı\`** **Belirt.**`)
  
const secim = args[1]

if(secim === "sifirla") {
  if(!message.member.hasPermission("ADMINISTRATOR") && !botayar.sahipler.includes(message.author.id)) return;
  gonder(`${ok} **${kullanıcı} Kullanıcısının İsim Geçmişi Başarıyla Temizlendi.** ${tik}`)
  db.delete("İsimler&"+kullanıcı.id)
}

let isis = ``

var sayi = 1

if(db.get("İsimler&"+kullanıcı.id)) isis = `${db.get("İsimler&"+kullanıcı.id).map(x => `**\`${sayi++}\`. [\`${x.isim}\`] / [\`${x.cinsiyet}\`] / [${x.yetkili}] / [\`${x.tarih}\`]**`).join("\n")}`
if(db.get("İsimler&"+kullanıcı.id) === undefined) isis = `**\`\`\`Bulunamadı!\`\`\`**`
if(db.get("İsimler&"+kullanıcı.id) === null) isis = `**\`\`\`Bulunamadı!\`\`\`**`
if(!db.get("İsimler&"+kullanıcı.id)) isis = `**\`\`\`Bulunamadı!\`\`\`**`
if(db.get("İsimler&"+kullanıcı.id) === 0) isis = `**\`\`\`Bulunamadı!\`\`\`**`

gonder(`${ok} **${kullanıcı} Kullanıcısının İsim Geçmişi :**
${isis}`)

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

}
exports.conf = {
  aliases: ['isimler', 'nicknames', 'gecmis', 'gecmiş', 'geçmiş', 'geçmis'],
};
  
exports.help = {
  name: 'İsimler Komutu',
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------