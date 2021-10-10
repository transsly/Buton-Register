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

const kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  
const secim = args[1]

        if(secim === "sifirla") {
        if(!message.member.hasPermission("ADMINISTRATOR") && !botayar.sahipler.includes(message.author.id)) return;
    gonder(`${ok} **${kullanıcı} Kullanıcısının Kayıt Verisi Başarıyla Temizlendi.** ${tik}`)
    db.delete("Kayit_Toplam&"+kullanıcı.id)
    db.delete("Kayit_Erkek&"+kullanıcı.id)
    db.delete("Kayit_Kiz&"+kullanıcı.id)
    db.delete("Kayit_İsim&"+kullanıcı.id)
    db.delete("Kayit_Kayitsiz&"+kullanıcı.id)
}

let toplam = `${ok} **Toplam Kayıt Sayısı :** **\`${db.get("Kayit_Toplam&"+kullanıcı.id) ? db.get("Kayit_Toplam&"+kullanıcı.id) : "0"} Adet\`**`
let erkek = `${ok} **Toplam Erkek Kayıt Sayısı :** **\`${db.get("Kayit_Erkek&"+kullanıcı.id) ? db.get("Kayit_Erkek&"+kullanıcı.id) : "0"} Adet\`**`
let kiz = `${ok} **Toplam Kız Kayıt Sayısı :** **\`${db.get("Kayit_Kiz&"+kullanıcı.id) ? db.get("Kayit_Kiz&"+kullanıcı.id) : "0"} Adet\`**`
let isim = `${ok} **Toplam İsim Değiştirme Sayısı :** **\`${db.get("Kayit_İsim&"+kullanıcı.id) ? db.get("Kayit_İsim&"+kullanıcı.id) : "0"} Adet\`**`
let unreg = `${ok} **Toplam Kayıtsız Verme Sayısı :** **\`${db.get("Kayit_Kayitsiz&"+kullanıcı.id) ? db.get("Kayit_Kayitsiz&"+kullanıcı.id) : "0"} Adet\`**`

    gonder(`${ok} **${kullanıcı} Kullanıcısının Kayıt Verisi :**
${toplam}
${erkek}
${kiz}
${isim}
${unreg}`)

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

}
exports.conf = {
  aliases: ['stat', 'me', 'kayitlarim', 'puanım', 'puanim'],
};
  
exports.help = {
  name: 'Stat Komutu',
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------