'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const especialidades = ['Gasfíter', 'Electricista', 'Cerrajero', 'Electrodomésticos', 'Aire acondicionado', 'Instalaciones', 'Otro']

export default function PostularTecnico() {
  const supabase = createClient()
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [comuna, setComuna] = useState('')
  const [especialidad, setEspecialidad] = useState('')
  const [aniosExperiencia, setAniosExperiencia] = useState('')
  const [tieneVehiculo, setTieneVehiculo] = useState('')
  const [comunasTrabajo, setComunasTrabajo] = useState('')
  const [horarioTrabajo, setHorarioTrabajo] = useState('')
  const [comoConsigueClientes, setComoConsigueClientes] = useState('')
  const [trabajosPorSemana, setTrabajosPorSemana] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    setEnviando(true)
    setError('')

    const { error: errorInsert } = await supabase.from('postulaciones_tecnico').insert({
      nombre,
      telefono,
      email: email || null,
      comuna,
      especialidad,
      anios_experiencia: aniosExperiencia ? parseInt(aniosExperiencia) : null,
      tiene_vehiculo: tieneVehiculo === 'si',
      comunas_trabajo: comunasTrabajo,
      horario_trabajo: horarioTrabajo,
      como_consigue_clientes: comoConsigueClientes || null,
      trabajos_por_semana: trabajosPorSemana || null,
    })

    console.log('Error postulación:', JSON.stringify(errorInsert))

    if (errorInsert) {
      setError('Hubo un problema al enviar tu postulación. Intenta nuevamente.')
      setEnviando(false)
      return
    }

    setEnviado(true)
    setEnviando(false)
  }

  if (enviado) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <h1 className="text-2xl font-semibold text-marino-800">¡Postulación enviada!</h1>
        <p className="mt-3 max-w-md text-marino-500">
          Vamos a revisar tu información y te contactaremos pronto para activar tu cuenta.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-marino-800 px-8 py-4 text-base font-medium text-white transition hover:bg-marino-700"
        >
          Volver al inicio
        </Link>
      </main>
    )
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-white px-6 py-16">
      <Link
        href="/"
        className="absolute left-6 top-6 text-sm font-medium text-marino-500 hover:text-marino-800"
      >
        ← SOLVE
      </Link>
      <div className="w-full max-w-md">
        <h1 className="text-center text-2xl font-semibold text-marino-800">Únete como técnico</h1>
        <p className="mt-2 text-center text-sm text-marino-500">
          Cuéntanos de ti, te contactaremos para activar tu cuenta.
        </p>

        <form onSubmit={enviar} className="mt-8 space-y-4">
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
            placeholder="WhatsApp"
            required
            className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
          />
          <input
            type="text"
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
            placeholder="Comuna de residencia"
            required
            className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
          />
          <select
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
            required
            className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
          >
            <option value="">Especialidad</option>
            {especialidades.map((esp) => (
              <option key={esp} value={esp}>{esp}</option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            value={aniosExperiencia}
            onChange={(e) => setAniosExperiencia(e.target.value)}
            placeholder="Años de experiencia"
            required
            className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
          />

          <div>
            <label className="text-sm text-marino-500">¿Tienes vehículo propio?</label>
            <div className="mt-1 flex gap-3">
              <button
                type="button"
                onClick={() => setTieneVehiculo('si')}
                className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                  tieneVehiculo === 'si' ? 'border-amarillo-500 bg-amarillo-50 text-marino-800' : 'border-marino-100 text-marino-500'
                }`}
              >
                Sí
              </button>
              <button
                type="button"
                onClick={() => setTieneVehiculo('no')}
                className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                  tieneVehiculo === 'no' ? 'border-amarillo-500 bg-amarillo-50 text-marino-800' : 'border-marino-100 text-marino-500'
                }`}
              >
                No
              </button>
            </div>
          </div>

          <input
            type="text"
            value={comunasTrabajo}
            onChange={(e) => setComunasTrabajo(e.target.value)}
            placeholder="¿En qué comunas trabajas?"
            required
            className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
          />
          <input
            type="text"
            value={horarioTrabajo}
            onChange={(e) => setHorarioTrabajo(e.target.value)}
            placeholder="Días y horario de trabajo"
            required
            className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
          />
          <textarea
            value={comoConsigueClientes}
            onChange={(e) => setComoConsigueClientes(e.target.value)}
            placeholder="¿Cómo consigues a tus clientes hoy en día?"
            rows={2}
            className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
          />
          <input
            type="text"
            value={trabajosPorSemana}
            onChange={(e) => setTrabajosPorSemana(e.target.value)}
            placeholder="¿Cuántos trabajos realizas por semana?"
            className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={enviando}
            className="w-full rounded-full bg-marino-800 px-8 py-4 text-base font-medium text-white transition hover:bg-marino-700 disabled:opacity-60"
          >
            {enviando ? 'Enviando...' : 'Enviar postulación'}
          </button>
        </form>
      </div>
    </main>
  )
}
