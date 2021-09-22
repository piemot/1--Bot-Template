# {Bot Name} #

A Starlight commission for {username#discriminator}, {userid} 

#### For Devs: See [Dev Instructions](#dev-instructions) below ####

| Essential Values |         |
| ---              | ---     |
| Bot Name         | {value} |
| Color Scheme     | {value} |
| Owner ID         | {value} |
| Main Guild ID    | {value} |



### Primary Requests:
- 
- 
- 
    - 
    - 

## Dev Instructions ##

Rename `config.json.example` to [config.json](./config.json.example). 

Set it as the following:
```json
{
    "token": "Bot token goes here",
    "clientID": "Set this to the bot's ID",
    "guildID": "Set this to the guild ID that the bot should be used in",
    "guildOnly": true ,
    "defaultCommandCooldown": "Number of seconds to set as the default command cooldown"
}
```


Be sure to set all values aside from `guildOnly` as strings. `guildOnly` is boolean.  
When `guildOnly` is set to `true`, commands will update instantly upon `node deploy-commands`,
but the bot will only function in the specified guild.
If set to `false`, it can take up to an hour to update, but will deploy over all the guilds the bot is in.  
Be sure to run `node deploy-commands` to deploy before `node .` to run.

To add new error messages, add an additional line in [errmsgs.js](./const/errmsgs.js) following the current format.  
You can add more commands in the [commands](./commands) folder but new commands **must be in a subfolder**.  
A command is structured like so: 
```js
module.exports = {
	data: new SlashCommandBuilder()
		.setName('name here; no spaces or caps')
		.setDescription('Up to 100 chars')
		.addStringOption(option => option.setName('input').setDescription('Enter a string'))
	    .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	    .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	    .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	    .addUserOption(option => option.setName('target').setDescription('Select a user'))
	    .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
	    .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
	    .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something'))
        .addSubcommand(subcommand =>
		subcommand
			.setName('subcommand name; same rules as normal name')
			.setDescription('Up to 100 chars')),
    options: {
        name: 'set to the same as the .setName function',
	    description: 'Could theoretically be different but better to be .setDescription',
        guildOnly: true,
		cooldown: integer in seconds},
	async execute(interaction) {
		const string = interaction.options.getString('input');
        const integer = interaction.options.getInteger('int');
        const number = interaction.options.getNumber('num');
        const boolean = interaction.options.getBoolean('choice');
        const user = interaction.options.getUser('target');
        const member = interaction.options.getMember('target');
        const channel = interaction.options.getChannel('destination');
        const role = interaction.options.getRole('muted');
        const mentionable = interaction.options.getMentionable('mentionable');

        console.log([string, integer, boolean, user, member, channel, role, mentionable]);
        let subcmd = interaction.commandName;
        if (subcmd === 'name') {
            await interaction.reply({ content: `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`, ephemeral: true });
        }
	},
};
```
I'm working on more `options`, but they're not ready yet.  
Additional interactions can be addded in the [events](./events) folder. Do **not** use subfolders here.
