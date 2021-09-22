const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows a help menu!')
		.addStringOption(option => option.setName('command').setDescription('The command to get more information on')),
    options: {
        name: 'help',
	    description: 'Shows a help menu!',
		cooldown: 10},
	async execute(interaction) {
		const subcmd = interaction.options.getString('command');
		const data = [];
		const { commands } = interaction.client;
        if (!subcmd) {
			data.push(commands.map(command => `**/${command.options.name}** \n\`\`\`${command.options.description}\`\`\``).join(' '));
			return interaction.member.send(`Here\'s a list of all my commands: \n\n${data.toString()} \nYou can send \`/help [command name]\` to get info on a specific command!`)
				.then(() => {
					if (interaction.channel.type === 'dm') return;
					interaction.reply({ content: 'I\'ve sent you a DM with all my commands!', ephemeral: true });
				})
				.catch(error => {
					console.error(`Could not send help DM to ${interaction.member.tag}.\n`, error);
					interaction.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
				});
		}
		const name = subcmd.toLowerCase();
		const command = commands.find(c => c.options.aliases && c.options.aliases.includes(name) || c.options.name == name); // commands.get(name) || commands.find(c => c.options.aliases && c.options.aliases.includes(name))

		if (!command) {
			return interaction.reply({ content: 'That\'s not a valid command!', ephemeral: true });
		}

		data.push(`**Name:** ${command.options.name}`);

		if (command.options.aliases) data.push(`**Aliases:** ${command.options.aliases.join(', ')}`);
		if (command.options.description) data.push(`**Description:** ${command.options.description}`);
		if (command.options.usage) data.push(`**Usage:** /${command.options.name} ${command.options.usage}`);

		data.push(`**Cooldown:** ${command.options.cooldown || 3} second(s)`);

		await interaction.reply({ content: data.join(' \n'), ephemeral: true });
	},
};
