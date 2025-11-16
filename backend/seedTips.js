require('dotenv').config();
const mongoose = require('mongoose');
const colors = require('colors');
const HealthTip = require('./models/HealthTip');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...'.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red);
    process.exit(1);
  }
};

const healthTips = [
  {
    content: 'Drink at least 8 glasses of water daily to stay hydrated and maintain healthy body functions.',
    category: 'Hygiene',
    translations: {
      english: 'Drink at least 8 glasses of water daily to stay hydrated and maintain healthy body functions.',
      pidgin: 'Make sure say you dey drink at least 8 cup water everyday so your body go fit work well.'
    }
  },
  {
    content: 'Eat fresh fruits like oranges, mangoes, and bananas to boost your immune system.',
    category: 'Nutrition',
    translations: {
      english: 'Eat fresh fruits like oranges, mangoes, and bananas to boost your immune system.',
      pidgin: 'Chop fresh fruits like orange, mango, and banana make your body strong to fight sickness.'
    }
  },
  {
    content: 'Wash your hands regularly with soap and water for at least 20 seconds to prevent infections.',
    category: 'Hygiene',
    translations: {
      english: 'Wash your hands regularly with soap and water for at least 20 seconds to prevent infections.',
      pidgin: 'Wash your hand well well with soap and water for at least 20 seconds so disease no go catch you.'
    }
  },
  {
    content: 'Get at least 7-8 hours of sleep every night to help your body repair and recharge.',
    category: 'General',
    translations: {
      english: 'Get at least 7-8 hours of sleep every night to help your body repair and recharge.',
      pidgin: 'Make sure say you sleep at least 7-8 hours every night so your body go rest well.'
    }
  },
  {
    content: 'Exercise for 30 minutes daily - walking, jogging, or dancing helps keep your heart healthy.',
    category: 'Exercise',
    translations: {
      english: 'Exercise for 30 minutes daily - walking, jogging, or dancing helps keep your heart healthy.',
      pidgin: 'Do exercise for 30 minutes everyday - waka, run, or dance go help your heart dey strong.'
    }
  },
  {
    content: 'Reduce salt intake to prevent high blood pressure. Use local spices for flavor instead.',
    category: 'Nutrition',
    translations: {
      english: 'Reduce salt intake to prevent high blood pressure. Use local spices for flavor instead.',
      pidgin: 'No dey use plenty salt for food make high blood pressure no catch you. Use our local spices instead.'
    }
  },
  {
    content: 'Take deep breaths when stressed. Breathe in slowly through your nose and out through your mouth.',
    category: 'Mental Health',
    translations: {
      english: 'Take deep breaths when stressed. Breathe in slowly through your nose and out through your mouth.',
      pidgin: 'When stress catch you, breathe well well. Use your nose breathe in, use your mouth breathe out.'
    }
  },
  {
    content: 'Eat vegetables like ugwu, ugu, and ewedu. They are rich in vitamins and minerals.',
    category: 'Nutrition',
    translations: {
      english: 'Eat vegetables like ugwu, ugu, and ewedu. They are rich in vitamins and minerals.',
      pidgin: 'Chop vegetable like ugwu, ugu, and ewedu. Dem get plenty vitamins wey go make your body strong.'
    }
  },
  {
    content: 'Protect yourself from mosquitoes by sleeping under treated nets to prevent malaria.',
    category: 'Prevention',
    translations: {
      english: 'Protect yourself from mosquitoes by sleeping under treated nets to prevent malaria.',
      pidgin: 'Sleep under mosquito net wey dem treat make malaria no catch you.'
    }
  },
  {
    content: 'Limit sugar intake. Too much sugar can lead to diabetes and weight gain.',
    category: 'Nutrition',
    translations: {
      english: 'Limit sugar intake. Too much sugar can lead to diabetes and weight gain.',
      pidgin: 'No dey take too much sugar. E fit cause sugar sickness and make you fat.'
    }
  },
  {
    content: 'Talk to someone you trust when feeling sad or anxious. Mental health is important.',
    category: 'Mental Health',
    translations: {
      english: 'Talk to someone you trust when feeling sad or anxious. Mental health is important.',
      pidgin: 'When sadness or worry catch you, talk to person wey you trust. Your mind health important pass.'
    }
  },
  {
    content: 'Keep your environment clean. Dispose waste properly to prevent disease spread.',
    category: 'Hygiene',
    translations: {
      english: 'Keep your environment clean. Dispose waste properly to prevent disease spread.',
      pidgin: 'Make your environment clean. Throway rubbish for proper place make sickness no spread.'
    }
  },
  {
    content: 'Avoid self-medication. Always consult a healthcare professional for proper treatment.',
    category: 'Prevention',
    translations: {
      english: 'Avoid self-medication. Always consult a healthcare professional for proper treatment.',
      pidgin: 'No dey buy drug give yourself anyhow. Make sure say you see doctor first.'
    }
  },
  {
    content: 'Eat protein-rich foods like beans, fish, and eggs to build strong muscles and bones.',
    category: 'Nutrition',
    translations: {
      english: 'Eat protein-rich foods like beans, fish, and eggs to build strong muscles and bones.',
      pidgin: 'Chop food wey get protein like beans, fish, and egg make your muscle and bone strong.'
    }
  },
  {
    content: 'Take breaks from your phone and computer screens to rest your eyes every 20 minutes.',
    category: 'General',
    translations: {
      english: 'Take breaks from your phone and computer screens to rest your eyes every 20 minutes.',
      pidgin: 'Rest your eye from phone and computer every 20 minutes make your eye no pain you.'
    }
  }
];

const seedTips = async () => {
  try {
    await connectDB();
    
    // Clear existing tips
    await HealthTip.deleteMany();
    console.log('Old tips deleted'.red);
    
    // Insert new tips
    await HealthTip.insertMany(healthTips);
    console.log(`${healthTips.length} health tips added successfully!`.green.bold);
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red);
    process.exit(1);
  }
};

seedTips();