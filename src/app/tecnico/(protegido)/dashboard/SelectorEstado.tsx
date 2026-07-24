'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const estados = [
  { valor: 'disponible', etiqueta: 'Disponible', color: 'bg-green-100 text-green-700' },
  { valor: 'ocupado', etiqueta: 'Ocupado', color: 'bg-amarillo-100 text-amarillo-700' },
  { valor: 'fuera_de_servicio', etiqueta: 'Fuera de servicio', color: 'bg-marino-100 text-marino-500' },
]

export default function SelectorEstado({ estadoActual }: { estadoActual: string }) {
  const [estado, setEstado] = useState(estadoActual)
  const [cargando, setCargando] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function cambiarEstado(nuevoEstado: string) {
    setCargando(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    await supabase.from('tecnicos').update({ estado: nuevoEstado }).eq('id', user!.id)

    setEstado(nuevoEstado)
    setCargando(false)
    router.refresh()
  }

  return (
    <div className="flex gap-2">
      {estados.map((e) => (
        <button
          key={e.valor}
          onClick={() => cambiarEstado(e.valor)}
          disabled={cargando}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            estado === e.valor ? e.color : 'bg-white text-marino-400 border border-marino-100'
          }`}
        >
          {e.etiqueta}
        </button>
      ))}
    </div>
  )
}
