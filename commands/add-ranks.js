const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
	data: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
		.setName('add-ranks')
		.setDescription('Add Level Up Rank Roles to Server!'),
	async execute(interaction) {
		await interaction.deferReply({ 
			empheral: true,
			fetchReply: true,
		});
		//GeneralArmy
		let roleGeneralArmy = interaction.guild.roles.cache.find(role => role.name === "General of the Army");
		if (!roleGeneralArmy) {
			console.log(`No Role Found`)
			let roleGeneralArmy = await interaction.guild.roles.create({ 
				name: 'General of the Army',
				color: '#ffff00', //yellow
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleGeneralArmy.edit({
			color: '#ffff00', //yellow
			mentionable: true,
			hoist: true,
		})
		}		
		//General
		let roleGeneral = interaction.guild.roles.cache.find(role => role.name === "General");
		if (!roleGeneral) {
			console.log(`No Role Found`)
			let roleGeneral = await interaction.guild.roles.create({ 
				name: 'General',
				color: '#ff0000', //red
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleGeneral.edit({
			color: '#ff0000', //red
			mentionable: true,
			hoist: true,
		})
		}	
		//MajorGeneral
		let roleMajorGeneral = interaction.guild.roles.cache.find(role => role.name === "Major General");
		if (!roleMajorGeneral) {
			console.log(`No Role Found`)
			let roleMajorGeneral = await interaction.guild.roles.create({ 
				name: 'Major General',
				color: '#ff0080', //magenta
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleMajorGeneral.edit({
			color: '#ff0080', //magenta
			mentionable: true,
			hoist: true,
		})
		}		
		//Colonel
		let roleColonel = interaction.guild.roles.cache.find(role => role.name === "Colonel");
		if (!roleColonel) {
			console.log(`No Role Found`)
			let roleColonel = await interaction.guild.roles.create({ 
				name: 'Colonel',
				color: '#8000ff', //purple
				mentionable: true,
				hoist: true,
		})
		roleColonel.setPosition(10)
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleColonel.edit({
			color: '#8000ff', //purple
			mentionable: true,
			hoist: true,
		})
		}
		//Major
		let roleMajor = interaction.guild.roles.cache.find(role => role.name === "Major");
		if (!roleMajor) {
			console.log(`No Role Found`)
			let roleMajor = await interaction.guild.roles.create({ 
				name: 'Major',
				color: '#0000ff', //blue
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleMajor.edit({
			color: '#0000ff', //blue
			mentionable: true,
			hoist: true,
		})
		}
		//Captain
		let roleCaptain = interaction.guild.roles.cache.find(role => role.name === "Captain");
		if (!roleCaptain) {
			console.log(`No Role Found`)
			let roleCaptain = await interaction.guild.roles.create({ 
				name: 'Captain',
				color: '#0080ff', //dodger blue
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleCaptain.edit({
			color: '#0080ff', //dodger blue
			mentionable: true,
			hoist: true,
		})
		}
		//Lieutenant
		let roleLieutenant = interaction.guild.roles.cache.find(role => role.name === "Lieutenant");
		if (!roleLieutenant) {
			console.log(`No Role Found`)
			let roleLieutenant = await interaction.guild.roles.create({ 
				name: 'Lieutenant',
				color: '#00ffff', //cyan
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleLieutenant.edit({
			color: '#00ffff', //cyan
			mentionable: true,
			hoist: true,
		})
		}
		//Sergeant
		let roleSergeant = interaction.guild.roles.cache.find(role => role.name === "Sergeant");
		if (!roleSergeant) {
			console.log(`No Role Found`)
			let roleSergeant = await interaction.guild.roles.create({ 
				name: 'Sergeant',
				color: '#00ff80', //spring green
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleSergeant.edit({
			color: '#00ff80', //spring green
			mentionable: true,
			hoist: true,
		})
		}
		//Corporal
		let roleCorporal = interaction.guild.roles.cache.find(role => role.name === "Corporal");
		if (!roleCorporal) {
			console.log(`No Role Found`)
			let roleCorporal = await interaction.guild.roles.create({ 
				name: 'Corporal',
				color: '#00ff00', //green
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		roleCorporal.edit({
			color: '#00ff00', //green
			mentionable: true,
			hoist: true,
		})
		}
		//Private
		let rolePrivate = interaction.guild.roles.cache.find(role => role.name === "Private");
		if (!rolePrivate) {
			console.log(`No Role Found`)
			let rolePrivate = await interaction.guild.roles.create({ 
				name: 'Private',
				color: '#2e8f37', //forest green
				mentionable: true,
				hoist: true,
		})
		console.log(`New Role Created`)
		} else {
		console.log(`Existing Role`)
		rolePrivate.edit({
			color: '#2e8f37', //forest green
			mentionable: true,
			hoist: true,
		})
		}
		addRanks = await sql.Execute(`INSERT INTO settings (guild_id, Rank_10, Rank_20, Rank_30, Rank_40, Rank_50, Rank_60, Rank_70, Rank_80, Rank_90, Rank_100) VALUES ('${interaction.guildId}', '${rolePrivate.id}', '${roleCorporal.id}', '${roleSergeant.id}', '${roleLieutenant.id}', '${roleCaptain.id}', '${roleMajor.id}', '${roleColonel.id}', '${roleMajorGeneral.id}', '${roleGeneral.id}', '${roleMajorGeneral.id}') ON DUPLICATE KEY UPDATE Rank_10 = '${rolePrivate.id}', Rank_20 = '${roleCorporal.id}', Rank_30 = '${roleSergeant.id}', Rank_40 = '${roleLieutenant.id}', Rank_50 = '${roleCaptain.id}', Rank_60 = '${roleMajor.id}', Rank_70 = '${roleColonel.id}', Rank_80 = '${roleMajorGeneral.id}', Rank_90 = '${roleGeneral.id}', Rank_100 = '${roleGeneralArmy.id}', last_updated = '${setDate}';`)
        console.log(addRanks)
		await interaction.editReply({ empheral: true, content: `Congratulations <@${interaction.user.id}>, Rank Roles Added!` })
	},
};