import { destinations, type Category } from "./destinations";

export type Reel = {
  id: string;
  destinationId: string;
  title: string;
  caption: string;
  creator: string;
  music: string;
  state: string;
  city: string;
  category: Category;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  durationSec: number;
};

const captions: Record<string, { title: string; caption: string; music: string }> = {
  "taj-mahal-agra": { title: "Sunrise at the Taj", caption: "Reached at 5:40 AM — the marble turns rose-pink for about ten minutes. Go early, skip the crowd. ✨", music: "Raga Bhairav · Sitar Sunrise" },
  hampi: { title: "Boulder city of kings", caption: "Cycling through Hampi's ruins feels like riding through a forgotten empire. 🚲", music: "Carnatic Veena Loop" },
  khajuraho: { title: "Stone that breathes", caption: "Every inch of these temple walls is carved. A thousand years and still sharp. 🪨", music: "Bansuri Dreams" },
  "mysore-palace": { title: "1,00,000 bulbs", caption: "Sunday 7 PM, the whole palace lights up at once. Goosebumps. 💡", music: "Nadaswaram Royal" },
  "amber-fort": { title: "Mirror palace magic", caption: "One candle inside Sheesh Mahal turns into a thousand stars. 🕯️", music: "Rajasthani Folk Beat" },
  "varanasi-ghats": { title: "Ganga Aarti", caption: "Boat seat at 6 PM. Bells, fire, and the whole river glowing. 🔥", music: "Shiv Tandav Chant" },
  "leh-thiksey": { title: "Morning prayers at Thiksey", caption: "Monks, long horns, butter tea at 3,600 m. Nothing prepares you. 🏔️", music: "Tibetan Horn Meditation" },
  "meenakshi-madurai": { title: "Colours of Meenakshi", caption: "14 gopurams, 33,000 sculptures. Look up until your neck hurts. 🌈", music: "Temple Nadaswaram" },
  "goa-palolem": { title: "Palolem, no filter", caption: "Kayak out at sunset and the whole bay goes gold. 🛶", music: "Goa Sunset Chill" },
  munnar: { title: "Tea carpet hills", caption: "Layers of green all the way to the clouds. Chai tastes different here. 🍃", music: "Kerala Rain Flute" },
  jaisalmer: { title: "The living golden fort", caption: "People still live inside this 12th-century fort. Camel ride into the dunes after. 🐫", music: "Manganiyar Desert Folk" },
  konark: { title: "The chariot of the Sun", caption: "24 stone wheels that still tell time. Engineering from 1250 CE. ☀️", music: "Odissi Rhythm" },
  kaziranga: { title: "One-horned giants", caption: "Jeep safari, 6 AM mist, and three rhinos before breakfast. 🦏", music: "Assam Bihu Drums" },
  tawang: { title: "Roof of Arunachal", caption: "India's largest monastery, wrapped in prayer flags and clouds. 🎏", music: "Monpa Chant" },
  "ajanta-ellora": { title: "Carved from one rock", caption: "Kailasa temple was chiselled top-down out of a single hill. Wild. ⛏️", music: "Ancient Cave Echo" },
  "rann-of-kutch": { title: "White desert, full moon", caption: "Endless salt, zero horizon. Rann Utsav nights are unreal. 🌕", music: "Kutchi Folk Sarangi" },
  "spiti-key": { title: "Key Monastery, Spiti", caption: "Cold desert, 4,166 m, and the quietest morning of my life. ❄️", music: "Himalayan Silence" },
  sundarbans: { title: "Into the mangroves", caption: "Boat through tiger country. Saw pugmarks, not the tiger. Next time. 🐅", music: "Baul Boat Song" },
  "andaman-radhanagar": { title: "Radhanagar blues", caption: "Asia's best beach and the water is actually that colour. 🐚", music: "Island Ukulele" },
  "shillong-cherrapunji": { title: "Living root bridges", caption: "3,000 steps down. Bridges grown, not built, over 500 years. 🌉", music: "Khasi Guitar" },
  "golden-temple": { title: "Langar for 100,000", caption: "Free meals, all day, every day. Sat in the kitchen and helped roll rotis. 🙏", music: "Gurbani Kirtan" },
  "hyderabad-golconda": { title: "Clap at Fateh Darwaza", caption: "One clap here is heard a kilometre up at the hilltop pavilion. 👏", music: "Deccan Qawwali" },
  "bodh-gaya": { title: "Under the Bodhi tree", caption: "Where it all began, 2,500 years ago. Monks from 20 countries in one courtyard. 🍃", music: "Pali Chant" },
  pondicherry: { title: "French Quarter mornings", caption: "Yellow walls, bougainvillea, filter coffee. Cycle it early. 🚲", music: "Tamil-French Jazz" },
};

const creators = ["@yatra.diaries", "@heritagekid", "@ghumakkad", "@sitar.and.sneakers", "@bharat.frames", "@chai.and.chappals"];

export const reels: Reel[] = destinations.map((d, i) => {
  const c = captions[d.id] ?? {
    title: d.name,
    caption: d.tagline,
    music: "Indian Folk Fusion",
  };
  return {
    id: `reel-${d.id}`,
    destinationId: d.id,
    title: c.title,
    caption: c.caption,
    creator: creators[i % creators.length],
    music: c.music,
    state: d.state,
    city: d.city,
    category: d.category,
    image: d.image,
    likes: 1200 + ((i * 977) % 48000),
    comments: 40 + ((i * 131) % 900),
    shares: 15 + ((i * 71) % 400),
    durationSec: 18 + (i % 5) * 7,
  };
});

export const getReel = (id: string) => reels.find((r) => r.id === id);
