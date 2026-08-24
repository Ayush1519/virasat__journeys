import img1 from "@/assets/site-amber.jpg";
import img2 from "@/assets/site-taj.jpg";
import img3 from "@/assets/site-hampi.jpg";
import img4 from "@/assets/site-khajuraho.jpg";
import img5 from "@/assets/hero-heritage.jpg";

// Real uploaded photos for all 10 featured destinations
import imgTajReal from "@/assets/site-taj-real.png";
import imgHampiReal from "@/assets/site-hampi-real.png";
import imgKhajurahoReal from "@/assets/site-khajuraho-real.jpg";
import imgMysoreReal from "@/assets/site-mysore-real.jpg";
import imgAmberReal from "@/assets/site-amber-real.png";
import imgVaranasiReal from "@/assets/site-varanasi-real.jpg";
import imgThikseyReal from "@/assets/site-thiksey-real.png";
import imgMeenakshiReal from "@/assets/site-meenakshi-real.jpg";
import imgPalolmReal from "@/assets/site-palolem-real.jpg";
import imgMunnarReal from "@/assets/site-munnar-real.jpg";

const pool = [img1, img2, img3, img4, img5];
export const poolImage = (i: number) => pool[i % pool.length];

export const CATEGORIES = [
  "Heritage & Monuments",
  "Temples & Monasteries",
  "Culture & Festivals",
  "Nature & Wildlife",
  "Food",
  "Beaches",
  "Mountains",
  "Historical Places",
  "Hidden Gems",
  "Local Experiences",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const INTERESTS = [
  "Heritage",
  "Culture",
  "History",
  "Temples & Monasteries",
  "Nature",
  "Wildlife",
  "Beaches",
  "Mountains",
  "Food",
  "Adventure",
  "Photography",
  "Festivals",
] as const;
export type Interest = (typeof INTERESTS)[number];

export type NearbyType =
  | "Heritage"
  | "Temple"
  | "Monastery"
  | "Museum"
  | "Nature"
  | "Waterfall"
  | "Lake"
  | "Beach"
  | "Viewpoint"
  | "Village"
  | "Restaurant"
  | "Hotel"
  | "Homestay"
  | "Experience";

export type Nearby = {
  name: string;
  type: NearbyType;
  distanceKm: number;
  desc: string;
};

export type Destination = {
  id: string;
  name: string;
  state: string;
  city: string;
  category: Category;
  interests: Interest[];
  coords: { lat: number; lng: number };
  image: string;
  tagline: string;
  description: string;
  bestTime: string;
  suggestedHours: number;
  entryFee: string;
  avgCostPerDay: number; // INR per person
  heritageSiteId?: string; // links to existing /site/$siteId
  food: string[];
  stays: { name: string; type: "Hotel" | "Homestay" | "Resort"; price: string }[];
  transport: string[];
  nearby: Nearby[];
};

const n = (name: string, type: NearbyType, distanceKm: number, desc: string): Nearby => ({
  name,
  type,
  distanceKm,
  desc,
});

export const destinations: Destination[] = [
  {
    id: "taj-mahal-agra",
    name: "Taj Mahal",
    state: "Uttar Pradesh",
    city: "Agra",
    category: "Heritage & Monuments",
    interests: ["Heritage", "History", "Photography"],
    coords: { lat: 27.1751, lng: 78.0421 },
    image: imgTajReal,
    tagline: "A teardrop of love carved in marble",
    description:
      "The world's most famous mausoleum, built by Shah Jahan for Mumtaz Mahal. Sunrise turns the marble rose-pink.",
    bestTime: "Oct – Mar",
    suggestedHours: 3,
    entryFee: "₹50 (Indian) / ₹1,100 (Foreign)",
    avgCostPerDay: 2800,
    heritageSiteId: "taj-mahal",
    food: ["Mughlai Biryani", "Agra Petha", "Bedai & Jalebi"],
    stays: [
      { name: "Heritage View Homestay", type: "Homestay", price: "₹1,400/night" },
      { name: "Taj Gateway Hotel", type: "Hotel", price: "₹5,500/night" },
    ],
    transport: ["Auto & e-rickshaw", "Gatimaan Express from Delhi", "Agra Cantt taxis"],
    nearby: [
      n("Agra Fort", "Heritage", 2.5, "Red sandstone Mughal fortress-city."),
      n("Mehtab Bagh", "Viewpoint", 3.5, "Riverside garden with the classic sunset Taj view."),
      n("Itmad-ud-Daulah", "Heritage", 6, "The 'Baby Taj', first Mughal marble inlay tomb."),
      n("Fatehpur Sikri", "Heritage", 38, "Abandoned imperial capital of Akbar."),
      n("Pinch of Spice", "Restaurant", 4, "Legendary Mughlai kebabs and curries."),
      n("Kachhpura Village", "Village", 4.5, "Community walk through a riverside heritage village."),
    ],
  },
  {
    id: "hampi",
    name: "Hampi",
    state: "Karnataka",
    city: "Hospet",
    category: "Historical Places",
    interests: ["Heritage", "History", "Photography", "Adventure"],
    coords: { lat: 15.335, lng: 76.46 },
    image: imgHampiReal,
    tagline: "The forgotten capital of an empire of gold",
    description:
      "Boulder-strewn ruins of the Vijayanagara Empire — musical pillars, stone chariots and sunset hills.",
    bestTime: "Nov – Feb",
    suggestedHours: 8,
    entryFee: "₹40 (Indian) / ₹600 (Foreign)",
    avgCostPerDay: 2000,
    heritageSiteId: "hampi",
    food: ["Jowar Rotti", "Bisi Bele Bath", "Banana-leaf thali"],
    stays: [
      { name: "Hampi Boulders Resort", type: "Resort", price: "₹6,000/night" },
      { name: "Virupapur Gaddi Homestay", type: "Homestay", price: "₹900/night" },
    ],
    transport: ["Cycle & scooter rentals", "Coracle river crossing", "Hospet railhead (13 km)"],
    nearby: [
      n("Vittala Temple", "Temple", 3, "Stone chariot and musical pillars."),
      n("Matanga Hill", "Viewpoint", 2, "Best sunrise over the ruins."),
      n("Tungabhadra River", "Nature", 1.5, "Coracle rides at dawn."),
      n("Anegundi Village", "Village", 5, "Older-than-Hampi village with craft collectives."),
      n("Mango Tree", "Restaurant", 2, "Riverside thalis under a canopy."),
      n("Daroji Bear Sanctuary", "Nature", 25, "Sloth bears at dusk."),
    ],
  },
  {
    id: "khajuraho",
    name: "Khajuraho Temples",
    state: "Madhya Pradesh",
    city: "Khajuraho",
    category: "Temples & Monasteries",
    interests: ["Heritage", "History", "Temples & Monasteries"],
    coords: { lat: 24.8318, lng: 79.9199 },
    image: imgKhajurahoReal,
    tagline: "Poetry written in sandstone",
    description: "Chandela-era temples wrapped in some of the finest sculpture ever carved in India.",
    bestTime: "Oct – Mar",
    suggestedHours: 4,
    entryFee: "₹40 (Indian) / ₹600 (Foreign)",
    avgCostPerDay: 2200,
    heritageSiteId: "khajuraho",
    food: ["Bhutte ka Kees", "Poha Jalebi", "Dal Bafla"],
    stays: [
      { name: "Chandela Homestay", type: "Homestay", price: "₹1,200/night" },
      { name: "Radisson Khajuraho", type: "Hotel", price: "₹6,500/night" },
    ],
    transport: ["Khajuraho airport", "Cycle rickshaws", "Taxi to Panna (45 km)"],
    nearby: [
      n("Panna National Park", "Nature", 45, "Tigers, gharials and the Ken river."),
      n("Raneh Falls", "Waterfall", 20, "Canyon of five-coloured volcanic rock."),
      n("Archaeological Museum", "Museum", 1, "Rescued sculpture from the lost temples."),
      n("Pandav Falls", "Waterfall", 34, "Forest pool below a 30 m drop."),
      n("Ken River Lodge", "Hotel", 42, "Riverside jungle lodge."),
    ],
  },
  {
    id: "mysore-palace",
    name: "Mysore Palace",
    state: "Karnataka",
    city: "Mysuru",
    category: "Culture & Festivals",
    interests: ["Heritage", "Culture", "Festivals", "Photography"],
    coords: { lat: 12.3051, lng: 76.6551 },
    image: imgMysoreReal,
    tagline: "A palace lit by a hundred thousand lamps",
    description: "Indo-Saracenic seat of the Wadiyars, ablaze with 97,000 bulbs every Sunday evening.",
    bestTime: "Sep – Feb (Dasara in Oct)",
    suggestedHours: 3,
    entryFee: "₹70",
    avgCostPerDay: 2400,
    heritageSiteId: "mysore-palace",
    food: ["Mysore Pak", "Mysore Masala Dosa", "Filter coffee"],
    stays: [
      { name: "Lalitha Mahal Palace", type: "Hotel", price: "₹8,000/night" },
      { name: "Green Leaf Homestay", type: "Homestay", price: "₹1,600/night" },
    ],
    transport: ["City buses", "Tonga rides", "Bengaluru–Mysuru expressway (3 hr)"],
    nearby: [
      n("Chamundi Hills", "Viewpoint", 13, "1,000 steps to the goddess and the city view."),
      n("Brindavan Gardens", "Nature", 21, "Musical fountains below KRS dam."),
      n("Devaraja Market", "Experience", 1.5, "Flowers, incense and jaggery stalls."),
      n("Srirangapatna", "Heritage", 16, "Tipu Sultan's island fort capital."),
      n("Ranganathittu", "Nature", 19, "Bird sanctuary boat safari."),
      n("Mylari Dosa", "Restaurant", 2, "Butter-soft dosas since 1938."),
    ],
  },
  {
    id: "amber-fort",
    name: "Amber Fort",
    state: "Rajasthan",
    city: "Jaipur",
    category: "Heritage & Monuments",
    interests: ["Heritage", "History", "Photography", "Culture"],
    coords: { lat: 26.9855, lng: 75.8513 },
    image: imgAmberReal,
    tagline: "Honey-gold walls above a mirror lake",
    description: "Rajput hill fort of Man Singh I, crowned by the mirrored Sheesh Mahal.",
    bestTime: "Oct – Mar",
    suggestedHours: 4,
    entryFee: "₹100 (Indian) / ₹500 (Foreign)",
    avgCostPerDay: 3000,
    heritageSiteId: "amber-fort",
    food: ["Dal Baati Churma", "Laal Maas", "Ghewar"],
    stays: [
      { name: "Haveli Homestay Amer", type: "Homestay", price: "₹2,000/night" },
      { name: "Samode Haveli", type: "Hotel", price: "₹12,000/night" },
    ],
    transport: ["Jaipur city bus 5", "Cabs from Pink City (11 km)", "Jeep ride up the ramp"],
    nearby: [
      n("Jaigarh Fort", "Heritage", 4, "World's largest wheeled cannon."),
      n("Panna Meena ka Kund", "Heritage", 1, "Symmetrical criss-cross stepwell."),
      n("Jal Mahal", "Lake", 7, "Palace floating in Man Sagar lake."),
      n("Hawa Mahal", "Heritage", 11, "953 latticed windows of the Palace of Winds."),
      n("Chokhi Dhani", "Experience", 22, "Rajasthani village folk evening."),
      n("Nahargarh Viewpoint", "Viewpoint", 9, "Jaipur skyline at sunset."),
    ],
  },
  {
    id: "varanasi-ghats",
    name: "Varanasi Ghats",
    state: "Uttar Pradesh",
    city: "Varanasi",
    category: "Culture & Festivals",
    interests: ["Culture", "History", "Photography", "Festivals"],
    coords: { lat: 25.3109, lng: 83.0107 },
    image: imgVaranasiReal,
    tagline: "The oldest living city, breathing on the river",
    description: "88 ghats of prayer, music and smoke where the Ganga Aarti lights the dusk.",
    bestTime: "Oct – Mar",
    suggestedHours: 6,
    entryFee: "Free",
    avgCostPerDay: 1800,
    food: ["Kachori Sabzi", "Banarasi Paan", "Malaiyo", "Tamatar Chaat"],
    stays: [
      { name: "Ganga View Homestay", type: "Homestay", price: "₹1,500/night" },
      { name: "BrijRama Palace", type: "Hotel", price: "₹14,000/night" },
    ],
    transport: ["Boat rides", "Cycle rickshaw", "Varanasi Junction"],
    nearby: [
      n("Kashi Vishwanath Temple", "Temple", 0.5, "One of the twelve Jyotirlingas."),
      n("Sarnath", "Heritage", 10, "Where the Buddha gave his first sermon."),
      n("Ramnagar Fort", "Heritage", 14, "Riverside palace museum of the Kashi Naresh."),
      n("Assi Ghat Sunrise Yoga", "Experience", 3, "Dawn yoga and Subah-e-Banaras."),
      n("Blue Lassi Shop", "Restaurant", 0.8, "Clay-pot lassi in the old lanes."),
    ],
  },
  {
    id: "leh-thiksey",
    name: "Thiksey Monastery",
    state: "Ladakh",
    city: "Leh",
    category: "Temples & Monasteries",
    interests: ["Temples & Monasteries", "Mountains", "Culture", "Photography"],
    coords: { lat: 34.0559, lng: 77.6674 },
    image: imgThikseyReal,
    tagline: "A little Potala above the Indus",
    description: "Twelve-storey Gelug monastery with dawn prayers, horns and a 15 m Maitreya Buddha.",
    bestTime: "May – Sep",
    suggestedHours: 3,
    entryFee: "₹50",
    avgCostPerDay: 3500,
    food: ["Thukpa", "Momos", "Butter tea", "Skyu"],
    stays: [
      { name: "Nimmu House", type: "Homestay", price: "₹4,500/night" },
      { name: "The Grand Dragon Ladakh", type: "Hotel", price: "₹9,000/night" },
    ],
    transport: ["Leh airport (19 km)", "Shared taxis", "Bike rentals"],
    nearby: [
      n("Hemis Monastery", "Monastery", 25, "Ladakh's richest gompa and masked festival."),
      n("Shey Palace", "Heritage", 5, "Old royal seat with a copper Buddha."),
      n("Pangong Tso", "Lake", 150, "Colour-shifting high-altitude lake."),
      n("Indus–Zanskar Sangam", "Viewpoint", 40, "Two rivers, two colours."),
      n("Leh Market", "Experience", 18, "Apricots, pashmina and prayer flags."),
    ],
  },
  {
    id: "meenakshi-madurai",
    name: "Meenakshi Amman Temple",
    state: "Tamil Nadu",
    city: "Madurai",
    category: "Temples & Monasteries",
    interests: ["Temples & Monasteries", "Culture", "History", "Food"],
    coords: { lat: 9.9195, lng: 78.1193 },
    image: imgMeenakshiReal,
    tagline: "Fourteen towers of a thousand painted gods",
    description: "The living heart of Madurai — Dravidian gopurams, hall of 1,000 pillars, nightly palanquin ritual.",
    bestTime: "Oct – Mar",
    suggestedHours: 4,
    entryFee: "Free (museum ₹50)",
    avgCostPerDay: 1900,
    food: ["Jigarthanda", "Kari Dosa", "Madurai Idli"],
    stays: [
      { name: "Heritage Madurai", type: "Hotel", price: "₹6,000/night" },
      { name: "Nilaa Homestay", type: "Homestay", price: "₹1,300/night" },
    ],
    transport: ["Madurai Junction", "Autos", "Airport 12 km"],
    nearby: [
      n("Thirumalai Nayakkar Mahal", "Heritage", 2, "Indo-Saracenic palace light show."),
      n("Gandhi Memorial Museum", "Museum", 4, "Holds the khadi Gandhi wore when shot."),
      n("Alagar Kovil", "Temple", 21, "Hill shrine of Meenakshi's brother."),
      n("Vaigai Riverfront", "Nature", 2.5, "Evening walks and street food."),
      n("Konar Kadai", "Restaurant", 3, "Famous kari dosa after midnight."),
    ],
  },
  {
    id: "goa-palolem",
    name: "Palolem Beach",
    state: "Goa",
    city: "Canacona",
    category: "Beaches",
    interests: ["Beaches", "Nature", "Food", "Adventure"],
    coords: { lat: 15.01, lng: 74.0233 },
    image: imgPalolmReal,
    tagline: "A crescent of palms and silent discos",
    description: "South Goa's calmest cove — kayaks at dawn, dolphins offshore, beach shacks at dusk.",
    bestTime: "Nov – Feb",
    suggestedHours: 10,
    entryFee: "Free",
    avgCostPerDay: 2600,
    food: ["Goan Fish Curry Rice", "Prawn Balchão", "Bebinca"],
    stays: [
      { name: "Palolem Beach Huts", type: "Homestay", price: "₹1,800/night" },
      { name: "Art Resort Goa", type: "Resort", price: "₹7,000/night" },
    ],
    transport: ["Canacona railway (3 km)", "Scooter rentals", "Dabolim airport 67 km"],
    nearby: [
      n("Butterfly Beach", "Beach", 3, "Reachable only by boat or forest trail."),
      n("Cotigao Sanctuary", "Nature", 12, "Canopy watchtower in evergreen forest."),
      n("Cabo de Rama Fort", "Heritage", 25, "Cliff-edge Portuguese fort."),
      n("Talpona Village", "Village", 8, "Sleepy riverside Goan life."),
      n("Cafe Inn", "Restaurant", 1, "Goan-Portuguese breakfasts."),
    ],
  },
  {
    id: "munnar",
    name: "Munnar Tea Hills",
    state: "Kerala",
    city: "Munnar",
    category: "Mountains",
    interests: ["Mountains", "Nature", "Photography", "Food"],
    coords: { lat: 10.0889, lng: 77.0595 },
    image: imgMunnarReal,
    tagline: "Green waves rolling into the mist",
    description: "Colonial tea estates at 1,600 m with Nilgiri tahr, spice trails and cloud-filled valleys.",
    bestTime: "Sep – Mar",
    suggestedHours: 12,
    entryFee: "Free",
    avgCostPerDay: 2700,
    food: ["Kerala Sadya", "Appam & Stew", "Cardamom tea"],
    stays: [
      { name: "Tea Estate Bungalow", type: "Homestay", price: "₹3,200/night" },
      { name: "Windermere Estate", type: "Resort", price: "₹9,500/night" },
    ],
    transport: ["Cabs from Kochi (4 hr)", "Jeep safaris", "Local KSRTC buses"],
    nearby: [
      n("Eravikulam National Park", "Nature", 13, "Home of the Nilgiri tahr."),
      n("Attukal Waterfalls", "Waterfall", 9, "Cascades through tea slopes."),
      n("Mattupetty Dam", "Lake", 13, "Boating with elephant sightings."),
      n("Top Station", "Viewpoint", 32, "Cloud sea over the Western Ghats."),
      n("KDHP Tea Museum", "Museum", 2, "Live tea processing and tasting."),
    ],
  },
  {
    id: "jaisalmer",
    name: "Jaisalmer Fort",
    state: "Rajasthan",
    city: "Jaisalmer",
    category: "Heritage & Monuments",
    interests: ["Heritage", "History", "Adventure", "Culture"],
    coords: { lat: 26.9124, lng: 70.9128 },
    image: poolImage(1),
    tagline: "A living fort of golden sandstone",
    description: "One of the world's few inhabited forts, rising from the Thar like a sandcastle.",
    bestTime: "Oct – Mar",
    suggestedHours: 5,
    entryFee: "₹50",
    avgCostPerDay: 2500,
    food: ["Ker Sangri", "Pyaaz Kachori", "Makhaniya Lassi"],
    stays: [
      { name: "Desert Camp Sam Dunes", type: "Resort", price: "₹3,500/night" },
      { name: "Killa Bhawan Haveli", type: "Homestay", price: "₹2,800/night" },
    ],
    transport: ["Jaisalmer railway", "Camel & jeep safaris", "Autos inside the fort"],
    nearby: [
      n("Patwon ki Haveli", "Heritage", 1, "Five mansions of filigreed stone."),
      n("Sam Sand Dunes", "Nature", 42, "Sunset camel rides and folk music."),
      n("Gadisar Lake", "Lake", 2, "Boats among ghats and chhatris."),
      n("Kuldhara", "Village", 18, "Abandoned village of the Paliwals."),
      n("Desert Boy's Dhani", "Restaurant", 1.5, "Rajasthani thali with Ghoomar."),
    ],
  },
  {
    id: "konark",
    name: "Konark Sun Temple",
    state: "Odisha",
    city: "Konark",
    category: "Heritage & Monuments",
    interests: ["Heritage", "History", "Temples & Monasteries"],
    coords: { lat: 19.8876, lng: 86.0945 },
    image: poolImage(2),
    tagline: "A chariot of the sun in stone",
    description: "13th-century temple shaped as Surya's chariot with 24 carved wheels that tell time.",
    bestTime: "Oct – Feb",
    suggestedHours: 3,
    entryFee: "₹40 (Indian) / ₹600 (Foreign)",
    avgCostPerDay: 1800,
    food: ["Dalma", "Chhena Poda", "Seafood thali"],
    stays: [
      { name: "Lotus Eco Resort", type: "Resort", price: "₹4,200/night" },
      { name: "Konark Homestay", type: "Homestay", price: "₹1,100/night" },
    ],
    transport: ["Puri–Konark marine drive", "Buses from Bhubaneswar", "Autos"],
    nearby: [
      n("Chandrabhaga Beach", "Beach", 3, "Sunrise over the Bay of Bengal."),
      n("Puri Jagannath Temple", "Temple", 35, "Home of the Rath Yatra."),
      n("Chilika Lake", "Lake", 90, "Irrawaddy dolphins and migratory birds."),
      n("Ramachandi", "Nature", 7, "River meets sea beneath casuarina."),
      n("Konark Museum", "Museum", 0.5, "Fallen sculptures of the great temple."),
    ],
  },
  {
    id: "kaziranga",
    name: "Kaziranga National Park",
    state: "Assam",
    city: "Golaghat",
    category: "Nature & Wildlife",
    interests: ["Wildlife", "Nature", "Adventure", "Photography"],
    coords: { lat: 26.5775, lng: 93.1711 },
    image: poolImage(3),
    tagline: "Where the one-horned rhino still rules",
    description: "UNESCO grasslands of the Brahmaputra holding two-thirds of the world's great one-horned rhinos.",
    bestTime: "Nov – Apr",
    suggestedHours: 8,
    entryFee: "₹100 + safari charges",
    avgCostPerDay: 3800,
    food: ["Assam Thali", "Masor Tenga", "Pitha"],
    stays: [
      { name: "Diphlu River Lodge", type: "Resort", price: "₹11,000/night" },
      { name: "Kaziranga Tea Homestay", type: "Homestay", price: "₹2,000/night" },
    ],
    transport: ["Jorhat airport (97 km)", "Jeep & elephant safaris", "Guwahati highway"],
    nearby: [
      n("Majuli Island", "Village", 120, "World's largest river island and satras."),
      n("Hoollongapar Gibbon Sanctuary", "Nature", 90, "India's only ape."),
      n("Kakochang Waterfalls", "Waterfall", 13, "Falls amid tea and rubber estates."),
      n("Orchid Park", "Experience", 5, "Bihu dance and 500 orchid species."),
      n("Brahmaputra Viewpoint", "Viewpoint", 20, "Sunset over the great river."),
    ],
  },
  {
    id: "tawang",
    name: "Tawang Monastery",
    state: "Arunachal Pradesh",
    city: "Tawang",
    category: "Temples & Monasteries",
    interests: ["Temples & Monasteries", "Mountains", "Culture", "Adventure"],
    coords: { lat: 27.5861, lng: 91.8594 },
    image: poolImage(4),
    tagline: "India's largest monastery, at 10,000 feet",
    description: "A 400-year-old Gelug citadel above the Tawang Chu valley, birthplace region of the 6th Dalai Lama.",
    bestTime: "Mar – Oct",
    suggestedHours: 4,
    entryFee: "Free (ILP required)",
    avgCostPerDay: 3200,
    food: ["Thukpa", "Zan", "Momos", "Yak cheese"],
    stays: [
      { name: "Dolma Khangsar Homestay", type: "Homestay", price: "₹1,800/night" },
      { name: "Hotel Tawang Heights", type: "Hotel", price: "₹4,000/night" },
    ],
    transport: ["Guwahati–Tawang road (2 days)", "Shared Sumo taxis", "Helicopter to Tawang"],
    nearby: [
      n("Sela Pass", "Viewpoint", 78, "Snow gateway at 13,700 ft."),
      n("Madhuri Lake", "Lake", 30, "Sangetsar lake among dead trees."),
      n("Nuranang Falls", "Waterfall", 40, "100 m drop through pine forest."),
      n("Urgelling Gompa", "Monastery", 5, "Birthplace of the 6th Dalai Lama."),
      n("Monpa Village Walk", "Experience", 3, "Handmade paper and yak weaving."),
    ],
  },
  {
    id: "ajanta-ellora",
    name: "Ajanta & Ellora Caves",
    state: "Maharashtra",
    city: "Aurangabad",
    category: "Historical Places",
    interests: ["Heritage", "History", "Temples & Monasteries", "Photography"],
    coords: { lat: 20.5519, lng: 75.7002 },
    image: poolImage(0),
    tagline: "Mountains hollowed into cathedrals",
    description: "Buddhist frescoes at Ajanta and the monolithic Kailasa temple at Ellora, carved top-down from rock.",
    bestTime: "Nov – Mar",
    suggestedHours: 9,
    entryFee: "₹40 (Indian) / ₹600 (Foreign)",
    avgCostPerDay: 2400,
    food: ["Naan Qalia", "Hyderabadi-style biryani", "Shrikhand"],
    stays: [
      { name: "Vivanta Aurangabad", type: "Hotel", price: "₹6,500/night" },
      { name: "Ellora Homestay", type: "Homestay", price: "₹1,500/night" },
    ],
    transport: ["Aurangabad airport", "MTDC buses", "Cabs (Ajanta 100 km)"],
    nearby: [
      n("Bibi ka Maqbara", "Heritage", 30, "The Deccan's Taj."),
      n("Daulatabad Fort", "Heritage", 15, "Unconquered hill fortress."),
      n("Grishneshwar Temple", "Temple", 1, "The last Jyotirlinga."),
      n("Ajanta Viewpoint", "Viewpoint", 100, "Horseshoe gorge panorama."),
      n("Paithan", "Village", 55, "Home of the Paithani silk saree."),
    ],
  },
  {
    id: "rann-of-kutch",
    name: "Rann of Kutch",
    state: "Gujarat",
    city: "Bhuj",
    category: "Culture & Festivals",
    interests: ["Culture", "Festivals", "Nature", "Photography"],
    coords: { lat: 23.7337, lng: 69.8597 },
    image: poolImage(1),
    tagline: "A white desert under a full moon",
    description: "Salt flats stretching to the horizon, alive each winter with the Rann Utsav and Kutchi craft villages.",
    bestTime: "Nov – Feb",
    suggestedHours: 10,
    entryFee: "₹100 permit",
    avgCostPerDay: 3000,
    food: ["Kutchi Dabeli", "Bajra Rotla", "Kesar Doodh"],
    stays: [
      { name: "Tent City Dhordo", type: "Resort", price: "₹8,000/night" },
      { name: "Bhunga Homestay Hodka", type: "Homestay", price: "₹2,200/night" },
    ],
    transport: ["Bhuj railway (80 km)", "Cabs & permits at Bhirandiyara", "Camel carts"],
    nearby: [
      n("Kalo Dungar", "Viewpoint", 45, "Highest point in Kutch over the white Rann."),
      n("Nirona Village", "Village", 40, "Rogan art and copper bells."),
      n("Ajrakhpur", "Experience", 60, "Block-printing workshops."),
      n("Mandvi Beach", "Beach", 130, "Shipbuilding yard and Vijay Vilas palace."),
      n("Wild Ass Sanctuary", "Nature", 190, "Only home of the Indian wild ass."),
    ],
  },
  {
    id: "spiti-key",
    name: "Key Monastery, Spiti",
    state: "Himachal Pradesh",
    city: "Kaza",
    category: "Mountains",
    interests: ["Mountains", "Adventure", "Temples & Monasteries", "Photography"],
    coords: { lat: 32.2977, lng: 78.0122 },
    image: poolImage(2),
    tagline: "A white fort of monks in a cold desert",
    description: "Thousand-year-old monastery stacked on a crag above the Spiti river at 4,166 m.",
    bestTime: "Jun – Sep",
    suggestedHours: 3,
    entryFee: "Donation",
    avgCostPerDay: 2600,
    food: ["Thenthuk", "Chhang", "Seabuckthorn tea"],
    stays: [
      { name: "Kaza Homestay", type: "Homestay", price: "₹1,200/night" },
      { name: "Spiti Sarai", type: "Hotel", price: "₹4,500/night" },
    ],
    transport: ["Manali–Kaza road (Jun–Oct)", "Shimla–Kinnaur route", "Shared taxis"],
    nearby: [
      n("Kibber Village", "Village", 12, "One of the highest motorable villages."),
      n("Chandratal Lake", "Lake", 100, "Crescent moon lake at 4,300 m."),
      n("Langza Fossil Village", "Village", 14, "Marine fossils under a Buddha statue."),
      n("Pin Valley National Park", "Nature", 30, "Snow leopard country."),
      n("Komic Monastery", "Monastery", 18, "Among the world's highest gompas."),
    ],
  },
  {
    id: "sundarbans",
    name: "Sundarbans",
    state: "West Bengal",
    city: "Gosaba",
    category: "Nature & Wildlife",
    interests: ["Wildlife", "Nature", "Adventure", "Photography"],
    coords: { lat: 21.9497, lng: 88.9 },
    image: poolImage(3),
    tagline: "A tiger's kingdom of tides",
    description: "The world's largest mangrove delta — creeks, crocodiles and the elusive swimming tiger.",
    bestTime: "Nov – Feb",
    suggestedHours: 12,
    entryFee: "₹60 + boat permit",
    avgCostPerDay: 3200,
    food: ["Chingri Malai Curry", "Ilish Bhapa", "Mishti Doi"],
    stays: [
      { name: "Sundarban Jungle Camp", type: "Homestay", price: "₹2,500/night" },
      { name: "Sunderban Tiger Camp", type: "Resort", price: "₹7,500/night" },
    ],
    transport: ["Kolkata to Godkhali (3 hr)", "Country boats", "Ferries"],
    nearby: [
      n("Sajnekhali Watchtower", "Nature", 5, "Interpretation centre and bird hide."),
      n("Dobanki Canopy Walk", "Viewpoint", 12, "Half-km walk over tiger territory."),
      n("Netidhopani", "Heritage", 25, "400-year-old ruined temple in the forest."),
      n("Pakhiralay Village", "Village", 3, "Bengali mangrove village homestays."),
      n("Bonbibi Shrine", "Experience", 6, "Folk goddess of the forest."),
    ],
  },
  {
    id: "andaman-radhanagar",
    name: "Radhanagar Beach",
    state: "Andaman & Nicobar Islands",
    city: "Havelock",
    category: "Beaches",
    interests: ["Beaches", "Nature", "Adventure", "Photography"],
    coords: { lat: 11.983, lng: 92.9525 },
    image: poolImage(4),
    tagline: "Asia's whitest sand and turquoise silence",
    description: "A two-kilometre arc of powder sand backed by rainforest on Swaraj Dweep.",
    bestTime: "Oct – May",
    suggestedHours: 8,
    entryFee: "Free",
    avgCostPerDay: 4500,
    food: ["Grilled fish", "Coconut prawn curry", "Amritsari kulcha stalls"],
    stays: [
      { name: "Barefoot at Havelock", type: "Resort", price: "₹13,000/night" },
      { name: "Island Homestay", type: "Homestay", price: "₹2,400/night" },
    ],
    transport: ["Ferry from Port Blair (2 hr)", "Scooter rentals", "Autos"],
    nearby: [
      n("Elephant Beach", "Beach", 9, "Snorkelling over live coral."),
      n("Kalapathar Beach", "Beach", 12, "Black rocks at sunrise."),
      n("Neil Island", "Nature", 40, "Natural rock bridge and calm bays."),
      n("Scuba Dive Site Nemo Reef", "Experience", 6, "Beginner-friendly reef dives."),
      n("Cellular Jail, Port Blair", "Heritage", 70, "Freedom struggle memorial and light show."),
    ],
  },
  {
    id: "shillong-cherrapunji",
    name: "Living Root Bridges",
    state: "Meghalaya",
    city: "Cherrapunji",
    category: "Hidden Gems",
    interests: ["Nature", "Adventure", "Culture", "Photography"],
    coords: { lat: 25.2702, lng: 91.7323 },
    image: poolImage(0),
    tagline: "Bridges grown, not built",
    description: "Khasi root bridges woven over decades from living ficus roots, deep in the wettest hills on earth.",
    bestTime: "Sep – Apr",
    suggestedHours: 8,
    entryFee: "₹30 village fee",
    avgCostPerDay: 2400,
    food: ["Jadoh", "Tungrymbai", "Pukhlein"],
    stays: [
      { name: "Nongriat Homestay", type: "Homestay", price: "₹900/night" },
      { name: "Polo Orchid Resort", type: "Resort", price: "₹7,000/night" },
    ],
    transport: ["Shillong taxis (54 km)", "3,500-step trek to Nongriat", "Guwahati airport"],
    nearby: [
      n("Nohkalikai Falls", "Waterfall", 7, "India's tallest plunge waterfall."),
      n("Mawsmai Caves", "Nature", 6, "Limestone caves lit for walking."),
      n("Dawki River", "Lake", 80, "Boats seemingly floating on glass."),
      n("Mawlynnong", "Village", 78, "Asia's cleanest village."),
      n("Seven Sisters Viewpoint", "Viewpoint", 5, "Cliffs into the Bangladesh plains."),
    ],
  },
  {
    id: "golden-temple",
    name: "Golden Temple",
    state: "Punjab",
    city: "Amritsar",
    category: "Temples & Monasteries",
    interests: ["Temples & Monasteries", "Culture", "Food", "History"],
    coords: { lat: 31.62, lng: 74.8765 },
    image: poolImage(1),
    tagline: "Gold on water, langar for all",
    description: "Harmandir Sahib glowing in the Amrit Sarovar, serving 100,000 free meals a day.",
    bestTime: "Oct – Mar",
    suggestedHours: 4,
    entryFee: "Free",
    avgCostPerDay: 2000,
    food: ["Amritsari Kulcha", "Langar", "Lassi", "Fish Amritsari"],
    stays: [
      { name: "Hotel Ranjit's Svaasa", type: "Hotel", price: "₹6,000/night" },
      { name: "Golden Homestay", type: "Homestay", price: "₹1,300/night" },
    ],
    transport: ["Amritsar Junction", "Free shuttle e-rickshaws", "Airport 13 km"],
    nearby: [
      n("Jallianwala Bagh", "Heritage", 0.4, "1919 massacre memorial."),
      n("Partition Museum", "Museum", 0.8, "Stories of 1947."),
      n("Wagah Border", "Experience", 28, "Evening beating retreat ceremony."),
      n("Gobindgarh Fort", "Heritage", 3, "Living history museum."),
      n("Kesar da Dhaba", "Restaurant", 1, "Since 1916, ghee-drenched parathas."),
    ],
  },
  {
    id: "hyderabad-golconda",
    name: "Golconda Fort & Charminar",
    state: "Telangana",
    city: "Hyderabad",
    category: "Historical Places",
    interests: ["Heritage", "History", "Food", "Culture"],
    coords: { lat: 17.3833, lng: 78.4011 },
    image: poolImage(2),
    tagline: "Diamonds, domes and biryani",
    description: "Qutb Shahi citadel with acoustic gateways, plus the four-minaret heart of the old city.",
    bestTime: "Oct – Feb",
    suggestedHours: 6,
    entryFee: "₹25 – ₹40",
    avgCostPerDay: 2300,
    food: ["Hyderabadi Biryani", "Haleem", "Irani Chai & Osmania"],
    stays: [
      { name: "Taj Falaknuma Palace", type: "Hotel", price: "₹28,000/night" },
      { name: "Old City Homestay", type: "Homestay", price: "₹1,500/night" },
    ],
    transport: ["Metro to Charminar area", "Autos", "RGIA airport"],
    nearby: [
      n("Qutb Shahi Tombs", "Heritage", 2, "Seven-domed royal necropolis."),
      n("Chowmahalla Palace", "Heritage", 9, "Nizam's durbar and vintage cars."),
      n("Salar Jung Museum", "Museum", 10, "One man's world collection."),
      n("Laad Bazaar", "Experience", 9, "Lacquer bangles by the Charminar."),
      n("Osman Sagar", "Lake", 22, "Sunset boating outside the city."),
    ],
  },
  {
    id: "bodh-gaya",
    name: "Mahabodhi Temple",
    state: "Bihar",
    city: "Bodh Gaya",
    category: "Temples & Monasteries",
    interests: ["Temples & Monasteries", "History", "Heritage", "Culture"],
    coords: { lat: 24.6961, lng: 84.9911 },
    image: poolImage(3),
    tagline: "Where the Buddha woke up",
    description: "The Bodhi tree and 6th-century temple marking the site of enlightenment — a UNESCO World Heritage Site.",
    bestTime: "Oct – Mar",
    suggestedHours: 4,
    entryFee: "Free",
    avgCostPerDay: 1700,
    food: ["Litti Chokha", "Sattu Paratha", "Thekua"],
    stays: [
      { name: "Bhutanese Monastery Guesthouse", type: "Homestay", price: "₹800/night" },
      { name: "Hotel Bodhgaya Regency", type: "Hotel", price: "₹4,000/night" },
    ],
    transport: ["Gaya airport (12 km)", "Autos & cycle rickshaw", "Gaya Junction"],
    nearby: [
      n("Great Buddha Statue", "Heritage", 2, "25 m sandstone Buddha."),
      n("Dungeshwari Caves", "Nature", 12, "Where the Buddha fasted."),
      n("Nalanda Ruins", "Heritage", 80, "Ancient world university."),
      n("Rajgir", "Nature", 70, "Hot springs and the Vishwa Shanti Stupa."),
      n("Thai & Japanese Monasteries", "Monastery", 1.5, "A world of temples in one street."),
    ],
  },
  {
    id: "pondicherry",
    name: "French Quarter, Puducherry",
    state: "Puducherry",
    city: "Puducherry",
    category: "Local Experiences",
    interests: ["Culture", "Food", "Beaches", "Photography"],
    coords: { lat: 11.9338, lng: 79.8298 },
    image: poolImage(4),
    tagline: "Bougainvillea over yellow walls",
    description: "Colonial White Town, seaside promenade and Auroville's experiment in living.",
    bestTime: "Oct – Mar",
    suggestedHours: 8,
    entryFee: "Free",
    avgCostPerDay: 2800,
    food: ["Creole fish", "Filter coffee", "Baguettes & croissants"],
    stays: [
      { name: "Maison Perumal", type: "Hotel", price: "₹7,500/night" },
      { name: "Tamil Quarter Homestay", type: "Homestay", price: "₹1,900/night" },
    ],
    transport: ["Cycle rentals", "Chennai ECR drive (3 hr)", "Autos"],
    nearby: [
      n("Auroville Matrimandir", "Experience", 12, "Golden meditation sphere."),
      n("Paradise Beach", "Beach", 8, "Boat ride across the backwater."),
      n("Sri Aurobindo Ashram", "Heritage", 1, "Quiet courtyard of samadhi."),
      n("Arikamedu", "Heritage", 7, "Roman trading port ruins."),
      n("Chunnambar Backwaters", "Nature", 8, "Kayaking among casuarina."),
    ],
  },
];

export const getDestination = (id: string) => destinations.find((d) => d.id === id);

export const states = Array.from(new Set(destinations.map((d) => d.state))).sort();
export const citiesOf = (state: string) =>
  Array.from(new Set(destinations.filter((d) => !state || d.state === state).map((d) => d.city))).sort();

export type Trail = {
  id: string;
  name: string;
  subtitle: string;
  days: number;
  stops: string[]; // destination ids
  extraStops?: string[]; // named stops without a destination page
  transport: string;
  stay: string;
  estCostPerPerson: number;
  interests: Interest[];
};

export const trails: Trail[] = [
  {
    id: "golden-triangle",
    name: "Golden Triangle Trail",
    subtitle: "Delhi · Agra · Jaipur — India's classic first journey",
    days: 6,
    stops: ["taj-mahal-agra", "amber-fort"],
    extraStops: ["Delhi (Red Fort, Qutub Minar)", "Fatehpur Sikri", "Jaipur City Palace"],
    transport: "Train + private cab",
    stay: "Heritage hotels & havelis",
    estCostPerPerson: 24000,
    interests: ["Heritage", "History", "Culture", "Photography"],
  },
  {
    id: "buddhist-heritage",
    name: "Buddhist Heritage Trail",
    subtitle: "Bodh Gaya · Sarnath · Nalanda · Rajgir",
    days: 7,
    stops: ["bodh-gaya", "varanasi-ghats"],
    extraStops: ["Sarnath", "Nalanda", "Rajgir", "Kushinagar"],
    transport: "Train + road",
    stay: "Monastery guesthouses & hotels",
    estCostPerPerson: 21000,
    interests: ["Temples & Monasteries", "History", "Culture"],
  },
  {
    id: "south-temple",
    name: "South India Temple Trail",
    subtitle: "Madurai · Thanjavur · Rameswaram · Kanchipuram",
    days: 8,
    stops: ["meenakshi-madurai", "mysore-palace"],
    extraStops: ["Brihadeeswarar Temple, Thanjavur", "Rameswaram", "Kanchipuram"],
    transport: "Train + cab",
    stay: "Temple town hotels",
    estCostPerPerson: 23000,
    interests: ["Temples & Monasteries", "Culture", "Food", "Heritage"],
  },
  {
    id: "rajasthan-heritage",
    name: "Rajasthan Heritage Trail",
    subtitle: "Jaipur · Jodhpur · Udaipur · Jaisalmer",
    days: 10,
    stops: ["amber-fort", "jaisalmer"],
    extraStops: ["Mehrangarh, Jodhpur", "Lake Pichola, Udaipur", "Pushkar"],
    transport: "Private car + overnight train",
    stay: "Palaces, havelis & desert camps",
    estCostPerPerson: 38000,
    interests: ["Heritage", "History", "Culture", "Photography"],
  },
  {
    id: "himalayan-adventure",
    name: "Himalayan Adventure Trail",
    subtitle: "Manali · Spiti · Leh · Pangong",
    days: 12,
    stops: ["spiti-key", "leh-thiksey"],
    extraStops: ["Chandratal", "Pangong Tso", "Nubra Valley"],
    transport: "4x4 road trip / motorbike",
    stay: "Homestays & camps",
    estCostPerPerson: 46000,
    interests: ["Mountains", "Adventure", "Nature", "Photography"],
  },
  {
    id: "northeast-cultural",
    name: "Northeast Cultural Trail",
    subtitle: "Shillong · Cherrapunji · Kaziranga · Tawang",
    days: 11,
    stops: ["shillong-cherrapunji", "kaziranga", "tawang"],
    extraStops: ["Mawlynnong", "Majuli Island"],
    transport: "Shared Sumo & private cab",
    stay: "Village homestays & lodges",
    estCostPerPerson: 42000,
    interests: ["Culture", "Nature", "Wildlife", "Adventure"],
  },
  {
    id: "coastal-india",
    name: "Coastal India Trail",
    subtitle: "Goa · Gokarna · Kerala · Andamans",
    days: 12,
    stops: ["goa-palolem", "munnar", "andaman-radhanagar"],
    extraStops: ["Gokarna", "Alleppey backwaters", "Varkala"],
    transport: "Train, ferry & flights",
    stay: "Beach huts & resorts",
    estCostPerPerson: 52000,
    interests: ["Beaches", "Nature", "Food", "Adventure"],
  },
  {
    id: "central-heritage",
    name: "Central India Heritage Trail",
    subtitle: "Khajuraho · Orchha · Sanchi · Bhimbetka",
    days: 7,
    stops: ["khajuraho", "ajanta-ellora"],
    extraStops: ["Orchha", "Sanchi Stupa", "Bhimbetka rock shelters"],
    transport: "Train + cab",
    stay: "MP Tourism hotels & homestays",
    estCostPerPerson: 25000,
    interests: ["Heritage", "History", "Photography"],
  },
  {
    id: "wildlife-trail",
    name: "Wildlife Trail",
    subtitle: "Kaziranga · Sundarbans · Bandhavgarh · Periyar",
    days: 10,
    stops: ["kaziranga", "sundarbans"],
    extraStops: ["Bandhavgarh", "Periyar", "Ranthambore"],
    transport: "Flights + jeep safaris",
    stay: "Jungle lodges",
    estCostPerPerson: 48000,
    interests: ["Wildlife", "Nature", "Photography", "Adventure"],
  },
];

export const getTrail = (id: string) => trails.find((t) => t.id === id);

// Rough great-circle distance in km
export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

export const travelHours = (km: number) => Math.max(1, Math.round((km / 55) * 10) / 10);
