'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const especialidades = [
  { slug: 'gasfiter', nombre: 'Gasfíter' },
  { slug: 'electricista', nombre: 'Electricista' },
  { slug: 'cerrajero', nombre: 'Cerrajero' },
  { slug: 'electrodomesticos', nombre: 'Electrodomésticos' },
  { slug: 'aire_acondicionado', nombre: 'Aire acondicionado' },
  { slug: 'instalaciones', nombre: 'Instalaciones' },
  { slug: 'otro', nombre: 'Otro' },
]

export default function RegistroTecnico() {
  const router = useRouter()
  const supabase = createClient()

  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [comuna, setComuna] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [seleccionadas, setSeleccionadas] = useState<string[]>([])
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  function toggleEspecialidad(slug: string) {
    setSeleccionadas((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    )
  }

  async function registrar(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (seleccionadas.length === 0) {
      setError('Selecciona al menos una especialidad.')
      return
    }

    setCargando(true)

    const { data, error: errorSignUp } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre } },
    })

    if (errorSignUp || !data.user) {
      setError('No pudimos crear tu cuenta. ' + (errorSignUp?.message ?? ''))
      setCargando(false)
      return
    }

    const userId = data.user.id

    await supabase.from('profiles').update({ nombre, telefono, role: 'tecnico' }).eq('id', userId)

    await supabase.from('tecnicos').insert({
      id: userId,
      comuna,
      estado: 'fuera_de_servicio',
      verificado: false,
    })

    const { data: especialidadesData } = await supabase
      .from('especialidades')
      .select('id, slug')
      .in('slug', seleccionadas)

    if (especialidadesData) {
      const filas = especialidadesData.map((e) => ({
        tecnico_id: userId,
        especialidad_id: e.id,
      }))
      await supabase.from('tecnico_especialidades').insert(filas)
    }

    router.push('/tecnico/dashboard')
    router.refresh()
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-white px-6 py-16">
      <Link
        href="/"
        className="absolute left-6 top-6 text-sm font-medium text-marino-500 hover:text-marino-800"
      >
        ← SOLVE
      </Link>
      <div className="w-full max-w-sm">
        <h1 className="text-center text-2xl font-semibold text-marino-800">
          Únete como técnico
        </h1>
        <p className="mt-2 text-center text-sm text-marino-500">
          Crea tu cuenta para empezar a recibir solicitudes de clientes
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
            placeholder="Teléfono (con WhatsApp)"
            required
            className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
          />
          <input
            type="text"
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
            placeholder="Comuna donde trabajas"
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

          <div>
            <p className="text-sm text-marino-500">¿En qué trabajas?</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {especialidades.map((esp) => (
                <button
                  type="button"
                  key={esp.slug}
                  onClick={() => toggleEspecialidad(esp.slug)}
                  className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                    seleccionadas.includes(esp.slug)
                      ? 'border-amarillo-500 bg-amarillo-50 text-marino-800'
                      : 'border-marino-100 text-marino-500'
                  }`}
                >
                  {esp.nombre}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={cargando}
            className="w-full rounded-full bg-marino-800 px-8 py-4 text-base font-medium text-white transition hover:bg-marino-700 disabled:opacity-60"
          >
            {cargando ? 'Creando cuenta...' : 'Crear cuenta de técnico'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-marino-500">
          ¿Ya tienes cuenta?{' '}
          <Link href="/tecnico/login" className="font-medium text-marino-800 underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  )
}
