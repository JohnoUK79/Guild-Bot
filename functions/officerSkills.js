const sql = require("../config/Database");
const { TextInputStyle, ModalBuilder, EmbedBuilder, TextInputBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    officerSkills: async function (interaction, Attacker, Defender, AH, DH) {
        if (Attacker.OfficerLevel === 0) {
            console.log(`Officer Not Levelled Up`)
            Attacker.OfficerLevel = 1
        }
        const skillEmbed = new EmbedBuilder();
            skillEmbed 
                    .setColor('#ff5b05')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Battles`, iconURL: `${guildIcon}`});


        if (Attacker.OfficerSkill === 'Indomitable') {
            console.log(`Indomitable`) 
            Attacker.SkillUsed, Defender.SkillUsed = ''
            const guildIcon = interaction.member.guild.iconURL();
            const guildName = interaction.member.guild.name
            skillEmbed 
                    .setColor('#ff5b05')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Battles`, iconURL: `${guildIcon}`});
    
            if (Attacker.OfficerSkill === 'Indomitable') {
                const chance = [
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'Yes',
                    'No',
                    'Yes',
                ]
    
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                    console.log(`Indomitable`) 
                    AH = AH + AH * 0.3
                    if (AH > 0) {
                        console.log(`Health Increased`)
                        health = Math.round(AH)
                    } else return console.log(`Health Error`)
                    console.log(AH)
    
                    skillEmbed
                            .addFields(
                                { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Health** to **${health.toLocaleString()}**` },
                            )   
                Attacker.SkillUsed = 'Health'
                interaction.followUp({embeds: [skillEmbed]})
                } else return
                        }            
            }
        if (Attacker.OfficerSkill === 'Caring Angel') {
            if (Defender.SkillUsed === 'Attack') {
                console.log(`Caring Angel`)   
                AH = AH + AH * 0.35
                if (AH > 0) {
                    console.log(`Health Increased`)
                    health = Math.round(AH)
                } else return console.log(`Health Error`)
    
                skillEmbed
                        .addFields(
                            { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Health** to **${health.toLocaleString()}**` },
                        )  
                interaction.followUp({embeds: [skillEmbed]})
                Attacker.SkillUsed = 'Health'
            } else return
            }
        if (Attacker.OfficerSkill === `The Soldier's Soldier`) {
            console.log(`The Soldier's Soldier`)  
            return attackSkill = `The Soldier's Soldier`                     
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Undaunted') {
            console.log(`Undaunted`)            
            return attackSkill = `Undaunted`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Who Dares Wins') {
            if (Defender.AttackType === 'Ground') {
                console.log(`Who Dares Wins`)   
                const health = Math.round(DH = DH - DH * 0.2)
                DH - health
                if (DH > 0) {
                    console.log(`Health Decreased`)
                } else return console.log(`Health Error`)
    
                skillEmbed
                        .addFields(
                            { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & decreases ${Defender.Player} **${Defender.Name}'s Health** by **${health.toLocaleString()}**` },
                        )  
                interaction.followUp({embeds: [skillEmbed]})
                Attacker.SkillUsed = 'Health'
            } else return        }        
        if (Attacker.OfficerSkill === 'Guardian Angel') {
            console.log(`Guardian Angel`)            
            return attackSkill = `Guardian Angel`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Hand of Destruction') {
            console.log(`Hand of Destruction`)            
            return attackSkill = `Hand of Destruction`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Frontline Fire') {
            console.log(`Frontline Fire`)            
            return attackSkill = `Frontline Fire`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Vengeance') {
            console.log(`Vengeance`)            
            return attackSkill = `Vengeance`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'The Motherland') {
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns'){
                const chance = [
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'No',
                    'Yes',
                ]
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`The Motherland`)
                const damage = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.5)
                Attacker.AttackPower = damage
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${damage.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
        }
            } else return
        }        
        if (Attacker.OfficerSkill === 'Mine Detonator') {
            console.log(`Mine Detonator`)            
            return attackSkill = `Mine Detonator`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Flamestorm') {
            console.log(`Flamestorm`)            
            return attackSkill = `Flamestorm`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Inpenetrable') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'Yes',
                'No',
                'Yes',
            ]

            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Inpenetrable`) 
                AH = AH + AH * 0.5
                if (AH > 0) {
                    console.log(`Health Increased`)
                    health = Math.round(AH)
                } else return console.log(`Health Error`)
                console.log(AH)

                skillEmbed
                        .addFields(
                            { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Health** to **${health.toLocaleString()}**` },
                        )   
            Attacker.SkillUsed = 'Health'
            interaction.followUp({embeds: [skillEmbed]})
            } else return        }        
        if (Attacker.OfficerSkill === 'Breaching Charge') {
            console.log(`Breaching Charge`)            
            return attackSkill = `Breaching Charge`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Flaming Meteors') {
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns'){
                const chance = [
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'No',
                    'Yes',
                ]
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Flaming Meteors`)
                const damage = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.3)
                Attacker.AttackPower = damage
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
        }
            } else return
        }        
        if (Attacker.OfficerSkill === 'Master of War') {
            console.log(`Master of War`)            
            return attackSkill = `Master of War`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Phantom Power') {
            console.log(`Phantom Power`)            
            return attackSkill = `Phantom Power`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Blinding Flash') {
            console.log(`Blinding Flash`)            
            return attackSkill = `Blinding Flash`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Rain of Blades') {
            console.log(`Rain of Blades`)            
            return attackSkill = `Rain of Blades`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Devastation') {
            console.log(`Devastation`)            
            return attackSkill = `Devastation`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Beauty Worth Preserving') {
            console.log(`Beauty Worth Preserving`)        
            return attackSkill = `Beauty Worth Preserving`               
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Forlorn Hope') {
            console.log(`Forlorn Hope`)            
            return attackSkill = `Forlorn Hope`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Sky Dancer') {
            console.log(`Sky Dancer`)            
            return attackSkill = `Sky Dancer`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Untouchable') {
            console.log(`Untouchable`)            
            return attackSkill = `Untouchable`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Heavenly Rays') {
            console.log(`Heavenly Rays`)            
            return attackSkill = `Heavenly Rays`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Twin Fangs') {
            console.log(`Twin Fangs`)            
            return attackSkill = `Twin Fangs`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Night Evader') {
            console.log(`Night Evader`)            
            return attackSkill = `Caring Angel`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Unleashed Justice') {
            console.log(`Unleashed Justice`)            
            return attackSkill = `Caring Angel`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Sticky Situation') {
            console.log(`Sticky Situation`)            
            return attackSkill = `Sticky Situation Angel`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Desperate Counterattack') {
            console.log(`Desperate Counterattack`)        
            return attackSkill = `Desperate Counterattack`               
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Last Gasp') {
            console.log(`Last Gasp`)            
            return attackSkill = `Last Gasp`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }
    }
}