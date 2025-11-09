require('dotenv').config();
const mongoose = require('mongoose');
const colors = require('colors');

// Import models
const User = require('./models/User');
const HealthTip = require('./models/HealthTip');
const Symptom = require('./models/Symptom');
const FirstAidContent = require('./models/FirstAidContent');
const HealthFacility = require('./models/HealthFacility');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Sample Health Tips
const healthTips = [
  {
    title: {
      english: 'Drink Water Regularly',
      pidgin: 'Drink Water Well Well',
      yoruba: 'Mu Omi Nigbagbogbo',
      igbo: 'Ṅụọ Mmiri Mgbe Niile',
      hausa: 'Sha Ruwa Kullum'
    },
    content: {
      english: 'Drinking at least 8 glasses of water daily helps keep your body hydrated and functioning properly.',
      pidgin: 'Make you drink at least 8 cups of water everyday. E go help your body dey work well.',
      yoruba: 'Mimu omi to o kere ju ago mejo lojoojumo yoo ran ara re lowo lati sise daradara.',
      igbo: 'Ịṅụ opekata mpe iko mmiri asatọ kwa ụbọchị na-enyere ahụ gị aka ịrụ ọrụ nke ọma.',
      hausa: 'Shan aƙalla kofuna 8 na ruwa kowace rana yana taimaka wa jikin ku da aiki mai kyau.'
    },
    category: 'nutrition',
    tags: ['hydration', 'water', 'wellness']
  },
  {
    title: {
      english: 'Wash Your Hands',
      pidgin: 'Wash Your Hand',
      yoruba: 'Fọ Ọwọ Rẹ',
      igbo: 'Saa Aka Gị',
      hausa: 'Wanke Hannunku'
    },
    content: {
      english: 'Wash your hands with soap and water for at least 20 seconds to prevent infections.',
      pidgin: 'Wash your hand with soap and water for at least 20 seconds. E go prevent sickness.',
      yoruba: 'Fi ọṣẹ ati omi fọ ọwọ rẹ fun o kere ju iṣẹju 20 lati yago fun arun.',
      igbo: 'Jiri ncha na mmiri saa aka gị ihe dịka sekọnd 20 iji gbochie ọrịa.',
      hausa: 'Wanke hannunku da sabulu da ruwa na aƙalla daƙiƙa 20 don hana cututtuka.'
    },
    category: 'hygiene',
    tags: ['hygiene', 'handwashing', 'prevention']
  },
  {
    title: {
      english: 'Exercise Daily',
      pidgin: 'Do Exercise Everyday',
      yoruba: 'Ṣe Ìdárayá Lójoojúmọ́',
      igbo: 'Mee Mgbatị Ahụ Kwa Ụbọchị',
      hausa: 'Yi Motsa Jiki Kullum'
    },
    content: {
      english: 'At least 30 minutes of physical activity daily keeps your heart healthy and boosts your mood.',
      pidgin: 'Do exercise for at least 30 minutes everyday. E go keep your heart strong and make you dey happy.',
      yoruba: 'Iṣẹ ara fun o kere ju iṣẹju 30 lojoojumo jẹ ki ọkan rẹ wa ni ilera ati mu inu rẹ dun.',
      igbo: 'Ime mgbatị ahụ opekata mpe nkeji 30 kwa ụbọchị na-eme ka obi gị dị ike ma mee ka ọṅụ dị gị.',
      hausa: 'Motsa jiki na aƙalla mintuna 30 kowace rana yana kiyaye lafiyar zuciya kuma yana ƙara farin ciki.'
    },
    category: 'exercise',
    tags: ['exercise', 'fitness', 'health']
  },
  {
    title: {
      english: 'Get Enough Sleep',
      pidgin: 'Sleep Well',
      yoruba: 'Sun Tó',
      igbo: 'Hie Ụra Zuru Ezu',
      hausa: 'Yi Barci Da Yawa'
    },
    content: {
      english: '7-8 hours of quality sleep each night helps your body recover and stay healthy.',
      pidgin: '7-8 hours of good sleep every night go help your body repair and stay healthy.',
      yoruba: 'Oorun ti o to wakati 7-8 ni alẹ kọọkan ran ara rẹ lọwọ lati gbọjẹ ati duro ni ilera.',
      igbo: 'Ihi ụra nke ọma awa 7-8 kwa abalị na-enyere ahụ gị aka ịgbake ma nọgide na-adị mma.',
      hausa: 'Barci mai inganci na sa\'o\'i 7-8 kowane dare yana taimaka wa jikin ku ya warke kuma ya kasance lafiya.'
    },
    category: 'sleep',
    tags: ['sleep', 'rest', 'recovery']
  },
  {
    title: {
      english: 'Eat Fruits and Vegetables',
      pidgin: 'Chop Fruits and Vegetables',
      yoruba: 'Jẹ Èso Àti Ẹ̀fọ́',
      igbo: 'Rie Mkpụrụ Osisi Na Akwụkwọ Nri',
      hausa: 'Ci \'Ya\'yan Itace Da Kayan Lambu'
    },
    content: {
      english: 'Include colorful fruits and vegetables in your daily meals for essential vitamins and minerals.',
      pidgin: 'Chop different color fruits and vegetables everyday. Dem get important vitamins wey your body need.',
      yoruba: 'Fi eso ati efo ti o ni awọ ọpọlọpọ sinu ounjẹ rẹ lojoojumo fun awọn vitamin ati mineral pataki.',
      igbo: 'Tinye mkpụrụ osisi na akwụkwọ nri dị iche iche n\'ofe gị kwa ụbọchị maka vitamin na mineral dị mkpa.',
      hausa: 'Haɗa \'ya\'yan itace da kayan lambu masu launi daban-daban a cikin abincin ku na yau da kullum don samun bitamin da ma\'adinai masu muhimmanci.'
    },
    category: 'nutrition',
    tags: ['nutrition', 'fruits', 'vegetables', 'vitamins']
  }
];

// Sample Symptoms
const symptoms = [
  {
    name: {
      english: 'Fever',
      pidgin: 'Hot Body',
      yoruba: 'Ibà',
      igbo: 'Ahụ Ọkụ',
      hausa: 'Zazzaɓi'
    },
    description: {
      english: 'Elevated body temperature above normal (37°C/98.6°F)',
      pidgin: 'Your body dey hot pass normal',
      yoruba: 'Iwọn otutu ara ti ga ju deede lọ',
      igbo: 'Ọkụ ahụ karịrị nke nkịtị',
      hausa: 'Zafin jiki sama da al\'ada'
    },
    category: 'fever',
    severity: 'moderate',
    relatedConditions: [
      { condition: 'Malaria', probability: 'high' },
      { condition: 'Typhoid', probability: 'medium' },
      { condition: 'Flu', probability: 'medium' }
    ]
  },
  {
    name: {
      english: 'Headache',
      pidgin: 'Head Pain',
      yoruba: 'Orí Fọ́',
      igbo: 'Isi Mgbu',
      hausa: 'Ciwon Kai'
    },
    description: {
      english: 'Pain in any region of the head',
      pidgin: 'Pain for head',
      yoruba: 'Irora ni eyikeyi apakan ori',
      igbo: 'Mgbu n\'akụkụ ọ bụla nke isi',
      hausa: 'Ciwo a kowane yanki na kai'
    },
    category: 'pain',
    severity: 'mild',
    relatedConditions: [
      { condition: 'Stress', probability: 'high' },
      { condition: 'Dehydration', probability: 'medium' },
      { condition: 'Malaria', probability: 'medium' }
    ]
  },
  {
    name: {
      english: 'Cough',
      pidgin: 'Cough',
      yoruba: 'Ikọ́',
      igbo: 'Ụkwara',
      hausa: 'Tari'
    },
    description: {
      english: 'Forceful expulsion of air from the lungs',
      pidgin: 'You dey cough',
      yoruba: 'Afẹfẹ ti n jade lati inu ẹdọforo',
      igbo: 'Ikuku na-apụta n\'ike n\'ụkwara',
      hausa: 'Fitar da iska da ƙarfi daga huhu'
    },
    category: 'respiratory',
    severity: 'mild',
    relatedConditions: [
      { condition: 'Common Cold', probability: 'high' },
      { condition: 'Bronchitis', probability: 'medium' },
      { condition: 'COVID-19', probability: 'low' }
    ]
  },
  {
    name: {
      english: 'Stomach Pain',
      pidgin: 'Belly Pain',
      yoruba: 'Ikùn Dùn',
      igbo: 'Afọ Mgbu',
      hausa: 'Ciwon Ciki'
    },
    description: {
      english: 'Discomfort or pain in the abdominal area',
      pidgin: 'Pain for belly',
      yoruba: 'Irora tabi esu ni agbegbe ikun',
      igbo: 'Mgbu ma ọ bụ ihe mgbu n\'afọ',
      hausa: 'Rashin jin daɗi ko ciwo a yankin ciki'
    },
    category: 'digestive',
    severity: 'moderate',
    relatedConditions: [
      { condition: 'Gastritis', probability: 'medium' },
      { condition: 'Food Poisoning', probability: 'medium' },
      { condition: 'Ulcer', probability: 'low' }
    ]
  }
];

// Sample First Aid Content
const firstAidContent = [
  {
    type: 'burns',
    title: {
      english: 'How to Treat Burns',
      pidgin: 'How to Treat Burn',
      yoruba: 'Bii A Ṣe Le Tọ́jú Ìjóná',
      igbo: 'Otu Esi Elekọta Ọkụ',
      hausa: 'Yadda Ake Magance Konewa'
    },
    icon: '🔥',
    color: '#FF6B35',
    instructions: {
      dos: {
        english: [
          'Cool the burn with running water for 10-20 minutes',
          'Remove jewelry and tight clothing from the burned area',
          'Cover with a sterile, non-stick bandage',
          'Take over-the-counter pain relievers if needed'
        ],
        pidgin: [
          'Pour water on top the burn for 10-20 minutes',
          'Remove chain and tight cloth from the burn area',
          'Cover am with clean bandage',
          'Take painkiller if the pain too much'
        ]
      },
      donts: {
        english: [
          'Do not apply ice directly to the burn',
          'Do not use butter, oil, or toothpaste',
          'Do not break blisters',
          'Do not remove clothing stuck to the burn'
        ],
        pidgin: [
          'No put ice direct on top the burn',
          'No use butter, oil, or toothpaste',
          'No burst the water wey come out',
          'No remove cloth wey don stick to the burn'
        ]
      },
      steps: {
        english: [
          { step: 1, instruction: 'Remove the person from the source of heat' },
          { step: 2, instruction: 'Cool the burn with running water' },
          { step: 3, instruction: 'Remove jewelry and tight clothing' },
          { step: 4, instruction: 'Cover with a clean cloth' },
          { step: 5, instruction: 'Seek medical help for severe burns' }
        ]
      }
    },
    warningMessage: {
      english: 'Seek immediate medical attention for severe burns, burns on the face, hands, or genitals, or if the burn covers a large area.',
      pidgin: 'Go hospital quick if the burn too serious, if e dey face, hand, or private part, or if e big well well.'
    },
    emergencyNumbers: [
      { name: 'Emergency Services', number: '112', description: 'National Emergency Number' },
      { name: 'Ambulance', number: '767', description: 'Lagos State Ambulance' }
    ]
  },
  {
    type: 'cuts_bleeding',
    title: {
      english: 'How to Stop Bleeding',
      pidgin: 'How to Stop Blood',
      yoruba: 'Bii A Ṣe Le Dá Ẹ̀jẹ̀ Dúró',
      igbo: 'Otu Esi Akwụsị Ọbara',
      hausa: 'Yadda Ake Dakatar Da Zubar Jini'
    },
    icon: '🩸',
    color: '#E74C3C',
    instructions: {
      dos: {
        english: [
          'Apply direct pressure with a clean cloth',
          'Elevate the injured area above the heart if possible',
          'Keep pressure on the wound for 10-15 minutes',
          'Clean with water after bleeding stops'
        ],
        pidgin: [
          'Press the cut with clean cloth',
          'Raise the place wey blood dey comot',
          'Hold the cloth for 10-15 minutes',
          'Clean am with water after blood don stop'
        ]
      },
      donts: {
        english: [
          'Do not remove the cloth if blood soaks through',
          'Do not use a tourniquet unless absolutely necessary',
          'Do not apply pressure directly over a fracture',
          'Do not peek at the wound frequently'
        ],
        pidgin: [
          'No remove the cloth even if blood soak am',
          'No tie the place too tight unless e serious well well',
          'No press the place if bone don break',
          'No dey look the cut every time'
        ]
      },
      steps: {
        english: [
          { step: 1, instruction: 'Ensure your safety first' },
          { step: 2, instruction: 'Apply direct pressure to the wound' },
          { step: 3, instruction: 'Maintain pressure for 10-15 minutes' },
          { step: 4, instruction: 'Bandage the wound when bleeding stops' },
          { step: 5, instruction: 'Seek medical help if bleeding persists' }
        ]
      }
    },
    warningMessage: {
      english: 'Call emergency services immediately for severe bleeding, deep cuts, or if bleeding does not stop after 10 minutes of pressure.',
      pidgin: 'Call ambulance quick if blood plenty, if cut deep, or if blood no stop after 10 minutes.'
    }
  }
];

// Sample Health Facilities (Abuja)
const facilities = [
  {
    name: 'National Hospital Abuja',
    type: 'hospital',
    location: {
      address: 'Plot 132 Central District',
      city: 'Abuja',
      state: 'FCT',
      coordinates: {
        type: 'Point',
        coordinates: [7.4893, 9.0643]
      }
    },
    contact: {
      phone: ['+234 9 461 4000'],
      email: 'info@nationalhospitalabuja.gov.ng'
    },
    services: ['emergency', 'outpatient', 'inpatient', 'laboratory', 'surgery'],
    is24Hours: true,
    hasEmergency: true,
    isVerified: true
  },
  {
    name: 'Garki Hospital',
    type: 'hospital',
    location: {
      address: 'Tafawa Balewa Way, Garki',
      city: 'Abuja',
      state: 'FCT',
      coordinates: {
        type: 'Point',
        coordinates: [7.4897, 9.0356]
      }
    },
    contact: {
      phone: ['+234 9 234 5678']
    },
    services: ['emergency', 'outpatient', 'maternity', 'laboratory'],
    is24Hours: true,
    hasEmergency: true,
    isVerified: true
  }
];

// Import or delete data
const importData = async () => {
  try {
    await HealthTip.deleteMany();
    await Symptom.deleteMany();
    await FirstAidContent.deleteMany();
    await HealthFacility.deleteMany();

    await HealthTip.create(healthTips);
    await Symptom.create(symptoms);
    await FirstAidContent.create(firstAidContent);
    await HealthFacility.create(facilities);

    console.log('✅ Data Imported Successfully'.green.inverse);
    console.log(`📊 Health Tips: ${healthTips.length}`.cyan);
    console.log(`📊 Symptoms: ${symptoms.length}`.cyan);
    console.log(`📊 First Aid: ${firstAidContent.length}`.cyan);
    console.log(`📊 Facilities: ${facilities.length}`.cyan);
    
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await HealthTip.deleteMany();
    await Symptom.deleteMany();
    await FirstAidContent.deleteMany();
    await HealthFacility.deleteMany();
    await User.deleteMany();

    console.log('✅ Data Destroyed Successfully'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

// Check command line arguments
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please specify an option:'.yellow);
  console.log('  node seeder.js -i   (import data)'.cyan);
  console.log('  node seeder.js -d   (delete data)'.red);
}
