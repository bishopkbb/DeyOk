import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-accent-light to-accent">
        {/* Test Header */}
        <header className="bg-white shadow-md">
          <div className="container-custom py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  D
                </div>
                <h1 className="text-2xl font-heading text-primary">
                  DeyOk Health App
                </h1>
              </div>
              <button className="btn-primary">
                Get Started
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container-custom py-12">
          <div className="text-center animate-fade-in">
            <h2 className="text-5xl font-heading text-primary mb-4">
              🏥 Your Mobile Health Companion
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Stay healthy, stay informed - for everyday Nigerians
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {/* Card 1 */}
              <div className="card animate-slide-in">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-heading text-secondary mb-2">
                  Symptom Checker
                </h3>
                <p className="text-gray-600">
                  Get preliminary health assessments in your language
                </p>
                <button className="btn-outline mt-4 w-full">
                  Check Symptoms
                </button>
              </div>

              {/* Card 2 */}
              <div className="card animate-slide-in">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-heading text-secondary mb-2">
                  Health Reminders
                </h3>
                <p className="text-gray-600">
                  Never miss your medication or health routine
                </p>
                <button className="btn-outline mt-4 w-full">
                  Set Reminder
                </button>
              </div>

              {/* Card 3 */}
              <div className="card animate-slide-in">
                <div className="text-4xl mb-4">🚑</div>
                <h3 className="text-xl font-heading text-secondary mb-2">
                  First Aid Guide
                </h3>
                <p className="text-gray-600">
                  Quick emergency instructions in 5 languages
                </p>
                <button className="btn-outline mt-4 w-full">
                  Learn More
                </button>
              </div>
            </div>

            {/* Test different button styles */}
            <div className="mt-12 space-y-4">
              <h3 className="text-2xl font-heading text-secondary mb-4">
                Button Styles Test
              </h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="btn-primary">Primary Button</button>
                <button className="btn-secondary">Secondary Button</button>
                <button className="btn-outline">Outline Button</button>
                <button className="btn-success">Success Button</button>
                <button className="btn-danger">Danger Button</button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-secondary text-white py-8 mt-12">
          <div className="container-custom text-center">
            <p className="text-lg">
              Made with ❤️ for Nigerians
            </p>
            <p className="text-sm mt-2 text-accent">
              DeyOk Health App - MERN Stack Capstone Project
            </p>
          </div>
        </footer>

        {/* Toast notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;
