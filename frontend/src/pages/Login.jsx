import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!form.email.trim()) nextErrors.email = 'Enter your email to continue.'
    if (!form.password.trim()) nextErrors.password = 'Enter your password to continue.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h1 className="text-center text-lg font-bold text-ink">Welcome Back</h1>

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

      <Button type="submit" variant="primary" className="w-full">
        Login
      </Button>

      <p className="text-center text-sm text-ink-muted">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-primary hover:underline">
          Register
        </Link>
      </p>
    </form>
  )
}
