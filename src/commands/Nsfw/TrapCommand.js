/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
const { Command } = require('../../structure')

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: 'trap',
            aliases: [],
            category: 'NSFW +18'
        })
    }
    run ({ channel, author }) {
        const Discord = require('discord.js')
		const superagent = require('superagent')
		if (channel.nsfw === true) {
		superagent.get('https://nekos.life/api/v2/img/trap')
		// eslint-disable-next-line handle-callback-err
		.end((err, response) => {
			const embed = new Discord.MessageEmbed()
			.setDescription(`Não consegue Ver o(a) Gif/Img? [Clique aqui](${response.body.url})`)
			.setImage(response.body.url)
			.setFooter(`Solicitado por ${author.username}`, author.displayAvatarURL({ dynamic: true, size: 2048 }))
			channel.send(embed)
		   })
		 } else {
			 // eslint-disable-next-line quotes
			 return channel.send("Esse canal não é de NSFW +18")
		 }
    }
}
