'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

function FormularioLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/solicitar'
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  async function iniciarSesion(e: React.FormEvent) {
    e.preventDefault()
    setCargando(true)
    setError('')

    const { error: errorLogin } = await supabase.auth.signInWithPassword({ email, password })

    if (errorLogin) {
      setError('Correo o contraseña incorrectos.')
      setCargando(false)
      return
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
        <h1 className="text-center text-2xl font-semibold text-marino-800">Inicia sesión</h1>
        <p className="mt-2 text-center text-sm text-marino-500">
          Ingresa a tu cuenta de SOLVE
        </p>

        <form onSubmit={iniciarSesion} className="mt-8 space-y-4">
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
            className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={cargando}
            className="w-full rounded-full bg-marino-800 px-8 py-4 text-base font-medium text-white transition hover:bg-marino-700 disabled:opacity-60"
          >
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-marino-500">
          ¿No tienes cuenta?{' '}
          <Link href="/cliente/registro" className="font-medium text-marino-800 underline">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  )
}

export default function LoginCliente() {
  return (
    <Suspense>
      <FormularioLogin />
    </Suspense>
  )
}
