# 🏥 DeyOk Health App

**A Mobile Health Companion for Everyday Nigerians**

![DeyOk Logo](./frontend/src/assets/images/logo.png)

## 📖 About

DeyOk (meaning "Are you okay?" in Nigerian Pidgin) is a multilingual health companion app designed to democratize healthcare information across Nigeria. Built with the MERN stack, it provides essential health services including symptom checking, health reminders, first aid guidance, and facility finding.

## ✨ Features

- 🌍 **Multilingual Support**: English, Pidgin, Yoruba, Igbo, Hausa
- 🔍 **Symptom Checker**: AI-powered preliminary health assessments
- ⏰ **Health Reminders**: Custom medication and wellness reminders
- 🚑 **First Aid Guide**: Emergency instructions with audio support
- 🏥 **Facility Finder**: GPS-based hospital and clinic locator
- 💡 **Daily Health Tips**: Culturally relevant wellness information
- 📱 **Mobile-First Design**: Optimized for all Nigerian devices

## 🛠️ Tech Stack

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Socket.io (for real-time features)

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios
- Context API

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/deyok-health-app.git
cd deyok-health-app
```

2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. Setup Frontend
```bash
cd frontend
npm install
npm start
```

4. Access the application
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📁 Project Structure

```
deyok-health-app/
├── backend/
│   ├── config/          # Configuration files
│   ├── models/          # Mongoose schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Helper functions
│   ├── tests/           # Test suites
│   └── server.js        # Entry point
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # React components
│       ├── pages/       # Page components
│       ├── context/     # Context providers
│       ├── services/    # API services
│       ├── hooks/       # Custom hooks
│       └── utils/       # Utilities
└── README.md
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📦 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend (Netlify/Vercel)
1. Build the app: `npm run build`
2. Deploy the build folder
3. Configure environment variables

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Your Name** - Full Stack Developer

## 🙏 Acknowledgments

- Built as a MERN Stack Capstone Project
- Inspired by the need for accessible healthcare in Nigeria
- Thanks to all contributors and supporters

---

**Made with ❤️ for Nigerians**
