const errormsgs = require('../const/errmsgs.js')
const { defaultCommandCooldown } = require('../config.json')
const { Collection } = require('discord.js');


module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;

	    const command = interaction.client.commands.get(interaction.commandName);

	    if (!command) return;

        const { cooldowns } = interaction.client;
        const check = await startChecks(interaction, command, cooldowns);
        if (check) return;

	    try {
	    	await command.execute(interaction);
	    } catch (error) {
	    	console.error(error);
	    	return interaction.reply({ embeds: [errormsgs.other], ephemeral: true });
	    }
	},
};

async function startChecks(interaction, command, cooldowns) {
    if (command.options.guildOnly && interaction.channel.type === 'dm') { //NOTE: I don't actually know if this works or not
        await interaction.reply({ embeds: [errormsgs.noDMs], ephemeral: true });
        return true
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.options.cooldown || defaultCommandCooldown) * 1000;

    if (timestamps.has(interaction.member.id)) {
        const expirationTime = timestamps.get(interaction.member.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            await interaction.reply({ embeds: [errormsgs.cooldown(timeLeft)], ephemeral: true });
            return true
        }
    }

    timestamps.set(interaction.member.id, now);
    setTimeout(() => timestamps.delete(interaction.member.id), cooldownAmount);

    return false
    
    
}