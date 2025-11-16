import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/Layout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import SymptomChecker from '../pages/SymptomChecker'
import Reminders from '../pages/Reminders'
import FirstAid from '../pages/FirstAid'
import FirstAidDetail from '../pages/FirstAidDetail'
import HealthTips from '../pages/HealthTips'
import HealthFacilities from '../pages/HealthFacilities'

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}><div style={{ fontSize: '3rem' }}>⏳</div></div>
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}><div style={{ fontSize: '3rem' }}>⏳</div></div>
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="symptoms" element={<SymptomChecker />} />
        <Route path="reminders" element={<Reminders />} />
        <Route path="first-aid" element={<FirstAid />} />
        <Route path="first-aid/:type" element={<FirstAidDetail />} />
        <Route path="tips" element={<HealthTips />} />
        <Route path="facilities" element={<HealthFacilities />} />
      </Route>
      <Route path="*" element={<div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center' }}><div><div style={{ fontSize: '6rem' }}>404</div><h1>Page Not Found</h1><a href="/dashboard" style={{ display: 'inline-block', background: 'white', color: '#667eea', padding: '1rem 2rem', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', marginTop: '2rem' }}>Go Home</a></div></div>} />
    </Routes>
  )
}

export default AppRoutes