const speedyDevelopment = {
    title: 'Speedy Development',
    missions: [
      ' • Earn 1 Building Power Point: +10 points',
      ' • Earn 1 Technology Power Point: +10 points',
      ' • Use 1 Universal Coupon: +5,000 points',
      ' • Use 1 Camp Coupon: +5,000 points'
    ],
    rank1: '15K',
    rank2: '75K',
    rank3: '465K'
  };
  
  const resourceCollection = {
    title: 'Resource Collection',
    missions: [
      ' • Collect 100 military funds: +1 point',
      ' • Collect 100 steel: +1 point',
      ' • Collect 100 oil: +1 point',
      ' • Mine Gold x1: +20 points'
    ],
    rank1: '10K',
    rank2: '27.5K',
    rank3: '50K'
  };
  
  const wipingOutRaven = {
    title: 'Wiping Out Raven',
    missions: [
       " • Defeat Lv. Raven 1-10 and collect loot: +600 points",
       " • Defeat Lv. Raven 11-15 and collect loot: +700 points",
       " • Defeat Lv. Raven 16-20 and collect loot: +800 points",
       " • Defeat Lv. Raven 21-25 and collect loot: +900 points",
       " • Defeat Lv. Raven 26-30 and collect loot: +1000 points",
       " • Defeat Lv. Raven 31-35 and collect loot: +1,100 points",
       " • Defeat Lv. Raven 36-40 and collect loot: +1,300 points",
       " • Destroy Lv. Raven's Bunker. 1 and collect the loot: +3,000 points",
       " • Destroy Lv. Raven's Bunker. 2 and collect the loot: +3,200 points",
       " • Destroy Lv. Raven's Bunker. 3 and collect the loot: +3,400 points",
       " • Destroy Lv. Raven's Bunker. 4 and collect the loot: +3,600 points",
       " • Destroy Lv. Raven's Bunker. 5 and collect the loot: +3,800 points",
       " • Destroy Lv. Raven's Bunker. 6 and collect the loot: +4,000 points",
       " • Destroy Lv. Raven's Bunker. 7 and collect loot: +4,200 points",
       " • Destroy Lv. Raven's Bunker. 8 and collect loot: +4,400 points",
       " • Destroy Lv. Raven's Bunker. 9 and collect loot: +4,600 points"
    ],
    rank1: '10K',
    rank2: '30K',
    rank3: '90K'
  };
  
  const stockpilingResources = {
    title: 'Stockpiling Resources',
    missions: [
      " • Produce Wood Planks x1: +15 points",
      " • Produce Bricks x1: +60 points",
      " • Produce Cement x1: +300 points",
      " • Produce I-Beams x1: +525 points",
      " • Produce Asphalt x1: +750 points",
      " • Produce Concrete x1: +1650 points"
    ],
    rank1: '14K',
    rank2: '70K',
    rank3: '434K'
  };
  
  const urgentConstruction = {
    title: 'Urgent Construction',
    missions: [
      " • Earn 1 Building Power Point: +10 points",
      " • 1 minute production rush: +15 points"
    ],
    rank1: '25K',
    rank2: '135K',
    rank3: '850K'
  };
  
  const lightningReasearch = {
    title: 'Lightning Reasearch',
    missions: [
      " • Earn 1 Technology Power Point: +10 points",
      " • 1 minute research rush: +15 points"
    ],
    rank1: '25K',
    rank2: '135K',
    rank3: '850K'
  };
  
  const fullSpeedAhead = {
    title: 'Full Speed Ahead',
    missions: [
      " • 1 minute production rush: +15 points",
      " • 1 minute research rush: +15 points"
    ],
    rank1: '14K',
    rank2: '70K',
    rank3: '425K'
  };
  
  const militaryTraining = {
    title: 'Military Training',
    missions: [
      " • Use 1 universal coupon: +10,000 points",
      " • Use 1 camp coupon: +10,000 points",
      " • Use Universal 4-star component for assembly: +5,000 points",
      " • Use Universal 5-star component for assembly: +45,000 points"
    ],
    rank1: '25K',
    rank2: '120K',
    rank3: '800K'
  };
  
  module.exports = {
    'speedyDevelopment':     speedyDevelopment,
    'resourceCollection':    resourceCollection,
    'wipingOutRaven':        wipingOutRaven,
    'stockpilingResources':  stockpilingResources,
    'urgentConstruction':    urgentConstruction,
    'lightningReasearch':    lightningReasearch,
    'fullSpeedAhead':        fullSpeedAhead,
    'militaryTraining':      militaryTraining,
    
    '1-00': speedyDevelopment,
    '1-04': resourceCollection,
    '1-08': wipingOutRaven,
    '1-12': speedyDevelopment,
    '1-16': resourceCollection,
    '1-20': wipingOutRaven,
    
    '2-00': stockpilingResources,
    '2-04': urgentConstruction,
    '2-08': speedyDevelopment,
    '2-12': stockpilingResources,
    '2-16': urgentConstruction,
    '2-20': speedyDevelopment,
    
    '3-00': lightningReasearch,
    '3-04': fullSpeedAhead,
    '3-08': speedyDevelopment,
    '3-12': lightningReasearch,
    '3-16': fullSpeedAhead,
    '3-20': speedyDevelopment,
    
    '4-00': militaryTraining,
    '4-04': militaryTraining,
    '4-08': militaryTraining,
    '4-12': militaryTraining,
    '4-16': militaryTraining,
    '4-20': militaryTraining,
    
    '5-00': lightningReasearch,
    '5-04': urgentConstruction,
    '5-08': speedyDevelopment,
    '5-12': lightningReasearch,
    '5-16': urgentConstruction,
    '5-20': speedyDevelopment,
    
    '6-00': urgentConstruction,
    '6-04': fullSpeedAhead,
    '6-08': lightningReasearch,
    '6-12': urgentConstruction,
    '6-16': fullSpeedAhead,
    '6-20': lightningReasearch,
    
    '0-00': speedyDevelopment,
    '0-04': wipingOutRaven,
    '0-08': fullSpeedAhead,
    '0-12': speedyDevelopment,
    '0-16': wipingOutRaven,
    '0-20': fullSpeedAhead
  };