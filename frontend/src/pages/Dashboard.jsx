import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { toast } from 'react-toastify'

function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [dailyTip, setDailyTip] = useState(null)
  const [reminders, setReminders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showReminderForm, setShowReminderForm] = useState(false)
  const [reminderForm, setReminderForm] = useState({
    activity: 'Drink Water',
    frequency: 'Every 3 hours',
    time: '08:00'
  })
  const [stats, setStats] = useState({
    activeReminders: 0,
    completedToday: 0,
    tipsViewed: 12
  })

  const activityOptions = [
    'Drink Water',
    'Take Medication',
    'Exercise',
    'Check Blood Pressure',
    'Take Vitamins',
    'Walk',
    'Eat Meal',
    'Sleep'
  ]

  const frequencyOptions = [
    'Every hour',
    'Every 2 hours',
    'Every 3 hours',
    'Every 4 hours',
    'Every 6 hours',
    'Every 8 hours',
    'Daily',
    'Twice daily'
  ]

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [tipResponse, remindersResponse] = await Promise.all([
        api.get('/tips/daily'),
        api.get('/reminders')
      ])
      setDailyTip(tipResponse.data)
      setReminders(remindersResponse.data || [])
      setStats({
        activeReminders: remindersResponse.data?.filter(r => r.active).length || 0,
        completedToday: 0,
        tipsViewed: 12
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshTip = async () => {
    try {
      const response = await api.get('/tips/daily')
      setDailyTip(response.data)
      toast.success('New tip loaded!')
    } catch (error) {
      toast.error('Failed to load new tip')
    }
  }

  const handleCreateReminder = async (e) => {
    e.preventDefault()
    try {
      const reminderData = {
        activity: reminderForm.activity,
        frequency: reminderForm.frequency,
        time: reminderForm.time,
        active: true
      }
      console.log('Sending reminder data:', reminderData)
      
      const response = await api.post('/reminders', reminderData)
      
      setReminders([response, ...reminders])
      setStats(prev => ({ ...prev, activeReminders: prev.activeReminders + 1 }))
      toast.success('Reminder created successfully!')
      setShowReminderForm(false)
      setReminderForm({
        activity: 'Drink Water',
        frequency: 'Every 3 hours',
        time: '08:00'
      })
    } catch (error) {
      console.error('Create reminder error:', error.response?.data || error)
      toast.error(error.response?.data?.message || 'Failed to create reminder')
    }
  }

  const handleDeleteReminder = async (id) => {
    try {
      await api.delete('/reminders/' + id)
      setReminders(reminders.filter(r => r._id !== id))
      setStats(prev => ({ ...prev, activeReminders: Math.max(0, prev.activeReminders - 1) }))
      toast.success('Reminder deleted!')
    } catch (error) {
      toast.error('Failed to delete reminder')
    }
  }

  const quickActions = [
    { title: 'Check Symptoms', icon: '🔍', color: '#3B82F6', path: '/symptoms', desc: 'Analyze your symptoms' },
    { title: 'Set Reminder', icon: '⏰', color: '#8B5CF6', path: '/reminders', desc: 'Create health reminder' },
    { title: 'First Aid', icon: '🚑', color: '#EF4444', path: '/first-aid', desc: 'Emergency guides' },
    { title: 'Health Tips', icon: '💡', color: '#10B981', path: '/tips', desc: 'Browse all tips' }
  ]

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <div style={{ color: '#6B7280', fontSize: '1.125rem' }}>Loading your dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Welcome Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1F2937', marginBottom: '0.5rem' }}>
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p style={{ color: '#6B7280', fontSize: '1.05rem' }}>
          Here's your health overview for today
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          padding: '1.75rem',
          color: 'white',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⏰</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>{stats.activeReminders}</div>
          <div style={{ opacity: 0.9, fontSize: '0.95rem' }}>Active Reminders</div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '1.75rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem', color: '#1F2937' }}>
            {stats.completedToday}
          </div>
          <div style={{ color: '#6B7280', fontSize: '0.95rem' }}>Completed Today</div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '1.75rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💡</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem', color: '#1F2937' }}>
            {stats.tipsViewed}
          </div>
          <div style={{ color: '#6B7280', fontSize: '0.95rem' }}>Tips Viewed</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '1fr 1fr',
        gap: '2rem'
      }}>
        
        {/* Left Column */}
        <div>
          {/* Daily Health Tip */}
          <div style={{
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            borderRadius: '16px',
            padding: '2rem',
            color: 'white',
            marginBottom: '2rem',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem' }}>💡</div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>Daily Health Tip</h2>
                <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              {dailyTip?.content || 'Stay hydrated! Drink at least 8 glasses of water daily to maintain healthy body functions.'}
            </p>
            <button
              onClick={refreshTip}
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              🔄 Get New Tip
            </button>
          </div>

          {/* Quick Actions */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #E5E7EB'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937', marginBottom: '1.5rem' }}>
              Quick Actions
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {quickActions.map((action) => (
                <button
                  key={action.title}
                  onClick={() => navigate(action.path)}
                  style={{
                    background: 'white',
                    border: '2px solid #E5E7EB',
                    borderRadius: '12px',
                    padding: '1.25rem 1rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = action.color
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = action.color + '30 0px 4px 12px'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#E5E7EB'
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{action.icon}</div>
                  <div style={{ fontWeight: '700', color: '#1F2937', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                    {action.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>{action.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Quick Reminder Form */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #E5E7EB',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                Quick Reminder
              </h3>
              <button
                onClick={() => setShowReminderForm(!showReminderForm)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {showReminderForm ? 'Cancel' : '+ New'}
              </button>
            </div>

            {showReminderForm ? (
              <form onSubmit={handleCreateReminder}>
                <div style={{ marginBottom: '1rem' }}>
                  <select
                    value={reminderForm.activity}
                    onChange={(e) => setReminderForm({...reminderForm, activity: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '2px solid #E5E7EB',
                      fontSize: '0.95rem',
                      marginBottom: '0.75rem'
                    }}
                    required
                  >
                    {activityOptions.map(activity => (
                      <option key={activity} value={activity}>{activity}</option>
                    ))}
                  </select>
                  <select
                    value={reminderForm.frequency}
                    onChange={(e) => setReminderForm({...reminderForm, frequency: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '2px solid #E5E7EB',
                      fontSize: '0.95rem',
                      marginBottom: '0.75rem'
                    }}
                    required
                  >
                    {frequencyOptions.map(freq => (
                      <option key={freq} value={freq}>{freq}</option>
                    ))}
                  </select>
                  <input
                    type="time"
                    value={reminderForm.time}
                    onChange={(e) => setReminderForm({...reminderForm, time: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '2px solid #E5E7EB',
                      fontSize: '0.95rem'
                    }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Create Reminder
                </button>
              </form>
            ) : (
              <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>
                Click "+ New" to create a quick health reminder
              </p>
            )}
          </div>

          {/* Recent Reminders */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #E5E7EB',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                Recent Reminders
              </h3>
              <button
                onClick={() => navigate('/reminders')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                View All →
              </button>
            </div>

            {reminders.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {reminders.slice(0, 3).map((reminder) => (
                  <div
                    key={reminder._id}
                    style={{
                      padding: '1rem',
                      background: '#F9FAFB',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      flexShrink: 0
                    }}>
                      {reminder.activity.includes('Water') ? '💧' : '💊'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: '600', color: '#1F2937', fontSize: '0.95rem' }}>
                        {reminder.activity}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>
                        {reminder.frequency}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteReminder(reminder._id)}
                      style={{
                        background: '#FEE2E2',
                        color: '#DC2626',
                        border: 'none',
                        padding: '0.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1.25rem'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#6B7280' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏰</div>
                <p style={{ marginBottom: '1.5rem' }}>No reminders yet</p>
                <button
                  onClick={() => setShowReminderForm(true)}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Create First Reminder
                </button>
              </div>
            )}
          </div>

          {/* Health Score Card */}
          <div style={{
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            borderRadius: '16px',
            padding: '2rem',
            color: 'white',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>
              Weekly Health Score
            </h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800' }}>85</div>
              <div style={{ fontSize: '1.25rem', opacity: 0.9 }}>/100</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', height: '8px', marginBottom: '1rem' }}>
              <div style={{ background: 'white', borderRadius: '10px', height: '100%', width: '85%' }} />
            </div>
            <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>
              Great job! You are maintaining a healthy routine.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard