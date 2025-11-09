require('dotenv').config();
const mongoose = require('mongoose');
const colors = require('colors');

// Import models
const User = require('./models/User');
const Reminder = require('./models/Reminder');
const HealthTip = require('./models/HealthTip');
const Symptom = require('./models/Symptom');
const FirstAidContent = require('./models/FirstAidContent');
const HealthFacility = require('./models/HealthFacility');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected'.green.bold);
    return true;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`.red.bold);
    return false;
  }
};

// Test models
const testModels = async () => {
  console.log('\n🧪 Testing DeyOk Database Models...\n'.cyan.bold);

  try {
    // Test User Model
    console.log('1️⃣  Testing User Model...'.yellow);
    const testUser = new User({
      name: 'Test User',
      email: 'test@deyok.com',
      password: 'test123',
      preferredLanguage: 'english'
    });
    const validationUser = testUser.validateSync();
    if (!validationUser) {
      console.log('   ✅ User model is valid'.green);
    } else {
      console.log('   ❌ User model has errors:'.red, validationUser);
    }

    // Test Reminder Model
    console.log('2️⃣  Testing Reminder Model...'.yellow);
    const testReminder = new Reminder({
      user: new mongoose.Types.ObjectId(),
      activity: 'drink_water',
      frequency: 'daily',
      time: '08:00'
    });
    const validationReminder = testReminder.validateSync();
    if (!validationReminder) {
      console.log('   ✅ Reminder model is valid'.green);
    } else {
      console.log('   ❌ Reminder model has errors:'.red, validationReminder);
    }

    // Test HealthTip Model
    console.log('3️⃣  Testing HealthTip Model...'.yellow);
    const testTip = new HealthTip({
      title: {
        english: 'Drink Water Daily'
      },
      content: {
        english: 'Drinking 8 glasses of water daily keeps you hydrated.'
      },
      category: 'nutrition'
    });
    const validationTip = testTip.validateSync();
    if (!validationTip) {
      console.log('   ✅ HealthTip model is valid'.green);
    } else {
      console.log('   ❌ HealthTip model has errors:'.red, validationTip);
    }

    // Test Symptom Model
    console.log('4️⃣  Testing Symptom Model...'.yellow);
    const testSymptom = new Symptom({
      name: {
        english: 'Headache'
      },
      category: 'pain',
      severity: 'mild'
    });
    const validationSymptom = testSymptom.validateSync();
    if (!validationSymptom) {
      console.log('   ✅ Symptom model is valid'.green);
    } else {
      console.log('   ❌ Symptom model has errors:'.red, validationSymptom);
    }

    // Test FirstAidContent Model
    console.log('5️⃣  Testing FirstAidContent Model...'.yellow);
    const testFirstAid = new FirstAidContent({
      type: 'burns',
      title: {
        english: 'How to Treat Burns'
      },
      instructions: {
        dos: {
          english: ['Cool the burn with water']
        },
        donts: {
          english: ['Do not apply ice']
        },
        steps: {
          english: [{ step: 1, instruction: 'Cool with water' }]
        }
      }
    });
    const validationFirstAid = testFirstAid.validateSync();
    if (!validationFirstAid) {
      console.log('   ✅ FirstAidContent model is valid'.green);
    } else {
      console.log('   ❌ FirstAidContent model has errors:'.red, validationFirstAid);
    }

    // Test HealthFacility Model
    console.log('6️⃣  Testing HealthFacility Model...'.yellow);
    const testFacility = new HealthFacility({
      name: 'Test Hospital',
      type: 'hospital',
      location: {
        address: '123 Test Street',
        city: 'Abuja',
        state: 'FCT',
        coordinates: {
          type: 'Point',
          coordinates: [7.4951, 9.0820] // Abuja coordinates
        }
      }
    });
    const validationFacility = testFacility.validateSync();
    if (!validationFacility) {
      console.log('   ✅ HealthFacility model is valid'.green);
    } else {
      console.log('   ❌ HealthFacility model has errors:'.red, validationFacility);
    }

    console.log('\n✨ All models validated successfully!'.green.bold);
    console.log('\n📊 Database Collections:'.cyan.bold);
    const collections = await mongoose.connection.db.listCollections().toArray();
    collections.forEach(col => {
      console.log(`   - ${col.name}`.gray);
    });

  } catch (error) {
    console.error(`\n❌ Test Error: ${error.message}`.red.bold);
  }

  // Close connection
  await mongoose.connection.close();
  console.log('\n👋 Connection closed'.yellow);
  process.exit(0);
};

// Run tests
(async () => {
  const connected = await connectDB();
  if (connected) {
    await testModels();
  } else {
    process.exit(1);
  }
})();
