const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const User = require('../models/User')
const Guild = require('../models/Guild')

const { getWeeklyData } = require('../helpers/dataHelper.js')
const { getLeaderboardEmbed, getMessageRow} = require('../helpers/leaderboardHelper.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Displays the weekly Strava leaderboard!'),
        async execute(interaction) {
            const guild = await Guild.findOne({guild_id: interaction.guild.id})
            console.log(guild)
            if (guild.page_num == 2) {
                guild.page_num = 1;
                guild.save()
            }
            const leaderboardEmbed = await getLeaderboardEmbed(guild)
            const leaderboardMessageRow = getMessageRow(guild)
            await interaction.reply({ embeds: [leaderboardEmbed], 
                components: [leaderboardMessageRow]})
        },
};