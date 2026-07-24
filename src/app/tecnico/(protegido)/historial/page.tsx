import { createClient } from '@/lib/supabase/server'

export default async function HistorialTecnico() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: trabajos } = await supabase
    .from('trabajos')
    .select('id, estado, precio_final, precio_estimado, completado_at, created_at, solicitudes(descripcion, direccion_texto)')
    .eq('tecnico_id', user!.id)
    .in('estado', ['completado', 'cancelado'])
    .order('created_at', { ascending: false })

  const etiquetaEstado: Record<string, string> = {
    completado: 'Completado',
    cancelado: 'Cancelado',
  }

  const colorEstado: Record<string, string> = {
    completado: 'bg-green-100 text-green-700',
    cancelado: 'bg-marino-100 text-marino-500',
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-marino-800">Historial</h1>

      {(!trabajos || trabajos.length === 0) && (
        <p className="mt-4 text-sm text-marino-400">Todavía no tienes trabajos en tu historial.</p>
      )}

      <div className="mt-6 space-y-4">
        {trabajos?.map((trabajo) => (
          <div key={trabajo.id} className="rounded-2xl border border-marino-100 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-marino-800">
                  {trabajo.solicitudes?.descripcion}
                </p>
                <p className="mt-1 text-sm text-marino-500">
                  {trabajo.solicitudes?.direccion_texto}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${colorEstado[trabajo.estado]}`}>
                {etiquetaEstado[trabajo.estado]}
              </span>
            </div>
            <p className="mt-3 text-sm text-marino-500">
              {trabajo.precio_final
                ? `$${trabajo.precio_final.toLocaleString('es-CL')}`
                : trabajo.precio_estimado
                ? `Estimado: $${trabajo.precio_estimado.toLocaleString('es-CL')}`
                : 'Sin monto registrado'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
