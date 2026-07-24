import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import BotonContactar from './BotonContactar'

export default async function Encontrado({
  searchParams,
}: {
  searchParams: Promise<{ trabajoId?: string }>
}) {
  const { trabajoId } = await searchParams
  if (!trabajoId) notFound()

  const supabase = await createClient()

  const { data: trabajo } = await supabase
    .from('trabajos')
    .select('id, precio_estimado, tiempo_estimado_minutos, tecnico_id')
    .eq('id', trabajoId)
    .single()

  if (!trabajo) notFound()

  const { data: tecnicoInfo } = await supabase
    .from('tecnicos')
    .select('calificacion_promedio, cantidad_trabajos, profiles(nombre, telefono)')
    .eq('id', trabajo.tecnico_id)
    .single()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <span className="rounded-full bg-amarillo-100 px-4 py-1 text-sm font-medium text-amarillo-700">
        Encontramos un técnico
      </span>

      <div className="mt-8 w-full max-w-sm rounded-2xl border border-marino-100 p-6">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-marino-100 text-3xl font-semibold text-marino-800">
          {tecnicoInfo?.profiles?.nombre?.[0]?.toUpperCase() ?? 'T'}
        </div>
        <h1 className="mt-4 text-xl font-semibold text-marino-800">
          {tecnicoInfo?.profiles?.nombre ?? 'Técnico SOLVE'}
        </h1>
        <p className="mt-1 text-sm text-marino-500">
          ⭐ {tecnicoInfo?.calificacion_promedio ?? 0} · {tecnicoInfo?.cantidad_trabajos ?? 0} trabajos
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-marino-100 pt-6">
          <div>
            <p className="text-xs text-marino-400">Llega en</p>
            <p className="mt-1 text-lg font-semibold text-marino-800">
              {trabajo.tiempo_estimado_minutos} min
            </p>
          </div>
          <div>
            <p className="text-xs text-marino-400">Precio estimado</p>
            <p className="mt-1 text-lg font-semibold text-marino-800">
              ${trabajo.precio_estimado?.toLocaleString('es-CL')}
            </p>
          </div>
        </div>
      </div>

      <BotonContactar telefono={tecnicoInfo?.profiles?.telefono ?? null} />
    </main>
  )
}
