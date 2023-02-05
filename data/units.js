
const Vanguard = {

    Infantry: {
      4: {
        Name: 'M28 Squad',
        Firepower: 19300,
        HP: 10300,
        Speed: 25
      },
      4.5: {
        Name: 'Karabiner 98k Squad',
        Firepower: 24200,
        HP: 13000,
        Speed: 25
      },
      5: {
        Name: 'Gewehr 41 Squad',
        Firepower: 31300,
        HP: 16300,
        Speed: 28
      },
      5.5: {
        Name: 'Gewehr 43 Squad',
        Firepower: 38700,
        HP: 20600,
        Speed: 25
      },
      6: {
        Name: 'Suomi KP/-31 Squad',
        Firepower: 48600,
        HP: 25900,
        Speed: 30
      },
      6.5: {
        Name: 'MP40 Squad',
        Firepower: 61800,
        HP: 32700,
        Speed: 30
      },
      7: {
        Name: 'StG 44 Squad',
        Firepower: 77500,
        HP: 41200,
        Speed: 33
      },
      7.5: {
        Name: 'RK 62 Squad',
        Firepower: 97200,
        HP: 51900,
        Speed: 33
      },
      7.75: {
        Name: 'M76 Squad',
        Firepower: 123000,
        HP: 65400,
        Speed: 35
      },
      8: {
        Name: 'G3 Squad',
        Firepower: 138000,
        HP: 73500,
        Speed: 35
      },
      8.5: {
        Name: 'G36 Squad',
        Firepower: 154000,
        HP: 82500,
        Speed: 35
      },
      8.75: {
        Name: 'G36K Squad',
        Firepower: 174000,
        HP: 92600,
        Speed: 35
      },
      9: {
        Name: 'MP5 Squad',
        Firepower: 195000,
        HP: 103000,
        Speed: 35
      },
      9.5: {
        Name: 'UMP45 Squad',
        Firepower: 219000,
        HP: 116000,
        Speed: 35
      },
      9.75: {
        Name: 'MP7 Squad',
        Firepower: 246000,
        HP: 130000,
        Speed: 35
      },
    },

    MeduimTanks: {
      4: {
        Name: 'Panzer III Ausf. E',
        Firepower: 72300,
        HP: 35800,
        Speed: 38
      },
      4.5: {
        Name: 'Panzer III Ausf. G',
        Firepower: 90600,
        HP: 45200,
        Speed: 38
      },
      5: {
        Name: 'Panzer IV Ausf. A',
        Firepower: 114000,
        HP: 56900,
        Speed: 39
      },
      5.5: {
        Name: 'Panzer IV Ausf. D',
        Firepower: 144000,
        HP: 71700,
        Speed: 39
      },
      6: {
        Name: 'Panzer IV Ausf. G',
        Firepower: 182000,
        HP: 90400,
        Speed: 40
      },
      6.5: {
        Name: 'Panzer IV Ausf. H',
        Firepower: 229000,
        HP: 113000,
        Speed: 40
      },
      7: {
        Name: 'Panzer Ausf. D',
        Firepower: 289000,
        HP: 143000,
        Speed: 43
      },
      7.5: {
        Name: 'Panzer Ausf. A',
        Firepower: 365000,
        HP: 180000,
        Speed: 44
      },
      7.75: {
        Name: 'Panzer Ausf. G',
        Firepower: 459000,
        HP: 227000,
        Speed: 45
      },
      8: {
        Name: 'AMX-13',
        Firepower: 667000,
        HP: 401000,
        Speed: 45
      },
      8.5: {
        Name: 'AMX-30',
        Firepower: 749000,
        HP: 451000,
        Speed: 45
      },
      8.75: {
        Name: 'AMX-30B2',
        Firepower: 841000,
        HP: 506000,
        Speed: 45
      },
      9: {
        Name: 'Leopard 1A1',
        Firepower: 944000,
        HP: 568000,
        Speed: 45
      },
      9.5: {
        Name: 'Leopard 1A4',
        Firepower: 1050000,
        HP: 638000,
        Speed: 45
      },
      9.75: {
        Name: 'Leopard 2',
        Firepower: 1190000,
        HP: 716000,
        Speed: 45
      },
    },

    HeavyTanks: {
      4: {
        Name: 'VK 30.01 (H)',
        Firepower: 88900,
        HP: 56300,
        Speed: 2
      },
      4.5: {
        Name: 'VK 36.01 (H)',
        Firepower: 112000,
        HP: 71000,
        Speed: 29
      },
      5: {
        Name: 'Tiger (P)',
        Firepower: 141000,
        HP: 89500,
        Speed: 30
      },
      5.5: {
        Name: 'Tiger (P) Commandant',
        Firepower: 178000,
        HP: 112000,
        Speed: 30
      },
      6: {
        Name: 'Tiger I',
        Firepower: 225000,
        HP: 142000,
        Speed: 31
      },
      6.5: {
        Name: 'Tiger I Ausf. E',
        Firepower: 283000,
        HP: 179000,
        Speed: 31
      },
      7: {
        Name: 'Tiger II',
        Firepower: 357000,
        HP: 225000,
        Speed: 31
      },
      7.5: {
        Name: 'Tiger II (H)',
        Firepower: 449000,
        HP: 284000,
        Speed: 33
      },
      7.75: {
        Name: 'Tiger II Ausf. B',
        Firepower: 566000,
        HP: 358000,
        Speed: 33
      },
      8: {
        Name: 'AMX-13',
        Firepower: 667000,
        HP: 401000,
        Speed: 45
      },
      8.5: {
        Name: 'AMX-30',
        Firepower: 749000,
        HP: 451000,
        Speed: 45
      },
      8.75: {
        Name: 'AMX-30B2',
        Firepower: 841000,
        HP: 506000,
        Speed: 45
      },
      9: {
        Name: 'Leopard 1A1',
        Firepower: 944000,
        HP: 568000,
        Speed: 45
      },
      9.5: {
        Name: 'Leopard 1A4',
        Firepower: 1050000,
        HP: 638000,
        Speed: 45
      },
      9.75: {
        Name: 'Leopard 2',
        Firepower: 1190000,
        HP: 716000,
        Speed: 45
      },
    },

    TankHunters: {
      4: {
        Name: 'Marder I',
        Firepower: 74000,
        HP: 30700,
        Speed: 38
      },
      4.5: {
        Name: 'Marder II',
        Firepower: 92900,
        HP: 38700,
        Speed: 38
      },
      5: {
        Name: 'Hetzer',
        Firepower: 117000,
        HP: 48800,
        Speed: 40
      },
      5.5: {
        Name: 'StuG III',
        Firepower: 148000,
        HP: 61500,
        Speed: 41
      },
      6: {
        Name: 'Nashorn',
        Firepower: 186000,
        HP: 77500,
        Speed: 44
      },
      6.5: {
        Name: 'Hummel',
        Firepower: 234000,
        HP: 97600,
        Speed: 44
      },
      7: {
        Name: 'Jagdpanther',
        Firepower: 296000,
        HP: 123000,
        Speed: 44
      },
      7.5: {
        Name: 'Elefant',
        Firepower: 373000,
        HP: 155000,
        Speed: 44
      },
      7.75: {
        Name: 'Jagdtiger',
        Firepower: 470000,
        HP: 195000,
        Speed: 44
      },
      8: {
        Name: 'SA 342M Gazelle',
        Firepower: 791000,
        HP: 328000,
        Speed: 44
      },
      8.5: {
        Name: 'SA 319B Alouette III',
        Firepower: 888000,
        HP: 369000,
        Speed: 44
      },
      8.75: {
        Name: 'AS565 Panther',
        Firepower: 997000,
        HP: 414000,
        Speed: 44
      },
      9: {
        Name: 'A129 Mangusta',
        Firepower: 1110000,
        HP: 465000,
        Speed: 44
      },
      9.5: {
        Name: 'T129 ATAK',
        Firepower: 1250000,
        HP: 522000,
        Speed: 44
      },
      9.75: {
        Name: 'EC665 Tiger',
        Firepower: 1400000,
        HP: 585000,
        Speed: 44
      },
    },

    SuperHeavyTanks: {
      5: {
        Name: 'Lowe',
        Firepower: 163000,
        HP: 130000,
        Speed: 19
      },
      5.5: {
        Name: 'Schwerer Lowe',
        Firepower: 204000,
        HP: 164000,
        Speed: 19
      },
      6: {
        Name: 'E-50',
        Firepower: 258000,
        HP: 206000,
        Speed: 20
      },
      6.5: {
        Name: 'E-75',
        Firepower: 325000,
        HP: 260000,
        Speed: 20
      },
      7: {
        Name: 'Maus Prototype',
        Firepower: 410000,
        HP: 328000,
        Speed: 21
      },
      7.5: {
        Name: 'Maus V1',
        Firepower: 516000,
        HP: 413000,
        Speed: 21
      },
      7.75: {
        Name: 'Maus V2',
        Firepower: 650000,
        HP: 520000,
        Speed: 23
      },
      8: {
        Name: 'E-100',
        Firepower: 1090000,
        HP: 876000,
        Speed: 23
      },
      8.5: {
        Name: 'E-100 (Maus Turret)',
        Firepower: 1230000,
        HP: 984000,
        Speed: 23
      },
     8.75: {
      Name: 'E-100 (Krupp Turret)',
        Firepower: 1380000,
        HP: 1100000,
        Speed: 23
      },
      9: {
        Name: 'Karl-Gerat',
        Firepower: 1550000,
        HP: 1240000,
        Speed: 23
      },
      9.5: {
        Name: 'P.1000 Ratte',
        Firepower: 1740000,
        HP: 1390000,
        Speed: 23
      },
      9.75: {
        Name: 'P.1500 Monster',
        Firepower: 1950000,
        HP: 1560000,
        Speed: 23
      },
    },

    AntiTankGuns: {
      4: {
        Name: '10.5cm IeFH 16',
        Firepower: 64200,
        HP: 12700,
        Speed: 15
      },
      4.5: {
        Name: '10.5cm IeFH 18',
        Firepower: 80900,
        HP: 16100,
        Speed: 15
      },
      5: {
        Name: '7.5cm Pak 40',
        Firepower: 101000,
        HP: 20200,
        Speed: 15
      },
      5.5: {
        Name: '7.5cm Pak 41',
        Firepower: 128000,
        HP: 25500,
        Speed: 15
      },
      6: {
        Name: '8.8cm Flak 18',
        Firepower: 161000,
        HP: 32200,
        Speed: 15
      },
      6.5: {
        Name: '8.8cm Pak 43',
        Firepower: 203000,
        HP: 40600,
        Speed: 1
      },
      7: {
        Name: '12.8cm Flak 40',
        Firepower: 256000,
        HP: 51100,
        Speed: 15
      },
      7.5: {
        Name: '12.8cm Pak 44',
        Firepower: 323000,
        HP: 64400,
        Speed: 15
      },
      7.75: {
        Name: '12.8cm Flak 40/2',
        Firepower: 407000,
        HP: 81200,
        Speed: 15
      },
      8: {
        Name: '105mm MIe 1950',
        Firepower: 457000,
        HP: 91100,
        Speed: 15
      },
      8.5: {
        Name: 'Mk 61 105mm',
        Firepower: 513000,
        HP: 102000,
        Speed: 15
      },
      8.75: {
        Name: '155mm MIe 50',
        Firepower: 576000,
        HP: 114000,
        Speed: 15
      },
      9: {
        Name: 'Mk F3 155mm',
        Firepower: 646000,
        HP: 128000,
        Speed: 15
      },
      9.5: {
        Name: 'CAESAR',
        Firepower: 726000,
        HP: 144000,
        Speed: 15
      },
      9.75: {
        Name: 'PzH 2000',
        Firepower: 814000,
        HP: 162000,
        Speed: 15
      },
    },

    Fighters: {
      5: {
        Name: 'He 100',
        Firepower: 137000,
        HP: 48900,
        Speed: 150
      },
      5.5: {
        Name: 'He 112',
        Firepower: 172000,
        HP: 61700,
        Speed: 155
      },
      6: {
        Name: 'Bf 109',
        Firepower: 217000,
        HP: 77700,
        Speed: 159
      },
      6.5: {
        Name: 'Me 209',
        Firepower: 276000,
        HP: 97900,
        Speed: 165
      },
      7: {
        Name: 'Fw 190',
        Firepower: 348000,
        HP: 123000,
        Speed: 170
      },
      7.5: {
        Name: 'Ta 152',
        Firepower: 440000,
        HP: 155000,
        Speed: 174
      },
      7.75: {
        Name: 'Ta 183',
        Firepower: 559000,
        HP: 195000,
        Speed: 180
      },
      8: {
        Name: 'Mirage III',
        Firepower: 623000,
        HP: 219000,
        Speed: 185
      },
      8.5: {
        Name: 'Mirage 5',
        Firepower: 716000,
        HP: 246000,
        Speed: 191
      },
      8.75: {
        Name: 'Mirage 50',
        Firepower: 813000,
        HP: 277000,
        Speed: 197
      },
      9: {
        Name: 'Mirage 2000',
        Firepower: 918000,
        HP: 311000,
        Speed: 203
      },
      9.5: {
        Name: 'Tornado',
        Firepower: 1040000,
        HP: 349000,
        Speed: 209
      },
      9.75: {
        Name: 'Rafale',
        Firepower: 1170000,
        HP: 391000,
        Speed: 216
      },
    },

    Bombers: {
      5: {
        Name: 'He 111',
        Firepower: 119000,
        HP: 68000,
        Speed: 10
      },
      5.5: {
        Name: 'He 166 Greif',
        Firepower: 150000,
        HP: 85600,
        Speed: 103
      },
      6: {
        Name: 'Ju 87',
        Firepower: 189000,
        HP: 107000,
        Speed: 106
      },
      6.5: {
        Name: 'Ju 87G',
        Firepower: 238000,
        HP: 136000,
        Speed: 110
      },
      7: {
        Name: 'Ju 88',
        Firepower: 300000,
        HP: 171000,
        Speed: 113
      },
      7.5: {
        Name: 'Ju 188',
        Firepower: 378000,
        HP: 215000,
        Speed: 116
      },
      7.75: {
        Name: 'Ju 288',
        Firepower: 476000,
        HP: 272000,
        Speed: 120
      },
      8: {
        Name: 'Ar 234 Blitz',
        Firepower: 534000,
        HP: 305000,
        Speed: 124
      },
      8.5: {
        Name: 'Super Mystere',
        Firepower: 600000,
        HP: 342000,
        Speed: 127
      },
      8.75: {
        Name: 'Mirage IV',
        Firepower: 673000,
        HP: 384000,
        Speed: 131
      },
      9: {
        Name: 'Etendard IV',
        Firepower: 756000,
        HP: 431000,
        Speed: 135
      },
      9.5: {
        Name: 'Jaguar',
        Firepower: 849000,
        HP: 484000,
        Speed: 140
      },
      9.75: {
        Name: 'Super Etendard',
        Firepower: 953000,
        HP: 544000,
        Speed: 144
      },
    },
}
  
module.exports = {
    Vanguard: Vanguard
  };