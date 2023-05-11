const sql = require("../config/Database");
const { EmbedBuilder } = require('discord.js');
const { Colours } = require('../data/colours')
const { sleep } = require('../functions/discordFunctions')
const { chance0, chance5, chance10, chance15, chance20, chance25, chance30, chance35, chance40, chance45, chance50, chance55, chance60, chance65, chance70, chance75, chance80, chance85, chance90, chance95, chance100 } = require('../data/chance');
const { Player } = require("discord-player");
module.exports = {
    officerSkills: async function (interaction, Attacker, Defender) {
        const Boom = 'http://phfamily.co.uk/img/Boom.jpg'
        const RedCross = 'http://phfamily.co.uk/img/RedCross.png'
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        Attacker.SkillUsed, Defender.SkillUsed = ''
        if (Attacker.OfficerLevel === 0) {
            Attacker.OfficerLevel = 1
            console.log(`Officer Not Levelled Up`)
        }

        if (Attacker.UnitCamp === 'Vanguard') {
            Attacker.SkillColor = Colours.Vanguard
        }
        if (Attacker.UnitCamp === 'Liberty') {
            Attacker.SkillColor = Colours.Liberty
        }
        if (Attacker.UnitCamp === 'MartyrsW') {
            Attacker.SkillColor = Colours.MartyrsW
        }
        if (Attacker.UnitCamp && Attacker.OfficerCamp === 'Vanguard') {
            Attacker.SkillColor = Colours.VanguardBoost
        }
        if (Attacker.UnitCamp && Attacker.OfficerCamp === 'Liberty') {
            Attacker.SkillColor = Colours.LibertyBoost
        }
        if (Attacker.UnitCamp && Attacker.OfficerCamp === 'MartyrsW') {
            Attacker.SkillColor = Colours.MartyrsWBoost
        }
        let chance = chance0
        if (Attacker.SkillLevel === 0) {
            chance = chance0
        }
        if (Attacker.SkillLevel === 1) {
            chance = chance5
        }
        if (Attacker.SkillLevel === 2) {
            chance = chance10
        }
        if (Attacker.SkillLevel === 3) {
            chance = chance15
        }
        if (Attacker.SkillLevel === 4) {
            chance = chance20
        }
        if (Attacker.SkillLevel === 5) {
            chance = chance25
        }
        if (Attacker.SkillLevel === 6) {
            chance = chance30
        }
        if (Attacker.SkillLevel === 7) {
            chance = chance35
        }
        if (Attacker.SkillLevel === 8) {
            chance = chance40
        }
        if (Attacker.SkillLevel === 9) {
            chance = chance45
        }
        if (Attacker.SkillLevel === 10) {
            chance = chance50
        }
        if (Attacker.SkillLevel === 11) {
            chance = chance55
        }
        if (Attacker.SkillLevel === 12) {
            chance = chance60
        }
        if (Attacker.SkillLevel === 13) {
            chance = chance65
        }
        if (Attacker.SkillLevel === 14) {
            chance = chance70
        }
        if (Attacker.SkillLevel === 15) {
            chance = chance75
        }
        if (Attacker.SkillLevel === 16) {
            chance = chance80
        }
        if (Attacker.SkillLevel === 17) {
            chance = chance85
        }
        if (Attacker.SkillLevel === 18) {
            chance = chance90
        }
        if (Attacker.SkillLevel === 19) {
            chance = chance95
        }
        if (Attacker.SkillLevel > 19) {
            chance = chance100
        }

        const skillEmbed = new EmbedBuilder();
            skillEmbed 
                    .setColor('#ff5b05')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Battles`, iconURL: `${guildIcon}`});
                    
        //Sergeant Spanner
        if (Attacker.OfficerSkill === 'Indomitable') { //Awoken Skill
                if (Attacker.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                    const Damage = Math.round(Attacker.SkillMultiplier * (Attacker.AttackPower * .1)) 
                    Attacker.AttackPower = Attacker.AttackPower + Damage
                    console.log(`Attacker Skill Unit Buff`, Damage.toLocaleString())
                }
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                if (skillSuccess === 'Yes') {
                    console.log(skillSuccess,chance)
                    console.log(`Indomitable`)
                    const Health = Attacker.SkillMultiplier * (Attacker.BattleHealth * 0.3)
                    if (Attacker.BattleHealth > 0) {
                        Attacker.BattleHealth = Attacker.BattleHealth + Health
                        console.log(`Health Increased`, Health)
                    } else return console.log(`Health Error`)
                    console.log(Health)
    
                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Health** to **${Health.toLocaleString()}**` },
                    )   
                Attacker.SkillUsed = 'Health'
                interaction.followUp({embeds: [skillEmbed]})
                return
                } 
        }            
        //Angel of Light
        if (Attacker.OfficerSkill === 'Caring Angel') { // Awoken Skill 5
            if (Attacker.UnitType = 'Infantry') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1)
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }   
            if (Defender.SkillUsed === 'Attack') {
                console.log(`Caring Angel`)
                const Health = Attacker.SkillMultiplier * (Attacker.BattleHealth * 0.35) 
                if (Attacker.BattleHealth > 0) {
                    Attacker.BattleHealth = Attacker.BattleHealth + Health
                    console.log(`Health Increased`, Health)
                } else return console.log(`Health Error`)
    
                skillEmbed
                        .setColor(Attacker.SkillColor)
                        .setThumbnail(RedCross)
                        .addFields(
                            { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Health** to **${Health.toLocaleString()}**` },
                        )  
                interaction.followUp({embeds: [skillEmbed]})
                Attacker.SkillUsed = 'Health'
                return
            } 
        }        
        // War Machine
        if (Attacker.OfficerSkill === `The Soldier's Soldier`) {
            if (Attacker.AttackType = 'Ground') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`The Soldier's Soldier`)  
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.125) 
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        //Tip of the Spear 
        if (Attacker.OfficerSkill === 'Undaunted') { // Awoken Skill 5
            if (Attacker.AttackType = 'Ground') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }   
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Undaunted`)  
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.5) 
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        //Valkyrie
        if (Attacker.OfficerSkill === 'Who Dares Wins') { // Awoken Skill 5
            if (Attacker.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            if (Defender.AttackType === 'Ground') {
                console.log(`Who Dares Wins`)   
                const Health = Attacker.SkillMultiplier * (Defender.BattleHealth * 0.2) 
                if (Defender.BattleHealth > 0) {
                    Defender.BattleHealth - Health
                    console.log(`Health Decreased`, Health)
                } else return console.log(`Health Error`)
    
                skillEmbed
                        .setColor(Attacker.SkillColor)
                        .setThumbnail(RedCross)
                        .addFields(
                            { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & decreases **${Defender.Player}** **${Defender.Name}'s Health** by **${Health.toLocaleString()}**` },
                        )  
                interaction.followUp({embeds: [skillEmbed]})
                Attacker.SkillUsed = 'Health'
                return
            }         
        }
        //Lady Justice        
        if (Attacker.OfficerSkill === 'Guardian Angel') { // Awoken Skill 5
            if (Attacker.AttackType = 'Ground') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Guardian Angel`)  
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.2) 
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }
        // Eye of Providence 
        if (Attacker.OfficerSkill === 'Hand of Destruction') { // Awoken Skill 5 
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Hand of Destruction`)
                const Power = Attacker.SkillLevel * (Attacker.AttackPower * 0.4) 
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // Percy
        if (Attacker.OfficerSkill === 'Frontline Fire') { // Awoken Skill 5
            if (Attacker.AttackType = 'Ground') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }              
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Frontline Fire`)            
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.18) 
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // White Wolf
        if (Attacker.OfficerSkill === 'Vengeance') { // Awoken Skill 5 
            if (Attacker.UnitType === 'Infantry') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(`Vengeance`)   
                console.log(skillSuccess,chance)         
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.3) 
                Attacker.AttackPower = Attacker.AttackPower + Power
                if (Attacker.UnitType === 'Infantry') {
                    const Special = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.25)  
                    Attacker.AttackPower = Attacker.AttackPower + Special
                    console.log(Special.toLocaleString())

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setImage(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Special.toLocaleString() || Power.toLocaleString()}**` },
                    )  
                }
                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString() || Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Antonina Shevchenko
        if (Attacker.OfficerSkill === 'The Motherland') { // Awoken Skill 5
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`The Motherland`)
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.5) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Damage.toLocaleString()}**` },
                    ),   
            console.log(Damage.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // Winter Huntsman
        if (Attacker.OfficerSkill === 'Mine Detonator') { // Awoken Skill 5
            if (Attacker.AttackType === 'Ground') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Mine Detonator`)            
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.135) 
                Attacker.AttackPower = Attacker.AttackPower + Power
                if (Defender.UnitType === 'Infantry') {
                    const Health = Attacker.SkillMultiplier * (Defender.BattleHealth * .25) 
                    Defender.BattleHealth = Defender.BattleHealth - Health
                    skillEmbed
                        .setColor(Attacker.SkillColor)
                        .setImage(RedCross)
                        .addFields(
                            { name: `${Attacker.OfficerSkill}`, value: `**${Attacker.Officer}** & reduces **${Defender.Player}** **${Defender.Name}'s Heal** by **${Health.toLocaleString()}**` },
                    ) 
                }

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${damage.toLocaleString()}**` },
                    ),   
            console.log(damage.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }      
        // The Eruptor  
        if (Attacker.OfficerSkill === 'Flamestorm') {
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Flamestorm`)
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.1) 
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }                
        // Steel Fighter
        if (Attacker.OfficerSkill === 'Inpenetrable') { // Awoken Skill 5 
            if (Attacker.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Inpenetrable`) 
                const Health = Attacker.SkillMultiplier * (Attacker.BattleHealth * 0.5) 
                Attacker.BattleHealth = Attacker.BattleHealth + Health
                if (Attacker.BattleHealth > 0) {
                    console.log(`Health Increased`, Health)
                } else return console.log(`Health Error`)

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(RedCross)
                        .addFields(
                            { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Health** to **${Health.toLocaleString()}**` },
                        )   
            Attacker.SkillUsed = 'Health'
            interaction.followUp({embeds: [skillEmbed]})
            return
            }         
        }        
        // Iron Bastion
        if (Attacker.OfficerSkill === 'Breaching Charge') { // Awoken Skill 5 
            if (Attacker.UnitType === 'Infantry') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Breaching Charge`)            
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.3) 
                Attacker.AttackPower = Attacker.AttackPower + Power
                if (Defender.UnitType === 'Infantry') {
                    console.log(`Breaching Infantry Charge `)            
                    console.log(Special.toLocaleString())
                    const Special = (Attacker.AttackPower * .5) * Attacker.SkillLevel
                    Attacker.AttackPower = Attacker.AttackPower + Special
                    skillEmbed
                        .setColor(Attacker.SkillColor)
                        .setImage(Boom)
                        .addFields(
                            { name: `${Attacker.OfficerSkill}`, value: `**${Attacker.Officer}** & reduces **${Defender.Player}** **${Defender.Name}'s Health** by **${Special.toLocaleString()}**` },
                    ) 
                }

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Berserker Bear
        if (Attacker.OfficerSkill === 'Flaming Meteors') {
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Flaming Meteors`)
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.3) 
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed  
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // Guardian of Truth
        if (Attacker.OfficerSkill === 'Master of War') { // Awoken Skill 5
            if (Attacker.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Master of War`)            
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.1)
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }   
        // Death Adder     
        if (Attacker.OfficerSkill === 'Phantom Power') { // Awoken Skill 5
            if (Attacker.AttackType === 'Ground') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Phantom Power`)            
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.1)
                Attacker.AttackPower = Attacker.AttackPower + Power
                const Health = Attacker.SkillMultiplier * (Attacker.BattleHealth * 0.2)
                Attacker.BattleHealth = Attacker.BattleHealth + Health

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setImage(RedCross)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                        { name: `${Attacker.OfficerSkill}`, value: `**${Attacker.Officer}** increases **${interaction.member}** **${Attacker.Name}'s Health** by **${Health.toLocaleString()}**` },
                    ),   
            console.log(Health.toLocaleString() && Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Bloody Mary
        if (Attacker.OfficerSkill === 'Blinding Flash') { // Awoken Skill 5 
            if (Attacker.AttackType === 'Ground') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Blinding Flash`)            
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.1) 
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Saber of The Nation 
        if (Attacker.OfficerSkill === 'Rain of Blades') { // Awoken Skill 5 
            if (Attacker.AttackType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Rain of Blades`)
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.1) 
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed  
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }       
        // Argent Flame 
        if (Attacker.OfficerSkill === 'Devastation') {
            if (Attacker.AttackType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Devastation`)
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.25) 
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}}        
        // Thorn Countess
        if (Attacker.OfficerSkill === 'Beauty Worth Preserving') { // Awoken Skill 5
            if (Attacker.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Beauty Worth Preserving`)            
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.15) 
                Attacker.AttackPower = Attacker.AttackPower + Power
                const Special = Math.round(Defender.AttackPower * .1)
                Defender.AttackPower = Defender.AttackPower - Special

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(RedCross)
                    .setImage(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                        { name: `${Attacker.OfficerSkill}`, value: `**${Attacker.Officer}** & decreases **${Defender.Player}** **${Defender.Name}'s Health** by **${Special.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString(), Special.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Professor Pain 
        if (Attacker.OfficerSkill === 'Forlorn Hope') { // Awoken Skill 5
            if (Attacker.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Forlorn Hope`)            
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.15) 
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Wings of Glory
        if (Attacker.OfficerSkill === 'Sky Dancer') { // Awoken Skill 5 
            if (Attacker.UnitType = 'Fighters') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Bombers' || 'Fighters'){
                console.log(`Sky Dancer`)
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.15) 
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // Brisk Eagle
        if (Attacker.OfficerSkill === 'Untouchable') { // Awoken Skill 5
            if (Attacker.UnitType = 'Fighters' || 'Bombers') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                if (skillSuccess === 'Yes') {
                    console.log(skillSuccess,chance)
                    console.log(`Untouchable`)   
                    const Defend = Defender.AttackPower
                    Defender.AttackPower = 0
    
                    skillEmbed
                        .setColor(Attacker.SkillColor)
                        .setThumbnail(RedCross)
                        .addFields(
                            { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & decreases **${Defender.Player}** **${Defender.Name}'s Attack** to **${Defender.AttackPower.toLocaleString()}**` },
                        ),   
                console.log(Attacker.AttackPower.toLocaleString())
                console.log(Defender.AttackPower.toLocaleString())
                Attacker.SkillUsed = 'Attack'
                interaction.followUp({embeds: [skillEmbed]})
                sleep(500 * Attacker.SkillMultiplier)
                Defender.AttackPower = Defend
                return
                } 
            }        
        // Heavens Saviour
        if (Attacker.OfficerSkill === 'Heavenly Rays') { // Awoken Skill 5 
            if (Attacker.UnitType = 'Fighters') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Fighters' && Defender.UnitType === 'Fighters'){
                console.log(`Heavenly Rays`)    
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.15) 
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** to **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // Silver Comet
        if (Attacker.OfficerSkill === 'Twin Fangs') { // Awoken Skill 5 
            if (Attacker.UnitType = 'Fighters') { 
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Bombers' || 'Fighters'){
                console.log(`Twin Fangs`)            
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.25) 
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // The Witcher
        if (Attacker.OfficerSkill === 'Night Evader') { // Awoken Skill 5
            if (Attacker.UnitType === 'Bombers' || 'Fighters'){
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Night Evader`)            
                const Power = Attacker.SkillMultiplier * (Defender.AttackPower * .2) 
                Defender.AttackPower = Defender.AttackPower - Power

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(RedCross)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & decreases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Golden Pixie
        if (Attacker.OfficerSkill === 'Unleashed Justice') { // Awoken Skill 5 
            if (Attacker.UnitType === 'Bombers'){
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            if (Attacker.UnitType === 'Bombers'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Unleashed Justice`)            
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * .2) 
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // El Cartero
        if (Attacker.OfficerSkill === 'Sticky Situation') { // Awoken Skill 5 
            if (Attacker.UnitType === 'Bombers'){
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Sticky Situation`)            
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * .2) 
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Polar Phantom
        if (Attacker.OfficerSkill === 'Desperate Counterattack') { // Awoken Skill 5
            if (Attacker.UnitType === 'Fighters'){
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Fighter') {
                console.log(`Desperate Counterattack`)        
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * .25) 
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
        }
            } 
        }        
        // Rictus Reaper
        if (Attacker.OfficerSkill === 'Last Gasp') { // Awoken Skill 5
            if (Attacker.UnitType === 'Bombers'){
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Bombers'){
                console.log(`Last Gasp`)            
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * .2) 
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}}
        // Bladewing
        if (Attacker.OfficerSkill === 'Falling Star') { // Awoken Skill 5
            if (Attacker.UnitType === 'Fighters'){
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Bombers' || 'Fighters'){
                console.log(`Falling Star`)            
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * .15) 
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}}
        // Vox Veritatis
        if (Attacker.OfficerSkill === 'Winning Mentality') { // Awoken Skill 5
            if (Attacker.AttackType = 'Ground') {
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
                console.log(`Winning Mentality`)            
                const Health = Attacker.SkillMultiplier * (Attacker.BattleHealth * .15)
                Attacker.BattleHealth = Attacker.BattleHealth + Health

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Health** by **${Health.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}
        // Lady Liberte 
        if (Attacker.OfficerSkill === 'Art of War') {
            if (Attacker.AttackType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const Damage = Attacker.SkillMultiplier * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Art of War`)
                const Power = Attacker.SkillMultiplier * (Attacker.AttackPower * 0.15) 
                Attacker.AttackPower = Attacker.AttackPower + Power
                const Health = Attacker.SkillMultiplier * (Attacker.BattleHealth * 0.15) 
                Attacker.BattleHealth = Attacker.BattleHealth + Health

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Health** by **${Health.toLocaleString()}**` },
                    ),   
                    console.log(Power.toLocaleString())
                    console.log(Health.toLocaleString())
                    Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}}

    //Defender Skills
    if (Defender.UnitCamp === 'Vanguard') {
        Defender.SkillColor = Colours.Vanguard
    }
    if (Defender.UnitCamp === 'Liberty') {
        Defender.SkillColor = Colours.Liberty
    }
    if (Defender.UnitCamp === 'MartyrsW') {
        Defender.SkillColor = Colours.MartyrsW
    }

    chance = chance0
    if (Defender.SkillLevel === 0) {
        chance = chance0
    }
    if (Defender.SkillLevel === 1) {
        chance = chance5
    }
    if (Defender.SkillLevel === 2) {
        chance = chance10
    }
    if (Defender.SkillLevel === 3) {
        chance = chance15
    }
    if (Defender.SkillLevel === 4) {
        chance = chance20
    }
    if (Defender.SkillLevel === 5) {
        chance = chance25
    }
    if (Defender.SkillLevel === 6) {
        chance = chance30
    }
    if (Defender.SkillLevel === 7) {
        chance = chance35
    }
    if (Defender.SkillLevel === 8) {
        chance = chance40
    }
    if (Defender.SkillLevel === 9) {
        chance = chance45
    }
    if (Defender.SkillLevel === 10) {
        chance = chance50
    }
    if (Defender.SkillLevel === 11) {
        chance = chance55
    }
    if (Defender.SkillLevel === 12) {
        chance = chance60
    }
    if (Defender.SkillLevel === 13) {
        chance = chance65
    }
    if (Defender.SkillLevel === 14) {
        chance = chance70
    }
    if (Defender.SkillLevel === 15) {
        chance = chance75
    }
    if (Defender.SkillLevel === 16) {
        chance = chance80
    }
    if (Defender.SkillLevel === 17) {
        chance = chance85
    }
    if (Defender.SkillLevel === 18) {
        chance = chance90
    }
    if (Defender.SkillLevel === 19) {
        chance = chance95
    }
    if (Defender.SkillLevel === 20) {
        chance = chance100
    }
    if (Defender.SkillLevel === 0) {
        Defender.SkillMultiplier = 1
        } else Defender.SkillMultiplier = Defender.SkillLevel

    skillEmbed 
        .setAuthor({ name: Defender.Player.username || Defender.Name, iconURL: Defender.Image })

        //Sergeant Spanner
        if (Defender.OfficerSkill === 'Indomitable') { //Awoken Skill
            if (Defender.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Math.round(Defender.SkillMultiplier * (Defender.AttackPower * .1)) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage.toLocaleString())
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Indomitable`)
                const Health = Defender.SkillMultiplier * (Defender.BattleHealth * 0.3)
                if (Defender.BattleHealth > 0) {
                    Defender.BattleHealth = Defender.BattleHealth + Health
                    console.log(`Health Increased`, Health)
                } else return console.log(`Health Error`)
                console.log(Health)

            skillEmbed
                .setColor(Defender.SkillColor)
                .setThumbnail(Boom)
                .addFields(
                    { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Health** to **${Health.toLocaleString()}**`},
                )   
            Defender.SkillUsed = 'Health'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
            } 
    }            
        //Angel of Light
        if (Defender.OfficerSkill === 'Caring Angel') { // Awoken Skill 5
            if (Defender.UnitType = 'Infantry') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1)
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage.toLocaleString())
            }   
            if (Attacker.SkillUsed === 'Attack') {
                console.log(`Caring Angel`)
                const Health = Defender.SkillMultiplier * (Defender.BattleHealth * 0.35) 
                if (Defender.BattleHealth > 0) {
                    Defender.BattleHealth = Defender.BattleHealth + Health
                    console.log(`Health Increased`, Health)
                } else return console.log(`Health Error`)
    
                skillEmbed
                        .setColor(Defender.SkillColor)
                        .setThumbnail(RedCross)
                        .addFields(
                            { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Health** to **${Health.toLocaleString()}**` },
                        )  
                interaction.followUp({embeds: [skillEmbed]})
                Defender.SkillUsed = 'Health'
                return
            } 
        } 

        //War Machine
        if (Defender.OfficerSkill === `The Soldier's Soldier`) { // Awoken Skill 5
            if (Defender.AttackType = 'Ground') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }   
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`The Soldier's Soldier`)  
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.125) 
                Defender.AttackPower = Defender.AttackPower + Power
                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }
        //Tip of the Spear 
        if (Defender.OfficerSkill === 'Undaunted') { // Awoken Skill 5
            if (Defender.AttackType = 'Ground') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }   
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Undaunted`)  
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.5) 
                Defender.AttackPower = Defender.AttackPower + Power
                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        //Valkyrie
        if (Defender.OfficerSkill === 'Who Dares Wins') { // Awoken Skill 5
            if (Defender.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            if (Attacker.AttackType === 'Ground') {
                console.log(`Who Dares Wins`)   
                const Health = Defender.SkillMultiplier * (Attacker.BattleHealth * 0.2) 
                if (Attacker.BattleHealth > 0) {
                    Attacker.BattleHealth - Health
                    console.log(`Health Decreased`, Health)
                } else return console.log(`Health Error`)
    
                skillEmbed
                        .setColor(Defender.SkillColor)
                        .setThumbnail(RedCross)
                        .addFields(
                            { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & decreases **${Attacker.Player}** **${Attacker.Name}'s Health** by **${Health.toLocaleString()}**` },
                        )  
                interaction.followUp({embeds: [skillEmbed]})
                Defender.SkillUsed = 'Health'
                return
            }         
        }
        //Lady Justice        
        if (Defender.OfficerSkill === 'Guardian Angel') { // Awoken Skill 5
            if (Defender.AttackType = 'Ground') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Guardian Angel`)  
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.2) 
                Defender.AttackPower = Defender.AttackPower + Power
                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }
        // Eye of Providence 
        if (Defender.OfficerSkill === 'Hand of Destruction') { // Awoken Skill 5 
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Hand of Destruction`)
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.4) 
                Defender.AttackPower = Defender.AttackPower + Power
                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
        } 
        }        
        // Percy
        if (Defender.OfficerSkill === 'Frontline Fire') { // Awoken Skill 5
            if (Defender.AttackType = 'Ground') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }              
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Frontline Fire`)            
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.18) 
                Defender.AttackPower = Defender.AttackPower + Power

                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // White Wolf
        if (Defender.OfficerSkill === 'Vengeance') { // Awoken Skill 5 
            if (Defender.UnitType === 'Infantry') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(`Vengeance`)   
                console.log(skillSuccess,chance)         
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.3) 
                Defender.AttackPower = Defender.AttackPower + Power
                if (Defender.UnitType === 'Infantry') {
                    const Special = Defender.SkillMultiplier * (Defender.AttackPower * 0.25)  
                    Attacker.AttackPower = Attacker.AttackPower + Special
                    console.log(Special.toLocaleString())

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setImage(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Special.toLocaleString() || Power.toLocaleString()}**` },
                    )  

                }
                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString() || Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Antonina Shevchenko
        if (Defender.OfficerSkill === 'The Motherland') { // Awoken Skill 5
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`The Motherland`)
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * 0.5) 
                Defender.AttackPower = Defender.AttackPower + Damage
                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Damage.toLocaleString()}**` },
                    ),   
            console.log(Damage.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // Winter Huntsman
        if (Defender.OfficerSkill === 'Mine Detonator') { // Awoken Skill 5
            if (Defender.AttackType === 'Ground') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Mine Detonator`)            
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.135) 
                Defender.AttackPower = Defender.AttackPower + Power
                if (Attacker.UnitType === 'Infantry') {
                    const Health = Defender.SkillMultiplier * (Attacker.BattleHealth * .25) 
                    Attacker.BattleHealth = Attacker.BattleHealth - Health
                    skillEmbed
                        .setColor(Defender.SkillColor)
                        .setImage(RedCross)
                        .addFields(
                            { name: `${Defender.OfficerSkill}`, value: `**${Defender.Officer}** & reduces **${Attacker.Player}** **${Attacker.Name}'s Health** by **${Health.toLocaleString()}**` },
                    ) 
                }

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }      
        // The Eruptor  
        if (Defender.OfficerSkill === 'Flamestorm') {
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Flamestorm`)
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.1) 
                Defender.AttackPower = Defender.AttackPower + Power
                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }
        // Steel Fighter
        if (Defender.OfficerSkill === 'Inpenetrable') { // Awoken Skill 5 
            if (Defender.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Inpenetrable`) 
                const Health = Defender.SkillMultiplier * (Defender.BattleHealth * 0.5) 
                Defender.BattleHealth = Defender.BattleHealth + Health
                if (Defender.BattleHealth > 0) {
                    console.log(`Health Increased`, Health)
                } else return console.log(`Health Error`)

                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(RedCross)
                        .addFields(
                            { name: `${Attacker.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Health** to **${Health.toLocaleString()}**` },
                        )   
            Defender.SkillUsed = 'Health'
            interaction.followUp({embeds: [skillEmbed]})
            return
            }         
        }        
        // Iron Bastion
        if (Defender.OfficerSkill === 'Breaching Charge') { // Awoken Skill 5 
            if (Defender.UnitType === 'Infantry') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Breaching Charge`)            
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.3) 
                Defender.AttackPower = Defender.AttackPower + Power
                if (Attacker.UnitType === 'Infantry') {
                    console.log(`Breaching Infantry Charge `)            
                    console.log(Special.toLocaleString())
                    const Special = (Defender.AttackPower * .5) * Defender.SkillLevel
                    Defender.AttackPower = Defender.AttackPower + Special
                    skillEmbed
                        .setColor(Defender.SkillColor)
                        .setImage(Boom)
                        .addFields(
                            { name: `${Defender.OfficerSkill}`, value: `**${Defender.Officer}** & reduces **${Attacker.Player}** **${Attacker.Name}'s Health** by **${Special.toLocaleString()}**` },
                    ) 
                }

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Berserker Bear
        if (Defender.OfficerSkill === 'Flaming Meteors') {
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Flaming Meteors`)
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.3) 
                Defender.AttackPower = Defender.AttackPower + Power
                skillEmbed  
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        

        // Guardian of Truth
        if (Defender.OfficerSkill === 'Master of War') { // Awoken Skill 5
            if (Defender.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Master of War`)            
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.1)
                Defender.AttackPower = Defender.AttackPower + Power
                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }   
        // Death Adder     
        if (Defender.OfficerSkill === 'Phantom Power') { // Awoken Skill 5
            if (Defender.AttackType === 'Ground') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Phantom Power`)            
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.1)
                Defender.AttackPower = Defender.AttackPower + Power
                const Health = Defender.SkillMultiplier * (Defender.BattleHealth * 0.2)
                Defender.BattleHealth = Defender.BattleHealth + Health

                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setImage(RedCross)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                        { name: `${Defender.OfficerSkill}`, value: `**${Defender.Officer}** increases **${Defender.Player}** **${Defender.Name}'s Health** by **${Health.toLocaleString()}**` },
                    ),   
            console.log(Health.toLocaleString() && Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Bloody Mary
        if (Defender.OfficerSkill === 'Blinding Flash') { // Awoken Skill 5 
            if (Defender.AttackType === 'Ground') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Blinding Flash`)            
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.1) 
                Defender.AttackPower = Defender.AttackPower + Power

                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Saber of The Nation 
        if (Defender.OfficerSkill === 'Rain of Blades') { // Awoken Skill 5 
            if (Defender.AttackType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Rain of Blades`)
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.1) 
                Defender.AttackPower = Defender.AttackPower + Power

                skillEmbed  
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }       
        // Argent Flame 
        if (Defender.OfficerSkill === 'Devastation') {
            if (Defender.AttackType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Devastation`)
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.25) 
                Defender.AttackPower = Defender.AttackPower + Power
                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}}        
        // Thorn Countess
        if (Defender.OfficerSkill === 'Beauty Worth Preserving') { // Awoken Skill 5
            if (Defender.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Beauty Worth Preserving`)            
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.15) 
                Defender.AttackPower = Defender.AttackPower + Power
                const Special = Math.round(Attacker.AttackPower * .1)
                Attacker.AttackPower = Attacker.AttackPower - Special

                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(RedCross)
                    .setImage(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                        { name: `${Defender.OfficerSkill}`, value: `**${Defender.Officer}** decreases **${Attacker.Player}** **${Attacker.Name}'s Health** by **${Special.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString(), Special.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Professor Pain 
        if (Defender.OfficerSkill === 'Forlorn Hope') { // Awoken Skill 5
            if (Defender.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Forlorn Hope`)            
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.15) 
                Defender.AttackPower = Defender.AttackPower + Power

                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Wings of Glory
        if (Defender.OfficerSkill === 'Sky Dancer') { // Awoken Skill 5 
            if (Defender.UnitType = 'Fighters') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Defender.UnitType === 'Bombers' || 'Fighters'){
                console.log(`Sky Dancer`)
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.15) 
                Defender.AttackPower = Defender.AttackPower + Power
                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // Brisk Eagle
        if (Defender.OfficerSkill === 'Untouchable') { // Awoken Skill 5
            if (Defender.UnitType = 'Fighters' || 'Bombers') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                if (skillSuccess === 'Yes') {
                    console.log(skillSuccess,chance)
                    console.log(`Untouchable`)   
                    const Defend = Attacker.AttackPower
                    Attacker.AttackPower = 0
    
                    skillEmbed
                        .setColor(Defender.SkillColor)
                        .setThumbnail(RedCross)
                        .addFields(
                            { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & decreases **${Attacker.Player}** **${Attacker.Name}'s Attack** to **${Attacker.AttackPower.toLocaleString()}**` },
                        ),   
                console.log(Defender.AttackPower.toLocaleString())
                console.log(Attacker.AttackPower.toLocaleString())
                Defender.SkillUsed = 'Attack'
                interaction.followUp({embeds: [skillEmbed]})
                sleep(500 * Defender.SkillMultiplier)
                Attacker.AttackPower = Defend
                return
                } 
            }        
        // Heavens Saviour
        if (Defender.OfficerSkill === 'Heavenly Rays') { // Awoken Skill 5 
            if (Defender.UnitType = 'Fighters') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Defender.UnitType === 'Fighters' && Defender.UnitType === 'Fighters'){
                console.log(`Heavenly Rays`)    
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.15) 
                Defender.AttackPower = Defender.AttackPower + Power

                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender,Player} **${Defender.Name}'s Attack** to **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // Silver Comet
        if (Defender.OfficerSkill === 'Twin Fangs') { // Awoken Skill 5 
            if (Defender.UnitType = 'Fighters') { 
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Defender.UnitType === 'Bombers' || 'Fighters'){
                console.log(`Twin Fangs`)            
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.25) 
                Defender.AttackPower = Defender.AttackPower + Power

                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // The Witcher
        if (Defender.OfficerSkill === 'Night Evader') { // Awoken Skill 5
            if (Defender.UnitType === 'Bombers' || 'Fighters'){
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Night Evader`)            
                const Power = Defender.SkillMultiplier * (Attacker.AttackPower * .2) 
                Attacker.AttackPower = Attacker.AttackPower - Power

                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(RedCross)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & decreases **${Attacker.Player}** **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Golden Pixie
        if (Defender.OfficerSkill === 'Unleashed Justice') { // Awoken Skill 5 
            if (Defender.UnitType === 'Bombers'){
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            } 
            if (Defender.UnitType === 'Bombers'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Unleashed Justice`)            
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * .2) 
                Defender.AttackPower = Defender.AttackPower + Power

                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        // El Cartero
        if (Defender.OfficerSkill === 'Sticky Situation') { // Awoken Skill 5 
            if (Defender.UnitType === 'Bombers'){
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Sticky Situation`)            
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * .2) 
                Defender.AttackPower = Defender.AttackPower + Power

                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Polar Phantom
        if (Defender.OfficerSkill === 'Desperate Counterattack') { // Awoken Skill 5
            if (Defender.UnitType === 'Fighters'){
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Defender.UnitType === 'Fighter') {
                console.log(`Desperate Counterattack`)        
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * .25) 
                Defender.AttackPower = Defender.AttackPower + Power
                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
        }
            } 
        }        
        // Rictus Reaper
        if (Defender.OfficerSkill === 'Last Gasp') { // Awoken Skill 5
            if (Defender.UnitType === 'Bombers'){
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Defender.UnitType === 'Bombers'){
                console.log(`Last Gasp`)            
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * .2) 
                Defender.AttackPower = Defender.AttackPower + Power

                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}}
        // Bladewing
        if (Defender.OfficerSkill === 'Falling Star') { // Awoken Skill 5
            if (Defender.UnitType === 'Fighters'){
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Defender.UnitType === 'Bombers' || 'Fighters'){
                console.log(`Falling Star`)            
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * .15) 
                Defender.AttackPower = Defender.AttackPower + Power

                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}}
        // Vox Veritatis
        if (Defender.OfficerSkill === 'Winning Mentality') { // Awoken Skill 5
            if (Defender.AttackType = 'Ground') {
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
                console.log(`Winning Mentality`)            
                const Health = Defender.SkillMultiplier * (Defender.BattleHealth * .15)
                Defender.BattleHealth = Defender.BattleHealth + Health

                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Health** by **${Health.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}
        // Lady Liberte 
        if (Defender.OfficerSkill === 'Art of War') {
            if (Defender.AttackType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                const Damage = Defender.SkillMultiplier * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns' || 'RocketLaunchers'){
                console.log(`Art of War`)
                const Power = Defender.SkillMultiplier * (Defender.AttackPower * 0.15) 
                Defender.AttackPower = Defender.AttackPower + Power
                const Health = Defender.SkillMultiplier * (Defender.BattleHealth * 0.15) 
                Defender.BattleHealth = Defender.BattleHealth + Health

                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Health** by **${Health.toLocaleString()}**` },
                    ),   
                    console.log(Power.toLocaleString())
                    console.log(Health.toLocaleString())
                    Defender.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}}

}
}
