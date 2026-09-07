import type { DestinationSlug } from "./destinations";

export type LocaleCopy = { en: string; sw: string };

export type DestinationPhoto = {
  src: string;
  alt: LocaleCopy;
  caption: LocaleCopy;
};

export type DestinationGuide = {
  photos: DestinationPhoto[];
  intakes: LocaleCopy;
  language: LocaleCopy;
  situation: LocaleCopy;
  opportunities: { en: string[]; sw: string[] };
  life: LocaleCopy;
  watch: LocaleCopy;
};

const photo = (name: string) => `/destinations/${name}.jpg`;

export const destinationGuides: Record<DestinationSlug, DestinationGuide> = {
  "united-kingdom": {
    photos: [
      {
        src: photo("united-kingdom-1"),
        alt: { en: "The Palace of Westminster and Big Ben in London", sw: "Ikulu ya Westminster na Big Ben London" },
        caption: { en: "London — still the city most Tanzanian families picture first.", sw: "London — bado ndiyo jiji familia nyingi za Kitanzania hufikiria kwanza." },
      },
      {
        src: photo("united-kingdom-2"),
        alt: { en: "Punts on the River Cam in Cambridge", sw: "Boti kwenye mto Cam Cambridge" },
        caption: { en: "Cambridge and other campus towns are quieter — and often cheaper — than central London.", sw: "Cambridge na miji mingine ya vyuo ni tulivu — na mara nyingi nafuu — kuliko London katikati." },
      },
      {
        src: photo("united-kingdom-3"),
        alt: { en: "Edinburgh Castle above the old town", sw: "Ngome ya Edinburgh juu ya mji wa kale" },
        caption: { en: "Scotland is a separate system: different fees, a different visa file, and a strong science reputation.", sw: "Scotland ni mfumo tofauti: ada tofauti, faili tofauti la viza, na sifa imara ya sayansi." },
      },
    ],
    intakes: { en: "September · January", sw: "Septemba · Januari" },
    language: { en: "English", sw: "Kiingereza" },
    situation: {
      en: "The UK remains a first-choice destination from Tanzania: a one-year taught master’s, familiar academic English, and a large Tanzanian community in London, Manchester, Birmingham, and Coventry. International tuition commonly sits between about USD 18,000 and 32,000 a year before rent — always confirm the current fee on the university’s own pages.\n\nA Student visa needs a Confirmation of Acceptance for Studies (CAS), proof of funds, and an approved English test. The Graduate Route still lets most bachelor’s and master’s graduates stay to work for two years after they finish (three after a PhD or other doctorate); for Graduate visa applications made on or after 1 January 2027, that period for bachelor’s and master’s falls to 18 months. Dependants are generally not allowed on taught master’s courses that started on or after 1 January 2024 — only research degrees (and a few sponsored exceptions) still qualify. We say that in the first meeting, not after a deposit is paid.",
      sw: "Uingereza bado ni chaguo la kwanza kutoka Tanzania: uzamili wa mwaka mmoja, Kiingereza cha kitaaluma kinachojulikana, na jamii kubwa ya Watanzania London, Manchester, Birmingham, na Coventry. Ada ya kimataifa mara nyingi iko kati ya USD 18,000 na 32,000 kwa mwaka kabla ya kodi — thibitisha ada ya sasa kwenye tovuti ya chuo.\n\nViza ya mwanafunzi inahitaji CAS, uthibitisho wa fedha, na mtihani wa Kiingereza ulioidhinishwa. Graduate Route bado inaruhusu wahitimu wengi wa shahada na uzamili kubaki kufanya kazi miaka miwili baada ya kumaliza (mitatu baada ya PhD au doctorate nyingine); kwa maombi ya Graduate visa kuanzia 1 Januari 2027, muda huo kwa shahada na uzamili unashuka hadi miezi 18. Wategemezi kwa ujumla hawaruhusiwi kwenye uzamili wa kufundishwa ulioanza kuanzia 1 Januari 2024 — digrii za utafiti (na isipokuwa chache za ufadhili) ndizo zinazostahili. Tunasema hivyo kikao cha kwanza, si baada ya kulipa dhamana.",
    },
    opportunities: {
      en: [
        "One-year master’s in business, public health, law, and engineering — you are back on the job market faster than a typical two-year US graduate degree.",
        "Graduate Route work permission after a successful eligible course — still useful UK experience on a CV (plan around the 2027 length change if your timeline runs that far).",
        "A dense East African alumni network and Swahili-speaking churches and mosques in the big cities.",
      ],
      sw: [
        "Uzamili wa mwaka mmoja katika biashara, afya ya umma, sheria, na uhandisi — unarudi sokoni haraka kuliko uzamili wa kawaida wa miaka miwili Marekani.",
        "Ruhusa ya kazi ya Graduate Route baada ya kozi inayostahili — bado inasaidia uzoefu wa Uingereza kwenye CV (panga mabadiliko ya urefu ya 2027 ikiwa ratiba yako itafika huko).",
        "Mtandao mnene wa wahitimu wa Afrika Mashariki na makanisa na misikiti yanayozungumza Kiswahili katika miji mikubwa.",
      ],
    },
    life: {
      en: "Winter is the first shock — short days, rain, and heating bills. Students share flats; London rent can swallow a Tanzania-sized family budget. Outside London the same degree is often quieter and more affordable. Part-time work is allowed within visa hours. We budget living costs in TZS before anyone falls in love with a campus video.",
      sw: "Majira ya baridi ndiyo mshtuko wa kwanza — siku fupi, mvua, na bili za joto. Wanafunzi wanashiriki vyumba; kodi ya London inaweza kumeza bajeti ya familia ya Tanzania. Nje ya London shahada ileile mara nyingi ni tulivu na nafuu. Kazi ya muda inaruhusiwa ndani ya saa za viza. Tunapanga gharama za maisha kwa TZS kabla mtu hajapenda video ya chuo.",
    },
    watch: {
      en: "An offer letter is not a visa. Rankings matter less than whether the university still issues CAS letters to East African applicants this cycle, and whether the bank file will survive the credibility interview.",
      sw: "Barua ya ofa si viza. Nafasi kwenye orodha si muhimu kama chuo bado kinatoa CAS kwa waombaji wa Afrika Mashariki mzunguko huu, na kama faili la benki litastahimili mahojiano.",
    },
  },
  "united-states": {
    photos: [
      {
        src: photo("united-states-1"),
        alt: { en: "Statue of Liberty in New York Harbour", sw: "Sanamu ya Uhuru katika bandari ya New York" },
        caption: { en: "The US file is longer than a UK file — start a year before you want to land.", sw: "Faili la Marekani ni refu kuliko la Uingereza — anza mwaka kabla unapotaka kufika." },
      },
      {
        src: photo("united-states-2"),
        alt: { en: "Golden Gate Bridge in San Francisco", sw: "Daraja la Golden Gate San Francisco" },
        caption: { en: "California and the East Coast still pull STEM applicants; living costs follow the labs.", sw: "California na Pwani ya Mashariki bado huvuta waombaji wa STEM; gharama za maisha zinafuata maabara." },
      },
      {
        src: photo("united-states-3"),
        alt: { en: "Manhattan skyline at dusk", sw: "Mandhari ya Manhattan jioni" },
        caption: { en: "A big-city campus looks exciting on Instagram. The I-20 and SEVIS fee are what get you on the plane.", sw: "Chuo cha jiji kubwa kinaonekana kizuri Instagram. I-20 na ada ya SEVIS ndivyo vinavyokupandisha ndege." },
      },
    ],
    intakes: { en: "August · January", sw: "Agosti · Januari" },
    language: { en: "English", sw: "Kiingereza" },
    situation: {
      en: "The United States offers the widest choice of majors and the strongest research labs, but it is not a last-minute destination. You need an I-20 from a SEVP-certified school, a SEVIS fee, and an F-1 visa interview that looks at ties to Tanzania as much as grades. SAT is optional at many campuses now; English scores and a clean bank story are not.\n\nTuition plus living often lands between USD 22,000 and 45,000 a year. Scholarships exist, especially at private colleges that still want international diversity, but full rides for Tanzanian undergraduates are rare. We only shortlist schools that have issued I-20s to East African students in the current cycle.",
      sw: "Marekani inatoa chaguo pana zaidi la fani na maabara imara za utafiti, lakini si nchi ya dakika ya mwisho. Unahitaji I-20 kutoka chuo kilichoidhinishwa SEVP, ada ya SEVIS, na mahojiano ya viza ya F-1 yanayotazama uhusiano na Tanzania kama alama. SAT sasa si lazima katika vyuo vingi; alama za Kiingereza na hadithi safi ya benki ni lazima.\n\nAda pamoja na maisha mara nyingi huwa USD 22,000 hadi 45,000 kwa mwaka. Ufadhili upo, hasa katika vyuo binafsi vinavyotaka utofauti wa kimataifa, lakini ufadhili kamili kwa shahada ya kwanza ya Kitanzania ni nadra. Tunachagua tu vyuo vilivyotoa I-20 kwa wanafunzi wa Afrika Mashariki mzunguko huu.",
    },
    opportunities: {
      en: [
        "Optional Practical Training: 12 months after graduation, plus 24 more months for many STEM degrees.",
        "Flexible majors — you can enter undeclared and specialise later, unlike most UK courses.",
        "Campus recruiting in computer science, health sciences, and business that still reaches international students.",
      ],
      sw: [
        "Optional Practical Training: miezi 12 baada ya kuhitimu, pamoja na miezi 24 zaidi kwa shahada nyingi za STEM.",
        "Fani zinazobadilika — unaweza kuanza bila kutangaza fani na kubobea baadaye, tofauti na kozi nyingi za Uingereza.",
        "Ajira za chuoni katika sayansi ya kompyuta, afya, na biashara zinazowafikia wanafunzi wa kimataifa.",
      ],
    },
    life: {
      en: "Campus life is the product: dorms, sports, and a writing centre that will rewrite your first essay. Distances are huge — a Greyhound is not a daladala. Health insurance is mandatory and expensive. Students who thrive are the ones who treat office hours as part of the course, not an extra.",
      sw: "Maisha ya chuo ndiyo bidhaa: mabweni, michezo, na kituo cha uandishi kitakachorekebisha insha yako ya kwanza. Umbali ni mkubwa — Greyhound si daladala. Bima ya afya ni lazima na ghali. Wanaofaulu ni wale wanaochukulia saa za ofisi kama sehemu ya kozi, si nyongeza.",
    },
    watch: {
      en: "OPT is not a green card, and the H-1B lottery is a separate fight. Budget 10–14 months for tests, applications, and the embassy appointment before August intake.",
      sw: "OPT si green card, na bahati nasibu ya H-1B ni vita tofauti. Panga miezi 10–14 kwa mitihani, maombi, na miadi ya ubalozi kabla ya ulaji wa Agosti.",
    },
  },
  canada: {
    photos: [
      {
        src: photo("canada-1"),
        alt: { en: "Toronto skyline and the CN Tower", sw: "Mandhari ya Toronto na mnara wa CN" },
        caption: { en: "Ontario still draws most Tanzanian files — after you have a provincial attestation.", sw: "Ontario bado inavuta faili nyingi za Kitanzania — baada ya uthibitisho wa jimbo." },
      },
      {
        src: photo("canada-2"),
        alt: { en: "Moraine Lake in Banff National Park", sw: "Ziwa la Moraine katika Hifadhi ya Taifa ya Banff" },
        caption: { en: "The postcard is the Rockies. The file is a study permit, a GIC, and a housing plan.", sw: "Picha ni milima ya Rocky. Faili ni kibali cha masomo, GIC, na mpango wa makazi." },
      },
      {
        src: photo("canada-3"),
        alt: { en: "Vancouver waterfront and mountains", sw: "Pwani ya Vancouver na milima" },
        caption: { en: "British Columbia is milder in winter — and tight on both housing and study-permit caps.", sw: "British Columbia ni laini zaidi wakati wa baridi — na imebanwa kwa makazi na mipaka ya vibali vya masomo." },
      },
    ],
    intakes: { en: "September · January · May", sw: "Septemba · Januari · Mei" },
    language: { en: "English (French in Québec)", sw: "Kiingereza (Kifaransa Québec)" },
    situation: {
      en: "Canada is still popular with Tanzanian families for co-op colleges, universities, and a post-graduation work permit (PGWP) — but the rules are tighter than a few years ago. Most new college and undergraduate applicants need a provincial or territorial attestation letter (PAL/TAL) before a study permit. From 2026, many master’s and doctoral students at public designated learning institutions are exempt from PAL/TAL; undergrad and college files usually are not. You also need funds IRCC will accept and a programme that still qualifies for a PGWP.\n\nTuition often runs about USD 16,000–28,000 a year before living costs. A college diploma is not the same file as a university bachelor’s; we match the pathway to grades, budget, and work goals before any application fee leaves the account.",
      sw: "Kanada bado inapendwa na familia za Kitanzania kwa vyuo vyenye co-op, vyuo vikuu, na kibali cha kazi baada ya kuhitimu (PGWP) — lakini sheria ni kali kuliko miaka michache iliyopita. Waombaji wengi wapya wa stashahada na shahada ya kwanza wanahitaji barua ya uthibitisho wa jimbo au wilaya (PAL/TAL) kabla ya kibali cha masomo. Kuanzia 2026, wanafunzi wengi wa uzamili na PhD katika taasisi za umma zilizoteuliwa wameachiliwa PAL/TAL; faili za shahada ya kwanza na stashahada kwa kawaida hazijaachiliwa. Unahitaji pia fedha IRCC itakubali na programu ambayo bado inastahili PGWP.\n\nAda mara nyingi ni USD 16,000–28,000 kwa mwaka kabla ya gharama za maisha. Stashahada ya chuo si faili sawa na shahada ya chuo kikuu; tunaoanisha njia na alama, bajeti, na malengo ya kazi kabla ada ya maombi haijatoka akaunti.",
    },
    opportunities: {
      en: [
        "Co-op terms in IT, business, and some health pathways — real work terms, not just a classroom.",
        "Post-Graduation Work Permit for eligible programmes, still the main reason families pick Canada.",
        "A large East African community in Toronto, Ottawa, and Calgary, which helps the first winter.",
      ],
      sw: [
        "Vipindi vya co-op katika IT, biashara, na baadhi ya njia za afya — kazi halisi, si darasa tu.",
        "Kibali cha kazi baada ya kuhitimu kwa programu zinazostahili — bado ndiyo sababu kuu familia zinachagua Kanada.",
        "Jamii kubwa ya Afrika Mashariki Toronto, Ottawa, na Calgary, inayosaidia baridi ya kwanza.",
      ],
    },
    life: {
      en: "Winter is not a metaphor. Students who arrive in January need a coat, not a hoodie from Kariakoo. Housing in Toronto and Vancouver is the weekly argument; many first-years start in a homestay or a shared basement suite. Public transport works. Part-time hours are allowed on a valid study permit.",
      sw: "Baridi si sitiari. Mwanafunzi anayefika Januari anahitaji koti, si hoodie ya Kariakoo. Makazi Toronto na Vancouver ndiyo mzozo wa kila wiki; wengi wa mwaka wa kwanza wanaanza kwa familia mwenyeji au chumba cha chini kilichoshirikiwa. Usafiri wa umma unafanya kazi. Saa za kazi za muda zinaruhusiwa kwenye kibali halali cha masomo.",
    },
    watch: {
      en: "Do not apply into a closed intake or a programme that no longer leads to a PGWP. We check whether you need a PAL/TAL, the provincial allocation, and the IRCC programme list before the application fee leaves the account.",
      sw: "Usitumie maombi kwenye ulaji uliofungwa au programu isiyopelekea PGWP tena. Tunakagua kama unahitaji PAL/TAL, mgao wa jimbo, na orodha ya IRCC kabla ada ya maombi haijatoka akaunti.",
    },
  },
  australia: {
    photos: [
      {
        src: photo("australia-1"),
        alt: { en: "Sydney Opera House and harbour", sw: "Sydney Opera House na bandari" },
        caption: { en: "Sydney and Melbourne carry the brand — always check current Temporary Graduate rules before planning regional study for extra months.", sw: "Sydney na Melbourne ndizo chapa — kagua sheria za sasa za Temporary Graduate kabla ya kupanga masomo ya mkoa kwa miezi zaidi." },
      },
      {
        src: photo("australia-2"),
        alt: { en: "The Twelve Apostles on the Great Ocean Road", sw: "Mitume Kumi na Wawili kwenye Great Ocean Road" },
        caption: { en: "Coastal campuses feel like a different country from a UK winter.", sw: "Vyuo vya pwani vinaonekana kama nchi nyingine kutoka baridi ya Uingereza." },
      },
      {
        src: photo("australia-3"),
        alt: { en: "Melbourne city laneways and trams", sw: "Mitaa midogo ya Melbourne na tramu" },
        caption: { en: "Melbourne is a student city: trams, shared houses, and a serious nursing pipeline.", sw: "Melbourne ni jiji la wanafunzi: tramu, nyumba zilizoshirikiwa, na njia kubwa ya uuguzi." },
      },
    ],
    intakes: { en: "February · July", sw: "Februari · Julai" },
    language: { en: "English", sw: "Kiingereza" },
    situation: {
      en: "Australia offers English-medium degrees with main starts in February and July, outdoor campuses, and a student-visa process that is strict but clear. The Genuine Student (GS) requirement replaced the old Genuine Temporary Entrant letter: Home Affairs wants to see why this course, this provider, and this budget — not a copied SOP. You will also need a Confirmation of Enrolment (CoE), Overseas Student Health Cover, and proof of funds at current living-cost levels.\n\nInternational tuition often sits around USD 18,000–30,000 a year before living costs. Nursing, engineering, IT, and hospitality are the files we see most from Tanzania. Temporary Graduate (post-study) visas still exist for eligible courses; length depends on the qualification (commonly two years for many bachelor’s and coursework master’s, longer for research degrees). Age, English, and other Temporary Graduate rules have tightened — we check the current settings before anyone plans a career on them.",
      sw: "Australia inatoa shahada kwa Kiingereza zenye mwanzo mkuu Februari na Julai, vyuo vya nje, na mchakato wa viza ya mwanafunzi ulio kali lakini wazi. Mahitaji ya Genuine Student (GS) yamebadilisha barua ya zamani ya Genuine Temporary Entrant: Home Affairs inataka kuona kwanini kozi hii, mtoa huduma huyu, na bajeti hii — si SOP iliyonakiliwa. Utahitaji pia Confirmation of Enrolment (CoE), bima ya afya ya wanafunzi wa ng’ambo, na uthibitisho wa fedha kwa viwango vya sasa vya gharama za maisha.\n\nAda ya kimataifa mara nyingi ni USD 18,000–30,000 kwa mwaka kabla ya maisha. Uuguzi, uhandisi, IT, na ukarimu ndiyo faili tunazoziona zaidi kutoka Tanzania. Viza za Temporary Graduate (baada ya masomo) bado zipo kwa kozi zinazostahili; urefu unategemea sifa (mara nyingi miaka miwili kwa shahada nyingi na uzamili wa kozi, mrefu zaidi kwa digrii za utafiti). Umri, Kiingereza, na sheria nyingine za Temporary Graduate zimeimarishwa — tunakagua mipangilio ya sasa kabla mtu hajapanga kazi juu yake.",
    },
    opportunities: {
      en: [
        "Strong pipelines in nursing, engineering, and hospitality with clinical or industry placements.",
        "Post-study work options on eligible Temporary Graduate visas — length and eligibility depend on the award and current Home Affairs rules.",
        "Part-time work during term within the current fortnightly hour cap (commonly 48 hours per fortnight) — useful, not a substitute for tuition funds.",
      ],
      sw: [
        "Njia imara za uuguzi, uhandisi, na ukarimu zenye mafunzo ya kliniki au sekta.",
        "Chaguo la kazi baada ya masomo kwenye viza za Temporary Graduate zinazostahili — urefu na ustahiki unategemea tuzo na sheria za sasa za Home Affairs.",
        "Kazi ya muda wakati wa muhula ndani ya kikomo cha sasa cha saa kwa wiki mbili (mara nyingi saa 48 kwa wiki mbili) — inasaidia, si mbadala wa fedha za ada.",
      ],
    },
    life: {
      en: "Weather is the easy part. Distance from home is not — a Dar–Doha–Sydney routing is a long first night. Shared houses in the inner suburbs are the norm. Students who do well treat the first semester as full-time study, then add shifts once the timetable is stable.",
      sw: "Hali ya hewa ni sehemu rahisi. Umbali kutoka nyumbani si hivyo — safari ya Dar–Doha–Sydney ni usiku mrefu wa kwanza. Nyumba zilizoshirikiwa katika vitongoji ndiyo kawaida. Wanaofaulu huchukulia muhula wa kwanza kama masomo ya muda wote, kisha wanaongeza zamu baada ya ratiba kutulia.",
    },
    watch: {
      en: "A Confirmation of Enrolment is not a visa grant. Funds, English, and a consistent study history matter more than a pretty campus brochure.",
      sw: "Uthibitisho wa usajili si viza. Fedha, Kiingereza, na historia thabiti ya masomo ni muhimu kuliko brosha nzuri ya chuo.",
    },
  },
  india: {
    photos: [
      {
        src: photo("india-1"),
        alt: { en: "The Taj Mahal in Agra", sw: "Taj Mahal Agra" },
        caption: { en: "Agra is the postcard. The study file is usually Bangalore, Pune, Manipal, or Delhi NCR.", sw: "Agra ni picha. Faili la masomo mara nyingi ni Bangalore, Pune, Manipal, au Delhi NCR." },
      },
      {
        src: photo("india-2"),
        alt: { en: "India Gate in New Delhi", sw: "India Gate New Delhi" },
        caption: { en: "Delhi NCR packs engineering and business campuses — and a harder summer than Dar es Salaam.", sw: "Delhi NCR ina vyuo vingi vya uhandisi na biashara — na kiangazi kigumu kuliko Dar es Salaam." },
      },
      {
        src: photo("india-3"),
        alt: { en: "Hawa Mahal in Jaipur", sw: "Hawa Mahal Jaipur" },
        caption: { en: "Rajasthan is a trip. Student life for most Tanzanians is a hostel, a mess hall, and a July start.", sw: "Rajasthan ni safari. Maisha ya mwanafunzi kwa Watanzania wengi ni bweni, mess, na mwanzo wa Julai." },
      },
      {
        src: photo("india-4"),
        alt: { en: "Houseboats on the Kerala backwaters", sw: "Boti za nyumba kwenye maji ya Kerala" },
        caption: { en: "South India — Kerala, Karnataka, Tamil Nadu — is where many East African students actually live.", sw: "India Kusini — Kerala, Karnataka, Tamil Nadu — ndipo wanafunzi wengi wa Afrika Mashariki wanaishi." },
      },
    ],
    intakes: { en: "July / August · January (limited)", sw: "Julai / Agosti · Januari (chache)" },
    language: { en: "English on campus (Hindi and local languages off campus)", sw: "Kiingereza chuoni (Kihindi na lugha za eneo nje)" },
    situation: {
      en: "India is still the most common first destination from Tanzania: a shorter flight from JNIA, English-medium lectures, and tuition that often fits a family budget. A private engineering or IT degree commonly costs about USD 3,500–8,000 a year. Public IITs and NITs are cheaper and far more competitive — they are not the default file we open first.\n\nThe academic year usually starts in July or August. Quality varies more than in almost any other country we place into. A UGC- or AICTE-recognised campus in Bangalore, Pune, Manipal, or Hyderabad is a different future from an unaccredited college that only looks cheap on WhatsApp. We file the university first, then the student visa and e-FRRO / registration steps after arrival.",
      sw: "India bado ndiyo kituo cha kwanza kinachojulikana kutoka Tanzania: ndege fupi kutoka JNIA, masomo kwa Kiingereza, na ada inayolingana na bajeti ya familia. Shahada binafsi ya uhandisi au IT mara nyingi hugharimu USD 3,500–8,000 kwa mwaka. IIT na NIT za umma ni nafuu na ngumu zaidi — si faili tunalofungua kwanza.\n\nMwaka wa masomo mara nyingi huanza Julai au Agosti. Ubora unatofautiana kuliko karibu nchi nyingine yoyote tunayoweka. Chuo kilichotambuliwa na UGC au AICTE Bangalore, Pune, Manipal, au Hyderabad ni mustakabali tofauti na chuo kisichoidhinishwa kinachoonekana nafuu WhatsApp. Tunawasiliisha chuo kwanza, kisha viza ya mwanafunzi na hatua za e-FRRO / usajili baada ya kufika.",
    },
    opportunities: {
      en: [
        "Engineering, computer science, and IT in the southern and western tech cities — Bangalore, Hyderabad, Pune, Chennai.",
        "Pharmacy and business degrees at a cost that still leaves room for a later UK or Australian master’s.",
        "Medicine only when the college sits on the current National Medical Commission list — licensing back home depends on that, not on a brochure.",
        "A large East African student presence, familiar food, and mosques and churches within walking distance of most hostels.",
      ],
      sw: [
        "Uhandisi, sayansi ya kompyuta, na IT katika miji ya teknolojia kusini na magharibi — Bangalore, Hyderabad, Pune, Chennai.",
        "Shahada za farmasia na biashara kwa gharama inayobaki na nafasi ya uzamili wa baadaye Uingereza au Australia.",
        "Tiba tu chuo kikikuwepo kwenye orodha ya sasa ya National Medical Commission — leseni nyumbani inategemea hilo, si brosha.",
        "Wanafunzi wengi wa Afrika Mashariki, chakula kinachojulikana, na misikiti na makanisa karibu na mabweni mengi.",
      ],
    },
    life: {
      en: "Hostels are the first home: a shared room, a mess plate, and a warden. Later, students rent a flat with classmates. Summer in Delhi is hotter than Dar; the monsoon in Mumbai and Kerala floods streets you will still have to cross for class. Hindi helps in shops; English is enough on the campuses we recommend. Street food is excellent once your stomach has had a week to adjust. Direct and one-stop flights from Dar keep parents closer than a UK winter ever will.",
      sw: "Mabweni ndiyo nyumba ya kwanza: chumba kilichoshirikiwa, sahani ya mess, na warden. Baadaye wanafunzi wanapanga flat na wanafunzi wenza. Kiangazi Delhi ni moto kuliko Dar; masika Mumbai na Kerala yanafura mitaa utakayovuka bado kwenda darasani. Kihindi kinasaidia dukani; Kiingereza kinatosha katika vyuo tunavyopendekeza. Chakula cha mitaani ni kizuri baada ya tumbo kupata wiki moja. Ndege za moja kwa moja na za kituo kimoja kutoka Dar zinawaweka wazazi karibu kuliko baridi ya Uingereza.",
    },
    watch: {
      en: "Recognition first. Confirm UGC, AICTE, or NMC status before anyone pays a seat-blocking fee. Budget yearly visa extensions and hostel mess bills — a low tuition sticker is not the full year. A student visa is not a work visa; most graduates return, move to the Gulf, or use the degree as a step to a master’s elsewhere.",
      sw: "Utambuzi kwanza. Thibitisha UGC, AICTE, au NMC kabla mtu hajalipa ada ya kuhifadhi nafasi. Panga nyongeza za viza kila mwaka na bili za mess — bei ndogo ya ada si mwaka mzima. Viza ya mwanafunzi si viza ya kazi; wahitimu wengi wanarudi, wanaenda Gulf, au wanatumia shahada kama hatua ya uzamili mahali pengine.",
    },
  },
  china: {
    photos: [
      {
        src: photo("china-1"),
        alt: { en: "The Great Wall of China", sw: "Ukuta Mkuu wa China" },
        caption: { en: "The Wall is the visit. Daily life is a campus in Beijing, Shanghai, Wuhan, or Guangzhou.", sw: "Ukuta ni ziara. Maisha ya kila siku ni chuo Beijing, Shanghai, Wuhan, au Guangzhou." },
      },
      {
        src: photo("china-2"),
        alt: { en: "Shanghai Bund at night", sw: "The Bund Shanghai usiku" },
        caption: { en: "East-coast cities have more English-taught degrees — and higher rents.", sw: "Miji ya pwani ya mashariki ina shahada zaidi kwa Kiingereza — na kodi ya juu." },
      },
      {
        src: photo("china-3"),
        alt: { en: "The Forbidden City in Beijing", sw: "Mji Ulioharamishwa Beijing" },
        caption: { en: "Beijing files are common for engineering and CSC scholarship tracks.", sw: "Faili za Beijing ni za kawaida kwa uhandisi na njia za ufadhili wa CSC." },
      },
    ],
    intakes: { en: "September · March", sw: "Septemba · Machi" },
    language: { en: "English-taught programmes, or a Mandarin year first", sw: "Programu za Kiingereza, au mwaka wa Kimandarin kwanza" },
    situation: {
      en: "China is the scholarship destination: CSC and university awards can drop an engineering or business degree into the USD 3,000–7,500 band, sometimes with a stipend. Tanzania–China ties are real; you will not be the only East African student on campus. Teaching can be in English if we pick those programmes. Daily life is not — WeChat, a bank app, and a few Mandarin phrases are part of landing.\n\nThe student visa follows a JW201 or JW202 form from the university. Medicine in English exists; we only open that file when the school is on the list your licensing body will later accept.",
      sw: "China ni nchi ya ufadhili: tuzo za CSC na vyuo zinaweza kushusha shahada ya uhandisi au biashara kwenye bendi ya USD 3,000–7,500, wakati mwingine na posho. Uhusiano wa Tanzania–China ni wa kweli; hutakuwa mwanafunzi pekee wa Afrika Mashariki chuoni. Ufundishaji unaweza kuwa kwa Kiingereza tukiwateua hivyo. Maisha ya kila siku si hivyo — WeChat, programu ya benki, na sentensi chache za Kimandarin ni sehemu ya kufika.\n\nViza ya mwanafunzi inafuata fomu ya JW201 au JW202 kutoka chuo. Tiba kwa Kiingereza ipo; tunafungua faili hilo tu shule ikiwa kwenye orodha ambayo bodi yako ya leseni itakubali baadaye.",
    },
    opportunities: {
      en: [
        "CSC and provincial scholarships that actually pay — not just a discount on a brochure fee.",
        "English-taught engineering, business, and some medical degrees at partner campuses.",
        "Mandarin as a career extra: even a year of language changes internship options in trade and logistics.",
      ],
      sw: [
        "Ufadhili wa CSC na wa mikoa unaolipa kweli — si punguzo tu kwenye brosha.",
        "Shahada za uhandisi, biashara, na baadhi za tiba kwa Kiingereza katika vyuo washirika.",
        "Kimandarin kama nyongeza ya kazi: hata mwaka wa lugha unabadilisha nafasi za mafunzo katika biashara na usafirishaji.",
      ],
    },
    life: {
      en: "Campuses are cities of their own: canteens, bike shares, and a foreign-student dorm. Food is cheap if you eat locally; halal canteens exist in the cities we use. Winter in the north is serious. VPNs and payment apps are the first-week lesson. Students who isolate in the international dorm miss the point of being there.",
      sw: "Vyuo ni miji yenyewe: mikahawa, baiskeli, na bweni la wanafunzi wa kigeni. Chakula ni nafuu ukila cha huko; mikahawa ya halal ipo katika miji tunayotumia. Baridi kaskazini ni kubwa. VPN na programu za malipo ni somo la wiki ya kwanza. Mwanafunzi anayejifungia bweni la kimataifa anakosa maana ya kuwapo.",
    },
    watch: {
      en: "We only place into English-medium programmes unless you specifically want a language year. Confirm scholarship coverage in writing — tuition, hostel, and the stipend are three different lines.",
      sw: "Tunaweka tu kwenye programu za Kiingereza isipokuwa unataka mwaka wa lugha. Thibitisha ufadhili kwa maandishi — ada, bweni, na posho ni mistari mitatu tofauti.",
    },
  },
  malaysia: {
    photos: [
      {
        src: photo("malaysia-1"),
        alt: { en: "Petronas Twin Towers in Kuala Lumpur", sw: "Minara Miwili ya Petronas Kuala Lumpur" },
        caption: { en: "Kuala Lumpur and Cyberjaya are where most UK-linked degrees sit.", sw: "Kuala Lumpur na Cyberjaya ndipo shahada nyingi zinazoungana na Uingereza ziko." },
      },
      {
        src: photo("malaysia-2"),
        alt: { en: "Kuala Lumpur skyline at dusk", sw: "Mandhari ya Kuala Lumpur jioni" },
        caption: { en: "A mid-range city: English on campus, Malay and Mandarin in the street.", sw: "Jiji la kati: Kiingereza chuoni, Kimalay na Kimandarin mitaani." },
      },
      {
        src: photo("malaysia-3"),
        alt: { en: "The Batu Caves temple stairs near Kuala Lumpur", sw: "Ngazi za hekalu la Batu Caves karibu na Kuala Lumpur" },
        caption: { en: "Batu Caves is the weekend from KL. Weekdays are EMGS paperwork and a twinning timetable.", sw: "Batu Caves ni wikendi kutoka KL. Siku za kazi ni nyaraka za EMGS na ratiba ya twinning." },
      },
    ],
    intakes: { en: "February · June · September · October", sw: "Februari · Juni · Septemba · Oktoba" },
    language: { en: "English", sw: "Kiingereza" },
    situation: {
      en: "Malaysia is the practical middle: a UK-linked bachelor’s in Kuala Lumpur or Cyberjaya at USD 4,500–10,000 a year, English in the classroom, and a large Muslim student community. Many degrees are 3+0 twinning programmes — you finish a British or Australian award without leaving Malaysia.\n\nThe student pass runs through EMGS. Processing is slower than a brochure suggests; we start the medical and passport steps early. Families often use Malaysia as a step when the UK is the long-term goal but this year’s budget is tighter.",
      sw: "Malaysia ni wastani wa busara: shahada inayoungana na Uingereza Kuala Lumpur au Cyberjaya kwa USD 4,500–10,000 kwa mwaka, Kiingereza darasani, na jamii kubwa ya wanafunzi Waislamu. Shahada nyingi ni programu za twinning 3+0 — unamaliza tuzo la Uingereza au Australia bila kuondoka Malaysia.\n\nPassi ya mwanafunzi inapitia EMGS. Uchakataji ni polepole kuliko brosha inavyosema; tunaanza hatua za tiba na pasipoti mapema. Familia mara nyingi zinatumia Malaysia kama hatua ikiwa Uingereza ni lengo la muda mrefu lakini bajeti ya mwaka huu ni ndogo.",
    },
    opportunities: {
      en: [
        "UK and Australian awards taught locally — useful if you want the certificate without London rent.",
        "Business, IT, hospitality, and engineering with internships in the Klang Valley.",
        "A comfortable base for Muslim students: halal food, mosques, and a campus culture that already expects international intakes.",
      ],
      sw: [
        "Tuzo za Uingereza na Australia zinazofundishwa huko — zinasaidia ukitaka cheti bila kodi ya London.",
        "Biashara, IT, ukarimu, na uhandisi vyenye mafunzo katika Klang Valley.",
        "Kituo kizuri kwa wanafunzi Waislamu: chakula halal, misikiti, na utamaduni wa chuo unaotarajia wanafunzi wa kimataifa.",
      ],
    },
    life: {
      en: "KL is easy: Grab, malls, and food from every Malaysian state plus East Africa. Heat and haze are the climate notes. Students share condos in Cyberjaya or Subang more often than traditional hostels. Bahasa Malaysia helps in government offices; English is enough on campus and in the city.",
      sw: "KL ni rahisi: Grab, maduka makubwa, na chakula kutoka kila jimbo la Malaysia pamoja na Afrika Mashariki. Joto na ukungu ndiyo vidokezo vya hali ya hewa. Wanafunzi wanashiriki condo Cyberjaya au Subang kuliko mabweni ya jadi. Bahasa Malaysia inasaidia ofisi za serikali; Kiingereza kinatosha chuoni na mjini.",
    },
    watch: {
      en: "Confirm the awarding body on the offer letter. A “UK-linked” campus is only as strong as the university whose name will be on the degree.",
      sw: "Thibitisha chuo kinachotoa tuzo kwenye barua ya ofa. Chuo “kinachoungana na Uingereza” ni imara kama chuo kikuu ambacho jina lake kitakuwa kwenye shahada.",
    },
  },
  germany: {
    photos: [
      {
        src: photo("germany-1"),
        alt: { en: "A historic street in a German town", sw: "Mtaa wa kihistoria katika mji wa Ujerumani" },
        caption: { en: "Public universities keep tuition low. The blocked account is the real first invoice.", sw: "Vyuo vikuu vya umma vinaweka ada chini. Akaunti iliyozuiliwa ndiyo ankara ya kwanza halisi." },
      },
      {
        src: photo("germany-2"),
        alt: { en: "Brandenburg Gate in Berlin", sw: "Lango la Brandenburg Berlin" },
        caption: { en: "Berlin and Munich draw the English-taught master’s files.", sw: "Berlin na Munich zinavuta faili za uzamili kwa Kiingereza." },
      },
      {
        src: photo("germany-3"),
        alt: { en: "Neuschwanstein Castle in Bavaria", sw: "Ngome ya Neuschwanstein Bavaria" },
        caption: { en: "Bavaria is beautiful. Daily life still needs German for the bakery, the Amt, and many jobs.", sw: "Bavaria ni nzuri. Maisha ya kila siku bado yanahitaji Kijerumani kwa duka la mkate, Amt, na kazi nyingi." },
      },
    ],
    intakes: { en: "October · April", sw: "Oktoba · Aprili" },
    language: { en: "English master’s; German for many bachelor’s and daily life", sw: "Uzamili kwa Kiingereza; Kijerumani kwa shahada nyingi na maisha" },
    situation: {
      en: "Germany is the honest low-tuition option in Europe: many public universities charge little beyond a semester contribution, if you meet the academic bar and fund a blocked account (Sperrkonto). For student visas the current living-cost deposit is about €11,904 for twelve months (released monthly) — confirm the figure with the German mission before you transfer. English-taught master’s programmes are common; English-taught bachelor’s are fewer. We will not sell “free university” to a family whose student has no German and a weak maths file.\n\nTanzanian school and degree documents are usually checked through uni-assist and Anabin, not through an APS office (APS mainly covers China, India, and Vietnam). Winter semester (October) is the main intake; April is secondary.",
      sw: "Ujerumani ni chaguo la kweli la ada ndogo Ulaya: vyuo vikuu vingi vya umma vinahtoza kidogo zaidi ya ada ya muhula, ukikidhi vigezo na kufadhili akaunti iliyozuiliwa (Sperrkonto). Kwa viza ya mwanafunzi dhamana ya sasa ya gharama za maisha ni karibu €11,904 kwa miezi kumi na miwili (inayotolewa kila mwezi) — thibitisha kiasi na ubalozi wa Ujerumani kabla ya kuhamisha. Programu za uzamili kwa Kiingereza ni za kawaida; shahada za kwanza kwa Kiingereza ni chache. Hatutauza “chuo bure” kwa familia ambayo mwanafunzi hana Kijerumani na faili dhaifu la hisabati.\n\nNyaraka za shule na digrii za Kitanzania mara nyingi hukaguliwa kupitia uni-assist na Anabin, si ofisi ya APS (APS inahusu hasa China, India, na Vietnam). Muhula wa baridi (Oktoba) ndio ulaji mkuu; Aprili ni wa pili.",
    },
    opportunities: {
      en: [
        "Engineering, computer science, and renewable energy where the big cost is living expenses, not tuition.",
        "After a German degree, eligible graduates can apply for a job-seeker residence (commonly up to 18 months) — useful if you have language and a targeted field.",
        "Strong links between universities of applied sciences (Fachhochschulen) and industry; internships are part of the culture.",
      ],
      sw: [
        "Uhandisi, sayansi ya kompyuta, na nishati mbadala ambapo gharama kubwa ni maisha, si ada.",
        "Baada ya shahada ya Ujerumani, wahitimu wanaostahili wanaweza kuomba makazi ya kutafuta kazi (mara nyingi hadi miezi 18) — inasaidia ukiwa na lugha na fani lengwa.",
        "Uhusiano imara kati ya vyuo vya sayansi teule (Fachhochschulen) na sekta; mafunzo ni sehemu ya utamaduni.",
      ],
    },
    life: {
      en: "Punctual trains, quiet Sundays, and paperwork. Housing is the race — apply for a Studentenwohnheim the day the admission arrives. Health insurance is mandatory. Students who learn German to B1 before landing have a different year from those who only planned the lecture language.",
      sw: "Treni zinazofika kwa wakati, Jumapili tulivu, na nyaraka. Makazi ndiyo mbio — omba Studentenwohnheim siku udahili unapofika. Bima ya afya ni lazima. Mwanafunzi anayejifunza Kijerumani hadi B1 kabla ya kufika ana mwaka tofauti na yule aliyepanga lugha ya darasa tu.",
    },
    watch: {
      en: "Blocked-account money is not optional, and a low tuition sticker is not a low-cost year. For Tanzanian applicants we plan uni-assist / university checks — not an APS step — and we are frank about German language before anyone opens a file.",
      sw: "Fedha za akaunti iliyozuiliwa si hiari, na bei ndogo ya ada si mwaka wa gharama ndogo. Kwa waombaji wa Kitanzania tunapanga ukaguzi wa uni-assist / chuo — si hatua ya APS — na tunasema wazi kuhusu Kijerumani kabla mtu hajafungua faili.",
    },
  },
  "new-zealand": {
    photos: [
      {
        src: photo("new-zealand-1"),
        alt: { en: "Milford Sound in Fiordland", sw: "Milford Sound Fiordland" },
        caption: { en: "Smaller campuses, a calmer pace, and a long flight from JNIA.", sw: "Vyuo vidogo, mwendo tulivu, na ndege ndefu kutoka JNIA." },
      },
      {
        src: photo("new-zealand-2"),
        alt: { en: "A glacial lake in the Southern Alps", sw: "Ziwa la barafu katika Alps za Kusini" },
        caption: { en: "Environment and outdoor programmes are the natural fit — not a side trip.", sw: "Programu za mazingira na nje ndizo zinazofaa — si ziara ya kando." },
      },
      {
        src: photo("new-zealand-3"),
        alt: { en: "A mountain road in New Zealand", sw: "Barabara ya milimani New Zealand" },
        caption: { en: "Auckland and Wellington hold most international classrooms.", sw: "Auckland na Wellington ndizo zenye madarasa mengi ya kimataifa." },
      },
    ],
    intakes: { en: "February · July", sw: "Februari · Julai" },
    language: { en: "English", sw: "Kiingereza" },
    situation: {
      en: "New Zealand is the quiet English-speaking option: smaller campuses, a clear student-visa process, and a Post Study Work Visa for eligible qualifications. Tuition often sits around USD 16,000–26,000 a year before living costs. Environment, hospitality, and agriculture are the degrees that make sense here — not a generic business course you could take in Malaysia for less.\n\nImmigration New Zealand ties post-study length to the qualification: up to three years after an eligible master’s or doctorate, and often matching study length after many bachelor’s degrees. Fewer Tanzanian applicants means each file gets more counsellor time. The distance is the tax: flights are long and tickets are not cheap.",
      sw: "New Zealand ni chaguo tulivu lenye Kiingereza: vyuo vidogo, mchakato wazi wa viza ya mwanafunzi, na viza ya kazi baada ya masomo kwa sifa zinazostahili. Ada mara nyingi ni USD 16,000–26,000 kwa mwaka kabla ya gharama za maisha. Mazingira, ukarimu, na kilimo ndizo shahada zinazofaa hapa — si kozi ya biashara ya kawaida unayoweza kusoma Malaysia kwa nafuu.\n\nImmigration New Zealand inaunganisha urefu wa baada ya masomo na sifa: hadi miaka mitatu baada ya uzamili au doctorate inayostahili, na mara nyingi kulingana na muda wa masomo baada ya shahada nyingi za kwanza. Waombaji wachache wa Kitanzania humaanisha muda zaidi wa mshauri kwa kila faili. Umbali ndiyo kodi: ndege ni ndefu na tiketi si nafuu.",
    },
    opportunities: {
      en: [
        "Applied degrees in environment, tourism, and primary industries with field work built in.",
        "A Post Study Work Visa of up to three years for eligible master’s or doctoral awards; for many bachelor’s degrees the visa length follows how long you studied in New Zealand.",
        "A safe, small-campus culture that suits students who do not want a megacity.",
      ],
      sw: [
        "Shahada za vitendo katika mazingira, utalii, na viwanda vya msingi zenye kazi ya uwanjani.",
        "Viza ya kazi baada ya masomo ya hadi miaka mitatu kwa uzamili au PhD inayostahili; kwa shahada nyingi za kwanza urefu unafuata muda uliosoma New Zealand.",
        "Utamaduni salama wa chuo kidogo unaofaa mwanafunzi asiyetaka jiji kubwa.",
      ],
    },
    life: {
      en: "People are direct and kind. Rent in Auckland is the budget line that surprises parents. Students work part-time in hospitality more often than in offices. The outdoors is not marketing — weekend tramps are how classmates actually socialise.",
      sw: "Watu ni wazi na wema. Kodi Auckland ndiyo mstari wa bajeti unaowashangaza wazazi. Wanafunzi wanafanya kazi ya muda katika ukarimu kuliko ofisi. Mazingira si soko — matembezi ya wikendi ndivyo wanafunzi wenza wanavyoshirikiana.",
    },
    watch: {
      en: "Distance and cost. If the degree is generic, we will say India or Malaysia is the better first step.",
      sw: "Umbali na gharama. Ikiwa shahada ni ya kawaida, tutasema India au Malaysia ni hatua bora ya kwanza.",
    },
  },
  ireland: {
    photos: [
      {
        src: photo("ireland-1"),
        alt: { en: "The Cliffs of Moher on the Atlantic coast", sw: "Miamba ya Moher kwenye pwani ya Atlantiki" },
        caption: { en: "The west coast is the weekend. Dublin is the classroom and the housing problem.", sw: "Pwani ya magharibi ni wikendi. Dublin ni darasa na tatizo la makazi." },
      },
      {
        src: photo("ireland-2"),
        alt: { en: "A colourful Dublin street", sw: "Mtaa wa rangi Dublin" },
        caption: { en: "English-speaking Europe, with tech and pharma hiring inside the M50.", sw: "Ulaya yenye Kiingereza, na ajira za teknolojia na dawa ndani ya M50." },
      },
      {
        src: photo("ireland-3"),
        alt: { en: "Coastal cliffs and green fields in Ireland", sw: "Miamba ya pwani na mashamba mabichi Ireland" },
        caption: { en: "A compact alternative to the UK when you want an EU base.", sw: "Mbadala mdogo wa Uingereza unapotaka kituo cha EU." },
      },
    ],
    intakes: { en: "September · January", sw: "Septemba · Januari" },
    language: { en: "English", sw: "Kiingereza" },
    situation: {
      en: "Ireland is English-speaking Europe with a serious tech and pharmaceutical corridor around Dublin. Non-EU tuition often runs about USD 14,000–26,000 a year before living costs. After you arrive you normally register for Stamp 2 student permission; the embassy or online visa file still needs an offer, funds, and private medical insurance.\n\nThe Third Level Graduate Programme (Stamp 1G) lets eligible graduates stay to work: typically 12 months after an NFQ Level 8 honours bachelor’s, and up to 24 months after an eligible Level 9 master’s or Level 10 PhD. Housing in Dublin is the constraint everyone mentions and still underestimates.",
      sw: "Ireland ni Ulaya yenye Kiingereza na ukanda mzito wa teknolojia na dawa karibu na Dublin. Ada ya nje ya EU mara nyingi ni USD 14,000–26,000 kwa mwaka kabla ya gharama za maisha. Baada ya kufika kwa kawaida unasajili ruhusa ya mwanafunzi Stamp 2; faili la ubalozi au mtandaoni bado linahitaji ofa, fedha, na bima ya afya ya binafsi.\n\nThird Level Graduate Programme (Stamp 1G) inaruhusu wahitimu wanaostahili kubaki kufanya kazi: kwa kawaida miezi 12 baada ya shahada ya heshima NFQ Level 8, na hadi miezi 24 baada ya uzamili wa Level 9 au PhD ya Level 10. Makazi Dublin ni kikwazo kila mtu anakisema na bado anakidharau.",
    },
    opportunities: {
      en: [
        "Tech and pharma employers — including major multinationals and their suppliers — hire from Irish campuses.",
        "Stay-back under Stamp 1G: about one year after an eligible honours bachelor’s, and up to two years after an eligible master’s or PhD.",
        "A smaller, English-speaking EU alternative when the UK Graduate Route is not the right fit.",
      ],
      sw: [
        "Waajiri wa teknolojia na dawa — pamoja na makampuni makubwa ya kimataifa na wasambazaji wao — wanaajiri kutoka vyuo vya Ireland.",
        "Kubaki chini ya Stamp 1G: karibu mwaka mmoja baada ya shahada ya heshima inayostahili, na hadi miaka miwili baada ya uzamili au PhD inayostahili.",
        "Mbadala mdogo wa EU wenye Kiingereza wakati Graduate Route ya Uingereza si sawa.",
      ],
    },
    life: {
      en: "Dublin is expensive and short on rooms. Students who lock housing before they fly have a different first month. Weather is mild rain, not a Canadian winter. The community is smaller than London’s — you will know the other Tanzanian students quickly.",
      sw: "Dublin ni ghali na haina vyumba. Mwanafunzi anayefunga makazi kabla ya kusafiri ana mwezi wa kwanza tofauti. Hali ya hewa ni mvua laini, si baridi ya Kanada. Jamii ni ndogo kuliko London — utawajua wanafunzi wengine wa Kitanzania haraka.",
    },
    watch: {
      en: "Do not treat Ireland as a cheaper UK. Rent can match London. We will not open a file without a housing plan.",
      sw: "Usichukulie Ireland kama Uingereza nafuu. Kodi inaweza kufanana na London. Hatutafungua faili bila mpango wa makazi.",
    },
  },
  netherlands: {
    photos: [
      {
        src: photo("netherlands-1"),
        alt: { en: "Amsterdam canal houses", sw: "Nyumba za mifereji Amsterdam" },
        caption: { en: "Amsterdam is the picture. Many English bachelor’s sit in smaller Dutch cities.", sw: "Amsterdam ni picha. Shahada nyingi za Kiingereza ziko katika miji midogo ya Uholanzi." },
      },
      {
        src: photo("netherlands-2"),
        alt: { en: "Tulip fields in the Dutch countryside", sw: "Mashamba ya tulips mashambani Uholanzi" },
        caption: { en: "The academic culture is blunt: deadlines, group work, and no hand-holding.", sw: "Utamaduni wa kitaaluma ni wazi: tarehe za mwisho, kazi za kikundi, na hakuna kushikwa mkono." },
      },
      {
        src: photo("netherlands-3"),
        alt: { en: "Bicycles on a Dutch canal bridge", sw: "Baiskeli kwenye daraja la mfereji Uholanzi" },
        caption: { en: "A bike is not a lifestyle choice. It is how you get to the 9 a.m. seminar.", sw: "Baiskeli si mtindo. Ndivyo unavyofika semina ya saa tatu asubuhi." },
      },
    ],
    intakes: { en: "September (main) · February (limited)", sw: "Septemba (kuu) · Februari (chache)" },
    language: { en: "Many bachelor’s and master’s in English", sw: "Shahada nyingi na uzamili kwa Kiingereza" },
    situation: {
      en: "The Netherlands teaches more bachelor’s degrees in English than almost any other non-Anglophone country. That is the opportunity and the trap: everyone else knows it. Numerus-fixus programmes (psychology, some business, some medicine-related tracks) fill early. Housing is a national shortage; a university offer without a room is not a plan.\n\nNon-EU tuition often sits at USD 10,000–20,000. The culture expects independent study. We prepare families for that, and for the housing race, before we talk about canals.",
      sw: "Uholanzi inafundisha shahada zaidi kwa Kiingereza kuliko karibu nchi nyingine yoyote isiyozungumza Kiingereza kama lugha kuu. Hilo ndilo nafasi na mtego: kila mtu anajua. Programu za numerus-fixus (saikolojia, baadhi ya biashara, baadhi ya njia za tiba) hujazwa mapema. Makazi ni uhaba wa kitaifa; ofa ya chuo bila chumba si mpango.\n\nAda ya nje ya EU mara nyingi ni USD 10,000–20,000. Utamaduni unatarajia kujifunza kwa uhuru. Tunaandaa familia kwa hilo, na kwa mbio za makazi, kabla hatujazungumza kuhusu mifereji.",
    },
    opportunities: {
      en: [
        "English-taught bachelor’s in design, social sciences, and engineering that are hard to find elsewhere in Europe.",
        "An orientation-year visa after graduation for eligible alumni who want to look for work.",
        "A cycling, English-friendly daily life — you will not need Dutch on day one, but it helps by year two.",
      ],
      sw: [
        "Shahada za kwanza kwa Kiingereza katika ubunifu, sayansi jamii, na uhandisi ambazo ni ngumu kuzipata Ulaya kwingine.",
        "Viza ya mwaka wa mwelekeo baada ya kuhitimu kwa wahitimu wanaostahili wanaotaka kutafuta kazi.",
        "Maisha ya kila siku ya baiskeli na Kiingereza — huhitaji Kiholanzi siku ya kwanza, lakini inasaidia mwaka wa pili.",
      ],
    },
    life: {
      en: "Direct feedback can feel rude if you grew up with more formal lecturers. Groceries and trains are efficient; rooms are small. Students who wait until August to hunt housing often defer. We start that search with the application.",
      sw: "Maoni ya moja kwa moja yanaweza kuonekana makali ukikulia na wahadhiri rasmi zaidi. Duka na treni ni bora; vyumba ni vidogo. Wanafunzi wanaosubiri Agosti kutafuta makazi mara nyingi wanaahirisha. Tunaanza utafutaji huo pamoja na maombi.",
    },
    watch: {
      en: "Numerus fixus and housing start earlier than Tanzanian families expect. Miss those windows and the September offer is theoretical.",
      sw: "Numerus fixus na makazi yanaanza mapema kuliko familia za Kitanzania zinavyotarajia. Ukikosa madirisha hayo, ofa ya Septemba inabaki nadharia.",
    },
  },
  france: {
    photos: [
      {
        src: photo("france-1"),
        alt: { en: "The Eiffel Tower in Paris", sw: "Mnara wa Eiffel Paris" },
        caption: { en: "Paris is one campus city. Lyon, Toulouse, and Nantes are often the better student file.", sw: "Paris ni jiji moja la vyuo. Lyon, Toulouse, na Nantes mara nyingi ni faili bora la mwanafunzi." },
      },
      {
        src: photo("france-2"),
        alt: { en: "The Louvre pyramid in Paris", sw: "Piramidi ya Louvre Paris" },
        caption: { en: "Public universities stay cheap. Grandes écoles and business schools do not.", sw: "Vyuo vikuu vya umma vinabaki nafuu. Grandes écoles na shule za biashara sivyo." },
      },
      {
        src: photo("france-3"),
        alt: { en: "Lavender fields in Provence", sw: "Mashamba ya lavenda Provence" },
        caption: { en: "Life outside Île-de-France is slower — and kinder on rent.", sw: "Maisha nje ya Île-de-France ni polepole — na laini kwa kodi." },
      },
    ],
    intakes: { en: "September · January (some schools)", sw: "Septemba · Januari (baadhi)" },
    language: { en: "French on most public tracks; English in selected business and engineering schools", sw: "Kifaransa katika njia nyingi za umma; Kiingereza katika shule teule za biashara na uhandisi" },
    situation: {
      en: "France still has relatively low public-university fees for many international students if you go through Campus France (Études en France) and can live partly in French — though some public tracks now charge higher “differentiated” fees for non-EU students, so we check the programme page, not an old brochure. English-taught tracks exist mainly in business and engineering schools, and those fees climb toward the private-school band (roughly USD 3,000–15,000 depending on the institution).\n\nWe only recommend France when the student is ready for the Campus France calendar and at least basic French. A pretty Paris photo is not a file.",
      sw: "Ufaransa bado ina ada ndogo kiasi ya vyuo vya umma kwa wanafunzi wengi wa kimataifa ukipitia Campus France (Études en France) na ukiweza kuishi kidogo kwa Kifaransa — ingawa baadhi ya njia za umma sasa zina ada za juu zaidi kwa wasio EU, kwa hiyo tunakagua ukurasa wa programu, si brosha ya zamani. Njia za Kiingereza zipo hasa katika shule za biashara na uhandisi, na ada hizo zinapanda kuelekea bendi ya shule binafsi (takriban USD 3,000–15,000 kulingana na taasisi).\n\nTunapendekeza Ufaransa tu mwanafunzi akiwa tayari kwa kalenda ya Campus France na angalau Kifaransa cha msingi. Picha nzuri ya Paris si faili.",
    },
    opportunities: {
      en: [
        "Public-university fees that can undercut Malaysia — if the language and Campus France file are real.",
        "English-medium business, fashion, and engineering schools for students who will not reach B2 French in time.",
        "A post-study job-search residence for eligible master’s graduates.",
      ],
      sw: [
        "Ada za vyuo vya umma zinazoweza kushinda Malaysia — ikiwa lugha na faili la Campus France ni vya kweli.",
        "Shule za biashara, mitindo, na uhandisi kwa Kiingereza kwa mwanafunzi ambaye hatafikia B2 Kifaransa kwa wakati.",
        "Makazi ya kutafuta kazi baada ya masomo kwa wahitimu wa uzamili wanaostahili.",
      ],
    },
    life: {
      en: "Bureaucracy has a reputation because it earned it. CAF housing aid, a French bank account, and prefecture appointments are the first semester. Food and trains are a pleasure once you are set up. Students who arrive with A2 French have a different city from those who arrive with none.",
      sw: "Urasimu una sifa mbaya kwa sababu umeistahili. Msaada wa makazi wa CAF, akaunti ya benki ya Ufaransa, na miadi ya prefecture ni muhula wa kwanza. Chakula na treni ni furaha ukishaweka msingi. Mwanafunzi anayefika na Kifaransa cha A2 ana jiji tofauti na yule anayefika bila chochote.",
    },
    watch: {
      en: "Skip France if you want an all-English life and a fast visa. The Campus France calendar starts months before September.",
      sw: "Ruka Ufaransa ukitaka maisha ya Kiingereza tu na viza ya haraka. Kalenda ya Campus France inaanza miezi kabla ya Septemba.",
    },
  },
  japan: {
    photos: [
      {
        src: photo("japan-1"),
        alt: { en: "Shibuya crossing in Tokyo", sw: "Kivuko cha Shibuya Tokyo" },
        caption: { en: "Tokyo is the graduate-school city. Start the file the year before you want to land.", sw: "Tokyo ni jiji la uzamili. Anza faili mwaka kabla unapotaka kufika." },
      },
      {
        src: photo("japan-2"),
        alt: { en: "Fushimi Inari shrine gates in Kyoto", sw: "Malango ya hekalu la Fushimi Inari Kyoto" },
        caption: { en: "Kyoto and Osaka are calmer — and still expect punctuality.", sw: "Kyoto na Osaka ni tulivu — na bado zinatarajia kuwasili kwa wakati." },
      },
      {
        src: photo("japan-3"),
        alt: { en: "Mount Fuji above the trees", sw: "Mlima Fuji juu ya miti" },
        caption: { en: "MEXT and university scholarships are the reason the budget can work from Tanzania.", sw: "Ufadhili wa MEXT na vyuo ndiyo sababu bajeti inaweza kufanya kazi kutoka Tanzania." },
      },
    ],
    intakes: { en: "April · October", sw: "Aprili · Oktoba" },
    language: { en: "English graduate programmes; Japanese for most undergraduate life", sw: "Programu za uzamili kwa Kiingereza; Kijapani kwa maisha mengi ya shahada" },
    situation: {
      en: "Japan rewards a long runway. English-medium graduate programmes exist in robotics, design, and business; undergraduate paths are fewer and often tied to MEXT or a university scholarship. Tuition can sit at USD 5,000–12,000, but Tokyo rent and the application calendar are the real constraints.\n\nThe student visa follows a Certificate of Eligibility from the school. Timelines are long. We start the year before you want to land — especially for MEXT, which has its own embassy track.",
      sw: "Japan inazawadia muda mrefu wa maandalizi. Programu za uzamili kwa Kiingereza zipo katika roboti, ubunifu, na biashara; njia za shahada ya kwanza ni chache na mara nyingi zimefungamana na MEXT au ufadhili wa chuo. Ada inaweza kuwa USD 5,000–12,000, lakini kodi ya Tokyo na kalenda ya maombi ndiyo vikwazo halisi.\n\nViza ya mwanafunzi inafuata Cheti cha Ustahiki kutoka shule. Ratiba ni ndefu. Tunaanza mwaka kabla unapotaka kufika — hasa kwa MEXT, ambayo ina njia yake ya ubalozi.",
    },
    opportunities: {
      en: [
        "MEXT and university scholarships that can cover tuition and a monthly stipend.",
        "English-taught master’s in engineering, robotics, and design at selected national and private universities.",
        "Part-time work (up to the legal weekly cap) once you hold permission — convenience stores and campus jobs are the usual start.",
      ],
      sw: [
        "Ufadhili wa MEXT na vyuo unaoweza kufunika ada na posho ya kila mwezi.",
        "Uzamili kwa Kiingereza katika uhandisi, roboti, na ubunifu katika vyuo vikuu teule vya taifa na binafsi.",
        "Kazi ya muda (hadi kikomo cha kisheria cha wiki) ukiwa na ruhusa — maduka na kazi za chuoni ndiyo mwanzo wa kawaida.",
      ],
    },
    life: {
      en: "Japan is extremely safe and extremely particular. Trains run on time; forms do too. Convenience-store food will carry you through the first month. Students who study JLPT N4–N3 before arrival have a different internship year. Cashless payments and a residence card are week-one tasks.",
      sw: "Japan ni salama sana na makini sana. Treni zinafika kwa wakati; fomu nazo. Chakula cha duka la mtaani kitakubeba mwezi wa kwanza. Mwanafunzi anayesoma JLPT N4–N3 kabla ya kufika ana mwaka tofauti wa mafunzo. Malipo yasiyo na pesa taslimu na kadi ya makazi ni kazi za wiki ya kwanza.",
    },
    watch: {
      en: "Do not start in March for an April intake. MEXT and CoE calendars punish last-minute files.",
      sw: "Usianze Machi kwa ulaji wa Aprili. Kalenda za MEXT na CoE zinaadhibu faili za dakika ya mwisho.",
    },
  },
};
