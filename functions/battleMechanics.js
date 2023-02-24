const sql = require("../config/Database");
const { TextInputStyle, ModalBuilder, EmbedBuilder, TextInputBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    battle: async function (interaction) {
        const guildIcon = interaction.member.guild.iconURL();
		const guildName = interaction.member.guild.name
		const Battle = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`)
		const embed = new EmbedBuilder();
			embed
				.setColor('#ff5b05')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Warpath Battles`, iconURL: `${guildIcon}`});


				const defender = interaction.options.getUser('target');
				if (defender.bot === true) return interaction.editReply(`${interaction.member} Stop trying to **BULLY PIXELS**, You can only **FIGHT** real members\nMan Up and pick a better foe!`)
				const DefenderDB = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${defender.id}`)
				if (defender.id === interaction.member.id) {
				embed
					.setDescription(`${interaction.member}, Stop picking fights with yourself!\nPlease select a worthy adversary!`)
	
					return interaction.editReply({ embeds: [embed] })
				}

                if (DefenderDB[0].unit_type === '') {
                    embed
                        .setDescription(`${interaction.member}, ${defender} has not trained their troops!\nPlease select a worthy adversary!`)
        
                        return interaction.editReply({ embeds: [embed] })
                    }
                const DefenderUnit = await sql.Execute(`SELECT * FROM units WHERE Camp = '${DefenderDB[0].unit_camp}' AND Unit_Type = '${DefenderDB[0].unit_type}' AND Unit_Level = '${DefenderDB[0].unit_level}'`)

                const AttackerDB = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`);
                const AttackerUnit = await sql.Execute(`SELECT * FROM units WHERE Camp = '${AttackerDB[0].unit_camp}' AND Unit_Type = '${AttackerDB[0].unit_type}' AND Unit_Level = '${AttackerDB[0].unit_level}'`)

                const AttackerStats = {
                    Name: AttackerUnit[0].Unit_Name,
                    Firepower: AttackerUnit[0].Firepower,
                    HP: AttackerUnit[0].HP,
                    Speed: AttackerUnit[0].Speed,
                    BaseLevel: AttackerDB[0].base_level,
                    OfficerLevel: AttackerDB[0].officer_level
                }
                const DefenderStats = {
                    Name: DefenderUnit[0].Unit_Name,
                    Firepower: DefenderUnit[0].Firepower,
                    HP: DefenderUnit[0].HP,
                    Speed: DefenderUnit[0].Speed,
                    BaseLevel: DefenderDB[0].base_level,
                    OfficerLevel: DefenderDB[0].officer_level
                }
                const Attacker = {
                    Power: AttackerStats.Firepower * AttackerStats.OfficerLevel,
                    Health: AttackerStats.HP * AttackerStats.BaseLevel * 10,
                    Speed: AttackerStats.Speed
                }
                const Defender = {
                    Power: DefenderStats.Firepower * AttackerStats.OfficerLevel,
                    Health: DefenderStats.HP * AttackerStats.BaseLevel * 10,
                    Speed: DefenderStats.Speed
                }
                console.log(Attacker, Defender)

                embed
					.setDescription(`${interaction.member} your **${AttackerStats.Name}** sucessfully Battled ${defender}'s **${DefenderStats.Name}**!`)
				
				//updatePlayer = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`);
				//updateVictim = await sql.Execute(`UPDATE levels SET war_coins = '${newVictim}' WHERE discord_id = ${victim.id}`)
		return interaction.editReply({ embeds: [embed] });
    }
}