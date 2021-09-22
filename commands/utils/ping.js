const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
    options: {
        name: 'ping',
	    description: 'Tests client latency',
		cooldown: 10},
	async execute(interaction) {
        var botping = Math.round(interaction.client.ws.ping)
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        const pingEmbed = new MessageEmbed()
	        .setColor('#7289da')
	        .setTitle('🏓 Pong! 🏓')
	        .setDescription('') //\u200B
	        .addFields(
	        	{ name: 'Roundtrip Latency', value: `\`\`\`${sent.createdTimestamp - interaction.createdTimestamp}ms\`\`\`` },
	        	{ name: 'API Heartbeat', value: `\`\`\`${botping}ms\`\`\`` },
	        )
	        .setTimestamp()
        await interaction.deleteReply()
        interaction.followUp({ embeds: [pingEmbed], content: 'Finished Pinging!', ephemeral: true });
	},
};
