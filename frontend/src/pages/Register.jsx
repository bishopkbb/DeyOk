import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { toast } from 'react-toastify'

function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const response = await api.post('/auth/register', { name: formData.name, email: formData.email, password: formData.password })
      login(response.token, response.data)
      toast.success('Registration successful!')
      navigate('/dashboard')
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFE500', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: 'white', borderRadius: '1.5rem', padding: '3rem 2rem', maxWidth: '450px', width: '100%', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏥</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#00A651', marginBottom: '0.5rem' }}>Join DeyOk</h1>
          <p style={{ color: '#666' }}>Create your health companion account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>Full Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" required style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '2px solid #E0E0E0', fontSize: '1rem' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your.email@example.com" required style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '2px solid #E0E0E0', fontSize: '1rem' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>Password</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Min. 6 characters" required minLength={6} style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '2px solid #E0E0E0', fontSize: '1rem' }} />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>Confirm Password</label>
            <input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} placeholder="Re-enter password" required style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '2px solid #E0E0E0', fontSize: '1rem' }} />
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', background: '#00A651', color: 'white', padding: '1rem', borderRadius: '0.75rem', border: 'none', fontSize: '1.125rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>
          Already have an account? <Link to="/login" style={{ color: '#00A651', fontWeight: '700', textDecoration: 'none' }}>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register