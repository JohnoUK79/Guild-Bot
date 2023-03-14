const sql = require("../config/Database");
const { TextInputStyle, ModalBuilder, EmbedBuilder, TextInputBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    officerSkills: async function (Attacker, Defender) {
        if (Attacker.OfficerSkill === 'Indomitable') {
            console.log(`Indomitable`) 
            return attackSkill = `Indomitable`       
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }
        if (Attacker.OfficerSkill === 'Caring Angel') {
            console.log(`Caring Angel`)        
            return attackSkill = `Caring Angel`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
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
            console.log(`Who Dares Wins`)   
            return attackSkill = `Who Dares Wins`                    
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
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
            console.log(`The Motherland`)            
            return attackSkill = `The Motherland`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
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
            console.log(`Inpenetrable`)            
            return attackSkill = `Inpenetrable`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Breaching Charge') {
            console.log(`Breaching Charge`)            
            return attackSkill = `Breaching Charge`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
        }        
        if (Attacker.OfficerSkill === 'Flaming Meteors') {
            console.log(`Flaming Meteors`)            
            return attackSkill = `Flaming Meteors`           
            //return attackerMultipler = 1.0, defenderMultipler = 1.0
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
        module.exports.attackSkill = attackSkill
        // module.exports.defenderMultipler = defenderMultipler

    }
}