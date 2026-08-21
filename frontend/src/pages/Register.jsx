import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { register } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Enter your full name.'
    if (!form.email.trim()) nextErrors.email = 'Enter your email to continue.'
    if (!form.password.trim()) nextErrors.password = 'Choose a password.'
    if (form.confirm !== form.password || !form.confirm) nextErrors.confirm = 'Passwords do not match.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    try {
      await register({ name: form.name, email: form.email, password: form.password })
      navigate('/')
    } catch (error) {
      setErrors({ form: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h1 className="text-center text-lg font-bold text-ink">Create Account</h1>

      <Input
        id="name"
        label="Full Name"
        placeholder="Jane Student"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        error={errors.name}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="you@school.edu"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        error={errors.password}
      />
      <Input
        id="confirm"
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        value={form.confirm}
        onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        error={errors.confirm}
      />

      {errors.form && <p className="text-center text-sm text-danger">{errors.form}</p>}

      <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </Button>

      <p className="text-center text-sm text-ink-muted">
        Already registered?{' '}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </form>
  )
}
