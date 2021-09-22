const { MessageEmbed } = require('discord.js');

exports.noDMs = toErrorEmbed("You can't use that command in DMs!");
exports.cooldown = (timeRemaining) => {
    const exportEmbed = new MessageEmbed()
    	.setColor('#FF0000')
    	.setTitle('❌ ERROR ❌')
    	.setDescription(`You must wait ${timeRemaining.toFixed(1)} more second(s) before reusing this command.`)
    	.setTimestamp()
    	.setFooter('If this is unexpected, contact Starlight for help!');
    return exportEmbed
};

exports.other = toErrorEmbed("An error occurred!");

async function toErrorEmbed(content) {
    const exportEmbed = new MessageEmbed()
    	.setColor('#FF0000')
    	.setTitle('❌ ERROR ❌')
    	.setDescription(content)
    	.setTimestamp()
    	.setFooter('If this is unexpected, contact Starlight for help!');
    return exportEmbed
}

