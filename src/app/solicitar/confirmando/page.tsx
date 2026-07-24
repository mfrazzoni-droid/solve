'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function Confirmando() {
  const searchParams = useSearchParams()
  const trabajoId = searchParams.get('trabajoId')
  const [estado, setEstado] = useState('pendiente')
  const supabase = createClient()

  useEffect(() => {
    if (!trabajoId) return

    const intervalo = setInterval(async () => {
      const { data } = await supabase
        .from('trabajos')
        .select('estado')
        .eq('id', trabajoId)
        .single()

      if (data) setEstado(data.estado)
    }, 2000)

    return () => clearInterval(intervalo)
  }, [trabajoId, supabase])

  if (estado === 'en_curso') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <h1 className="text-2xl font-semibold text-marino-800">
          ¡Tu técnico confirmó y va en camino!
        </h1>
        <p className="mt-3 text-marino-500">
          Próximamente: seguimiento en tiempo real de su llegada.
        </p>
      </main>
    )
  }

  if (estado === 'cancelado') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <h1 className="text-2xl font-semibold text-marino-800">
          El técnico no pudo tomar este trabajo
        </h1>
        <p className="mt-3 text-marino-500">
          Estamos buscando otro técnico disponible para ti.
        </p>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute h-20 w-20 animate-ping rounded-full bg-amarillo-400 opacity-30" />
        <span className="relative h-6 w-6 rounded-full bg-marino-800" />
      </div>
      <h1 className="mt-8 text-2xl font-semibold text-marino-800">
        Esperando confirmación del técnico...
      </h1>
      <p className="mt-3 text-marino-500">
        Le avisamos que aceptaste, ahora está confirmando que puede tomar tu trabajo.
      </p>
    </main>
  )
}
