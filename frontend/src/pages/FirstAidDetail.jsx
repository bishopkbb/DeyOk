import { useParams, useNavigate } from 'react-router-dom'

function FirstAidDetail() {
  const { type } = useParams()
  const navigate = useNavigate()

  const guides = {
    burns: {
      title: 'Burns', icon: '🔥', color: '#EF4444',
      steps: [
        'Remove the person from the heat source immediately',
        'Cool the burn with cool (not cold) running water for 10-20 minutes',
        'Remove any clothing or jewelry near the burn (unless stuck to skin)',
        'Cover the burn with a sterile, non-stick bandage or clean cloth',
        'Take over-the-counter pain relievers if needed',
        'Do not apply ice, butter, or ointments to the burn'
      ],
      dos: ['Cool the burn immediately', 'Keep clean and covered', 'Take pain medication', 'Seek medical attention for large burns'],
      donts: ["Don't apply ice directly", "Don't use butter or oils", "Don't break blisters", "Don't remove stuck clothing"],
      when: ['Burns larger than 3 inches', 'Burns on face, hands, feet, or genitals', 'Third-degree burns', 'Signs of infection']
    },
    cuts: {
      title: 'Cuts & Wounds', icon: '🩹', color: '#10B981',
      steps: [
        'Wash your hands thoroughly before treating',
        'Stop bleeding with gentle pressure using clean cloth',
        'Clean the wound with clean water or saline',
        'Apply antibiotic ointment if available',
        'Cover with sterile bandage',
        'Change dressing daily and watch for infection'
      ],
      dos: ['Apply direct pressure', 'Clean thoroughly', 'Keep wound moist', 'Watch for infection'],
      donts: ["Don't use hydrogen peroxide", "Don't remove embedded objects", "Don't blow on wound", "Don't ignore infection signs"],
      when: ['Deep cuts that won\'t stop bleeding', 'Cuts longer than 1/2 inch', 'Cuts from dirty/rusty objects', 'Signs of infection']
    },
    choking: {
      title: 'Choking', icon: '😮', color: '#8B5CF6',
      steps: [
        'Ask "Are you choking?" - if they can\'t speak, act immediately',
        'Stand behind the person and wrap arms around waist',
        'Make a fist with one hand, place above navel',
        'Grasp fist with other hand and give quick upward thrusts',
        'Repeat until object is dislodged or person becomes unconscious',
        'If unconscious, begin CPR and call emergency services'
      ],
      dos: ['Encourage coughing if possible', 'Perform Heimlich maneuver', 'Call emergency services', 'Stay with person'],
      donts: ["Don't slap back if coughing effectively", "Don't try to remove object blindly", "Don't give water", "Don't leave person alone"],
      when: ['Person cannot breathe, cough, or speak', 'Skin turns blue or gray', 'Person becomes unconscious', 'Object cannot be removed']
    },
    fainting: {
      title: 'Fainting', icon: '😵', color: '#3B82F6',
      steps: [
        'Help the person lie down flat on their back',
        'Elevate their legs about 12 inches above heart level',
        'Loosen any tight clothing around neck and waist',
        'Check for breathing and pulse',
        'If breathing, turn them on their side',
        'Stay with them until they fully recover'
      ],
      dos: ['Lay person flat immediately', 'Elevate legs', 'Give space and fresh air', 'Keep lying down after recovery'],
      donts: ["Don't give food/water immediately", "Don't slap face", "Don't make them sit up quickly", "Don't crowd around"],
      when: ['No consciousness within 1 minute', 'Fainting with chest pain', 'Person has seizures', 'Person hits head during fall']
    },
    cpr: {
      title: 'CPR', icon: '❤️', color: '#DC2626',
      steps: [
        'Check if person is responsive and breathing',
        'Call emergency services (112 or 199) immediately',
        'Place person on firm, flat surface',
        'Position hands center of chest, one on top of other',
        'Push hard and fast - 100-120 compressions per minute',
        'Push down at least 2 inches, allow chest to recoil fully',
        'Continue until help arrives or person starts breathing'
      ],
      dos: ['Call for help immediately', 'Start compressions right away', 'Push hard and fast', 'Continue until help arrives'],
      donts: ["Don't stop compressions unnecessarily", "Don't be afraid to push hard", "Don't tilt head if spinal injury", "Don't give up"],
      when: ['Person is unresponsive and not breathing', 'No pulse detected', 'Cardiac arrest suspected']
    },
    'snake-bite': {
      title: 'Snake Bite', icon: '🐍', color: '#059669',
      steps: [
        'Move away from snake to avoid another bite',
        'Keep person calm and still',
        'Remove jewelry and tight clothing before swelling',
        'Position bite below heart level if possible',
        'Clean wound gently with soap and water',
        'Cover with clean, dry dressing',
        'Get to hospital immediately - antivenom may be needed'
      ],
      dos: ['Keep person calm', 'Note snake appearance if safe', 'Clean wound gently', 'Get medical help immediately'],
      donts: ["Don't try to catch/kill snake", "Don't apply tourniquet", "Don't cut wound or suck venom", "Don't apply ice"],
      when: ['All snake bites should be treated as emergencies', 'Even if snake appears non-venomous', 'Especially if swelling/pain occurs']
    }
  }

  const guide = guides[type]

  if (!guide) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❓</div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Guide Not Found</h2>
        <button onClick={() => navigate('/first-aid')} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '1rem 2rem', borderRadius: '10px', border: 'none', fontWeight: '700', cursor: 'pointer' }}>
          Back to First Aid
        </button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <button onClick={() => navigate('/first-aid')} style={{ background: 'white', border: '2px solid #E5E7EB', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        ← Back to First Aid
      </button>

      <div style={{ background: guide.color, borderRadius: '16px', padding: '3rem 2rem', marginBottom: '2rem', textAlign: 'center', color: 'white', boxShadow: `0 4px 12px ${guide.color}50` }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{guide.icon}</div>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: 0 }}>{guide.title}</h1>
      </div>

      <a href="tel:112" style={{ display: 'block', background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)', color: 'white', padding: '1.5rem', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', fontSize: '1.5rem', fontWeight: '900', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)' }}>
        🚨 CALL EMERGENCY: 112
      </a>

      <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #E5E7EB' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '1.5rem' }}>📋 Step-by-Step Instructions</h2>
        {guide.steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'start' }}>
            <div style={{ background: guide.color, color: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.125rem', flexShrink: 0 }}>
              {i + 1}
            </div>
            <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: '1.6', color: '#1F2937' }}>{step}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: '#ECFDF5', border: '2px solid #10B981', borderRadius: '16px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#065F46', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>✅</span> DO
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8', color: '#047857' }}>
            {guide.dos.map((item, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>)}
          </ul>
        </div>
        <div style={{ background: '#FEF2F2', border: '2px solid #EF4444', borderRadius: '16px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#991B1B', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>❌</span> DON'T
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8', color: '#B91C1C' }}>
            {guide.donts.map((item, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>)}
          </ul>
        </div>
      </div>

      <div style={{ background: '#FFF7ED', border: '2px solid #F97316', borderRadius: '16px', padding: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#9A3412', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>⚠️</span> When to Seek Immediate Medical Help
        </h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8', fontSize: '1.05rem', color: '#7C2D12' }}>
          {guide.when.map((item, i) => <li key={i} style={{ marginBottom: '0.5rem', fontWeight: '600' }}>{item}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default FirstAidDetail