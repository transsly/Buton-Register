//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const db = require('quick.db')
const ayarlar = require('../ayarlar');
const { MessageButton } = require('discord-buttons');

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

const chatkanal = client.channels.cache.get(kanallar.chat)

const rgun = moment(new Date()).format('DD')
const ray = moment(new Date()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const ryıl = moment(new Date()).format('YYYY')
const rsaat = moment(new Date()).format('HH:mm:ss')
const tarih = `${rgun} ${ray} ${ryıl} | ${rsaat}`

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

function gonder(mesaj) {
  mkanal.send(discow.setDescription(mesaj)).then(x => x.delete({ timeout: 15000 }))
}

function hata(mesaj) {
  mkanal.send(discow.setDescription(`${dikkat} ${mesaj} ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))
}

function discowerror(mesaj) {
  mkanal.send(discow.setDescription(`${dikkat} ${mesaj} ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))
}
  

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

    //if(!botayar.sahipler.includes(msahip.id)) return hata(`**Bu Komutu Sadece \`Sahibim\` Kullanabilir.**`)
        if(!muye.roles.cache.get(roller.registerstaff) && !muye.hasPermission("ADMINISTRATOR") && !botayar.sahipler.includes(msahip.id)) return hata(`**Bu Komutu Sadece \`Yetkililer\` Kullanabilir.**`)
    //if(!muye.hasPermission("ADMINISTRATOR") && !botayar.sahipler.includes(msahip.id)) return hata(`**Bu Komutu Sadece \`Yöneticiler\` Kullanabilir.**`)

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
const isim = args[1]
const yas = Number(args[2])

        if(!kullanıcı) return discowerror(`**Lütfen Bir** **\`Kullanıcı\`** **Belirt.**`)
        if(!isim) return discowerror(`**Lütfen Bir** **\`İsim\`** **Belirt.**`)
        if(!yas) return discowerror(`**Lütfen Bir** **\`Yaş\`** **Belirt.**`) 

const yenisim = kullanıcı.user.tag.includes(botconfig.tag) ? botconfig.tag : botconfig.tagg + " " + isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase() + " | " + yas
  
        if(db.get("Yasi_Kucuk&"+kullanıcı.id) === "Evet") return discowerror(`**Bu Kullanıcı** **\`Daha Önce Kayıt Olmaya Çalışmış\`** **Ama Yaş Sınırını Karşılamadığı İçin KaraListeye Alınmış.**`)
        if(yas < botconfig.yassiniri) return discowerror(`**Kayıt Etmeye Çalıştığın Kullanıcı** **\`Yaş Sınırını\`** **Karşılamadığı İçin Kayıt Edemezsin.**`).then(x => db.set("Yasi_Kucuk&"+kullanıcı.id, "Evet"))

        if(kullanıcı.id === message.author.id) return discowerror(`**Kendini** **\`Kayıt\`** **Edemezsin.**`)
        if(kullanıcı.id === client.user.id) return discowerror(`**Beni** **\`Kayıt\`** **Edemezsin.**`)
        if(kullanıcı.id === message.guild.owner.id) return discowerror(`**Sunucu Sahibini** **\`Kayıt\`** **Edemezsin.**`)
        if(kullanıcı.roles.cache.get(roller.yetkilistaff)) return discowerror(`**Sunucu Yetkililerini** **\`Kayıt\`** **Edemezsin.**`)
        if(kullanıcı.bot) return discowerror(`**Botları** **\`Kayıt\`** **Edemezsin.**`)
        if(botayar.sahipler.includes(kullanıcı.id)) return discowerror(`**Sahiplerimi** **\`Kayıt\`** **Edemezsin.**`)
        if(kullanıcı.roles.highest.position >= message.member.roles.highest.position) return discowerror(`**Kayıt Etmeye Çalıştığın Kullanıcının Rolleri Seninkinden Yüksek Veya Aynı Roldesiniz.**`)

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const butoncuk = MessageButton

const buton1 = new MessageButton().setStyle(1).setLabel("Erkek").setID("buton_e")
const buton2 = new MessageButton().setStyle(1).setLabel("Kız").setID("buton_k")
const buton3 = new MessageButton().setStyle(3).setLabel("İsim Değiştir").setID("buton_i")
const buton4 = new MessageButton().setStyle(4).setLabel("İptal Et").setID("buton_x")
const buton5 = new MessageButton().setStyle(3).setLabel("Kayıtsız Ver").setID("buton_ka")

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

let toplams = db.get("Kayit_Toplam&"+message.author.id) ? `${db.get("Kayit_Toplam&"+message.author.id)} Adet` : `0 Adet`
let erkeks = db.get("Kayit_Erkek&"+message.author.id) ? `${db.get("Kayit_Erkek&"+message.author.id)} Adet` : `0 Adet`
let kizs = db.get("Kayit_Kiz&"+message.author.id) ? `${db.get("Kayit_Kiz&"+message.author.id)} Adet` : `0 Adet`
let isims = db.get("Kayit_İsim&"+message.author.id) ? `${db.get("Kayit_İsim&"+message.author.id)} Adet` : `0 Adet`
let unregs = db.get("Kayit_Kayitsiz&"+message.author.id) ? `${db.get("Kayit_Kayitsiz&"+message.author.id)} Adet` : `0 Adet`

let isis = ``
var sayi = 1

        if(db.get("İsimler&"+kullanıcı.id)) isis = `**${db.get("İsimler&"+kullanıcı.id).map(x => `\`${sayi++}\`. [\`${x.isim}\`] / [\`${x.cinsiyet}\`] / [${x.yetkili}] / [\`${x.tarih}\`]`).join("\n")}**`
        if(db.get("İsimler&"+kullanıcı.id) === undefined) isis = `**\`\`\`Bulunamadı!\`\`\`**`
        if(db.get("İsimler&"+kullanıcı.id) === null) isis = `**\`\`\`Bulunamadı!\`\`\`**`
        if(!db.get("İsimler&"+kullanıcı.id)) isis = `**\`\`\`Bulunamadı!\`\`\`**`
        if(db.get("İsimler&"+kullanıcı.id) === 0) isis = `**\`\`\`Bulunamadı!\`\`\`**`

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

await message.channel.send(discow.setDescription(`${dikkat} **${message.member} Lütfen Bir Cinsiyet Seç.** ${dikkat}

${ok} **Kayıt Eden Yetkili :** **${message.member} / \`${message.author.tag}\`**
${ok} **Kayıt Edilen Kullanıcı :** **${kullanıcı} / \`${kullanıcı.user.tag}\`**

${ok} **Kullanıcının Yeni İsmi :** **\`${yenisim}\`**
`), { buttons: [buton1, buton2, buton3, buton5, buton4]}).then(async function(discowm) {

discowm.createButtonCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
    
if(button.id === "buton_x") {
  await button.reply.defer()
  await button.message.delete()
  await button.channel.send(discow.setDescription(`${ok} **${message.member} İşlem Başarıyla İptal Edildi.** ${tik}`))
}

if(button.id === "buton_i") {
    await button.reply.defer()
    await button.message.delete()

    await kullanıcı.setNickname(yenisim).catch(err => { })

    await button.channel.send(discow.setDescription(`${ok} **Kayıt Eden Yetkili :** **${message.member} / \`${message.author.tag}\`**
    ${ok} **Kayıt Edilen Kullanıcı :** **${kullanıcı} / \`${kullanıcı.user.tag}\`**
      
    ${ok} **Yetkilinin Toplam Kayıt Sayısı :** **\`${toplams}\`**
    ${ok} **Yetkilinin Toplam İsim Değiştirme Sayısı :** **\`${isims}\`**
    
    ${ok} **Kullanıcının Önceki İsimleri :**
    ${isis}`))

    await client.channels.cache.get(kanallar.kayitlog).send(discow.setDescription(`${ok} **${kullanıcı} / \`${kullanıcı.user.tag}\` (\`${kullanıcı.id}\`), ${message.member} / \`${message.author.tag}\` (\`${message.author.id}\`) Tarafından İsmi \`${yenisim}\` Olarak Değiştirildi.**\n**Tarih : \`${tarih}\`**`))
    
    await db.add("Kayit_Toplam&"+message.author.id, +1)
    await db.add("Kayit_İsim&"+message.author.id, +1)
    await db.push("İsimler&"+kullanıcı.id, { isim: `${yenisim}`, cinsiyet: "İsim", yetkili: `${message.member} / \`${message.author.tag}\` (\`${message.author.id}\`)`, tarih: `${tarih}`})
}

if(button.id === "buton_ka") {
    await button.reply.defer()
    await button.message.delete()

    await kullanıcı.setNickname(botconfig.tag+" İsim | Yaş").catch(err => { })
    await kullanıcı.roles.set([roller.kayitsiz])

    await button.channel.send(discow.setDescription(`${ok} **Kayıt Eden Yetkili :** **${message.member} / \`${message.author.tag}\`**
    ${ok} **Kayıt Edilen Kullanıcı :** **${kullanıcı} / \`${kullanıcı.user.tag}\`**
      
    ${ok} **Yetkilinin Toplam Kayıt Sayısı :** **\`${toplams}\`**
    ${ok} **Yetkilinin Toplam Kayıtsız Verme Sayısı :** **\`${unregs}\`**
    
    ${ok} **Kullanıcının Önceki İsimleri :**
    ${isis}`))

    await client.channels.cache.get(kanallar.kayitlog).send(discow.setDescription(`${ok} **${kullanıcı} / \`${kullanıcı.user.tag}\` (\`${kullanıcı.id}\`), ${message.member} / \`${message.author.tag}\` (\`${message.author.id}\`) Tarafından \`Kayıtsız\` Rolü Verildi.**\n**Tarih : \`${tarih}\`**`))
    
    await db.add("Kayit_Toplam&"+message.author.id, +1)
    await db.add("Kayit_Kayitsiz&"+message.author.id, +1)
}

if(button.id === "buton_e") {
        if(kullanıcı.roles.cache.get(roller.erkek1)) return discowerror(`**Kayıt Etmeye Çalıştığın Kullanıcı Zaten Kayıtlı.**`)
        if(kullanıcı.roles.cache.get(roller.erkek2)) return discowerror(`**Kayıt Etmeye Çalıştığın Kullanıcı Zaten Kayıtlı.**`)
        if(kullanıcı.roles.cache.get(roller.erkek3)) return discowerror(`**Kayıt Etmeye Çalıştığın Kullanıcı Zaten Kayıtlı.**`)
    await button.reply.defer()
    await button.message.delete()

    await kullanıcı.setNickname(yenisim).catch(err => { })
    await kullanıcı.roles.set([roller.erkek1, roller.erkek2, roller.erkek3])

    await button.channel.send(discow.setDescription(`${ok} **Kayıt Eden Yetkili :** **${message.member} / \`${message.author.tag}\`**
    ${ok} **Kayıt Edilen Kullanıcı :** **${kullanıcı} / \`${kullanıcı.user.tag}\`**
      
    ${ok} **Yetkilinin Toplam Kayıt Sayısı :** **\`${toplams}\`**
    ${ok} **Yetkilinin Toplam Erkek Kayıt Sayısı :** **\`${erkeks}\`**
    
    ${ok} **Kullanıcının Önceki İsimleri :**
    ${isis}`))

    await client.channels.cache.get(kanallar.kayitlog).send(discow.setDescription(`${ok} **${kullanıcı} / \`${kullanıcı.user.tag}\` (\`${kullanıcı.id}\`), ${message.member} / \`${message.author.tag}\` (\`${message.author.id}\`) Tarafından \`Erkek\` Olarak Kayıt Edildi.**\n**Tarih : \`${tarih}\`**`))

    await chatkanal.send(`**${kullanıcı} Aramıza Hoşgeldin, Umarım Sunucumuzda Keyifli Vakit Geçirirsin.\nEğer Tagımızı Almak İstersen : [\`${botconfig.tag}\`]**`)
        if(kullanıcı.voice.channel) {
    await kullanıcı.voice.setChannel(kanallar.public).catch(err => { })
}

    await db.add("Kayit_Toplam&"+message.author.id, +1)
    await db.add("Kayit_Erkek&"+message.author.id, +1)
    await db.push("İsimler&"+kullanıcı.id, { isim: `${yenisim}`, cinsiyet: "Erkek", yetkili: `${message.member} / \`${message.author.tag}\` (\`${message.author.id}\`)`, tarih: `${tarih}`})
}

if(button.id === "buton_k") {
        if(kullanıcı.roles.cache.get(roller.kiz1)) return discowerror(`**Kayıt Etmeye Çalıştığın Kullanıcı Zaten Kayıtlı.**`)
        if(kullanıcı.roles.cache.get(roller.kiz2)) return discowerror(`**Kayıt Etmeye Çalıştığın Kullanıcı Zaten Kayıtlı.**`)
        if(kullanıcı.roles.cache.get(roller.kiz3)) return discowerror(`**Kayıt Etmeye Çalıştığın Kullanıcı Zaten Kayıtlı.**`)
    await button.reply.defer()
    await button.message.delete()

    await kullanıcı.setNickname(yenisim).catch(err => { })
    await kullanıcı.roles.set([roller.kiz1, roller.kiz2, roller.kiz3])

    await button.channel.send(discow.setDescription(`${ok} **Kayıt Eden Yetkili :** **${message.member} / \`${message.author.tag}\`**
    ${ok} **Kayıt Edilen Kullanıcı :** **${kullanıcı} / \`${kullanıcı.user.tag}\`**
      
    ${ok} **Yetkilinin Toplam Kayıt Sayısı :** **\`${toplams}\`**
    ${ok} **Yetkilinin Toplam Kız Kayıt Sayısı :** **\`${kizs}\`**
    
    ${ok} **Kullanıcının Önceki İsimleri :**
    ${isis}`))

    await client.channels.cache.get(kanallar.kayitlog).send(discow.setDescription(`${ok} **${kullanıcı} / \`${kullanıcı.user.tag}\` (\`${kullanıcı.id}\`), ${message.member} / \`${message.author.tag}\` (\`${message.author.id}\`) Tarafından \`Kız\` Olarak Kayıt Edildi.**\n**Tarih : \`${tarih}\`**`))

    await chatkanal.send(`**${kullanıcı} Aramıza Hoşgeldin, Umarım Sunucumuzda Keyifli Vakit Geçirirsin.\nEğer Tagımızı Almak İstersen : [\`${botconfig.tag}\`]**`)
        if(kullanıcı.voice.channel) {
    await kullanıcı.voice.setChannel(kanallar.public).catch(err => { })
}

    await db.add("Kayit_Toplam&"+message.author.id, +1)
    await db.add("Kayit_Kiz&"+message.author.id, +1)
    await db.push("İsimler&"+kullanıcı.id, { isim: `${yenisim}`, cinsiyet: "Kız", yetkili: `${message.member} / \`${message.author.tag}\` (\`${message.author.id}\`)`, tarih: `${tarih}`})
}

})})

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

}
exports.conf = {
  aliases: ['kayit', 'kayıt', 'register', 'erkek', 'e', 'man', 'woman', 'k', 'kız', 'kiz'],
};
  
exports.help = {
  name: 'Kayit Komutu',
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------