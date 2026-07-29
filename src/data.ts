/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommitteeMember, MeetingMinutes, CommunityEvent, NewsItem, HubActivity } from './types';

import andreaImg from './assets/images/andrea.jpg';
import nigelImg from './assets/images/nigel.jpg';
import emilyImg from './assets/images/emily.jpg';
import simonImg from './assets/images/simon.jpg';
import kevinImg from './assets/images/kevin.jpg';
import rebeccaImg from './assets/images/rebecca.jpg';
import jimImg from './assets/images/jim.jpg';

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    id: 'andrea-davis',
    name: 'Andrea Davis',
    role: 'Chairperson & Council Liaison',
    bio: 'Member since 2020 with a focus on the environment. Andrea is also a member of the ECAN Banks Peninsula Water Zone Committee and was elected to the Environment Canterbury Regional Council.',
    email: 'chairperson@sumnercommunity.nz',
    image: andreaImg,
    imagePosition: 'object-[center_20%]',
  },
  {
    id: 'nigel-georgieff',
    name: 'Nigel Georgieff',
    role: 'Treasurer & Local Business Advocate',
    bio: 'Nigel joined us in November 2025. He brings a wealth of experience in the not-for-profit sector. He currently manages Sumner Bays Union Trust and has 40 years of involvement with a variety of sporting clubs throughout the city.',
    email: 'accounts@sumnercommunity.nz',
    image: nigelImg,
    imagePosition: 'object-[center_25%]',
  },
  {
    id: 'emily-quane',
    name: 'Emily Quane',
    role: 'The Arts & Community Noticeboard',
    bio: 'Emily is a qualified Art & Ceramic Teacher and professional artist based in Sumner. Overseeing community arts programming—murals, events, workshops, Emily also runs an after-school art class from The Hub. She is also managing our community noticeboard in the Sumner Village.',
    image: emilyImg,
    imagePosition: 'object-[center_20%]',
  },
  {
    id: 'simon-brown',
    name: 'Simon Brown',
    role: 'The Vibe Monitor',
    bio: 'Sumner local since the 1980s, avid surfer, and kaitiaki of the ocean and our esplanade.',
    image: simonImg,
    imagePosition: 'object-[center_25%]',
  },
  {
    id: 'kevin-comm-safety',
    name: 'Kevin Boyle',
    role: 'Community Safety',
    bio: 'Kevin joined the committee in November 2025. He is a retired police investigator and a local Sumner resident passionate about keeping Sumner safe.',
    image: kevinImg,
    imagePosition: 'object-[center_25%]',
  },
  {
    id: 'rebecca-brosnahan',
    name: 'Rebecca Brosnahan',
    role: 'Community Events',
    bio: 'Rebecca returned to Christchurch after a 30 year hyatatis and took up residence in Sumner, enjoying the village community feel and living by the ocean. Joining the committee in November 2025, Rebecca brings a strong background in events.',
    image: rebeccaImg,
    imagePosition: 'object-[center_20%]',
  },
  {
    id: 'jim-perry',
    name: 'Jim Perry',
    role: 'The Hub Coordinator Extraordinaire',
    bio: 'Hub Coordinator and the friendly face at Sumner Hub. Jim helps with community needs and runs the Community Van service, Civil Defence projects, and the Bikery. A passionate outdoorsman and youth mentor with the 180 Degrees Trust.',
    email: 'hub@sumnercommunity.nz',
    image: jimImg,
    imagePosition: 'object-[center_25%]',
  }
];

export const MEETING_MINUTES_LIST: MeetingMinutes[] = [
  {
    id: '2025-05',
    date: 'May 2025',
    summary: 'Discussed the proposed changes to Nayland Street parking, reviewed the Hub budget, and welcomed two new committee members.',
    pdfUrl: '#'
  },
  {
    id: '2025-04',
    date: 'April 2025',
    summary: 'Addressed the sand dune preservation plan with Christchurch City Council officers, set dates for winter clean-up, and approved community grant applications.',
    pdfUrl: '#'
  },
  {
    id: '2025-03',
    date: 'March 2025',
    summary: 'Finalised the Sumner Hub roof repairs schedule, discussed Civil Defence emergency container stocking, and reviewed local business summer feedback.',
    pdfUrl: '#'
  },
  {
    id: '2025-02',
    date: 'February 2025',
    summary: 'Reviewed the Annual General Meeting outcomes, set strategic objectives for 2025/2026, and updated the community van fuel-rate offsets.',
    pdfUrl: '#'
  }
];

export const PAST_YEARS_ARCHIVES = {
  '2024': [
    { id: '2024-12', date: 'December 2024', summary: 'Sumner Summer festival review and surplus budget allocation.', pdfUrl: '#' },
    { id: '2024-11', date: 'November 2024', summary: 'Discussion on Clifton Hills bus route adjustments and community van reservation terms.', pdfUrl: '#' },
    { id: '2024-10', date: 'October 2024', summary: 'Hub earthquake strengthening certification wrap-up and spring garden kick-off.', pdfUrl: '#' }
  ],
  '2023': [
    { id: '2023-12', date: 'December 2023', summary: 'Christmas beach carols logistics, security upgrades on Brighton shore lines.', pdfUrl: '#' },
    { id: '2023-08', date: 'August 2023', summary: 'Winter storm high water feedback, coastal erosion submission to Environment Canterbury.', pdfUrl: '#' }
  ]
};

export const UPCOMING_EVENTS: CommunityEvent[] = [
  {
    id: 'ocean-ember-sauna',
    name: 'Ocean Ember Sauna',
    date: 'Weekly ongoing',
    location: 'Sumner Hub',
    time: '5pm - 9pm',
    description: "Ocean Ember Sauna is grounded in community, care, and connection, born from the idea that wellbeing is a shared phenomenon. Sessions invite you to slow down, restore your wairua, and soak in the heat of the fire. Whether you're seeking relaxation, reflection, or a moment to pause - you're always welcome.",
    linkText: 'Book Here',
    linkUrl: 'https://www.oceanembersauna.co.nz/bookings'
  },
  {
    id: 'sumner-artisan-christmas-market',
    name: 'Sumner Artisan Christmas Market',
    date: 'Sunday 29th November',
    location: 'Village Green',
    time: '10 am - 4 pm',
    description: 'Browse craft workshops, organic produce, hand-shaped surfboards, and sample artisanal food. Live local acoustic performances throughout the day, along with workshops. Family fun and Christmas shopping ticked off.',
    linkText: 'Secure your market stall',
    linkUrl: 'https://forms.gle/Jzv38NKiY3EyuPz18'
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'nayland-streetscape',
    headline: 'Proposed Changes to Nayland Street Streetscape',
    publishedDate: 'June 2025',
    summary: 'The Christchurch City Council has opened submissions on proposed changes to the Nayland Street streetscape. The consultation closes 30 June — as your local residents\' association, SCRA will be making a submission. If you\'d like your views included, let us know.',
    linkText: 'Read consultation document'
  },
  {
    id: 'bikery-renovation',
    headline: 'The Bikery Workshop Upgrades are Complete!',
    publishedDate: 'May 2025',
    summary: 'Thanks to the energetic support of local trusts and the volunteer mechanic team, the Bikery bike-repair workspace is equipped with premium alignment and maintenance tools. Free community repair shifts are held weekly.',
    linkText: 'Read about the Bikery'
  },
  {
    id: 'dune-conservation',
    headline: 'Native Planting Programme Secures Funding',
    publishedDate: 'April 2025',
    summary: 'SCRA has secured a $5,000 regional environmental grant to plant 800 native pingao and spinifex grasses to stabilise the beachfront sand dunes against winter storm swells.',
    linkText: 'Volunteer details'
  }
];

export const HUB_ACTIVITIES: HubActivity[] = [
  {
    id: 'van',
    title: 'Community Van',
    description: 'A 10-seater van available for hire for school outings, sports trips, and community adventures around Canterbury.',
    icon: 'Truck'
  },
  {
    id: 'art',
    title: 'Art at Sumner Hub',
    description: 'Pottery and art classes for all levels — a creative space inspired by Sumner’s coastal textures and views.',
    icon: 'Palette'
  },
  {
    id: 'goatshed',
    title: 'The Goat Shed',
    description: 'Surfboard shaping, board repairs, and a beach-wave lending library — custom made for beach lovers and wave-chasers.',
    icon: 'Waves'
  },
  {
    id: 'enviro',
    title: 'Sumner Enviro Network',
    description: 'Local sustainability projects including Precious Plastics recycling, Conservation trails, Predator Free Sumner, and schools recycling.',
    icon: 'Leaf'
  },
  {
    id: 'bikery',
    title: 'The Bikery',
    description: 'Bike maintenance workshops, cycling lessons, and DIY hands-on support to keep Sumner residents rolling safely.',
    icon: 'Bike'
  },
  {
    id: 'civil-def',
    title: 'Civil Defence Emergency Response',
    description: 'Emergency planning maps, backup water reservoirs, satellite radio, and local coordination assets.',
    icon: 'ShieldAlert'
  }
];
