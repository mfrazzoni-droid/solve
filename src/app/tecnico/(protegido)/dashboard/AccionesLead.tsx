'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AccionesLead({ id, estado }: { id: string; estado: string }) {
  const [cargando, setCargando] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function actualizar(nuevoEstado: 'completado' | 'cancelado') {
    setCargando(true)
    await supabase.from('trabajos').update({ estado: nuevoEstado }).eq('id', id)
    setCargando(false)
    router.refresh()
  }

  async function eliminar() {
    if (!confirm('¿Eliminar esta solicitud de tu lista? No se puede deshacer.')) return
    setCargando(true)
    await supabase.from('trabajos').delete().eq('id', id)
    setCargando(false)
    router.refresh()
  }

  if (estado === 'completado') {
    return <p className="mt-4 text-xs font-medium text-green-700">✓ Marcado como finalizado</p>
  }

  if (estado === 'cancelado') {
    return <p className="mt-4 text-xs font-medium text-marino-400">Descartado</p>
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2 border-t border-marino-100 pt-4">
      <button
        onClick={() => actualizar('completado')}
        disabled={cargando}
        className="rounded-full bg-green-100 px-4 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-200 disabled:opacity-50"
      >
        Marcar finalizado
      </button>
      <button
        onClick={() => actualizar('cancelado')}
        disabled={cargando}
        className="rounded-full bg-marino-100 px-4 py-1.5 text-xs font-medium text-marino-500 transition hover:bg-marino-200 disabled:opacity-50"
      >
        Descartar
      </button>
      <button
        onClick={eliminar}
        disabled={cargando}
        className="rounded-full bg-red-100 px-4 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-200 disabled:opacity-50"
      >
        Eliminar
      </button>
    </div>
  )
}
