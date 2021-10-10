//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');

const fs = require('fs');
const moment = require('moment');
const chalk = require('chalk');

const ayarlar = require('./ayarlar');

require('discord-buttons')(client);
require('moment-duration-format')

const botayar = ayarlar.bot
const kanallar = ayarlar.kanallar
const roller = ayarlar.roller
const botconfig = ayarlar.config

global.visteria = client

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

let ccc = chalk.yellow(" | ")

const rgun = moment(new Date().toISOString()).format('DD')
const ray = moment(new Date().toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const ryıl = moment(new Date().toISOString()).format('YYYY')
const rsaat = moment(new Date().toISOString()).format('HH:mm:ss')
const rcre = `${rgun} ${ray} ${ryıl} | ${rsaat}`  

let tarihc = ccc+chalk.red("Tarih : ")+chalk.white("[")+chalk.green(rcre)+chalk.white("]")+ccc

let discowkomutc = chalk.magenta("Discow / Komutlar")
let discowmongoc = chalk.magenta("Discow / MongoDB")
let discowgirisc = chalk.magenta("Discow / Giriş")
let discowsesliodac = chalk.magenta("Discow / Sesli Oda")
let discowbotc = chalk.magenta("Discow / Bot")
let discoweventc = chalk.magenta("Discow / Fonksiyonlar")

const komutc = message => {
  console.log(chalk.bold(`${discowkomutc} ${tarihc} `+chalk.red(message)))
}

const girisc = message => {
  console.log(chalk.bold(`${discowgirisc} ${tarihc} `+chalk.red(message)))
}

const seslic = message => {
  console.log(chalk.bold(`${discowsesliodac} ${tarihc} `+chalk.red(message)))
}

const eventc = message => {
  console.log(chalk.bold(`${discoweventc} ${tarihc} `+chalk.red(message)))
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

require('./events/komut')(client);


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
  fs.readdir("./komutlar/", (err, files) => {
    if (err) console.error(err);
    console.clear()
    console.log(chalk.bold.red("——————————————————————————————————————————————————"+chalk.white("[")+chalk.green("DiscowZombie Panel'e Hoşgeldin Yoldaş, Bot Birazdan Aktif Olucak.")+chalk.white("]")+"——————————————————————————————————————————————————")+"\n"+chalk.bold.yellow("——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————"))
  komutc(`${files.length} Adet Komut Yüklenicek.`);
  files.forEach(f => {
let props = require(`./komutlar/${f}`);
  komutc(`Bir Komut Yüklendi. / Yüklenen Komut : ${chalk.white("[")}${chalk.green(props.help.name)}${chalk.white("]")} / Yüklenen Kod : ${chalk.white("[")}${chalk.green(f)}${chalk.white("]")} / Komutun Alias'ları : ${chalk.white("[")}${chalk.green(props.conf.aliases.map(x => `${x}`).join(", "))}${chalk.white("]")}`);
  client.commands.set(props.help.name, props);
  props.conf.aliases.forEach(alias => {
  client.aliases.set(alias, props.help.name);
}); 
});
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.reload = command => {
    return new Promise((resolve, reject) => {
    try {
  delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
  client.commands.delete(command);
  client.aliases.forEach((cmd, alias) => {
    if (cmd === command) client.aliases.delete(alias);});
  client.commands.set(command, cmd);
  cmd.conf.aliases.forEach(alias => {
  client.aliases.set(alias, cmd.help.name);
});
  resolve();
} catch (e) {
  reject(e);
}
});
};

client.load = command => {
    return new Promise((resolve, reject) => {
    try {
let cmd = require(`./komutlar/${command}`);
  client.commands.set(command, cmd);
  cmd.conf.aliases.forEach(alias => {
  client.aliases.set(alias, cmd.help.name);
});
  resolve();
} catch (e) {
  reject(e);
}
});
};

client.unload = command => {
    return new Promise((resolve, reject) => {
    try {
  delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
  client.commands.delete(command);
  client.aliases.forEach((cmd, alias) => {
    if (cmd === command) client.aliases.delete(alias);
});
  resolve();
} catch (e) {
  reject(e);
}
});
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.login(process.env.visteria).then(x => {
  console.log("")
  girisc("Bot Başarıyla Giriş Yaptı.")
}).catch(err => girisc("Bot Giriş Yaparken Bir Hata Oluştu."))

client.on("ready", async () => {
  client.user.setStatus(ayarlar.config.status)
  client.channels.cache.get(botconfig.seslioda).join().then(x => {
  seslic("Bot Başarıyla Sese Giriş Yaptı.")
  console.log(chalk.bold.yellow("——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————"))
}).catch(err => {
  seslic("Bot Sese Girerken Bir Hata Oluştu.\nHata : "+chalk.yellow(err))
  process.exit(0)
})
})

const webhooks = new Discord.WebhookClient("hatalogid", "hatalogtoken")
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${botconfig.footer}`).setTimestamp()

client.on("error", async (err) => {
  webhooks.send(discow.setDescription(`❗ **Botta Bir Hata Oluştu.** ❗
  
**▫ Hata :**\n**\`\`\`js\n${err}\`\`\`**`))
})

client.on("warn", async (err) => {
  webhooks.send(discow.setDescription(`❗ **Botta Bir Uyarı Oluştu.** ❗
  
**▫ Uyarı :**\n**\`\`\`js\n${err}\`\`\`**`))
})

process.on("uncaughtException", async (err) => {
  webhooks.send(discow.setDescription(`❗ **Projede Bilinmeyen Bir Hata Oluştu.** ❗
  
**▫ Hata :**\n**\`\`\`js\n${err}\`\`\`**`))
})

process.on("unhandledRejection", async (err) => {
  webhooks.send(discow.setDescription(`❗ **Projede Bilinmeyen Bir Hata Oluştu.** ❗
  
**▫ Hata :**\n**\`\`\`js\n${err}\`\`\`**`))
})

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

fs.readdir("./fonk", (err, files) => {
  if (err) return console.error(err);
  files
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
      let prop = require(`./fonk/${file}`);
      if (!prop.conf) return;
      client.on(prop.conf.name, prop);
      setTimeout(function() {
       eventc(`${chalk.magenta(prop.conf.name.toUpperCase())} Fonksiyonu Başarıyla Başlatıldı.`);
      }, 5000)
    });
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

var durumlar = ["DiscowZombie ❤️ Transsly", "Transsly ❤️ DiscowZombie", "DiscowZombie Was Here", "Transsly Was Here"]
setInterval(function() {
var random = Math.floor(Math.random()*(durumlar.length-0+1)+0);
  
client.user.setActivity(durumlar[random])
  
}, 2 * 5000)

