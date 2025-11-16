import { useState, useEffect } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'

function Reminders() {
  const [reminders, setReminders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    activity: 'Drink Water',
    frequency: 'Every 3 hours',
    time: '08:00',
    notes: ''
  })

  const activities = [
    { value: 'Drink Water', icon: '💧' },
    { value: 'Take Medication', icon: '💊' },
    { value: 'Exercise', icon: '🏃' },
    { value: 'Check Blood Pressure', icon: '🩺' },
    { value: 'Take Vitamins', icon: '💊' },
    { value: 'Walk', icon: '🚶' },
    { value: 'Eat Meal', icon: '🍽️' },
    { value: 'Sleep', icon: '😴' }
  ]

  const frequencies = [
    'Every hour', 'Every 2 hours', 'Every 3 hours', 'Every 4 hours',
    'Every 6 hours', 'Every 8 hours', 'Daily', 'Twice daily', 'Weekly'
  ]

  useEffect(() => {
    fetchReminders()
  }, [])

  const fetchReminders = async () => {
    try {
      const response = await api.get('/reminders')
      setReminders(response.data || [])
    } catch (error) {
      toast.error('Failed to fetch reminders')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const reminderData = {
      activity: formData.activity,
      frequency: formData.frequency,
      time: formData.time,
      notes: formData.notes || '',
      active: true
    }
    console.log('Sending reminder data:', reminderData)
    
    const response = await api.post('/reminders', reminderData)
    setReminders([response, ...reminders])
    toast.success('Reminder created!')
    setShowForm(false)
    setFormData({ activity: 'Drink Water', frequency: 'Every 3 hours', time: '08:00', notes: '' })
  } catch (error) {
    console.error('Create reminder error:', error.response?.data || error)
    toast.error(error.response?.data?.message || 'Failed to create reminder')
  }
}

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this reminder?')) return
    try {
      await api.delete('/reminders/' + id)
      setReminders(reminders.filter(r => r._id !== id))
      toast.success('Reminder deleted!')
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  const toggleActive = async (id, currentStatus) => {
    try {
      const response = await api.put('/reminders/' + id, { active: !currentStatus })
      setReminders(reminders.map(r => r._id === id ? response.data : r))
      toast.success(currentStatus ? 'Reminder paused' : 'Reminder activated')
    } catch (error) {
      toast.error('Failed to update')
    }
  }

  const getActivityIcon = (activity) => {
    const found = activities.find(a => a.value === activity)
    return found ? found.icon : '⏰'
  }

  const activeReminders = reminders.filter(r => r.active)
  const pausedReminders = reminders.filter(r => !r.active)

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <div style={{ fontSize: '3rem' }}>⏳</div>
    </div>
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1F2937', marginBottom: '0.5rem' }}>
            ⏰ Health Reminders
          </h1>
          <p style={{ color: '#6B7280', fontSize: '1.05rem' }}>Manage your daily health activities</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: showForm ? '#FEE2E2' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: showForm ? '#DC2626' : 'white',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          {showForm ? '✕ Cancel' : '+ New Reminder'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#1F2937' }}>{reminders.length}</div>
          <div style={{ color: '#6B7280', fontSize: '0.9rem' }}>Total</div>
        </div>
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#10B981' }}>{activeReminders.length}</div>
          <div style={{ color: '#6B7280', fontSize: '0.9rem' }}>Active</div>
        </div>
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⏸️</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#F59E0B' }}>{pausedReminders.length}</div>
          <div style={{ color: '#6B7280', fontSize: '0.9rem' }}>Paused</div>
        </div>
      </div>

      {showForm && (
        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Create New Reminder</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Activity</label>
                <select value={formData.activity} onChange={(e) => setFormData({...formData, activity: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '2px solid #E5E7EB', fontSize: '1rem', fontWeight: '600' }} required>
                  {activities.map(a => <option key={a.value} value={a.value}>{a.icon} {a.value}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Frequency</label>
                  <select value={formData.frequency} onChange={(e) => setFormData({...formData, frequency: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '2px solid #E5E7EB', fontSize: '1rem' }} required>
                    {frequencies.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Start Time</label>
                  <input type="time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '2px solid #E5E7EB', fontSize: '1rem' }} required />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Notes (Optional)</label>
                <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} placeholder="Add notes..." rows="3" style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '2px solid #E5E7EB', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '1rem', borderRadius: '10px', border: 'none', fontSize: '1.05rem', fontWeight: '700', cursor: 'pointer' }}>
                Create Reminder
              </button>
            </div>
          </form>
        </div>
      )}

      {activeReminders.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Active Reminders</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {activeReminders.map(r => (
              <div key={r._id} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
                  {getActivityIcon(r.activity)}
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ fontWeight: '700', fontSize: '1.05rem', color: '#1F2937', marginBottom: '0.25rem' }}>{r.activity}</div>
                  <div style={{ color: '#6B7280', fontSize: '0.9rem' }}>{r.frequency} - {r.time}</div>
                  {r.notes && <div style={{ color: '#9CA3AF', fontSize: '0.85rem', marginTop: '0.25rem', fontStyle: 'italic' }}>{r.notes}</div>}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => toggleActive(r._id, r.active)} style={{ background: '#FEF3C7', color: '#D97706', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>⏸️ Pause</button>
                  <button onClick={() => handleDelete(r._id)} style={{ background: '#FEE2E2', color: '#DC2626', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {pausedReminders.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Paused Reminders</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {pausedReminders.map(r => (
              <div key={r._id} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E5E7EB', opacity: 0.6, display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
                  {getActivityIcon(r.activity)}
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ fontWeight: '700', fontSize: '1.05rem', color: '#1F2937', marginBottom: '0.25rem' }}>{r.activity}</div>
                  <div style={{ color: '#6B7280', fontSize: '0.9rem' }}>{r.frequency} - {r.time}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => toggleActive(r._id, r.active)} style={{ background: '#D1FAE5', color: '#047857', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>▶️ Resume</button>
                  <button onClick={() => handleDelete(r._id)} style={{ background: '#FEE2E2', color: '#DC2626', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {reminders.length === 0 && (
        <div style={{ background: 'white', borderRadius: '16px', padding: '4rem 2rem', textAlign: 'center', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>⏰</div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>No Reminders Yet</h3>
          <p style={{ color: '#6B7280', marginBottom: '2rem' }}>Create your first reminder to stay on track</p>
          <button onClick={() => setShowForm(true)} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '1rem 2rem', borderRadius: '10px', border: 'none', fontSize: '1.05rem', fontWeight: '700', cursor: 'pointer' }}>
            + Create Reminder
          </button>
        </div>
      )}
    </div>
  )
}

export default Reminders