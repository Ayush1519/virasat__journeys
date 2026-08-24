import tajImg from "@/assets/site-taj-real.png";
import hampiImg from "@/assets/site-hampi-real.png";
import khajurahoImg from "@/assets/site-khajuraho-real.jpg";
import mysoreImg from "@/assets/site-mysore-real.jpg";
import amberImg from "@/assets/site-amber-real.png";

export type HeritageSite = {
  id: string;
  name: string;
  nameHi: string;
  location: string;
  state: string;
  coords: { lat: number; lng: number };
  image: string;
  era: string;
  tagline: string;
  category: "Monument" | "Temple" | "Fort" | "Palace";
  historyKids: string;
  historyDetailed: string;
  culturalImportance: string;
  food: { name: string; desc: string }[];
  clothing: { name: string; desc: string };
  music: { title: string; desc: string }[];
  funFacts: string[];
  timeline: { year: string; event: string }[];
  unesco: boolean;
};

export const sites: HeritageSite[] = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    nameHi: "ताज महल",
    location: "Agra, Uttar Pradesh",
    state: "Uttar Pradesh",
    coords: { lat: 27.1751, lng: 78.0421 },
    image: tajImg,
    era: "1632–1653 CE",
    tagline: "A teardrop of love carved in marble",
    category: "Monument",
    historyKids:
      "The Taj Mahal was built by a king named Shah Jahan because he loved his queen Mumtaz very much. When she passed away, he built this beautiful white marble palace so everyone would remember her forever.",
    historyDetailed:
      "Commissioned in 1632 by Mughal emperor Shah Jahan to house the tomb of his beloved wife Mumtaz Mahal, the Taj Mahal took over 20,000 artisans and 22 years to complete. It blends Persian, Islamic, Turkish, and Indian architectural styles into an unmatched masterpiece of Mughal architecture.",
    culturalImportance:
      "A UNESCO World Heritage Site and one of the New Seven Wonders of the World, the Taj is a global symbol of eternal love and India's architectural genius.",
    food: [
      { name: "Mughlai Biryani", desc: "Fragrant basmati rice cooked with saffron, meat and whole spices." },
      { name: "Petha", desc: "Agra's famous translucent candy made from ash gourd." },
      { name: "Bedai & Jalebi", desc: "A traditional spicy-sweet breakfast of Agra." },
    ],
    clothing: {
      name: "Mughal Sherwani & Anarkali",
      desc: "Royal flowing robes with intricate zardozi embroidery worn during the Mughal era.",
    },
    music: [
      { title: "Raag Yaman (Sitar)", desc: "A classical evening raga evoking devotion and calm." },
      { title: "Qawwali Sufiana", desc: "Devotional Sufi music rooted in Mughal courts." },
    ],
    funFacts: [
      "Changes color through the day — pink at dawn, white at noon, golden at moonlight.",
      "The four minarets are tilted slightly outward to protect the main dome in an earthquake.",
      "Calligraphy on the arches is made of black marble inlay.",
    ],
    timeline: [
      { year: "1631", event: "Mumtaz Mahal passes away, inspiring the monument." },
      { year: "1632", event: "Construction begins under Shah Jahan." },
      { year: "1653", event: "The Taj Mahal is completed." },
      { year: "1983", event: "Declared a UNESCO World Heritage Site." },
    ],
    unesco: true,
  },
  {
    id: "hampi",
    name: "Hampi",
    nameHi: "हम्पी",
    location: "Hampi, Karnataka",
    state: "Karnataka",
    coords: { lat: 15.335, lng: 76.46 },
    image: hampiImg,
    era: "14th–16th c. CE",
    tagline: "The forgotten capital of an empire of gold",
    category: "Temple",
    historyKids:
      "Hampi was once a huge rich city with tall temples and busy markets. Kings ruled from here long ago, and their stone temples still stand among giant boulders.",
    historyDetailed:
      "The ruins of Hampi mark the capital of the mighty Vijayanagara Empire (1336–1646). At its peak, it was one of the richest cities in the world, famed for its gem markets and sprawling temple complexes carved from granite.",
    culturalImportance:
      "A UNESCO World Heritage Site that preserves the largest collection of Hindu temple architecture from South India's golden age.",
    food: [
      { name: "Jowar Rotti", desc: "A rustic sorghum flatbread eaten with spicy chutneys." },
      { name: "Bisi Bele Bath", desc: "A warm rice-lentil dish spiced with local masalas." },
    ],
    clothing: {
      name: "Ilkal Saree & Dhoti",
      desc: "Handwoven Karnataka sarees and cotton dhotis worn by locals for centuries.",
    },
    music: [
      { title: "Carnatic Veena", desc: "Classical South Indian string music played in temple courtyards." },
      { title: "Dollu Kunitha", desc: "Thundering drum folk music of North Karnataka." },
    ],
    funFacts: [
      "The Vittala Temple has musical stone pillars that ring like instruments.",
      "Hampi's boulders were said to be thrown by the monkey gods of the Ramayana.",
      "The city was larger than Paris at its peak.",
    ],
    timeline: [
      { year: "1336", event: "Vijayanagara Empire founded." },
      { year: "1500s", event: "Hampi becomes world's second largest city." },
      { year: "1565", event: "Battle of Talikota leads to its decline." },
      { year: "1986", event: "Named a UNESCO World Heritage Site." },
    ],
    unesco: true,
  },
  {
    id: "khajuraho",
    name: "Khajuraho Temples",
    nameHi: "खजुराहो",
    location: "Khajuraho, Madhya Pradesh",
    state: "Madhya Pradesh",
    coords: { lat: 24.8318, lng: 79.9199 },
    image: khajurahoImg,
    era: "950–1050 CE",
    tagline: "Poetry written in sandstone",
    category: "Temple",
    historyKids:
      "Long ago, kings built many temples covered with beautiful carvings of people, animals and stories. These temples tell us how people lived a thousand years ago.",
    historyDetailed:
      "Built by the Chandela dynasty between 950 and 1050 CE, the Khajuraho temples are renowned for their Nagara-style architecture and richly sculpted exteriors depicting everyday life, mythology, and spirituality.",
    culturalImportance:
      "A UNESCO World Heritage Site celebrated for blending devotion and human experience in stone.",
    food: [
      { name: "Bhutte ka Kees", desc: "Grated corn cooked with milk and spices — a MP classic." },
      { name: "Poha Jalebi", desc: "Flattened rice with crispy syrup-soaked jalebi." },
    ],
    clothing: {
      name: "Chanderi Saree",
      desc: "Lightweight handloom sarees from Madhya Pradesh known for their sheen.",
    },
    music: [
      { title: "Dhrupad", desc: "One of India's oldest classical vocal forms." },
      { title: "Bundeli Folk", desc: "Regional folk songs of the Bundelkhand plateau." },
    ],
    funFacts: [
      "Originally 85 temples — only 25 survive today.",
      "Carvings depict over 240 human figures per temple wall.",
      "Rediscovered in 1838 by a British engineer lost in the jungle.",
    ],
    timeline: [
      { year: "950", event: "First temples built by Chandela kings." },
      { year: "1050", event: "Temple complex completed." },
      { year: "1838", event: "Rediscovered by T.S. Burt." },
      { year: "1986", event: "UNESCO World Heritage status granted." },
    ],
    unesco: true,
  },
  {
    id: "mysore-palace",
    name: "Mysore Palace",
    nameHi: "मैसूर पैलेस",
    location: "Mysuru, Karnataka",
    state: "Karnataka",
    coords: { lat: 12.3051, lng: 76.6551 },
    image: mysoreImg,
    era: "1912 CE",
    tagline: "A palace lit by a hundred thousand lamps",
    category: "Palace",
    historyKids:
      "Mysore Palace was home to kings called the Wadiyars. Every Sunday night, the whole palace lights up with thousands of golden lights — it looks like magic!",
    historyDetailed:
      "The current palace was rebuilt between 1897 and 1912 after a fire, designed by British architect Henry Irwin in Indo-Saracenic style — blending Hindu, Muslim, Rajput, and Gothic elements. It was the seat of the Wadiyar dynasty for nearly six centuries.",
    culturalImportance:
      "The heart of the grand Dasara festival, a 10-day celebration featuring processions, music, and the spectacular illumination of the palace with 97,000 bulbs.",
    food: [
      { name: "Mysore Pak", desc: "A rich ghee-soaked sweet invented in the palace kitchen." },
      { name: "Mysore Masala Dosa", desc: "Crispy crepe with spicy red chutney." },
    ],
    clothing: {
      name: "Mysore Silk Saree",
      desc: "Luxurious pure silk sarees with real gold zari borders.",
    },
    music: [
      { title: "Nadaswaram", desc: "A traditional wind instrument played in royal ceremonies." },
      { title: "Carnatic Vocal", desc: "Classical vocal music patronized by the Wadiyars." },
    ],
    funFacts: [
      "Illuminated with 97,000 incandescent bulbs every Sunday evening.",
      "Contains solid gold and silver doors in its Durbar Hall.",
      "One of the most visited monuments in India — more than the Taj in some years.",
    ],
    timeline: [
      { year: "1399", event: "Wadiyar dynasty founded in Mysore." },
      { year: "1897", event: "Old wooden palace destroyed by fire." },
      { year: "1912", event: "Present palace completed." },
      { year: "Today", event: "Hosts world-famous Mysuru Dasara celebrations." },
    ],
    unesco: false,
  },
  {
    id: "amber-fort",
    name: "Amber Fort",
    nameHi: "आमेर किला",
    location: "Jaipur, Rajasthan",
    state: "Rajasthan",
    coords: { lat: 26.9855, lng: 75.8513 },
    image: amberImg,
    era: "1592 CE",
    tagline: "Honey-gold walls above a mirror lake",
    category: "Fort",
    historyKids:
      "Amber Fort is a giant honey-coloured castle on a hill. Rajput warrior kings lived here. Inside is a magical mirror room where one candle becomes a thousand stars!",
    historyDetailed:
      "Built by Raja Man Singh I in 1592 and expanded by successive rulers, Amber Fort served as the capital of the Kachwaha Rajputs until 1727. Its blend of Hindu and Mughal architecture is epitomized by the dazzling Sheesh Mahal (Hall of Mirrors).",
    culturalImportance:
      "A UNESCO World Heritage Site under 'Hill Forts of Rajasthan' and a living symbol of Rajput valor, artistry, and royal life.",
    food: [
      { name: "Dal Baati Churma", desc: "Lentils with baked wheat balls and sweet crumble." },
      { name: "Laal Maas", desc: "Fiery red Rajasthani mutton curry." },
      { name: "Ghewar", desc: "A disc-shaped sweet soaked in saffron syrup." },
    ],
    clothing: {
      name: "Bandhani & Angrakha",
      desc: "Tie-dyed sarees and flowing Rajput robes in vivid desert colors.",
    },
    music: [
      { title: "Manganiyar Folk", desc: "Soul-stirring desert ballads of Rajasthan." },
      { title: "Ghoomar", desc: "Music for the traditional swirling dance of Rajput women." },
    ],
    funFacts: [
      "You can ride up to the fort on a decorated elephant.",
      "The Sheesh Mahal was designed so that one candle reflects into thousands.",
      "A secret tunnel connects Amber to nearby Jaigarh Fort.",
    ],
    timeline: [
      { year: "1592", event: "Construction begins under Raja Man Singh I." },
      { year: "1600s", event: "Expanded with palaces and the Sheesh Mahal." },
      { year: "1727", event: "Capital moves to Jaipur." },
      { year: "2013", event: "UNESCO World Heritage inscription." },
    ],
    unesco: true,
  },
];

export const getSite = (id: string) => sites.find((s) => s.id === id);
