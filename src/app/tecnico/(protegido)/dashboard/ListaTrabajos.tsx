'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Trabajo = {
  id: string
  precio_estimado: number | null
  tiempo_estimado_minutos: number | null
  solicitudes: {
    descripcion: string
    direccion_texto: string | null
    nombre_contacto: string | null
  } | null
}

export default function ListaTrabajos({ trabajos }: { trabajos: Trabajo[] }) {
  const router = useRouter()
  const supabase = createClient()

  async function responder(id: string, nuevoEstado: 'en_curso' | 'cancelado') {
    await supabase.from('trabajos').update({ estado: nuevoEstado }).eq('id', id)
    router.refresh()
  }

  if (trabajos.length === 0) {
    return <p className="mt-4 text-sm text-marino-400">No tienes trabajos pendientes por ahora.</p>
  }

  return (
    <div className="mt-4 space-y-4">
      {trabajos.map((trabajo) => (
        <div key={trabajo.id} className="rounded-2xl border border-marino-100 p-5">
          <p className="font-medium text-marino-800">
            {trabajo.solicitudes?.descripcion}
          </p>
          <p className="mt-1 text-sm text-marino-500">
            {trabajo.solicitudes?.direccion_texto} · {trabajo.solicitudes?.nombre_contacto}
          </p>
          <p className="mt-2 text-sm text-marino-500">
            Estimado: ${trabajo.precio_estimado?.toLocaleString('es-CL')} · {trabajo.tiempo_estimado_minutos} min
          </p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => responder(trabajo.id, 'cancelado')}
              className="flex-1 rounded-full border border-marino-200 px-4 py-2 text-sm font-medium text-marino-800 hover:bg-marino-50"
            >
              Rechazar
            </button>
            <button
              onClick={() => responder(trabajo.id, 'en_curso')}
              className="flex-1 rounded-full bg-marino-800 px-4 py-2 text-sm font-medium text-white hover:bg-marino-700"
            >
              Aceptar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
