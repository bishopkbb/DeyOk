import { useState } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'

function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const symptoms = [
    { name: 'Headache', icon: '🤕', category: 'General' },
    { name: 'Fever', icon: '🌡️', category: 'General' },
    { name: 'Cough', icon: '😷', category: 'Respiratory' },
    { name: 'Fatigue', icon: '😴', category: 'General' },
    { name: 'Sore Throat', icon: '🗣️', category: 'Respiratory' },
    { name: 'Body Aches', icon: '💪', category: 'Musculoskeletal' },
    { name: 'Nausea', icon: '🤢', category: 'Digestive' },
    { name: 'Diarrhea', icon: '🚽', category: 'Digestive' },
    { name: 'Shortness of Breath', icon: '😮‍💨', category: 'Respiratory' },
    { name: 'Chest Pain', icon: '💔', category: 'Cardiovascular' },
    { name: 'Dizziness', icon: '😵', category: 'Neurological' },
    { name: 'Loss of Appetite', icon: '🍽️', category: 'General' },
    { name: 'Runny Nose', icon: '👃', category: 'Respiratory' },
    { name: 'Skin Rash', icon: '🔴', category: 'Dermatological' },
    { name: 'Joint Pain', icon: '🦴', category: 'Musculoskeletal' },
    { name: 'Abdominal Pain', icon: '🤰', category: 'Digestive' }
  ]

  const filteredSymptoms = symptoms.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleSymptom = (symptomName) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomName)
        ? prev.filter(s => s !== symptomName)
        : [...prev, symptomName]
    )
  }

 const checkSymptoms = async () => {
  if (selectedSymptoms.length === 0) {
    toast.warning('Please select at least one symptom')
    return
  }
  setLoading(true)
  try {
    const response = await api.post('/symptoms/check', {
      symptoms: selectedSymptoms
    })
    setResults(response)
    toast.success('Assessment complete!')
  } catch (error) {
    console.error('Symptom check error:', error)
    toast.error('Failed to check symptoms')
  } finally {
    setLoading(false)
  }
}

  const reset = () => {
    setSelectedSymptoms([])
    setResults(null)
    setSearchTerm('')
  }

  if (results) {
    return (
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <button
          onClick={reset}
          style={{
            background: 'white',
            border: '2px solid #E5E7EB',
            padding: '0.75rem 1.5rem',
            borderRadius: '10px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          ← New Check
        </button>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid #E5E7EB',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1F2937', marginBottom: '1rem' }}>
            Assessment Results
          </h2>
          <p style={{ color: '#6B7280', marginBottom: '2rem' }}>Based on your selected symptoms</p>

          <div style={{
            background: '#F3F4F6',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#6B7280', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Your Symptoms
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {results.data.symptoms.map(symptom => (
                <span key={symptom} style={{
                  background: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#1F2937'
                }}>
                  {symptom}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937', marginBottom: '1rem' }}>
              Possible Conditions
            </h3>
            {results.data.possibleConditions.map((condition, index) => (
              <div key={index} style={{
                background: '#EEF2FF',
                borderLeft: '4px solid #667eea',
                padding: '1.25rem',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                <div style={{ fontWeight: '700', fontSize: '1.05rem', color: '#1F2937' }}>
                  {condition}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: '#FEF2F2',
            border: '2px solid #FEE2E2',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '2rem' }}>⚕️</div>
              <div>
                <h3 style={{ fontWeight: '700', color: '#DC2626', marginBottom: '0.5rem' }}>
                  Medical Recommendation
                </h3>
                <p style={{ color: '#991B1B', lineHeight: '1.6' }}>
                  {results.data.recommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1F2937', marginBottom: '0.5rem' }}>
          🔍 Symptom Checker
        </h1>
        <p style={{ color: '#6B7280', fontSize: '1.05rem' }}>
          Select your symptoms for a preliminary health assessment
        </p>
      </div>

      <div style={{
        background: '#FFF7ED',
        border: '2px solid #FDBA74',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
          <div style={{ fontSize: '2rem' }}>⚠️</div>
          <div>
            <h3 style={{ fontWeight: '700', color: '#C2410C', marginBottom: '0.5rem' }}>Important Notice</h3>
            <p style={{ color: '#9A3412', lineHeight: '1.6', margin: 0 }}>
              This tool provides general information only. Always consult a qualified healthcare provider for accurate diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>

      {selectedSymptoms.length > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          padding: '2rem',
          color: 'white',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>
            Selected Symptoms ({selectedSymptoms.length})
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {selectedSymptoms.map(symptom => (
              <div key={symptom} style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontWeight: '600'
              }}>
                <span>{symptom}</span>
                <button
                  onClick={() => toggleSymptom(symptom)}
                  style={{
                    background: 'white',
                    color: '#667eea',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '1rem'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={checkSymptoms}
              disabled={loading}
              style={{
                background: 'white',
                color: '#667eea',
                padding: '1rem 2rem',
                borderRadius: '10px',
                border: 'none',
                fontSize: '1.05rem',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Checking...' : 'Check Symptoms'}
            </button>
            <button
              onClick={reset}
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '10px',
                border: '2px solid rgba(255,255,255,0.3)',
                fontSize: '1.05rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #E5E7EB'
      }}>
        <input
          type="text"
          placeholder="🔍 Search symptoms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '10px',
            border: '2px solid #E5E7EB',
            fontSize: '1rem',
            marginBottom: '2rem'
          }}
        />

        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937', marginBottom: '1.5rem' }}>
          Select Your Symptoms
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1rem'
        }}>
          {filteredSymptoms.map(symptom => {
            const isSelected = selectedSymptoms.includes(symptom.name)
            return (
              <button
                key={symptom.name}
                onClick={() => toggleSymptom(symptom.name)}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                  color: isSelected ? 'white' : '#1F2937',
                  border: isSelected ? 'none' : '2px solid #E5E7EB',
                  padding: '1.5rem 1rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  fontWeight: isSelected ? '700' : '600'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.target.style.borderColor = '#667eea'
                    e.target.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.target.style.borderColor = '#E5E7EB'
                    e.target.style.transform = 'translateY(0)'
                  }
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{symptom.icon}</div>
                <div style={{ fontSize: '0.95rem' }}>{symptom.name}</div>
                <div style={{
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                  opacity: 0.8
                }}>
                  {symptom.category}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SymptomChecker