const sql = require("../config/Database");
const { EmbedBuilder } = require('discord.js');
const { Colours } = require('../data/colours')
const { sleep } = require('../functions/discordFunctions')
const { chance0, chance5, chance10, chance15, chance20, chance25, chance30, chance35, chance40, chance45, chance50, chance55, chance60, chance65, chance70, chance75, chance80, chance85, chance90, chance95, chance100 } = require('../data/chance');
module.exports = {
    attackerSkills: async function (interaction) {
        const Boom = 'http://battle-bot.com/img/Boom.jpg'
        const RedCross = 'http://battle-bot.com/img/RedCross.png'
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        interaction.Attacker.SkillUsed, interaction.Defender.SkillUsed = ''
        if (interaction.Attacker.OfficerLevel === 0) {
            interaction.Attacker.OfficerLevel = 1
            console.log(`Officer Not Levelled Up`)
        }

        const campColors = {
            Vanguard: Colours.Vanguard,
            Liberty: Colours.Liberty,
            MartyrsW: Colours.MartyrsW,
        };
        
        if (interaction.Attacker.UnitCamp && campColors[interaction.Attacker.UnitCamp]) {
            interaction.Attacker.SkillColor = campColors[interaction.Attacker.UnitCamp];
        }
        
        if (interaction.Attacker.UnitCamp && interaction.Attacker.OfficerCamp) {
            const boostColor = `${interaction.Attacker.UnitCamp}Boost`;
            if (campColors[interaction.Attacker.OfficerCamp + boostColor]) {
                interaction.Attacker.SkillColor = campColors[interaction.Attacker.OfficerCamp + boostColor];
            }
        }
        //Skill Chance
        chance = chance0
        const chances = [
            chance0, chance5, chance10, chance15, chance20,
            chance25, chance30, chance35, chance40, chance45,
            chance50, chance55, chance60, chance65, chance70,
            chance75, chance80, chance85, chance90, chance95,
            chance100
        ];
        
        if (interaction.Attacker.SkillLevel >= 0 && interaction.Attacker.SkillLevel <= 19) {
            chance = chances[interaction.Attacker.SkillLevel];
        } else if (interaction.Attacker.SkillLevel > 19) {
            chance = chances[chances.length - 1];
        }
        
        const skillEmbed = new EmbedBuilder();
        skillEmbed.setURL('http://www.battle-bot.com')
        skillEmbed.setTitle(`Battle Bot™`)
        skillEmbed.setColor('#ff5b05');
        skillEmbed.setThumbnail(guildIcon);
        skillEmbed.setAuthor({
            name: interaction.member.displayName,
            iconURL: interaction.member.displayAvatarURL({ dynamic: true })
        });
        skillEmbed.setFooter({
            text: `Battle ID:${interaction.id} - ${interaction.Defender.Player || interaction.member.displayName}`,
            iconURL: guildIcon
        });
                            
        //Sergeant Spanner
        if (interaction.Attacker.OfficerSkill === 'Indomitable') { //Awoken Skill
                if (interaction.Attacker.UnitType === 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                    const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                    interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                    console.log(`Attacker Skill Unit Buff`, Damage.toLocaleString())
                }
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                if (skillSuccess === 'Yes') {
                    console.log(skillSuccess,chance)
                    console.log(`Indomitable`)
                    const Health = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.BattleHealth * 0.3))
                    if (interaction.Attacker.BattleHealth > 0) {
                        interaction.Attacker.BattleHealth = interaction.Attacker.BattleHealth + Health
                        console.log(`Health Increased`, Health)
                    } else return console.log(`Health Error`)
                    console.log(Health)
    
                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Health** to **${Health.toLocaleString()}**` },
                    )   
                interaction.Attacker.SkillUsed = 'Health'
                interaction.followUp({embeds: [skillEmbed]})
                return
                } 
        }            
        //Angel of Light
        if (interaction.Attacker.OfficerSkill === 'Caring Angel') { // Awoken Skill 5
            if (interaction.Attacker.UnitType === 'Infantry') {
                const Damage = interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }   
            if (interaction.Defender.SkillUsed === 'Attack') {
                console.log(`Caring Angel`)
                const Health = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.BattleHealth * 0.35)) 
                if (interaction.Attacker.BattleHealth > 0) {
                    interaction.Attacker.BattleHealth = interaction.Attacker.BattleHealth + Health
                    console.log(`Health Increased`, Health)
                } else return console.log(`Health Error`)
    
                skillEmbed
                        .setColor(interaction.Attacker.SkillColor)
                        .setThumbnail(RedCross)
                        .addFields(
                            { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Health** to **${Health.toLocaleString()}**` },
                        )  
                interaction.followUp({embeds: [skillEmbed]})
                interaction.Attacker.SkillUsed = 'Health'
                return
            } 
        }        
        // War Machine
        if (interaction.Attacker.OfficerSkill === `The Soldier's Soldier`) {
            if (interaction.Attacker.AttackType === 'Ground') {
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`The Soldier's Soldier`)  
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.125)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        //Tip of the Spear 
        if (interaction.Attacker.OfficerSkill === 'Undaunted') { // Awoken Skill 5
            if (interaction.Attacker.AttackType === 'Ground') {
                const Damage = interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }   
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Undaunted`)  
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.5)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        //Valkyrie
        if (interaction.Attacker.OfficerSkill === 'Who Dares Wins') { // Awoken Skill 5
            if (interaction.Attacker.UnitType === 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            if (interaction.Defender.AttackType === 'Ground') {
                console.log(`Who Dares Wins`)   
                const Health = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Defender.BattleHealth * 0.2)) 
                if (interaction.Defender.BattleHealth > 0) {
                    interaction.Defender.BattleHealth - Health
                    console.log(`Health Decreased`, Health)
                } else return console.log(`Health Error`)
    
                skillEmbed
                        .setColor(interaction.Attacker.SkillColor)
                        .setThumbnail(RedCross)
                        .addFields(
                            { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & decreases **${interaction.Defender.Player}** **${interaction.Defender.Name}'s Health** by **${Health.toLocaleString()}**` },
                        )  
                interaction.followUp({embeds: [skillEmbed]})
                interaction.Attacker.SkillUsed = 'Health'
                return
            }         
        }
        //Lady Justice        
        if (interaction.Attacker.OfficerSkill === 'Guardian Angel') { // Awoken Skill 5
            if (interaction.Attacker.AttackType === 'Ground') {
                const Damage = interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Guardian Angel`)  
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.2)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }
        // Eye of Providence 
        if (interaction.Attacker.OfficerSkill === 'Hand of Destruction') { // Awoken Skill 5 
            if (interaction.Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers') {
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Hand of Destruction`)
                const Power = interaction.Attacker.SkillLevel * (interaction.Attacker.AttackPower * 0.4) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // Percy
        if (interaction.Attacker.OfficerSkill === 'Frontline Fire') { // Awoken Skill 5
            if (interaction.Attacker.AttackType === 'Ground') {
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }              
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Frontline Fire`)            
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.18)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // White Wolf
        if (interaction.Attacker.OfficerSkill === 'Vengeance') { // Awoken Skill 5 
            if (interaction.Attacker.UnitType === 'Infantry') {
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(`Vengeance`)   
                console.log(skillSuccess,chance)         
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.3)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power
                if (interaction.Attacker.UnitType === 'Infantry') {
                    const Special = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.25))  
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
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Antonina Shevchenko
        if (interaction.Attacker.OfficerSkill === 'The Motherland') { // Awoken Skill 5
            if (interaction.Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers') {
                const Damage = interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`The Motherland`)
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.5)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Damage.toLocaleString()}**` },
                    ),   
            console.log(Damage.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // Winter Huntsman
        if (interaction.Attacker.OfficerSkill === 'Mine Detonator') { // Awoken Skill 5
            if (interaction.Attacker.AttackType === 'Ground') {
                const Damage = interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Mine Detonator`)            
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.135)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power
                if (interaction.Defender.UnitType === 'Infantry') {
                    const Health = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Defender.BattleHealth * .25)) 
                    interaction.Defender.BattleHealth = interaction.Defender.BattleHealth - Health
                    skillEmbed
                        .setColor(interaction.Attacker.SkillColor)
                        .setImage(RedCross)
                        .addFields(
                            { name: `${interaction.Attacker.OfficerSkill}`, value: `**${interaction.Attacker.Officer}** & reduces **${interaction.Defender.Player}** **${interaction.Defender.Name}'s Heal** by **${Health.toLocaleString()}**` },
                    ) 
                }

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${damage.toLocaleString()}**` },
                    ),   
            console.log(damage.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }      
        // The Eruptor  
        if (interaction.Attacker.OfficerSkill === 'Flamestorm') {
            if (interaction.Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers') {
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Flamestorm`)
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }                
        // Steel Fighter
        if (interaction.Attacker.OfficerSkill === 'Inpenetrable') { // Awoken Skill 5 
            if (interaction.Attacker.UnitType === 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Inpenetrable`) 
                const Health = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.BattleHealth * 0.5)) 
                interaction.Attacker.BattleHealth = interaction.Attacker.BattleHealth + Health
                if (interaction.Attacker.BattleHealth > 0) {
                    console.log(`Health Increased`, Health)
                } else return console.log(`Health Error`)

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(RedCross)
                        .addFields(
                            { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Health** to **${Health.toLocaleString()}**` },
                        )   
            interaction.Attacker.SkillUsed = 'Health'
            interaction.followUp({embeds: [skillEmbed]})
            return
            }         
        }        
        // Iron Bastion
        if (interaction.Attacker.OfficerSkill === 'Breaching Charge') { // Awoken Skill 5 
            if (interaction.Attacker.UnitType === 'Infantry') {
                const Damage = interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Breaching Charge`)            
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.3)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power
                if (interaction.Defender.UnitType === 'Infantry') {
                    console.log(`Breaching Infantry Charge `)            
                    console.log(Special.toLocaleString())
                    const Special = (interaction.Attacker.AttackPower * .5) * interaction.Attacker.SkillLevel
                    interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Special
                    skillEmbed
                        .setColor(interaction.Attacker.SkillColor)
                        .setImage(Boom)
                        .addFields(
                            { name: `${interaction.Attacker.OfficerSkill}`, value: `**${interaction.Attacker.Officer}** & reduces **${interaction.Defender.Player}** **${interaction.Defender.Name}'s Health** by **${Special.toLocaleString()}**` },
                    ) 
                }

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Berserker Bear
        if (interaction.Attacker.OfficerSkill === 'Flaming Meteors') {
            if (interaction.Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            if (interaction.Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Flaming Meteors`)
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.3)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power
                skillEmbed  
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // Guardian of Truth
        if (interaction.Attacker.OfficerSkill === 'Master of War') { // Awoken Skill 5
            if (interaction.Attacker.UnitType === 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Master of War`)            
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.1))
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }   
        // Death Adder     
        if (interaction.Attacker.OfficerSkill === 'Phantom Power') { // Awoken Skill 5
            if (interaction.Attacker.AttackType === 'Ground') {
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Phantom Power`)            
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.1))
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power
                const Health = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.BattleHealth * 0.2))
                interaction.Attacker.BattleHealth = interaction.Attacker.BattleHealth + Health

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setImage(RedCross)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                        { name: `${interaction.Attacker.OfficerSkill}`, value: `**${interaction.Attacker.Officer}** increases **${interaction.member}** **${interaction.Attacker.Name}'s Health** by **${Health.toLocaleString()}**` },
                    ),   
            console.log(Health.toLocaleString() && Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Bloody Mary
        if (interaction.Attacker.OfficerSkill === 'Blinding Flash') { // Awoken Skill 5 
            if (interaction.Attacker.AttackType === 'Ground') {
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Blinding Flash`)            
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Saber of The Nation 
        if (interaction.Attacker.OfficerSkill === 'Rain of Blades') { // Awoken Skill 5 
            if (interaction.Attacker.AttackType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const Damage = interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Rain of Blades`)
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power

                skillEmbed  
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }       
        // Argent Flame 
        if (interaction.Attacker.OfficerSkill === 'Devastation') {
            if (interaction.Attacker.AttackType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Devastation`)
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.25)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}}        
        // Thorn Countess
        if (interaction.Attacker.OfficerSkill === 'Beauty Worth Preserving') { // Awoken Skill 5
            if (interaction.Attacker.UnitType === 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Beauty Worth Preserving`)            
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.15)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power
                const Special = Math.round(interaction.Defender.AttackPower * .1)
                interaction.Defender.AttackPower = interaction.Defender.AttackPower - Special

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(RedCross)
                    .setImage(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                        { name: `${interaction.Attacker.OfficerSkill}`, value: `**${interaction.Attacker.Officer}** & decreases **${interaction.Defender.Player}** **${interaction.Defender.Name}'s Health** by **${Special.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString(), Special.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Professor Pain 
        if (interaction.Attacker.OfficerSkill === 'Forlorn Hope') { // Awoken Skill 5
            if (interaction.Attacker.UnitType === 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Forlorn Hope`)            
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.15)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Wings of Glory
        if (interaction.Attacker.OfficerSkill === 'Sky Dancer') { // Awoken Skill 5 
            if (interaction.Attacker.UnitType === 'Fighters') {
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Attacker.UnitType === 'Bombers' || 'Fighters'){
                console.log(`Sky Dancer`)
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.15)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // Brisk Eagle
        if (interaction.Attacker.OfficerSkill === 'Untouchable') { // Awoken Skill 5
            if (interaction.Attacker.UnitType === 'Fighters' || 'Bombers') {
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                if (skillSuccess === 'Yes') {
                    console.log(skillSuccess,chance)
                    console.log(`Untouchable`)   
                    const Defend = interaction.Defender.AttackPower
                    interaction.Defender.AttackPower = 0
    
                    skillEmbed
                        .setColor(interaction.Attacker.SkillColor)
                        .setThumbnail(RedCross)
                        .addFields(
                            { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & decreases **${interaction.Defender.Player}** **${interaction.Defender.Name}'s Attack** to **${interaction.Defender.AttackPower.toLocaleString()}**` },
                        ),   
                console.log(interaction.Attacker.AttackPower.toLocaleString())
                console.log(interaction.Defender.AttackPower.toLocaleString())
                interaction.Attacker.SkillUsed = 'Attack'
                interaction.followUp({embeds: [skillEmbed]})
                sleep(500 * interaction.Attacker.SkillMultiplier)
                interaction.Defender.AttackPower = Defend
                return
                } 
            }        
        // Heavens Saviour
        if (interaction.Attacker.OfficerSkill === 'Heavenly Rays') { // Awoken Skill 5 
            if (interaction.Attacker.UnitType === 'Fighters') {
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Attacker.UnitType === 'Fighters' && interaction.Defender.UnitType === 'Fighters'){
                console.log(`Heavenly Rays`)    
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.15)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** to **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // Silver Comet
        if (interaction.Attacker.OfficerSkill === 'Twin Fangs') { // Awoken Skill 5 
            if (interaction.Attacker.UnitType === 'Fighters') { 
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Attacker.UnitType === 'Bombers' || 'Fighters'){
                console.log(`Twin Fangs`)            
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.25)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // The Witcher
        if (interaction.Attacker.OfficerSkill === 'Night Evader') { // Awoken Skill 5
            if (interaction.Attacker.UnitType === 'Bombers' || 'Fighters'){
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Night Evader`)            
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Defender.AttackPower * .2)) 
                interaction.Defender.AttackPower = interaction.Defender.AttackPower - Power

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(RedCross)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & decreases **${interaction.Defender.Player}** **${interaction.Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Golden Pixie
        if (interaction.Attacker.OfficerSkill === 'Unleashed Justice') { // Awoken Skill 5 
            if (interaction.Attacker.UnitType === 'Bombers'){
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            if (interaction.Attacker.UnitType === 'Bombers'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Unleashed Justice`)            
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .2)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // El Cartero
        if (interaction.Attacker.OfficerSkill === 'Sticky Situation') { // Awoken Skill 5 
            if (interaction.Attacker.UnitType === 'Bombers'){
                const Damage = interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Sticky Situation`)            
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .2)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Polar Phantom
        if (interaction.Attacker.OfficerSkill === 'Desperate Counterattack') { // Awoken Skill 5
            if (interaction.Attacker.UnitType === 'Fighters'){
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Attacker.UnitType === 'Fighter') {
                console.log(`Desperate Counterattack`)        
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .25)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power
                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
        }
            } 
        }        
        // Rictus Reaper
        if (interaction.Attacker.OfficerSkill === 'Last Gasp') { // Awoken Skill 5
            if (interaction.Attacker.UnitType === 'Bombers'){
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Attacker.UnitType === 'Bombers'){
                console.log(`Last Gasp`)            
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .2)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}}
        // Bladewing
        if (interaction.Attacker.OfficerSkill === 'Falling Star') { // Awoken Skill 5
            if (interaction.Attacker.UnitType === 'Fighters'){
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Attacker.UnitType === 'Bombers' || 'Fighters'){
                console.log(`Falling Star`)            
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .15)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}}
        // Vox Veritatis
        if (interaction.Attacker.OfficerSkill === 'Winning Mentality') { // Awoken Skill 5
            if (interaction.Attacker.AttackType === 'Ground') {
                const Damage = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
                console.log(`Winning Mentality`)            
                const Health = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.BattleHealth * .15))
                interaction.Attacker.BattleHealth = interaction.Attacker.BattleHealth + Health

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Health** by **${Health.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}
        // Lady Liberte 
        if (interaction.Attacker.OfficerSkill === 'Art of War') {
            if (interaction.Attacker.AttackType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const Damage = interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * .1) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (interaction.Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Art of War`)
                const Power = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.AttackPower * 0.15)) 
                interaction.Attacker.AttackPower = interaction.Attacker.AttackPower + Power
                const Health = Math.round(interaction.Attacker.SkillMultiplier * (interaction.Attacker.BattleHealth * 0.15)) 
                interaction.Attacker.BattleHealth = interaction.Attacker.BattleHealth + Health

                skillEmbed
                    .setColor(interaction.Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                        { name: `${interaction.Attacker.Officer}`, value: `used the **${interaction.Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${interaction.Attacker.Name}'s Health** by **${Health.toLocaleString()}**` },
                    ),   
                    console.log(Power.toLocaleString())
                    console.log(Health.toLocaleString())
                    interaction.Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}}
}}
