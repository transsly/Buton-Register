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

    if(!botayar.sahipler.includes(msahip.id)) return hata(`**Bu Komutu Sadece \`Sahibim\` Kullanabilir.**`)
    //if(!muye.roles.cache.get(roller.yetkilistaff) && !muye.hasPermission("ADMINISTRATOR") && !botayar.sahipler.includes(msahip.id)) return hata(`**Bu Komutu Sadece \`Yetkililer\` Kullanabilir.**`)
    //if(!muye.hasPermission("ADMINISTRATOR") && !botayar.sahipler.includes(msahip.id)) return hata(`**Bu Komutu Sadece \`Yöneticiler\` Kullanabilir.**`)

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

    if(!args[0]) return yardimm(discow.setDescription(`${dikkat} **Lütfen Yapmak İstediğin İşlemi Belirt.** ${dikkat}

${ok} **Normal Eval :** **\`${ayarlar.bot.prefix}eval normal <kod>\`**
${ok} **Text Eval :** **\`${ayarlar.bot.prefix}eval text <kod>\`**`))

    if(args[0].toLowerCase() === "normal") {

const kod = args.slice(1).join(" ");
    if(!kod) return dikkatm(`**Lütfen Bir Kod Belirt.**`)

  try {
    if (kod.includes(client.token)) return dikkatm(`**Sen Bir Orospu Çocuğusun**`)
  eval(kod)
} catch(err) {
  gonderembedm(`${dikkat} **Denediğin Kodda Bir Hata Oluştu. ${dikkat}\n\n${ok} Hata :\n\`\`\`js\n${err}\`\`\`**`)
}
}

    if(args[0].toLowerCase() === "text") {

const kod = args.slice(1).join(" ");
    if(!kod) return dikkatm(`**Lütfen Bir Kod Belirt.**`)

  try {
var result = clean(await eval(kod));
    if (result.includes(client.token)) return dikkatm(`**Sen Bir Orospu Çocuğusun**`)
  message.channel.send(result, { code: "js", split: true });
} catch (err) {
  message.channel.send(err, { code: "js", split: true });
}

function clean(text) {
    if (typeof text !== "string")
  text = require("util").inspect(text, { depth: 0 });
  text = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  return text;
}
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

function gonderm(mesaj) {
  mkanal.send(mesaj).then(x => x.delete({ timeout: 15000 }))
}

function dikkatm(mesaj) {
  mkanal.send(discow.setDescription(`${dikkat} ${mesaj} ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))
}

function gonderembedm(mesaj) {
  mkanal.send(discow.setDescription(mesaj)).then(x => x.delete({ timeout: 15000 }))
}

function yardimm(mesaj) {
  mkanal.send(mesaj).then(x => x.delete({ timeout: 120000 }))
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

}
exports.conf = {
  aliases: ["eval", "test", "deneme", "texteval", "yazieval", "yazi-eval", "eval-yazi", "evalyazi"],
};
  
exports.help = {
  name: 'Eval Komutu',
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------