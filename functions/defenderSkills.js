const { Colours } = require('../data/colours')
const { EmbedBuilder } = require('discord.js');
const { sleep } = require('../functions/discordFunctions')
const { chance0, chance5, chance10, chance15, chance20, chance25, chance30, chance35, chance40, chance45, chance50, chance55, chance60, chance65, chance70, chance75, chance80, chance85, chance90, chance95, chance100 } = require('../data/chance');
module.exports = {
    defenderSkills: async function (interaction) {
        const Boom = 'http://battle-bot.com/img/Boom.jpg'
        const RedCross = 'http://battle-bot.com/img/RedCross.png'
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        interaction.Attacker.SkillUsed, interaction.Defender.SkillUsed = ''
        const skillEmbed = new EmbedBuilder();
        skillEmbed
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
            .setAuthor({
                name: interaction.member.displayName,
                iconURL: interaction.member.displayAvatarURL({ dynamic: true })
            })
            .setFooter({
                text: `Battle ID:${interaction.id} - ${interaction.Defender.Player || interaction.member.displayName}`,
                iconURL: guildIcon
            });
        
        const campColors = {
            Vanguard: Colours.Vanguard,
            Liberty: Colours.Liberty,
            MartyrsW: Colours.MartyrsW,
        };

        if (interaction.Defender.UnitCamp && campColors[interaction.Defender.UnitCamp]) {
            interaction.Defender.SkillColor = campColors[interaction.Defender.UnitCamp];
        }

        if (interaction.Defender.UnitCamp && interaction.Defender.OfficerCamp && campColors[interaction.Defender.OfficerCamp + 'Boost']) {
            interaction.Defender.SkillColor = campColors[interaction.Defender.OfficerCamp + 'Boost'];
        }
        chance = chance0
        const chances = [
            chance0, chance5, chance10, chance15, chance20,
            chance25, chance30, chance35, chance40, chance45,
            chance50, chance55, chance60, chance65, chance70,
            chance75, chance80, chance85, chance90, chance95,
            chance100
        ];

        if (interaction.Defender.SkillLevel >= 0 && interaction.Defender.SkillLevel <= 20) {
            chance = chances[interaction.Defender.SkillLevel];
        }



    interaction.Defender.SkillMultiplier = 1
    if (interaction.Defender.SkillLevel > 0) {
        interaction.Defender.SkillMultiplier = interaction.Defender.SkillLevel
        } 

    skillEmbed 
        .setAuthor({ name: interaction.Defender.Player.username || interaction.Defender.Name, iconURL: interaction.Defender.Image })

        //Sergeant Spanner
        if (interaction.Defender.OfficerSkill === 'Indomitable') { //Awoken Skill
            if (interaction.Defender.UnitType === 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage.toLocaleString())
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Indomitable`)
                const Health = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.BattleHealth * 0.3))
                if (interaction.Defender.BattleHealth > 0) {
                    interaction.Defender.BattleHealth = interaction.Defender.BattleHealth + Health
                    console.log(`Health Increased`, Health)
                } else return console.log(`Health Error`)
                console.log(Health)

            skillEmbed
                .setURL('http://www.battle-bot.com')
                .setTitle(`Battle Bot™`)
                .setColor(interaction.Defender.SkillColor)
                .setThumbnail(Boom)
                .addFields(
                    { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Health** to **${Health.toLocaleString()}**`},
                )   
            interaction.Defender.SkillUsed = 'Health'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
            } 
    }            
        //Angel of Light
        if (interaction.Defender.OfficerSkill === 'Caring Angel') { // Awoken Skill 5
            if (interaction.Defender.UnitType === 'Infantry') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1))
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage.toLocaleString())
            }   
            if (interaction.Attacker.SkillUsed === 'Attack') {
                console.log(`Caring Angel`)
                const Health = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.BattleHealth * 0.35)) 
                if (interaction.Defender.BattleHealth > 0) {
                    interaction.Defender.BattleHealth = interaction.Defender.BattleHealth + Health
                    console.log(`Health Increased`, Health)
                } else return console.log(`Health Error`)
    
                skillEmbed
                        .setColor(interaction.Defender.SkillColor)
                        .setThumbnail(RedCross)
                        .addFields(
                            { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Health** to **${Health.toLocaleString()}**` },
                        )  
                interaction.followUp({embeds: [skillEmbed]})
                interaction.Defender.SkillUsed = 'Health'
                return
            } 
        } 

        //War Machine
        if (interaction.Defender.OfficerSkill === `The Soldier's Soldier`) { // Awoken Skill 5
            if (interaction.Defender.AttackType === 'Ground') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }   
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`The Soldier's Soldier`)  
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.125)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }
        //Tip of the Spear 
        if (interaction.Defender.OfficerSkill === 'Undaunted') { // Awoken Skill 5
            if (interaction.Defender.AttackType === 'Ground') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }   
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Undaunted`)  
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.5)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        //Valkyrie
        if (interaction.Defender.OfficerSkill === 'Who Dares Wins') { // Awoken Skill 5
            if (interaction.Defender.UnitType === 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            if (interaction.Attacker.AttackType === 'Ground') {
                console.log(`Who Dares Wins`)   
                const Health = Math.round(interaction.Defender.SkillMultiplier * (interaction.Attacker.BattleHealth * 0.2)) 
                if (interaction.Attacker.BattleHealth > 0) {
                    interaction.Attacker.BattleHealth - Health
                    console.log(`Health Decreased`, Health)
                } else return console.log(`Health Error`)
    
                skillEmbed
                        .setColor(interaction.Defender.SkillColor)
                        .setThumbnail(RedCross)
                        .addFields(
                            { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & decreases **${interaction.Attacker.Player}** **${interaction.Attacker.Name}'s Health** by **${Health.toLocaleString()}**` },
                        )  
                interaction.followUp({embeds: [skillEmbed]})
                interaction.Defender.SkillUsed = 'Health'
                return
            }         
        }
        //Lady Justice        
        if (interaction.Defender.OfficerSkill === 'Guardian Angel') { // Awoken Skill 5
            if (interaction.Defender.AttackType === 'Ground') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Guardian Angel`)  
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.2)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }
        // Eye of Providence 
        if (interaction.Defender.OfficerSkill === 'Hand of Destruction') { // Awoken Skill 5 
            if (interaction.Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Hand of Destruction`)
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.4)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
        } 
        }        
        // Percy
        if (interaction.Defender.OfficerSkill === 'Frontline Fire') { // Awoken Skill 5
            if (interaction.Defender.AttackType === 'Ground') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }              
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Frontline Fire`)            
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.18)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // White Wolf
        if (interaction.Defender.OfficerSkill === 'Vengeance') { // Awoken Skill 5 
            if (interaction.Defender.UnitType === 'Infantry') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(`Vengeance`)   
                console.log(skillSuccess,chance)         
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.3)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power
                if (interaction.Defender.UnitType === 'Infantry') {
                    const Special = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.25))  
                    interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Special
                    console.log(Special.toLocaleString())

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setImage(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Special.toLocaleString() || Power.toLocaleString()}**` },
                    )  

                }
                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString() || Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Antonina Shevchenko
        if (interaction.Defender.OfficerSkill === 'The Motherland') { // Awoken Skill 5
            if (interaction.Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`The Motherland`)
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.5)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Damage.toLocaleString()}**` },
                    ),   
            console.log(Damage.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // Winter Huntsman
        if (interaction.Defender.OfficerSkill === 'Mine Detonator') { // Awoken Skill 5
            if (interaction.Defender.AttackType === 'Ground') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Mine Detonator`)            
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.135)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power
                if (interaction.Attacker.UnitType === 'Infantry') {
                    const Health = Math.round(interaction.Defender.SkillMultiplier * (interaction.Attacker.BattleHealth * .25)) 
                    interaction.Attacker.BattleHealth = interaction.Attacker.BattleHealth - Health
                    skillEmbed
                        .setColor(interaction.Defender.SkillColor)
                        .setImage(RedCross)
                        .addFields(
                            { name: `${interaction.Defender.OfficerSkill}`, value: `**${interaction.Defender.Officer}** & reduces **${interaction.Attacker.Player}** **${interaction.Attacker.Name}'s Health** by **${Health.toLocaleString()}**` },
                    ) 
                }

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }      
        // The Eruptor  
        if (interaction.Defender.OfficerSkill === 'Flamestorm') {
            if (interaction.Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Flamestorm`)
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }
        // Steel Fighter
        if (interaction.Defender.OfficerSkill === 'Inpenetrable') { // Awoken Skill 5 
            if (interaction.Defender.UnitType === 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Inpenetrable`) 
                const Health = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.BattleHealth * 0.5)) 
                interaction.Defender.BattleHealth = interaction.Defender.BattleHealth + Health
                if (interaction.Defender.BattleHealth > 0) {
                    console.log(`Health Increased`, Health)
                } else return console.log(`Health Error`)

                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(RedCross)
                        .addFields(
                            { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Health** to **${Health.toLocaleString()}**` },
                        )   
            interaction.Defender.SkillUsed = 'Health'
            interaction.followUp({embeds: [skillEmbed]})
            return
            }         
        }        
        // Iron Bastion
        if (interaction.Defender.OfficerSkill === 'Breaching Charge') { // Awoken Skill 5 
            if (interaction.Defender.UnitType === 'Infantry') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Breaching Charge`)            
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.3)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power
                if (interaction.Attacker.UnitType === 'Infantry') {
                    console.log(`Breaching Infantry Charge `)            
                    console.log(Special.toLocaleString())
                    const Special = (interaction.Defender.AttackPower * .5) * interaction.Defender.SkillLevel
                    interaction.Defender.AttackPower = interaction.Defender.AttackPower + Special
                    skillEmbed
                        .setColor(interaction.Defender.SkillColor)
                        .setImage(Boom)
                        .addFields(
                            { name: `${interaction.Defender.OfficerSkill}`, value: `**${interaction.Defender.Officer}** & reduces **${interaction.Attacker.Player}** **${interaction.Attacker.Name}'s Health** by **${Special.toLocaleString()}**` },
                    ) 
                }

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Berserker Bear
        if (interaction.Defender.OfficerSkill === 'Flaming Meteors') {
            if (interaction.Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            if (interaction.Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Flaming Meteors`)
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.3)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power
                skillEmbed  
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        

        // Guardian of Truth
        if (interaction.Defender.OfficerSkill === 'Master of War') { // Awoken Skill 5
            if (interaction.Defender.UnitType === 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Master of War`)            
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.1))
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }   
        // Death Adder     
        if (interaction.Defender.OfficerSkill === 'Phantom Power') { // Awoken Skill 5
            if (interaction.Defender.AttackType === 'Ground') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Phantom Power`)            
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.1))
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power
                const Health = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.BattleHealth * 0.2))
                interaction.Defender.BattleHealth = interaction.Defender.BattleHealth + Health

                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setImage(RedCross)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                        { name: `${interaction.Defender.OfficerSkill}`, value: `**${interaction.Defender.Officer}** increases **${interaction.Defender.Player}** **${interaction.Defender.Name}'s Health** by **${Health.toLocaleString()}**` },
                    ),   
            console.log(Health.toLocaleString() && Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Bloody Mary
        if (interaction.Defender.OfficerSkill === 'Blinding Flash') { // Awoken Skill 5 
            if (interaction.Defender.AttackType === 'Ground') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Blinding Flash`)            
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Saber of The Nation 
        if (interaction.Defender.OfficerSkill === 'Rain of Blades') { // Awoken Skill 5 
            if (interaction.Defender.AttackType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Rain of Blades`)
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power

                skillEmbed  
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }       
        // Argent Flame 
        if (interaction.Defender.OfficerSkill === 'Devastation') {
            if (interaction.Defender.AttackType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Devastation`)
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.25)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}}        
        // Thorn Countess
        if (interaction.Defender.OfficerSkill === 'Beauty Worth Preserving') { // Awoken Skill 5
            if (interaction.Defender.UnitType === 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Beauty Worth Preserving`)            
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.15)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power
                const Special = Math.round(interaction.Attacker.AttackPower * .1)
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower - Special

                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(RedCross)
                    .setImage(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                        { name: `${interaction.Defender.OfficerSkill}`, value: `**${interaction.Defender.Officer}** decreases **${interaction.Attacker.Player}** **${interaction.Attacker.Name}'s Health** by **${Special.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString(), Special.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Professor Pain 
        if (interaction.Defender.OfficerSkill === 'Forlorn Hope') { // Awoken Skill 5
            if (interaction.Defender.UnitType === 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Forlorn Hope`)            
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.15)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Wings of Glory
        if (interaction.Defender.OfficerSkill === 'Sky Dancer') { // Awoken Skill 5 
            if (interaction.Defender.UnitType === 'Fighters') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Defender.UnitType === 'Bombers' || 'Fighters'){
                console.log(`Sky Dancer`)
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.15)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // Brisk Eagle
        if (interaction.Defender.OfficerSkill === 'Untouchable') { // Awoken Skill 5
            if (interaction.Defender.UnitType === 'Fighters' || 'Bombers') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                if (skillSuccess === 'Yes') {
                    console.log(skillSuccess,chance)
                    console.log(`Untouchable`)   
                    const Defend = interaction.Attacker.AttackPower
                    interaction.Attacker.AttackPower = 0
    
                    skillEmbed
                        .setColor(interaction.Defender.SkillColor)
                        .setThumbnail(RedCross)
                        .addFields(
                            { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & decreases **${interaction.Attacker.Player}** **${interaction.Attacker.Name}'s Attack** to **${interaction.Attacker.AttackPower.toLocaleString()}**` },
                        ),   
                console.log(interaction.Defender.AttackPower.toLocaleString())
                console.log(interaction.Attacker.AttackPower.toLocaleString())
                interaction.Defender.SkillUsed = 'Attack'
                interaction.followUp({embeds: [skillEmbed]})
                sleep(500 * interaction.Defender.SkillMultiplier)
                interaction.Attacker.AttackPower = Defend
                return
                } 
            }        
        // Heavens Saviour
        if (interaction.Defender.OfficerSkill === 'Heavenly Rays') { // Awoken Skill 5 
            if (interaction.Defender.UnitType === 'Fighters') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Defender.UnitType === 'Fighters' && interaction.Defender.UnitType === 'Fighters'){
                console.log(`Heavenly Rays`)    
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.15)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${Defender,Player} **${interaction.Defender.Name}'s Attack** to **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // Silver Comet
        if (interaction.Defender.OfficerSkill === 'Twin Fangs') { // Awoken Skill 5 
            if (interaction.Defender.UnitType === 'Fighters') { 
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Defender.UnitType === 'Bombers' || 'Fighters'){
                console.log(`Twin Fangs`)            
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.25)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // The Witcher
        if (interaction.Defender.OfficerSkill === 'Night Evader') { // Awoken Skill 5
            if (interaction.Defender.UnitType === 'Bombers' || 'Fighters'){
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Night Evader`)            
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Attacker.AttackPower * .2)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower - Power

                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(RedCross)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & decreases **${interaction.Attacker.Player}** **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Golden Pixie
        if (interaction.Defender.OfficerSkill === 'Unleashed Justice') { // Awoken Skill 5 
            if (interaction.Defender.UnitType === 'Bombers'){
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            } 
            if (interaction.Defender.UnitType === 'Bombers'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Unleashed Justice`)            
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .2)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // El Cartero
        if (interaction.Defender.OfficerSkill === 'Sticky Situation') { // Awoken Skill 5 
            if (interaction.Defender.UnitType === 'Bombers'){
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Sticky Situation`)            
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .2)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Polar Phantom
        if (interaction.Defender.OfficerSkill === 'Desperate Counterattack') { // Awoken Skill 5
            if (interaction.Defender.UnitType === 'Fighters'){
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Defender.UnitType === 'Fighters') {
                console.log(`Desperate Counterattack`)        
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .25)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
        }
            } 
        }        
        // Rictus Reaper
        if (interaction.Defender.OfficerSkill === 'Last Gasp') { // Awoken Skill 5
            if (interaction.Defender.UnitType === 'Bombers'){
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Defender.UnitType === 'Bombers'){
                console.log(`Last Gasp`)            
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .2)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}}
        // Bladewing
        if (interaction.Defender.OfficerSkill === 'Falling Star') { // Awoken Skill 5
            if (interaction.Defender.UnitType === 'Fighters'){
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Defender.UnitType === 'Bombers' || 'Fighters'){
                console.log(`Falling Star`)            
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .15)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}}
        // Vox Veritatis
        if (interaction.Defender.OfficerSkill === 'Winning Mentality') { // Awoken Skill 5
            if (interaction.Defender.AttackType === 'Ground') {
                const Damage = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
                console.log(`Winning Mentality`)            
                const Health = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.BattleHealth * .15))
                interaction.Defender.BattleHealth = interaction.Defender.BattleHealth + Health

                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Health** by **${Health.toLocaleString()}**` },
                    ),   
            console.log(Health.toLocaleString())
            interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}
        // Lady Liberte 
        if (interaction.Defender.OfficerSkill === 'Art of War') {
            if (interaction.Defender.AttackType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const Damage = interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * .1) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Art of War`)
                const Power = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.AttackPower * 0.15)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower + Power
                const Health = Math.round(interaction.Defender.SkillMultiplier * (interaction.Defender.BattleHealth * 0.15)) 
                interaction.Defender.BattleHealth = interaction.Defender.BattleHealth + Health

                skillEmbed
                    .setColor(interaction.Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                        { name: `${interaction.Defender.Officer}`, value: `used the **${interaction.Defender.OfficerSkill} Skill** & increases ${interaction.Defender.Player} **${interaction.Defender.Name}'s Health** by **${Health.toLocaleString()}**` },
                    ),   
                    console.log(Power.toLocaleString())
                    console.log(Health.toLocaleString())
                    interaction.Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}}
}}
