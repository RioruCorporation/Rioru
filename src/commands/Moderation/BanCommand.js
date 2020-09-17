/* eslint-disable quotes */
/* eslint-disable keyword-spacing */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
const { Command } = require('../../structure')

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: 'ban',
            aliases: ['banir'],
            usage: '',
            description: '',
            category: 'Moderation'
        })
    }
   async run ({ channel, msg, member, guild, mentions, args, author }) {
    const Discord = require('discord.js')
    if(!member.permissions.has("BAN_MEMBERS")) {
    return msg.reply("Você não tem a permissão necessária!")
  }

  if(!guild.me.permissions.has("BAN_MEMBERS")) {
    return msg.reply("Eu não tenho a permissão necessária!")
  }

  var membro = mentions.members.first() || guild.members.cache.get(args[0])
  if(!membro) return msg.reply("Você precisa mencionar alguem!")
  if(membro.user.id === author.id) {
    return msg.reply("Você não pode se banir!")
  }
  if(membro.user.id === this.client.user.id) {
    return msg.reply("Por que você quer me banir?")
  }
  if(!membro.bannable) {
    return msg.reply("Eu não posso banir este membro,Ele pode ter um cargo maior que o meu ou eu tenho permissão para banir !")
  }
  
  let motivo = args.slice(1).join(" ")
  if(!motivo) motivo = "Não Definido"
 
   const msge = await channel.send(`<@${author.id}>, Você quer mesmo banir ${membro.user.tag}(\`${membro.user.id}\`) permanentemente? Clique em uma das reações abaixo! `)
   await msge.react('✅')
   await msge.react('❌')
   
   const sim = (reaction, user) => reaction.emoji.name === '✅' && user.id === author.id
   const no = (reaction, user) => reaction.emoji.name === '❌' && user.id === author.id
   const collectorDaMsg = msge.createReactionCollector(sim)
   const collectorNo = msge.createReactionCollector(no)

   collectorDaMsg.on('collect', async r => {
    membro.ban({ reason: motivo })
    msg.delete()
    const embed = new Discord.MessageEmbed()
    .setTitle(":fire:Membro(a) Banido(a)!:fire:")
    .setColor("#bb00ff")
    .setThumbnail(author.displayAvatarURL({ dynamic: true, size: 2048 }))
    .addField("👤 Banido(a) :", membro.user.tag, false)
    .addField("👮‍♂️ Quem Puniu:", author.tag, false)
    .addField("📜 Motivo:", motivo, false)
    .setTimestamp()
    .setFooter(`Solicitado por ${author.username}`, author.displayAvatarURL({ dynamic: true, size: 2048 }))

   const messageA = await channel.send(embed)
    await messageA.react('🍪')
   })

   collectorNo.on('collect', r => {
     msg.delete()
     })
  }
}
