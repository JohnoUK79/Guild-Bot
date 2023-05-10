const sql = require("../config/Database");
const { EmbedBuilder } = require('discord.js');
const { Colours } = require('../data/colours')
const { sleep } = require('../functions/discordFunctions')
const { chance0, chance5, chance10, chance15, chance20, chance25, chance30, chance35, chance40, chance45, chance50, chance55, chance60, chance65, chance70, chance75, chance80, chance85, chance90, chance95, chance100 } = require('../data/chance');
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
        if (Attacker.SkillLevel === 20) {
            chance = chance100
        }
        if (Attacker.SkillLevel > 20) {
            chance = chance100
        }

        const skillEmbed = new EmbedBuilder();
            skillEmbed 
                    .setColor('#ff5b05')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Battles`, iconURL: `${guildIcon}`});
                    
        if (Attacker.SkillLevel === 0) {
        Attacker.SkillLevel = 1
        }   

        //Sergeant Spanner
        if (Attacker.OfficerSkill === 'Indomitable') { //Awoken Skill 5
            if (Attacker.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess,chance)
                if (skillSuccess === 'Yes') {
                    console.log(`Indomitable`)
                    const Health = (Attacker.BattleHealth * 0.3) * Attacker.SkillLevel
                    if (Attacker.BattleHealth > 0) {
                        Attacker.BattleHealth = Attacker.BattleHealth + Health
                        console.log(`Health Increased`, Health)
                    } else return console.log(`Health Error`)
                    console.log(health)
    
                    skillEmbed
                            .setColor(Attacker.SkillColor)
                            .setThumbnail(Boom)
                            .addFields(
                                { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Health** to **${health.toLocaleString()}**` },
                            )   
                Attacker.SkillUsed = 'Health'
                interaction.followUp({embeds: [skillEmbed]})
                return
                } 
        }            
        //Angel of Light
        if (Attacker.OfficerSkill === 'Caring Angel') { // Awoken Skill 5
            if (Attacker.UnitType = 'Infantry') {
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1)
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }   
            if (Defender.SkillUsed === 'Attack') {
                console.log(`Caring Angel`)
                const Health = Attacker.SkillLevel * (Attacker.BattleHealth * 0.35) 
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
        //War Machine
        if (Attacker.OfficerSkill === `The Soldier's Soldier`) { // Awoken Skill 5
            if (Attacker.AttackType = 'Ground') {
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }   
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess,chance)
            if (skillSuccess === 'Yes') {
                console.log(`The Soldier's Soldier`)  
                const Power = Attacker.SkillLevel * (Attacker.AttackPower * 0.125) 
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }   
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess,chance)
            if (skillSuccess === 'Yes') {
                console.log(`Undaunted`)  
                const Power = Attacker.SkillLevel * (Attacker.AttackPower * 0.5) 
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            if (Defender.AttackType === 'Ground') {
                console.log(`Who Dares Wins`)   
                const health = Attacker.SkillLevel * (Defender.BattleHealth * 0.2) 
                if (Defender.BattleHealth > 0) {
                    Defender.BattleHealth - health
                    console.log(`Health Decreased`, health)
                } else return console.log(`Health Error`)
    
                skillEmbed
                        .setColor(Attacker.SkillColor)
                        .setThumbnail(RedCross)
                        .addFields(
                            { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & decreases **${Defender.Player}** **${Defender.Name}'s Health** by **${health.toLocaleString()}**` },
                        )  
                interaction.followUp({embeds: [skillEmbed]})
                Attacker.SkillUsed = 'Health'
                return
            }         
        }
        //Lady Justice        
        if (Attacker.OfficerSkill === 'Guardian Angel') { // Awoken Skill 5
            if (Attacker.AttackType = 'Ground') {
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Guardian Angel`)  
                const Power = Attacker.SkillLevel * (Attacker.AttackPower * 0.2) 
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
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns') {
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns'){
                console.log(`Hand of Destruction`)
                const Power = (Attacker.AttackPower * 0.4) * Attacker.SkillLevel
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }              
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Frontline Fire`)            
                Power = (Attacker.AttackPower * 0.18) * Attacker.SkillLevel
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(`Vengeance`)   
                console.log(skillSuccess,chance)         
                const Power = (Attacker.AttackPower * 0.3) * Attacker.SkillLevel
                Attacker.AttackPower = Attacker.AttackPower + Power
                if (Attacker.UnitType === 'Infantry') {
                    Special = (Attacker.AttackPower * 0.25) * Attacker.SkillLevel 
                    Attacker.AttackPower = Attacker.AttackPower + Special
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
            console.log(Special.toLocaleString() || Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Antonina Shevchenko
        if (Attacker.OfficerSkill === 'The Motherland') { // Awoken Skill 5
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns') {
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns'){
                console.log(`The Motherland`)
                const Damage = (Attacker.AttackPower * 0.5) * Attacker.SkillLevel
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Mine Detonator`)            
                const Power = (Attacker.AttackPower * 0.135) * Attacker.SkillLevel
                Attacker.AttackPower = Attacker.AttackPower + Power
                if (Defender.UnitType === 'Infantry') {
                    const health = (Defender.BattleHealth * .5) * Attacker.SkillLevel
                    Defender.BattleHealth = Defender.BattleHealth - health
                    skillEmbed
                        .setColor(Attacker.SkillColor)
                        .setImage(RedCross)
                        .addFields(
                            { name: `${Attacker.OfficerSkill}`, value: `**${Attacker.Officer}** & reduces **${Defender.Player}** **${Defender.Name}'s Heal** by **${health.toLocaleString()}**` },
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
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns') {
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns'){
                console.log(`Flamestorm`)
                const Power = (Attacker.AttackPower * 0.1) * Attacker.SkillLevel
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Inpenetrable`) 
                const health = (Attacker.BattleHealth * 0.5) * Attacker.SkillLevel
                Attacker.BattleHealth = Attacker.BattleHealth + health
                if (Attacker.BattleHealth > 0) {
                    console.log(`Health Increased`, health)
                } else return console.log(`Health Error`)

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(RedCross)
                        .addFields(
                            { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Health** to **${health.toLocaleString()}**` },
                        )   
            Attacker.SkillUsed = 'Health'
            interaction.followUp({embeds: [skillEmbed]})
            return
            }         
        }        
        // Iron Bastion
        if (Attacker.OfficerSkill === 'Breaching Charge') { // Awoken Skill 5 
            if (Attacker.UnitType === 'Infantry') {
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Breaching Charge`)            
                const Power = (Attacker.AttackPower * 0.3) * Attacker.SkillLevel
                Attacker.AttackPower = Attacker.AttackPower + Power
                if (Defender.UnitType === 'Infantry') {
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
            console.log(Special.toLocaleString() || Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Berserker Bear
        if (Attacker.OfficerSkill === 'Flaming Meteors') {
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns'){
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Flaming Meteors`)
                const Power = (Attacker.AttackPower * 0.3) * Attacker.SkillLevel
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Master of War`)            
                const Power = (Attacker.AttackPower * 0.1) * Attacker.SkillLevel
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Phantom Power`)            
                const Power = (Attacker.AttackPower * 0.1) * Attacker.SkillLevel
                Attacker.AttackPower = Attacker.AttackPower + Power
                const health = (Attacker.BattleHealth * 0.2) * Attacker.SkillLevel
                Attacker.BattleHealth = Attacker.BattleHealth + health

                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setImage(RedCross)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                        { name: `${Attacker.OfficerSkill}`, value: `**${Attacker.Officer}** decreases **${Defender.Player}** **${Defender.Name}'s Attack** by **${health.toLocaleString()}**` },
                    ),   
            console.log(health.toLocaleString() || Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        // Bloody Mary
        if (Attacker.OfficerSkill === 'Blinding Flash') { // Awoken Skill 5 
            if (Attacker.AttackType === 'Ground') {
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Blinding Flash`)            
                const Power = (Attacker.AttackPower * 0.1) * Attacker.SkillLevel
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
            if (Attacker.AttackType === 'Howitzers' || 'AntiTankGuns'){
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }  
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns'){
                console.log(`Rain of Blades`)
                const Power = (Attacker.AttackPower * 0.1) * Attacker.SkillLevel
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
            if (Attacker.AttackType === 'Howitzers' || 'AntiTankGuns'){
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns'){
                console.log(`Devastation`)
                const Power = (Attacker.AttackPower * 0.25) * Attacker.SkillLevel
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Beauty Worth Preserving`)            
                const Power = (Attacker.AttackPower * 0.15) * Attacker.SkillLevel
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Forlorn Hope`)            
                const Power = (Attacker.AttackPower * 0.25) * Attacker.SkillLevel
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Bombers' || 'Fighters'){
                console.log(`Sky Dancer`)
                const Power = (Attacker.AttackPower * 0.15) * Attacker.SkillLevel
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
        if (Attacker.UnitType = 'Fighters' || 'Bombers') {
            const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
            Attacker.AttackPower = Attacker.AttackPower + Damage
            console.log(`Attacker Skill Unit Buff`, Damage)
        }
        if (Attacker.OfficerSkill === 'Untouchable') { // Awoken Skill 5
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
            sleep(1000)
            Defender.AttackPower = Defend
            return
            } 
        }        
        // Heavens Saviour
        if (Attacker.OfficerSkill === 'Heavenly Rays') { // Awoken Skill 5 
            if (Attacker.UnitType = 'Fighters') {
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Fighters' && Defender.UnitType === 'Fighters'){
                console.log(`Heavenly Rays`)    
                const Power = (Attacker.AttackPower * 0.15) * Attacker.SkillLevel
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Bombers' || 'Fighters'){
                console.log(`Twin Fangs`)            
                const Power = (Attacker.AttackPower * 0.25) * Attacker.SkillLevel
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Night Evader`)            
                const Power = (Defender.AttackPower * .2) * Attacker.SkillLevel
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            if (Attacker.UnitType === 'Bombers'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Unleashed Justice`)            
                const Power = (Attacker.AttackPower * .2) * Attacker.SkillLevel
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
                console.log(skillSuccess,chance)
                console.log(`Sticky Situation`)            
                const Power = (Attacker.AttackPower * .2) * Attacker.SkillLevel
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Fighter') {
                console.log(`Desperate Counterattack`)        
                const Power = (Attacker.AttackPower * .25) * Attacker.SkillLevel
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .setColor(Attacker.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            console.log(Defender.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
        }
            } 
        }        
        // Rictus Reaper
        if (Attacker.OfficerSkill === 'Last Gasp') { // Awoken Skill 5
            if (Attacker.UnitType === 'Bombers'){
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Bombers'){
                console.log(`Last Gasp`)            
                const Power = (Attacker.AttackPower * .2) * Attacker.SkillLevel
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Bombers' || 'Fighters'){
                console.log(`Falling Star`)            
                const Power = (Attacker.AttackPower * .25) * Attacker.SkillLevel
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
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
                console.log(`Winning Mentality`)            
                const Health = Attacker.SkillLevel * (Attacker.BattleHealth * .30)
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
            if (Attacker.AttackType === 'Howitzers' || 'AntiTankGuns'){
                const Damage = Attacker.SkillLevel * (Attacker.AttackPower * .1) 
                Attacker.AttackPower = Attacker.AttackPower + Damage
                console.log(`Attacker Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns'){
                console.log(`Art of War`)
                const Power = Attacker.SkillLevel * (Attacker.AttackPower * 0.15) 
                Attacker.AttackPower = Attacker.AttackPower + Power
                const Health = Attacker.SkillLevel * (Attacker.BattleHealth * 0.15) 
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
    if (Defender.UnitCamp && Defender.OfficerCamp === 'Vanguard') {
        Defender.SkillColor = Colours.VanguardBoost
    }
    if (Defender.UnitCamp && Defender.OfficerCamp === 'Liberty') {
        Defender.SkillColor = Colours.LibertyBoost
    }
    if (Defender.UnitCamp && Defender.OfficerCamp === 'MartyrsW') {
        Defender.SkillColor = Colours.MartyrsWBoost
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
    if (Defender.SkillLevel > 20) {
        chance = chance100
    }
    if (Defender.SkillLevel === 0) {
        Defender.SkillLevel = 1
        } 
    skillEmbed 
        .setAuthor({ name: Defender.Player.username || Defender.Name, iconURL: Defender.Image })
    //Sergent Spanner
    if (Defender.OfficerSkill === 'Indomitable') { //Awoken Skill 5
        if (Defender.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
            const Damage = (Defender.AttackPower * .1) * Defender.SkillLevel
            Defender.AttackPower = Defender.AttackPower + Damage
            console.log(`Defender Skill Unit Buff`, Damage)
        }
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            console.log(`Indomitable`) 
            const Health = (Defender.BattleHealth * 0.3) * Defender.SkillLevel
            if (Defender.BattleHealth > 0) {
                Defender.BattleHealth = Defender.BattleHealth + Health
                console.log(`Health Increased`, Health)
            } else return console.log(`Health Error`)

            skillEmbed
                .setColor(Defender.SkillColor)
                .setThumbnail(RedCross)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Health** to **${Health.toLocaleString()}**` },
                    )   
        Defender.SkillUsed = 'Health'
        interaction.followUp({embeds: [skillEmbed]})
        return
        } 
                }            
//Angel of Light
if (Defender.OfficerSkill === 'Caring Angel') { //Awoken Skill 5
    if (Defender.UnitType = 'Infantry') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }   
    if (Attacker.SkillUsed === 'Attack') {
        console.log(`Caring Angel`)   
        const Health = Defender.SkillLevel * (Defender.BattleHealth * 0.35) 
        Defender.BattleHealth = Defender.BattleHealth + Health
        if (Defender.BattleHealth > 0) {
            console.log(`Health Increased`, Health)
        } else return console.log(`Health Error`)

        skillEmbed
                .setColor(Defender.SkillColor)
                .setThumbnail(RedCross)
                .addFields(
                    { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Health** to **${Health.toLocaleString()}**` },
                )  
        interaction.followUp({embeds: [skillEmbed]})
        Defender.SkillUsed = 'Health'
        return
    } 
    }
//War Machine
if (Defender.OfficerSkill === `The Soldier's Soldier`) { //Awoken Skill 5
    if (Defender.AttackType = 'Ground') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }    
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`The Soldier's Soldier`) 
        const Power = Defender.SkillLevel * (Defender.AttackPower * 0.125) 
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Defender.AttackPower.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
//Tip of The Spear 
if (Defender.OfficerSkill === 'Undaunted') { //Awoken Skill 5
    if (Defender.AttackType = 'Ground') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }    
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Undaunted`)  
        const Power = Defender.SkillLevel * (Defender.AttackPower * 0.5) 
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
//Valkrie
if (Defender.OfficerSkill === 'Who Dares Wins') { //Awoken Skill 5
    if (Defender.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }
    if (Defender.AttackType === 'Ground') {
        console.log(`Who Dares Wins`)   
        const damage = Defender.SkillLevel * (Defender.BattleHealth * 0.2) 
        if (Defender.BattleHealth > 0) {
            Defender.BattleHealth = Defender.BattleHealth - damage
            console.log(`Health Decreased`, damage)
        } else return console.log(`Health Error`)

        skillEmbed
                .setColor(Defender.SkillColor)
                .setThumbnail(RedCross)
                .addFields(
                    { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & decreases ${Attacker.Player} **${Attacker.Name}'s Health** by **${damage.toLocaleString()}**` },
                )  
        interaction.followUp({embeds: [skillEmbed]})
        Defender.SkillUsed = 'Health'
        return
    }         
}    
//Lady Justice
if (Defender.OfficerSkill === 'Guardian Angel') { // Awoken Skill 5
    if (Defender.AttackType = 'Ground') {
        console.log(`Defender Skill Unit Buff`)
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1)
        Defender.AttackPower = Defender.AttackPower + Damage
    }  
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Guardian Angel`)  
        const Power = Defender.SkillLevel * (Defender.AttackPower * 0.2) 
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
// Eye of Providence 
if (Defender.OfficerSkill === 'Hand of Destruction') { // Awoken Skill 5 
    if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
        
    }
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
    console.log(skillSuccess,chance)
    if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
        console.log(`Hand of Destruction`)
        Power = (Defender.AttackPower * 0.4) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power
        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
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
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }  
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Frontline Fire`)            
        const Power = (Defender.AttackPower * 0.08) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
// White Wolf
if (Defender.OfficerSkill === 'Vengeance') {
    if (Defender.UnitType === 'Infantry') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }  
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
        if (Defender.UnitType === 'Infantry') {
            const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
            Defender.AttackPower = Defender.AttackPower + Damage
            console.log(`Defender Unit Buff`, Damage)
        }  
        console.log(skillSuccess,chance)
        console.log(`Vengeance`)            
        const Power = (Defender.AttackPower * 0.3) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power
        if (Defender.UnitType === 'Infantry') {
            const Special = (Defender.AttackPower * 0.25) * Defender.SkillLevel
            console.log(Special.toLocaleString())
            skillEmbed
                .addFields(
                    { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Special.toLocaleString() || Power.toLocaleString()}**` },
                ),   

            Defender.AttackPower = Defender.AttackPower + Special
        }
        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString() || Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
// Antonina Shevchenko
if (Defender.OfficerSkill === 'The Motherland') { // Awoken Skill 5
    if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }  
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
    console.log(skillSuccess,chance)
    if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
        console.log(`The Motherland`)
        const Power = (Defender.AttackPower * 0.5) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}
    } 
}        
// Winter Huntsman
if (Defender.OfficerSkill === 'Mine Detonator') { // Awoken Skill 5
    if (Defender.AttackType === 'Ground') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }  
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Mine Detonator`)            
        const Power = (Defender.AttackPower * 0.135) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power
        if (Defender.UnitType === 'Infantry') {
            const Damage = (Defender.BattleHealth * .05) * Defender.SkillLevel
            Defender.BattleHealth = Defender.BattleHealth - Damage

            skillEmbed
            .setColor(Defender.SkillColor)
            .setImage(RedCross)
            .addFields(
                { name: `${Defender.OfficerSkill}`, value: `**${Defender.Officer}** & reduces ${Attacker.Player} **${Attacker.Name}'s Heal** by **${Damage.toLocaleString()}**` },
            ) 
        }

        skillEmbed
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Damage.toLocaleString() || Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
// The Eruptor 
if (Defender.OfficerSkill === 'Flamestorm') {
    if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }  
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
    console.log(skillSuccess,chance)
    if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
        console.log(`Flamestorm`)
        const Power = (Defender.AttackPower * 0.1) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
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
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Inpenetrable`) 
        const health = (Defender.BattleHealth * 0.5) * Defender.SkillLevel
        if (Defender.BattleHealth > 0) {
            Defender.BattleHealth = Defender.BattleHealth + health
            console.log(`Health Increased`, health)
        } else return console.log(`Health Error`)

        skillEmbed
                .setColor(Defender.SkillColor)
                .setThumbnail(RedCross)
                .addFields(
                    { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Health** to **${health.toLocaleString()}**` },
                )   
    Defender.SkillUsed = 'Health'
    interaction.followUp({embeds: [skillEmbed]})
    return
    }         
}        
// Iron Bastion 
if (Defender.OfficerSkill === 'Breaching Charge') { // Awoken Skill 5 
    if (Defender.UnitType === 'Infantry') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }  
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Breaching Charge`)            
        const Power = (Defender.AttackPower * 0.13) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power
        if (Attacker.UnitType === 'Infantry') {
            const Special = (Defender.AttackPower * .5) * Defender.SkillLevel
            Defender.AttackPower = Defender.AttackPower - Special

            skillEmbed
            .setColor(Defender.SkillColor)
            .setImage(RedCross)
            .addFields(
                { name: `${Defender.OfficerSkill}`, value: `**${Defender.Officer}** & reduces ${Attacker.Player} **${Attacker.Name}'s Heal** by **${Special.toLocaleString()}**` },
            ) 
        }

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString() || Special.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
// Berserker Bear
if (Defender.OfficerSkill === 'Flaming Meteors') { // Awoken Skill 5 
        if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
            const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
            Defender.AttackPower = Defender.AttackPower + Damage
            console.log(`Defender Skill Unit Buff`, Damage)
        }  
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
        console.log(`Flaming Meteors`)
        const Power = (Defender.AttackPower * 0.3) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Defender.AttackPower.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
    }
    } 
}        
// Guardian of Truth
if (Defender.OfficerSkill === 'Master of War') { // Awoken Skill 5
    if (Defender.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Master of War`)            
        const Power = (Defender.AttackPower * 0.10) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Defender.AttackPower.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
// Death Adder
if (Defender.OfficerSkill === 'Phantom Power') { // Awoken Skill 5
    if (Defender.AttackType === 'Ground') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }  
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Phantom Power`)            
        const Power = (Defender.AttackPower * 0.10) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power
        const health = (Defender.BattleHealth * 0.2) * Defender.SkillLevel
        Defender.BattleHealth = Defender.BattleHealth + health

        
        skillEmbed
            .setColor(Defender.SkillColor)
            .setImage(RedCross)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
                { name: `${Defender.OfficerSkill}`, value: `**${Defender.Officer}** decreases ${Attacker.Player} **${Attacker.Name}'s Attack** by **${health.toLocaleString()}**` },

            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
// Bloody Mary
if (Defender.OfficerSkill === 'Blinding Flash') { // Awoken Skill 5 
    if (Defender.AttackType === 'Ground') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }  
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Blinding Flash`)            
        const Power = (Defender.AttackPower * 0.10) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
// Saber of the Nation
if (Defender.OfficerSkill === 'Rain of Blades') {
    if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }  
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
    console.log(skillSuccess,chance)
    if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
        console.log(`Rain of Blades`)
        const Power = (Defender.AttackPower * 0.1) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}
    } 
}        
// Argent Flame
if (Defender.OfficerSkill === 'Devastation') { // Awoken Skill 5 
    if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
    console.log(skillSuccess,chance)
    if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
        console.log(`Devastation`)
        const Power = (Defender.AttackPower * 0.25) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}
    } 
}        
// Thorn Countess
if (Defender.OfficerSkill === 'Beauty Worth Preserving') { // Awoken Skill 5
    if (Defender.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Beauty Worth Preserving`)            
        const Power = (Defender.AttackPower * 0.15) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power
        const health = (Attacker.AttackPower * .1) * Defender.SkillLevel
        Attacker.AttackPower = Attacker.AttackPower - health

        skillEmbed
            .setColor(Defender.SkillColor)
            .setImage(Boom)
            .setThumbnail(RedCross)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Defender.AttackPower.toLocaleString()}**` },
                { name: `${Defender.OfficerSkill}`, value: `**${Defender.Officer}** & decreases ${Attacker.Player} **${Attacker.Name}'s Health** by **${health.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
// Professor Pain
if (Defender.OfficerSkill === 'Forlorn Hope') { // Awoken Skill 5
    if (Defender.UnitType = 'MediumTanks' || 'LightTanks' || 'HeavyTanks' || 'TankHunters' || 'SuperHeavyTanks') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Forlorn Hope`)            
        const Power = (Defender.AttackPower * 0.25) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
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
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
    if (Defender.UnitType === 'Bombers' || 'Fighters'){
        console.log(skillSuccess,chance)
        console.log(`Sky Dancer`)
        const Power = (Defender.AttackPower * 0.15) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Defender.AttackPower.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}
    } 
}        
// Brisk Eagle
if (Defender.OfficerSkill === 'Untouchable') { // Awoken Skill 5
    if (Defender.UnitType = 'Fighters' || 'Bombers') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Untouchable`)            
        const Power = Attacker.AttackPower
        Attacker.AttackPower = 0
        const Powerless = Attacker.AttackPower

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(RedCross)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & decreases ${Attacker.Player} **${Attacker.Name}'s Attack** to **${Power.toLocaleString()}**` },
            ),   
    console.log(Powerless.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    sleep(1000)
    Attacker.AttackPower = Power
    return
    } 
}        
// Heavens Savious
if (Defender.OfficerSkill === 'Heavenly Rays') {
    if (Defender.UnitType = 'Fighters') {
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }
    if (Defender.UnitType === 'Fighters' && Attacker.UnitType === 'Fighters'){
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Heavenly Rays`)    
        const Power = (Defender.AttackPower * 0.15) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** to **${Power.toLocaleString()}**` },
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
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
    console.log(skillSuccess,chance)
    if (Defender.UnitType === 'Bombers' || 'Fighters'){
        console.log(`Twin Fangs`)            
        const Power = (Defender.AttackPower * 0.25) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
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
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    }  
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Night Evader`)            
        const Power = (Attacker.AttackPower * .2) * Defender.SkillLevel
        Attacker.AttackPower = Attacker.AttackPower - Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & decreases ${Attacker.Player} **${Attacker.Name}'s Attack** to **${Power.toLocaleString()}**` },
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
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    } 
    if (Defender.UnitType === 'Bombers'){
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Unleashed Justice`)            
        const Power = (Defender.AttackPower * 2) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}
    } 
}        
// El Cartro 
if (Defender.OfficerSkill === 'Sticky Situation') {
    if (Defender.UnitType === 'Bombers'){
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Unit Buff`, Damage)
    } 
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Sticky Situation`)            
        const Power = (Defender.AttackPower * .2) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
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
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    } 
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
    console.log(skillSuccess,chance)
    if (Defender.UnitType === 'Fighter') {
        console.log(`Desperate Counterattack`)        
        const Power = (Defender.AttackPower * .25) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
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
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    } 
    if (Defender.UnitType === 'Bombers'){
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Last Gasp`)            
        const Power = (Defender.AttackPower * 2) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}}}
// Bladewing
if (Defender.OfficerSkill === 'Falling Star') { // Awoken Skill 5 
    if (Defender.UnitType === 'Fighters'){
        const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
        Defender.AttackPower = Defender.AttackPower + Damage
        console.log(`Defender Skill Unit Buff`, Damage)
    } 
    if (Defender.UnitType === 'Bombers' || 'Fighters'){
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        if (skillSuccess === 'Yes') {
        console.log(skillSuccess,chance)
        console.log(`Falling Star`)            
        const Power = (Defender.AttackPower * 25) * Defender.SkillLevel
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .setColor(Defender.SkillColor)
            .setThumbnail(Boom)
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases **${Defender.Player}** **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}}}
        // Vox Veritatis
        if (Defender.OfficerSkill === 'Winning Mentality') { // Awoken Skill 5
            if (Defender.AttackType = 'Ground') {
                const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            } 
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
                console.log(`Winning Mentality`)            
                const Health = Defender.SkillLevel * (Defender.BattleHealth * .30)
                Defender.BattleHealth = Defender.BattleHealth + Health

                skillEmbed
                    .setColor(Defender.SkillColor)
                    .setThumbnail(Boom)
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Health** by **${Health.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }}
        // Lady Liberte 
        if (Defender.OfficerSkill === 'Art of War') {
            if (Defender.AttackType === 'Howitzers' || 'AntiTankGuns'){
                const Damage = Defender.SkillLevel * (Defender.AttackPower * .1) 
                Defender.AttackPower = Defender.AttackPower + Damage
                console.log(`Defender Skill Unit Buff`, Damage)
            }
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess,chance)
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
                console.log(`Art of War`)
                const Power = Defender.SkillLevel * (Defender.AttackPower * 0.15) 
                Defender.AttackPower = Defender.AttackPower + Power
                const Health = Defender.SkillLevel * (Defender.BattleHealth * 0.15) 
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
}}

