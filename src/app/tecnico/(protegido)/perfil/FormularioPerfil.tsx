'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Perfil = {
  nombre: string
  telefono: string | null
  email: string
} | null

type Tecnico = {
  comuna: string | null
  horario: string | null
} | null

export default function FormularioPerfil({ perfil, tecnico }: { perfil: Perfil; tecnico: Tecnico }) {
  const [nombre, setNombre] = useState(perfil?.nombre ?? '')
  const [telefono, setTelefono] = useState(perfil?.telefono ?? '')
  const [comuna, setComuna] = useState(tecnico?.comuna ?? '')
  const [horario, setHorario] = useState(tecnico?.horario ?? '')
  const [guardado, setGuardado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function guardar(e: React.FormEvent) {
    e.preventDefault()
    setCargando(true)
    setGuardado(false)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    await supabase.from('profiles').update({ nombre, telefono }).eq('id', user!.id)
    await supabase.from('tecnicos').update({ comuna, horario }).eq('id', user!.id)

    setCargando(false)
    setGuardado(true)
    router.refresh()
  }

  return (
    <form onSubmit={guardar} className="mt-6 max-w-md space-y-4">
      <div>
        <label className="text-sm text-marino-500">Nombre completo</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
        />
      </div>
      <div>
        <label className="text-sm text-marino-500">Teléfono</label>
        <input
          type="tel"
          value={telefono ?? ''}
          onChange={(e) => setTelefono(e.target.value)}
          className="mt-1 w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
        />
      </div>
      <div>
        <label className="text-sm text-marino-500">Correo</label>
        <input
          type="email"
          value={perfil?.email ?? ''}
          disabled
          className="mt-1 w-full rounded-2xl border border-marino-100 bg-marino-50 px-4 py-3 text-marino-400"
        />
      </div>
      <div>
        <label className="text-sm text-marino-500">Comuna donde trabajas</label>
        <input
          type="text"
          value={comuna ?? ''}
          onChange={(e) => setComuna(e.target.value)}
          placeholder="Ej: Providencia"
          className="mt-1 w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
        />
      </div>
      <div>
        <label className="text-sm text-marino-500">Horario de atención</label>
        <input
          type="text"
          value={horario ?? ''}
          onChange={(e) => setHorario(e.target.value)}
          placeholder="Ej: Lunes a Viernes 9:00-18:00"
          className="mt-1 w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
        />
      </div>

      <button
        type="submit"
        disabled={cargando}
        className="rounded-full bg-marino-800 px-8 py-3 text-sm font-medium text-white transition hover:bg-marino-700 disabled:opacity-60"
      >
        {cargando ? 'Guardando...' : 'Guardar cambios'}
      </button>
      {guardado && <p className="text-sm text-green-600">Cambios guardados.</p>}
    </form>
  )
}
