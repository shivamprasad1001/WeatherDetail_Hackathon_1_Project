import { EmergencyContact } from './types';

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { country: 'India', police: '112', ambulance: '102', fire: '101' },
  { country: 'United States', police: '911', ambulance: '911', fire: '911' },
  { country: 'United Kingdom', police: '999', ambulance: '999', fire: '999' },
  { country: 'Japan', police: '110', ambulance: '119', fire: '119' },
  { country: 'Australia', police: '000', ambulance: '000', fire: '000' },
  { country: 'Germany', police: '110', ambulance: '112', fire: '112' },
  { country: 'Canada', police: '911', ambulance: '911', fire: '911' },
];

export const SAFETY_TIPS = {
  earthquake: {
    title: 'Earthquake Safety',
    tips: [
      'Drop, Cover, and Hold On. Get under a sturdy table or desk.',
      'Stay away from windows, glass, and anything that could fall.',
      'If you are in bed, stay there and cover your head with a pillow.',
      'Do not use elevators.',
      'If you are outdoors, stay in an open area away from buildings and utility wires.',
      'After the shaking stops, check for injuries and damage. Be prepared for aftershocks.',
    ],
  },
  flood: {
    title: 'Flood Safety',
    tips: [
      'Move to higher ground immediately. Do not wait for instructions.',
      'Avoid walking or driving through floodwaters. Just six inches of moving water can knock you down.',
      'Turn off utilities at the main switches if instructed to do so.',
      'Listen to your battery-powered radio for the latest updates.',
      'Have an emergency kit with water, non-perishable food, and medical supplies.',
    ],
  },
  wildfire: {
    title: 'Wildfire Safety',
    tips: [
      'Follow evacuation orders from authorities immediately.',
      'Close all windows, vents, and doors to prevent smoke from entering.',
      'Turn on lights to help firefighters see your house in dense smoke.',
      'Wear protective clothing like long sleeves and a mask if you have to go outside.',
      'Have a "go bag" ready with important documents, medications, and essentials.',
    ],
  },
  thunderstorm: {
    title: 'Severe Thunderstorm',
    tips: [
      'When thunder roars, go indoors. Seek shelter in a sturdy building.',
      'Avoid using corded phones and electrical appliances.',
      'Stay away from windows and doors.',
      'Do not take a shower or bath during a thunderstorm.',
      'If you are in a car, stay in the vehicle. It provides good protection.',
    ],
  },
  tsunami: {
    title: 'Tsunami Safety',
    tips: [
        'If you feel an earthquake and are in a coastal area, evacuate to higher ground immediately.',
        'Follow official evacuation routes and instructions.',
        'Do not wait for an official warning. The earthquake itself is the warning.',
        'Stay away from the coast until officials declare it is safe to return.',
        'A tsunami is a series of waves. Do not assume the danger is over after the first wave.',
    ]
  },
  cyclone: {
    title: 'Cyclone & Hurricane Safety',
    tips: [
      'Board up windows and secure loose items outside (furniture, trash cans).',
      'Have a disaster kit ready with food, water, flashlight, batteries, and a first-aid kit.',
      'Stay informed through official channels. Follow all evacuation orders.',
      'During the storm, stay indoors in an interior room on the lowest floor.',
      'Stay away from windows and glass doors. The "eye" of the storm may be calm, but it is temporary.',
      'Do not go outside until authorities announce it is safe.',
    ]
  },
  heatwave: {
    title: 'Heatwave Survival',
    tips: [
      'Stay hydrated. Drink plenty of water even if you do not feel thirsty.',
      'Stay indoors in air-conditioned places as much as possible.',
      'Wear lightweight, light-colored, and loose-fitting clothing.',
      'Limit outdoor activity, especially during the middle of the day.',
      'Never leave children or pets in a parked car.',
      'Check on relatives and neighbors, especially the elderly.',
    ]
  },
  firstaid: {
    title: 'Emergency Kit & First Aid',
    tips: [
      'Water: One gallon per person per day for at least three days.',
      'Food: At least a three-day supply of non-perishable food.',
      'First Aid Kit: Bandages, antiseptic wipes, pain relievers, and any personal medications.',
      'Tools: Flashlight, extra batteries, hand-crank or battery-powered radio.',
      'Sanitation: Moist towelettes, garbage bags, and plastic ties.',
      'Documents: Copies of important personal documents (identification, bank records).',
    ]
  }
};