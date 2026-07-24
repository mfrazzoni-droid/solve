'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

function FormularioRegistro() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/solicitar'
  const supabase = createClient()

  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  async function registrar(e: React.FormEvent) {
    e.preventDefault()
    setCargando(true)
    setError('')

    const { data, error: errorSignUp } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre } },
    })

    if (errorSignUp) {
      setError('No pudimos crear tu cuenta. ' + errorSignUp.message)
      setCargando(false)
      return
    }

    if (data.user) {
      await supabase.from('profiles').update({ nombre, telefono }).eq('id', data.user.id)
    }

    router.push(redirect)
    router.refresh()
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <Link
        href="/"
        className="absolute left-6 top-6 text-sm font-medium text-marino-500 hover:text-marino-800"
      >
        ← SOLVE
      </Link>
      <div className="w-full max-w-sm">
        <h1 className="text-center text-2xl font-semibold text-marino-800">Crea tu cuenta</h1>
        <p className="mt-2 text-center text-sm text-marino-500">
          Para solicitar un técnico y llevar tu historial
        </p>

        <form onSubmit={registrar} className="mt-8 space-y-4">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre completo"
            required
            className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
          />
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Teléfono"
            required
            className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
            className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            minLength={6}
            className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={cargando}
            className="w-full rounded-full bg-marino-800 px-8 py-4 text-base font-medium text-white transition hover:bg-marino-700 disabled:opacity-60"
          >
            {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-marino-500">
          ¿Ya tienes cuenta?{' '}
          <Link href="/cliente/login" className="font-medium text-marino-800 underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  )
}

export default function RegistroCliente() {
  return (
    <Suspense>
      <FormularioRegistro />
    </Suspense>
  )
}
