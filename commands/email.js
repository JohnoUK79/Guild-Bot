const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
const { sendEmail } = require('../functions/messageFunctions');
setDate = timestamp.UTCdefault()

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)

        .setName("email")
        .setDescription("send an E=Mail from the Bot!")

        .addStringOption((option) => option
            .setName("recipient")
            .setDescription("Add E-Mail Recipient!")
            .setRequired(true)
        )
        .addStringOption((option) => option
            .setName("subject")
            .setDescription("Subject of the E-Mail!")
            .setRequired(true)
        )
        .addStringOption((option) => option
            .setName("content")
            .setDescription("Content of the E-Mail Message!")
            .setRequired(true)
        ),

    async execute(interaction) {
        sendEmail(interaction)
    },
};
