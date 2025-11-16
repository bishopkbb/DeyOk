import { useState, useEffect } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'

function HealthTips() {
  const [tips, setTips] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Nutrition', 'Hygiene', 'Prevention', 'Mental Health', 'Exercise', 'General']

  useEffect(() => {
    fetchTips()
  }, [])

  const fetchTips = async () => {
    try {
      setLoading(true)
      const response = await api.get('/tips')
      setTips(response.data || [])
    } catch (error) {
      toast.error('Failed to fetch tips')
    } finally {
      setLoading(false)
    }
  }

  const filteredTips = selectedCategory === 'All' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory)

  const getCategoryColor = (category) => {
    const colors = {
      'Nutrition': '#10B981',
      'Hygiene': '#3B82F6',
      'Prevention': '#8B5CF6',
      'Mental Health': '#F59E0B',
      'Exercise': '#EF4444',
      'General': '#6B7280'
    }
    return colors[category] || '#6B7280'
  }

  const getCategoryIcon = (category) => {
    const icons = {
      'Nutrition': '🥗',
      'Hygiene': '🧼',
      'Prevention': '🛡️',
      'Mental Health': '🧠',
      'Exercise': '🏃',
      'General': '💡'
    }
    return icons[category] || '💡'
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <div style={{ color: '#6B7280' }}>Loading health tips...</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1F2937', marginBottom: '0.5rem' }}>
          💡 Health Tips
        </h1>
        <p style={{ color: '#6B7280', fontSize: '1.05rem' }}>
          Browse our collection of helpful health tips
        </p>
      </div>

      {/* Category Filter */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #E5E7EB'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem' }}>
          Filter by Category
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                background: selectedCategory === category 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'white',
                color: selectedCategory === category ? 'white' : '#6B7280',
                border: selectedCategory === category ? 'none' : '2px solid #E5E7EB',
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {category}
            </button>
          ))}
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
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📚</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>{tips.length}</div>
          <div style={{ opacity: 0.9, fontSize: '0.9rem' }}>Total Tips</div>
        </div>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✨</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem', color: '#1F2937' }}>
            {filteredTips.length}
          </div>
          <div style={{ color: '#6B7280', fontSize: '0.9rem' }}>Filtered Tips</div>
        </div>
      </div>

      {/* Tips Grid */}
      {filteredTips.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredTips.map((tip, index) => (
            <div
              key={tip._id || index}
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
              {/* Category Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: getCategoryColor(tip.category) + '20',
                color: getCategoryColor(tip.category),
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '700',
                marginBottom: '1.5rem'
              }}>
                <span style={{ fontSize: '1.25rem' }}>{getCategoryIcon(tip.category)}</span>
                <span>{tip.category}</span>
              </div>

              {/* Content */}
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: '#1F2937',
                margin: 0
              }}>
                {tip.content}
              </p>

              {/* Date */}
              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid #E5E7EB',
                fontSize: '0.85rem',
                color: '#9CA3AF'
              }}>
                Added {new Date(tip.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
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
            No Tips Found
          </h3>
          <p style={{ color: '#6B7280', marginBottom: '2rem' }}>
            Try selecting a different category
          </p>
          <button
            onClick={() => setSelectedCategory('All')}
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
            Show All Tips
          </button>
        </div>
      )}
    </div>
  )
}

export default HealthTips