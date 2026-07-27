'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BotonAprobar({ tecnicoId }: { tecnicoId: string }) {
  const [cargando, setCargando] = useState(false)
  const router = useRouter()

  async function aprobar() {
    setCargando(true)
    await fetch('/api/admin/aprobar-tecnico', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tecnicoId }),
    })
    router.refresh()
  }

  return (
    <button
      onClick={aprobar}
      disabled={cargando}
      className="rounded-full bg-marino-800 px-5 py-2 text-sm font-medium text-white transition hover:bg-marino-700 disabled:opacity-60"
    >
      {cargando ? 'Aprobando...' : 'Aprobar'}
    </button>
  )
}
