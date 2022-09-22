const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton } = require('discord.js');
const sql = require("../config/Database");
const interactionCreate = require("../Events/interactionCreate");
const { execute } = require("../events/ready");
const timestamp = require('time-stamp');

const admin =   new MessageActionRow()
			        .addComponents(
                new MessageButton()
                    .setCustomId('city')
                    .setLabel('Update City')
                    .setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('player')
					.setLabel('Update Player')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId('enemy')
					.setLabel('Update Enemy')
					.setStyle('DANGER'),
				)

const player =  new MessageActionRow()
                        .addComponents(
                new MessageButton()
                        .setCustomId('city')
                        .setLabel('Update City')
                        .setStyle('PRIMARY'),
                new MessageButton()
                        .setCustomId('request')
                        .setLabel('Request Player Update')
                        .setStyle('SECONDARY'),
                )

const updatePlayer =  new MessageActionRow()
				.addComponents(
		new MessageButton()
				.setCustomId('UID')
				.setLabel('Add in Game User ID to profile!')
				.setStyle('PRIMARY'),
		)
    

const full = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('player')
					.setLabel('Update Player')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId('enemy')
					.setLabel('Update Enemy')
					.setStyle('DANGER'),
				new MessageButton()
					.setCustomId('city')
					.setLabel('Update City')
					.setStyle('PRIMARY'),
                new MessageButton()
					.setCustomId('request')
					.setLabel('Request Player Update')
					.setStyle('SECONDARY'),
			)


module.exports = {

    data: new SlashCommandBuilder()
        .setName("search")
        .setDescription("Searches our Player Database!")
        .addStringOption((option) => option
            .setName("id")
            .setDescription("Player ID of the player to be looked up!")
            .setRequired(true)
        ),
    async execute(Interaction) {
        const id = parseInt(Interaction.options.getString("id"));
        if(isNaN(id)) return Interaction.reply( {content: "You have entered invalid details, please input a valid User ID! Any issues message **<@322100798651760640>**"});
        

        Data = await sql.Execute('select * from players where player_id = '+ id +';');
        console.log(timestamp.utc('YYYY/MM/DD HH:mm:ss'))
        console.log(id)
        if (Data.length === 0) return Interaction.reply({ content: `I could not find any player with the ID **${id}**, please check the ID and try again! Any issues messages Genesis or **<@322100798651760640>**.`, ephemeral: false });
        const playersearch = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('PH Family Player Database')
            .setURL('http://www.phfamily.co.uk/player.html')
            .setThumbnail(Interaction.user.displayAvatarURL())
            .setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true }), url: '' })
            .setDescription(` Player ID: ${Data[0].player_id}`)
            .setThumbnail('https://i.ibb.co/xXQ3mmb/7084-E1-DD-6260-4771-92-FD-03-CE9-C8-E5-F89.jpg')
            .addFields(
                { name: `Name: ${Data[0].last_known_name}`, value: `Affiliation: ${Data[0].affiliation}` },
                { name: `Tag: ${Data[0].last_known_tag}`, value: `Server: ${Data[0].server}` },
                { name: 'Known History of Player', value: `History: ${Data[0].history}`, inline: true },
                { name: `Discord: <@${Data[0].discord}>`, value: `**Last Known City:** ${Data[0].last_city}`, inline: true },
                { name: `Last Seen`, value: `${Data[0].date_last_known}`, inline: true }

            )
            .setImage(`${Data[0].player_image}`)
            .setTimestamp()
            .setFooter({ text: 'PH Family Search Tool.', iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });

        Interaction.reply({
            content: `Hey **${Interaction.member.displayName}**, I have found the following details for **${id}**.`,
            components: [updatePlayer],
            ephemeral: false,
            embeds: [playersearch]
        });
    },
};
