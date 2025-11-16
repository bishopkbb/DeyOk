import { useState, useEffect } from 'react'
import api from '../services/api'

function HealthFacilities() {
  const [facilities, setFacilities] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedState, setSelectedState] = useState('All')
  const [selectedType, setSelectedType] = useState('Government Hospital')

  const nigerianStates = ['All', 'FCT Abuja', 'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 
    'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 
    'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 
    'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara']

  // Comprehensive list of government health facilities across Nigeria
  const governmentFacilities = [
    // FCT Abuja
    { _id: '1', name: 'National Hospital Abuja', type: 'Government Hospital', state: 'FCT Abuja', 
      address: 'Central Business District, Abuja', phone: '+234 9 461 4284', 
      services: ['Emergency', 'Surgery', 'Oncology', 'Cardiology'], openHours: '24/7' },
    { _id: '2', name: 'University of Abuja Teaching Hospital', type: 'Government Hospital', state: 'FCT Abuja',
      address: 'Gwagwalada, Abuja', phone: '+234 9 882 5678',
      services: ['Emergency', 'Teaching Hospital', 'Research'], openHours: '24/7' },
    { _id: '3', name: 'Federal Medical Centre, Abuja', type: 'Government Hospital', state: 'FCT Abuja',
      address: 'Jabi District, Abuja', phone: '+234 9 234 5678',
      services: ['General Medicine', 'Surgery', 'Pediatrics'], openHours: '24/7' },
    
    // Abia State
    { _id: '4', name: 'Federal Medical Centre, Umuahia', type: 'Government Hospital', state: 'Abia',
      address: 'Aba Road, Umuahia', phone: '+234 706 933 7998',
      services: ['Emergency', 'General Medicine', 'Surgery'], openHours: '24/7' },
    { _id: '5', name: 'Abia State University Teaching Hospital', type: 'Government Hospital', state: 'Abia',
      address: 'Aba, Abia State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital', 'Specialist Care'], openHours: '24/7' },
    
    // Adamawa State
    { _id: '6', name: 'Federal Medical Centre, Yola', type: 'Government Hospital', state: 'Adamawa',
      address: 'Lamido Zubairu Way, Yola', phone: '+234 803 561 8600',
      services: ['Emergency', 'ICU', 'Maternity'], openHours: '24/7' },
    { _id: '7', name: 'Modibo Adama University Teaching Hospital', type: 'Government Hospital', state: 'Adamawa',
      address: 'Yola, Adamawa State', phone: '+234 803 366 8948',
      services: ['Teaching Hospital', 'Research'], openHours: '24/7' },
    
    // Akwa Ibom State
    { _id: '8', name: 'University of Uyo Teaching Hospital', type: 'Government Hospital', state: 'Akwa Ibom',
      address: 'Uyo, Akwa Ibom State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital', 'Emergency', 'Surgery'], openHours: '24/7' },
    
    // Anambra State
    { _id: '9', name: 'Nnamdi Azikiwe University Teaching Hospital', type: 'Government Hospital', state: 'Anambra',
      address: 'Nnewi, Anambra State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital', 'Specialist Care'], openHours: '24/7' },
    
    // Bauchi State
    { _id: '10', name: 'Federal Medical Centre, Azare', type: 'Government Hospital', state: 'Bauchi',
      address: 'Azare, Bauchi State', phone: '+234 809 927 5912',
      services: ['General Medicine', 'Emergency', 'Surgery'], openHours: '24/7' },
    { _id: '11', name: 'Abubakar Tafawa Balewa University Teaching Hospital', type: 'Government Hospital', state: 'Bauchi',
      address: 'Bauchi, Bauchi State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital', 'Research'], openHours: '24/7' },
    
    // Bayelsa State
    { _id: '12', name: 'Federal Medical Centre, Yenagoa', type: 'Government Hospital', state: 'Bayelsa',
      address: 'Hospital Road, Ovom, Yenagoa', phone: '+234 803 000 0000',
      services: ['Emergency', 'General Medicine'], openHours: '24/7' },
    { _id: '13', name: 'Niger Delta University Teaching Hospital', type: 'Government Hospital', state: 'Bayelsa',
      address: 'Okolobiri, Bayelsa State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital'], openHours: '24/7' },
    
    // Benue State
    { _id: '14', name: 'Federal Medical Centre, Makurdi', type: 'Government Hospital', state: 'Benue',
      address: 'Atiku Abubakar Road, Makurdi', phone: '+234 803 000 0000',
      services: ['Emergency', 'Surgery', 'Maternity'], openHours: '24/7' },
    { _id: '15', name: 'Benue State University Teaching Hospital', type: 'Government Hospital', state: 'Benue',
      address: 'Makurdi, Benue State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital'], openHours: '24/7' },
    
    // Borno State
    { _id: '16', name: 'University of Maiduguri Teaching Hospital', type: 'Government Hospital', state: 'Borno',
      address: 'Maiduguri, Borno State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital', 'Emergency', 'Trauma Care'], openHours: '24/7' },
    
    // Cross River State
    { _id: '17', name: 'University of Calabar Teaching Hospital', type: 'Government Hospital', state: 'Cross River',
      address: 'Calabar, Cross River State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital', 'Emergency'], openHours: '24/7' },
    
    // Delta State
    { _id: '18', name: 'Federal Medical Centre, Asaba', type: 'Government Hospital', state: 'Delta',
      address: 'Asaba, Delta State', phone: '+234 803 407 4814',
      services: ['Emergency', 'General Medicine', 'Surgery'], openHours: '24/7' },
    { _id: '19', name: 'Delta State University Teaching Hospital', type: 'Government Hospital', state: 'Delta',
      address: 'Oghara, Delta State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital'], openHours: '24/7' },
    
    // Ebonyi State
    { _id: '20', name: 'Federal Medical Centre, Abakaliki', type: 'Government Hospital', state: 'Ebonyi',
      address: 'FMC Road, Abakaliki', phone: '+234 903 241 9744',
      services: ['Emergency', 'Surgery', 'ICU'], openHours: '24/7' },
    { _id: '21', name: 'Alex Ekwueme Federal Teaching Hospital', type: 'Government Hospital', state: 'Ebonyi',
      address: 'Abakaliki, Ebonyi State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital', 'Specialist Care'], openHours: '24/7' },
    
    // Edo State
    { _id: '22', name: 'University of Benin Teaching Hospital', type: 'Government Hospital', state: 'Edo',
      address: 'Benin City, Edo State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital', 'Emergency', 'Research'], openHours: '24/7' },
    { _id: '23', name: 'Irrua Specialist Teaching Hospital', type: 'Government Hospital', state: 'Edo',
      address: 'Irrua, Edo State', phone: '+234 703 822 1603',
      services: ['Teaching Hospital', 'Lassa Fever Treatment'], openHours: '24/7' },
    
    // Ekiti State
    { _id: '24', name: 'Federal Teaching Hospital, Ido-Ekiti', type: 'Government Hospital', state: 'Ekiti',
      address: 'Ido-Ekiti, Ekiti State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital', 'Emergency'], openHours: '24/7' },
    
    // Enugu State
    { _id: '25', name: 'University of Nigeria Teaching Hospital', type: 'Government Hospital', state: 'Enugu',
      address: 'Enugu, Enugu State', phone: '+234 803 342 4217',
      services: ['Teaching Hospital', 'Emergency', 'Research'], openHours: '24/7' },
    
    // Gombe State
    { _id: '26', name: 'Federal Medical Centre, Gombe', type: 'Government Hospital', state: 'Gombe',
      address: 'Ashaka Road, Gombe', phone: '+234 803 000 0000',
      services: ['Emergency', 'General Medicine'], openHours: '24/7' },
    
    // Imo State
    { _id: '27', name: 'Federal Medical Centre, Owerri', type: 'Government Hospital', state: 'Imo',
      address: 'Orlu Road, Owerri', phone: '+234 803 000 0000',
      services: ['Emergency', 'Surgery', 'Maternity'], openHours: '24/7' },
    { _id: '28', name: 'Imo State University Teaching Hospital', type: 'Government Hospital', state: 'Imo',
      address: 'Orlu, Imo State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital'], openHours: '24/7' },
    
    // Jigawa State
    { _id: '29', name: 'Federal Medical Centre, Birnin Kudu', type: 'Government Hospital', state: 'Jigawa',
      address: 'Kano-Maiduguri Road, Birnin Kudu', phone: '+234 803 630 4601',
      services: ['Emergency', 'General Medicine'], openHours: '24/7' },
    
    // Kaduna State
    { _id: '30', name: 'Ahmadu Bello University Teaching Hospital', type: 'Government Hospital', state: 'Kaduna',
      address: 'Zaria, Kaduna State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital', 'Emergency', 'Research'], openHours: '24/7' },
    { _id: '31', name: 'Barau Dikko Teaching Hospital', type: 'Government Hospital', state: 'Kaduna',
      address: 'Kaduna, Kaduna State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital'], openHours: '24/7' },
    
    // Kano State
    { _id: '32', name: 'Aminu Kano Teaching Hospital', type: 'Government Hospital', state: 'Kano',
      address: 'Kano, Kano State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital', 'Emergency'], openHours: '24/7' },
    { _id: '33', name: 'Murtala Muhammad Specialist Hospital', type: 'Government Hospital', state: 'Kano',
      address: 'Kano, Kano State', phone: '+234 803 000 0000',
      services: ['Specialist Care', 'Emergency'], openHours: '24/7' },
    
    // Katsina State
    { _id: '34', name: 'Federal Medical Centre, Katsina', type: 'Government Hospital', state: 'Katsina',
      address: 'Jibia Bypass, Katsina', phone: '+234 803 000 0000',
      services: ['Emergency', 'General Medicine'], openHours: '24/7' },
    
    // Kebbi State
    { _id: '35', name: 'Federal Medical Centre, Birnin Kebbi', type: 'Government Hospital', state: 'Kebbi',
      address: 'Birnin Kebbi, Kebbi State', phone: '+234 803 000 0000',
      services: ['Emergency', 'Surgery'], openHours: '24/7' },
    { _id: '36', name: 'Federal Teaching Hospital, Birnin Kebbi', type: 'Government Hospital', state: 'Kebbi',
      address: 'Birnin Kebbi, Kebbi State', phone: '+234 803 623 5350',
      services: ['Teaching Hospital'], openHours: '24/7' },
    
    // Kogi State
    { _id: '37', name: 'Federal Medical Centre, Lokoja', type: 'Government Hospital', state: 'Kogi',
      address: 'Salihu Ibrahim Way, Lokoja', phone: '+234 803 000 0000',
      services: ['Emergency', 'General Medicine'], openHours: '24/7' },
    
    // Kwara State
    { _id: '38', name: 'University of Ilorin Teaching Hospital', type: 'Government Hospital', state: 'Kwara',
      address: 'Ilorin, Kwara State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital', 'Emergency', 'Research'], openHours: '24/7' },
    
    // Lagos State
    { _id: '39', name: 'Lagos University Teaching Hospital (LUTH)', type: 'Government Hospital', state: 'Lagos',
      address: 'Idi-Araba, Lagos', phone: '+234 802 311 5885',
      services: ['Teaching Hospital', 'Emergency', 'All Specialties'], openHours: '24/7' },
    { _id: '40', name: 'Federal Medical Centre, Ebute Metta', type: 'Government Hospital', state: 'Lagos',
      address: 'Ebute-Metta, Lagos', phone: '+234 803 000 0000',
      services: ['Emergency', 'General Medicine'], openHours: '24/7' },
    { _id: '41', name: 'Lagos State University Teaching Hospital', type: 'Government Hospital', state: 'Lagos',
      address: 'Ikeja, Lagos', phone: '+234 803 303 7685',
      services: ['Teaching Hospital', 'Emergency'], openHours: '24/7' },
    
    // Nasarawa State
    { _id: '42', name: 'Federal Medical Centre, Keffi', type: 'Government Hospital', state: 'Nasarawa',
      address: 'Keffi, Nasarawa State', phone: '+234 803 000 0000',
      services: ['Emergency', 'General Medicine'], openHours: '24/7' },
    { _id: '43', name: 'Federal University Teaching Hospital, Lafia', type: 'Government Hospital', state: 'Nasarawa',
      address: 'Lafia, Nasarawa State', phone: '+234 803 611 7673',
      services: ['Teaching Hospital'], openHours: '24/7' },
    
    // Niger State
    { _id: '44', name: 'Federal Medical Centre, Bida', type: 'Government Hospital', state: 'Niger',
      address: 'Bida, Niger State', phone: '+234 803 726 4939',
      services: ['Emergency', 'General Medicine'], openHours: '24/7' },
    
    // Ogun State
    { _id: '45', name: 'Federal Medical Centre, Abeokuta', type: 'Government Hospital', state: 'Ogun',
      address: 'Olabisi Onabanjo Way, Abeokuta', phone: '+234 803 060 8704',
      services: ['Emergency', 'Surgery', 'Cardiology'], openHours: '24/7' },
    { _id: '46', name: 'Olabisi Onabanjo University Teaching Hospital', type: 'Government Hospital', state: 'Ogun',
      address: 'Sagamu, Ogun State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital'], openHours: '24/7' },
    
    // Ondo State
    { _id: '47', name: 'Federal Medical Centre, Owo', type: 'Government Hospital', state: 'Ondo',
      address: 'Michael Adekunle Ajasin Road, Owo', phone: '+234 803 000 0000',
      services: ['Emergency', 'General Medicine'], openHours: '24/7' },
    
    // Osun State
    { _id: '48', name: 'Obafemi Awolowo University Teaching Hospital', type: 'Government Hospital', state: 'Osun',
      address: 'Ile-Ife, Osun State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital', 'Emergency', 'Research'], openHours: '24/7' },
    { _id: '49', name: 'Ladoke Akintola University Teaching Hospital', type: 'Government Hospital', state: 'Osun',
      address: 'Osogbo, Osun State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital'], openHours: '24/7' },
    
    // Oyo State
    { _id: '50', name: 'University College Hospital, Ibadan', type: 'Government Hospital', state: 'Oyo',
      address: 'Ibadan, Oyo State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital', 'Emergency', 'All Specialties'], openHours: '24/7' },
    
    // Plateau State
    { _id: '51', name: 'Jos University Teaching Hospital', type: 'Government Hospital', state: 'Plateau',
      address: 'Jos, Plateau State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital', 'Emergency'], openHours: '24/7' },
    
    // Rivers State
    { _id: '52', name: 'University of Port Harcourt Teaching Hospital', type: 'Government Hospital', state: 'Rivers',
      address: 'Port Harcourt, Rivers State', phone: '+234 803 313 0512',
      services: ['Teaching Hospital', 'Emergency', 'Research'], openHours: '24/7' },
    { _id: '53', name: 'Braithwaite Memorial Specialist Hospital', type: 'Government Hospital', state: 'Rivers',
      address: 'Port Harcourt, Rivers State', phone: '+234 803 000 0000',
      services: ['Specialist Care', 'Emergency'], openHours: '24/7' },
    
    // Sokoto State
    { _id: '54', name: 'Usman Danfodio University Teaching Hospital', type: 'Government Hospital', state: 'Sokoto',
      address: 'Sokoto, Sokoto State', phone: '+234 803 000 0000',
      services: ['Teaching Hospital', 'Emergency'], openHours: '24/7' },
    
    // Taraba State
    { _id: '55', name: 'Federal Medical Centre, Jalingo', type: 'Government Hospital', state: 'Taraba',
      address: 'Jalingo, Taraba State', phone: '+234 803 000 0000',
      services: ['Emergency', 'General Medicine'], openHours: '24/7' },
    
    // Yobe State
    { _id: '56', name: 'Federal Medical Centre, Nguru', type: 'Government Hospital', state: 'Yobe',
      address: 'Gashua Road, Nguru', phone: '+234 803 000 0000',
      services: ['Emergency', 'General Medicine'], openHours: '24/7' },
    
    // Zamfara State
    { _id: '57', name: 'Federal Medical Centre, Gusau', type: 'Government Hospital', state: 'Zamfara',
      address: 'Sani Abacha Way, Gusau', phone: '+234 803 000 0000',
      services: ['Emergency', 'General Medicine'], openHours: '24/7' }
  ]

  useEffect(() => {
    fetchFacilities()
  }, [])

  const fetchFacilities = async () => {
    try {
      setLoading(true)
      // Try to fetch from API, fallback to government facilities
      const response = await api.get('/facilities')
      setFacilities(response.data || governmentFacilities)
    } catch (error) {
      // Use government facilities data
      setFacilities(governmentFacilities)
    } finally {
      setLoading(false)
    }
  }

  const filteredFacilities = selectedType === 'Government Hospital' 
    ? facilities.filter(facility => {
        const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              facility.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              facility.state.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesState = selectedState === 'All' || facility.state === selectedState
        return matchesSearch && matchesState
      })
    : []

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <div style={{ color: '#6B7280' }}>Loading facilities...</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1F2937', marginBottom: '0.5rem' }}>
          🏥 Health Facilities in Nigeria
        </h1>
        <p style={{ color: '#6B7280', fontSize: '1.05rem' }}>
          Find government hospitals across all 36 states and FCT
        </p>
      </div>

      {/* Type Tabs */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #E5E7EB'
      }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {['Government Hospital', 'Private Hospital', 'Clinic', 'Pharmacy'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              style={{
                flex: '1',
                minWidth: '200px',
                background: selectedType === type 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'white',
                color: selectedType === type ? 'white' : '#6B7280',
                border: selectedType === type ? 'none' : '2px solid #E5E7EB',
                padding: '1rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {type === 'Government Hospital' ? '🏥' : type === 'Private Hospital' ? '🏨' : type === 'Clinic' ? '⚕️' : '💊'} {type}
            </button>
          ))}
        </div>
      </div>

      {/* Coming Soon Sections */}
      {selectedType !== 'Government Hospital' && (
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          textAlign: 'center',
          color: 'white',
          marginBottom: '2rem'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>
            {selectedType}s Coming Soon!
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.95 }}>
            {selectedType === 'Private Hospital' 
              ? 'We are compiling a comprehensive database of private hospitals across Nigeria.'
              : `We are working on adding ${selectedType.toLowerCase()}s to our platform.`}
          </p>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '600px',
            margin: '0 auto',
            color: '#1F2937'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              Want to be included? Contact us!
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>📧</span>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: '600' }}>EMAIL</div>
                  <a href="mailto:ajibade_tosin@yahoo.com" style={{ 
                    color: '#667eea', 
                    textDecoration: 'none', 
                    fontWeight: '700',
                    fontSize: '1.1rem'
                  }}>
                    ajibade_tosin@yahoo.com
                  </a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>📱</span>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: '600' }}>WHATSAPP</div>
                  <a href="https://wa.me/2348168967327" target="_blank" rel="noopener noreferrer" style={{ 
                    color: '#667eea', 
                    textDecoration: 'none', 
                    fontWeight: '700',
                    fontSize: '1.1rem'
                  }}>
                    +234 816 896 7327
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Government Hospitals Section */}
      {selectedType === 'Government Hospital' && (
        <>
          {/* Search and Filter */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <input
                type="text"
                placeholder="🔍 Search by hospital name, location, or state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '2px solid #E5E7EB',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: '#6B7280' }}>
                FILTER BY STATE
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
                {nigerianStates.map(state => (
                  <button
                    key={state}
                    onClick={() => setSelectedState(state)}
                    style={{
                      background: selectedState === state 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'white',
                      color: selectedState === state ? 'white' : '#6B7280',
                      border: selectedState === state ? 'none' : '2px solid #E5E7EB',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              padding: '1.5rem',
              color: 'white'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏥</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>{facilities.length}</div>
              <div style={{ opacity: 0.9, fontSize: '0.9rem' }}>Government Hospitals</div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #E5E7EB'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📍</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem', color: '#1F2937' }}>
                {filteredFacilities.length}
              </div>
              <div style={{ color: '#6B7280', fontSize: '0.9rem' }}>Search Results</div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #E5E7EB'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🗺️</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem', color: '#1F2937' }}>37</div>
              <div style={{ color: '#6B7280', fontSize: '0.9rem' }}>States Covered</div>
            </div>
          </div>

          {/* Facilities Grid */}
          {filteredFacilities.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredFacilities.map((facility) => (
                <div
                  key={facility._id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '2rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    border: '1px solid #E5E7EB',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
                  }}
                >
                  {/* Header */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: '#10B98120',
                      color: '#10B981',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.25rem' }}>🏥</span>
                      <span>Government Hospital</span>
                    </div>
                    <div style={{
                      background: '#EEF2FF',
                      color: '#667eea',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      display: 'inline-block'
                    }}>
                      📍 {facility.state}
                    </div>
                  </div>

                  {/* Name */}
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1F2937', marginBottom: '1rem' }}>
                    {facility.name}
                  </h3>

                  {/* Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>🗺️</span>
                      <span style={{ color: '#6B7280', fontSize: '0.95rem' }}>{facility.address}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>📞</span>
                      <a href={'tel:' + facility.phone} style={{ color: '#667eea', fontSize: '0.95rem', textDecoration: 'none', fontWeight: '600' }}>
                        {facility.phone}
                      </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>🕐</span>
                      <span style={{ color: '#6B7280', fontSize: '0.95rem' }}>{facility.openHours}</span>
                    </div>
                  </div>

                  {/* Services */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: '700', color: '#6B7280', marginBottom: '0.75rem' }}>
                      SERVICES
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {facility.services.slice(0, 3).map((service, index) => (
                        <span
                          key={index}
                          style={{
                            background: '#F3F4F6',
                            color: '#4B5563',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}
                        >
                          {service}
                        </span>
                      ))}
                      {facility.services.length > 3 && (
                        <span style={{
                          background: '#F3F4F6',
                          color: '#6B7280',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          +{facility.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <a
                      href={'tel:' + facility.phone}
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        fontWeight: '700',
                        fontSize: '0.95rem'
                      }}
                    >
                      📞 Call
                    </a>
                    <a
                      href={'https://maps.google.com/?q=' + encodeURIComponent(facility.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        background: 'white',
                        color: '#667eea',
                        border: '2px solid #667eea',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        fontWeight: '700',
                        fontSize: '0.95rem'
                      }}
                    >
                      🗺️ Directions
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '4rem 2rem',
              textAlign: 'center',
              border: '1px solid #E5E7EB'
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                No Facilities Found
              </h3>
              <p style={{ color: '#6B7280', marginBottom: '2rem' }}>
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedState('All')
                }}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '10px',
                  border: 'none',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default HealthFacilities