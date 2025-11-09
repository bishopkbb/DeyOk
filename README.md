# 🏥 DeyOk Health App

**A Mobile Health Companion for Everyday Nigerians**

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green.svg)](https://www.mongodb.com/mern-stack)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-In%20Development-yellow.svg)]()

## 📖 About

DeyOk (meaning "Are you okay?" in Nigerian Pidgin) is a multilingual health companion app designed to democratize healthcare information across Nigeria. Built with the MERN stack, it provides essential health services in 5 Nigerian languages.

### 🌟 Key Features

- 🌍 **Multilingual Support**: English, Pidgin, Yoruba, Igbo, Hausa
- 🔍 **Symptom Checker**: AI-powered preliminary health assessments
- ⏰ **Health Reminders**: Custom medication and wellness reminders
- 🚑 **First Aid Guide**: Emergency instructions with audio support
- 🏥 **Facility Finder**: GPS-based hospital and clinic locator
- 💡 **Daily Health Tips**: Culturally relevant wellness information
- 📱 **Mobile-First Design**: Optimized for all Nigerian devices

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js v20+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Bcrypt, Helmet, CORS
- **Real-time**: Socket.io (planned)

### Frontend
- **Library**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: Context API
- **Notifications**: React Toastify

### DevOps
- **Version Control**: Git & GitHub
- **Testing**: Jest, Supertest (configured)
- **API Testing**: Postman (planned)
- **Deployment**: Render/Railway (Backend), Netlify/Vercel (Frontend)

## 📊 Database Schema

### Collections

1. **Users** - Authentication, profiles, health information
2. **Reminders** - Health reminder system with completion tracking
3. **HealthTips** - Daily wellness tips in multiple languages
4. **Symptoms** - Comprehensive symptom database
5. **SymptomChecks** - User symptom history and assessments
6. **FirstAidContents** - Emergency first aid instructions
7. **HealthFacilities** - Hospital/clinic database with geospatial indexing

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/deyok-health-app.git
cd deyok-health-app
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
npm start
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend: http://localhost:5001
- API Health Check: http://localhost:5001/health

## 📁 Project Structure

```
deyok-health-app/
├── backend/
│   ├── config/              # Configuration files
│   │   ├── db.js           # MongoDB connection
│   │   └── auth.js         # JWT configuration
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   ├── Reminder.js
│   │   ├── HealthTip.js
│   │   ├── Symptom.js
│   │   ├── SymptomCheck.js
│   │   ├── FirstAidContent.js
│   │   └── HealthFacility.js
│   ├── controllers/        # Business logic (TODO)
│   ├── routes/            # API routes (TODO)
│   ├── middleware/        # Custom middleware (TODO)
│   ├── utils/             # Helper functions
│   ├── tests/             # Test suites
│   ├── server.js          # Entry point
│   └── .env.example       # Environment template
├── frontend/
│   ├── public/            # Static files
│   └── src/
│       ├── components/    # React components
│       ├── pages/         # Page components
│       ├── context/       # Context providers
│       ├── services/      # API services
│       ├── hooks/         # Custom hooks
│       └── utils/         # Utilities
└── README.md
```

## 🔐 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5001
MONGO_URI=mongodb://localhost:27017/deyok-health-app
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5001/api
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Run with coverage
npm run test:coverage

# Frontend tests
cd frontend
npm test
```

## 📝 Development Progress

- [x] Project setup and structure
- [x] MongoDB database design
- [x] User authentication schema
- [x] All database models created
- [x] Frontend scaffolding with React
- [x] Tailwind CSS integration
- [ ] Controllers implementation
- [ ] API routes
- [ ] Authentication middleware
- [ ] Frontend components
- [ ] Symptom checker logic
- [ ] First aid content
- [ ] Health facility finder
- [ ] Testing suite
- [ ] Deployment

## 🎯 Roadmap

### Phase 1 (Current) - MVP
- ✅ Database schema design
- 🔄 API development
- 🔄 Basic frontend UI
- 🔄 User authentication
- 🔄 Core features implementation

### Phase 2 - Enhancement
- Real-time notifications
- Advanced symptom checker with ML
- Audio content for first aid
- Offline PWA capabilities
- Comprehensive testing

### Phase 3 - Launch
- Telemedicine integration
- Payment system
- Admin dashboard
- Performance optimization
- Production deployment

## 🤝 Contributing

This is a capstone project for a MERN Stack course. Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Built as a MERN Stack Capstone Project
- Inspired by the need for accessible healthcare in Nigeria
- Thanks to all contributors and supporters

## 📞 Contact & Support

For questions or support, please reach out:
- Create an issue in this repository
- Email: support@deyok.com (placeholder)

---

**Made with ❤️ for Nigerians, by Nigerians**

*Empowering everyday Nigerians with accessible health information*
