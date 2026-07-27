'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AccionesPostulacion({ id, estado }: { id: string; estado: string }) {
  const [cargando, setCargando] = useState(false)
  const router = useRouter()

  async function actualizar(nuevoEstado: string) {
    setCargando(true)
    await fetch('/api/admin/postulacion', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, estado: nuevoEstado }),
    })
    router.refresh()
  }

  async function eliminar() {
    if (!confirm('¿Eliminar esta postulación? No se puede deshacer.')) return
    setCargando(true)
    await fetch('/api/admin/postulacion', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    router.refresh()
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <button
        onClick={() => actualizar('contactado')}
        disabled={cargando || estado === 'contactado'}
        className="rounded-full bg-green-100 px-4 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-200 disabled:opacity-50"
      >
        {estado === 'contactado' ? 'Contactado ✓' : 'Aceptar / Contactado'}
      </button>
      <button
        onClick={() => actualizar('descartado')}
        disabled={cargando || estado === 'descartado'}
        className="rounded-full bg-marino-100 px-4 py-1.5 text-xs font-medium text-marino-500 transition hover:bg-marino-200 disabled:opacity-50"
      >
        {estado === 'descartado' ? 'Descartado' : 'Declinar'}
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
