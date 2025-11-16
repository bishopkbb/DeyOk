import { useNavigate } from 'react-router-dom'

function FirstAid() {
  const navigate = useNavigate()

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1F2937', marginBottom: '0.5rem' }}>
          🚑 First Aid Guide
        </h1>
        <p style={{ color: '#6B7280', fontSize: '1.05rem' }}>
          Quick access to emergency first aid instructions
        </p>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2.5rem',
        color: 'white',
        boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '3rem' }}>🚨</div>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: 0 }}>Emergency Numbers</h2>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>Call immediately in life-threatening situations</p>
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem'
        }}>
          <a href="tel:112" style={{ background: 'rgba(255,255,255,0.2)', padding: '1.5rem 1rem', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', color: 'white' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📞</div>
            <div style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.25rem' }}>112</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Emergency</div>
          </a>
          <a href="tel:199" style={{ background: 'rgba(255,255,255,0.2)', padding: '1.5rem 1rem', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', color: 'white' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚑</div>
            <div style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.25rem' }}>199</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Ambulance</div>
          </a>
          <a href="tel:190" style={{ background: 'rgba(255,255,255,0.2)', padding: '1.5rem 1rem', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', color: 'white' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔥</div>
            <div style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.25rem' }}>190</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Fire Service</div>
          </a>
        </div>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #E5E7EB',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
          Choose a Category
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          <button onClick={() => navigate('/first-aid/burns')} style={{ background: '#EF4444', color: 'white', padding: '2rem 1.5rem', borderRadius: '16px', border: 'none', cursor: 'pointer', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(255,255,255,0.3)', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700' }}>EMERGENCY</div>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔥</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>Burns</div>
          </button>
          
          <button onClick={() => navigate('/first-aid/cuts')} style={{ background: '#10B981', color: 'white', padding: '2rem 1.5rem', borderRadius: '16px', border: 'none', cursor: 'pointer', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🩹</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>Cuts & Wounds</div>
          </button>
          
          <button onClick={() => navigate('/first-aid/choking')} style={{ background: '#8B5CF6', color: 'white', padding: '2rem 1.5rem', borderRadius: '16px', border: 'none', cursor: 'pointer', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(255,255,255,0.3)', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700' }}>EMERGENCY</div>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😮</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>Choking</div>
          </button>
          
          <button onClick={() => navigate('/first-aid/fainting')} style={{ background: '#3B82F6', color: 'white', padding: '2rem 1.5rem', borderRadius: '16px', border: 'none', cursor: 'pointer', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😵</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>Fainting</div>
          </button>
          
          <button onClick={() => navigate('/first-aid/cpr')} style={{ background: '#DC2626', color: 'white', padding: '2rem 1.5rem', borderRadius: '16px', border: 'none', cursor: 'pointer', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(255,255,255,0.3)', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700' }}>EMERGENCY</div>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❤️</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>CPR</div>
          </button>
          
          <button onClick={() => navigate('/first-aid/snake-bite')} style={{ background: '#059669', color: 'white', padding: '2rem 1.5rem', borderRadius: '16px', border: 'none', cursor: 'pointer', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(255,255,255,0.3)', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700' }}>EMERGENCY</div>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🐍</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>Snake Bite</div>
          </button>
        </div>
      </div>

      <div style={{
        background: '#FEF3C7',
        border: '2px solid #FDE68A',
        borderRadius: '16px',
        padding: '2rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
          <div style={{ fontSize: '2.5rem' }}>💡</div>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#92400E', marginBottom: '1rem' }}>
              General First Aid Tips
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8', color: '#78350F' }}>
              <li><strong>Stay Calm:</strong> Keep composed to think clearly</li>
              <li><strong>Assess Situation:</strong> Check for dangers first</li>
              <li><strong>Call for Help:</strong> Contact emergency services</li>
              <li><strong>Avoid Moving:</strong> Unless immediate danger</li>
              <li><strong>Keep Warm:</strong> Use blankets to prevent shock</li>
              <li><strong>Document:</strong> Note what happened for medics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FirstAid