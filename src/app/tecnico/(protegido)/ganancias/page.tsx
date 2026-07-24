import { createClient } from '@/lib/supabase/server'

export default async function GananciasTecnico() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: trabajos } = await supabase
    .from('trabajos')
    .select('precio_final, completado_at')
    .eq('tecnico_id', user!.id)
    .eq('estado', 'completado')

  const totalGanado = trabajos?.reduce((suma, t) => suma + (t.precio_final ?? 0), 0) ?? 0

  const inicioMes = new Date()
  inicioMes.setDate(1)
  inicioMes.setHours(0, 0, 0, 0)

  const ganadoEsteMes = trabajos
    ?.filter((t) => t.completado_at && new Date(t.completado_at) >= inicioMes)
    .reduce((suma, t) => suma + (t.precio_final ?? 0), 0) ?? 0

  const cantidadTrabajos = trabajos?.length ?? 0

  return (
    <div>
      <h1 className="text-2xl font-semibold text-marino-800">Ganancias</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-marino-100 p-5">
          <p className="text-sm text-marino-500">Total ganado</p>
          <p className="mt-2 text-2xl font-semibold text-marino-800">
            ${totalGanado.toLocaleString('es-CL')}
          </p>
        </div>
        <div className="rounded-2xl border border-marino-100 p-5">
          <p className="text-sm text-marino-500">Este mes</p>
          <p className="mt-2 text-2xl font-semibold text-marino-800">
            ${ganadoEsteMes.toLocaleString('es-CL')}
          </p>
        </div>
        <div className="rounded-2xl border border-marino-100 p-5">
          <p className="text-sm text-marino-500">Trabajos completados</p>
          <p className="mt-2 text-2xl font-semibold text-marino-800">
            {cantidadTrabajos}
          </p>
        </div>
      </div>

      <p className="mt-8 text-xs text-marino-400">
        Los montos mostrados corresponden al precio final del trabajo. La comisión de SOLVE se descuenta automáticamente al procesar el pago (próximamente).
      </p>
    </div>
  )
}
