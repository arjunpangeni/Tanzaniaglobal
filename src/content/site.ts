export const site = {
  name: "Tanzania Global Ltd",
  shortName: "Tanzania Global",
  legalName: "Tanzania Global Ltd",
  tagline: {
    en: "Study abroad guidance from Dar es Salaam to the world.",
    sw: "Mwongozo wa masomo nje ya nchi kutoka Dar es Salaam kwenda ulimwenguni.",
  },
  description: {
    en: "Tanzania Global Ltd is a Dar es Salaam educational consultancy helping students choose universities, prepare applications, and arrive ready — in English and Swahili.",
    sw: "Tanzania Global Ltd ni ushauri wa elimu kutoka Dar es Salaam unaosaidia wanafunzi kuchagua vyuo, kuandaa maombi, na kufika wakiwa tayari — kwa Kiingereza na Kiswahili.",
  },
  email: "hello@tanzaniaglobal.co.tz",
  phone: "+255 700 000 000",
  phoneUk: "+44 118 000 0000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "255700000000",
  address: "182 St. Saviours Rd, Coley Park RG2 6EU, Reading, UK",
  mapEmbed:
    "https://maps.google.com/maps?q=182%20St.%20Saviours%20Rd%20Coley%20Park%20RG2%206EU%20Reading%20UK&t=&z=15&ie=UTF8&iwloc=&output=embed",
  hours: "Mon–Fri, 9:00–17:00",
  timezone: "Africa/Dar_es_Salaam",
  offices: [
    {
      id: "dar",
      name: { en: "Dar es Salaam", sw: "Dar es Salaam" },
      detail: { en: "Tanzania", sw: "Tanzania" },
      phone: "+255 700 000 000",
    },
    {
      id: "reading",
      name: { en: "Reading", sw: "Reading" },
      detail: {
        en: "182 St. Saviours Rd, Coley Park RG2 6EU, Reading, UK",
        sw: "182 St. Saviours Rd, Coley Park RG2 6EU, Reading, Uingereza",
      },
      phone: "+44 118 000 0000",
    },
    {
      id: "online",
      name: { en: "Online", sw: "Mtandaoni" },
      detail: { en: "Same counselling on a video call", sw: "Ushauri uleule kwa video" },
    },
  ],
  stats: {
    years: 11,
    students: 2186,
    partners: 134,
    destinations: 13,
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
  },
};

export const studyLevels = [
  { value: "foundation", label: { en: "Foundation", sw: "Foundation" } },
  { value: "diploma", label: { en: "Diploma", sw: "Stashahada" } },
  { value: "bachelors", label: { en: "Bachelor's", sw: "Shahada" } },
  { value: "masters", label: { en: "Master's", sw: "Shahada ya uzamili" } },
  { value: "phd", label: { en: "PhD", sw: "Uzamivu" } },
] as const;

export const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
] as const;
