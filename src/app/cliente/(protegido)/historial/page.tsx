import { createClient } from '@/lib/supabase/server'

export default async function HistorialCliente() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: solicitudes } = await supabase
    .from('solicitudes')
    .select('id, descripcion, direccion_texto, created_at, trabajos(id, tecnicos(profiles(nombre), calificacion_promedio))')
    .eq('cliente_id', user!.id)
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-semibold text-marino-800">Mi historial</h1>
      <p className="mt-2 text-sm text-marino-500">
        Técnicos con los que te has contactado a través de SOLVE.
      </p>

      {(!solicitudes || solicitudes.length === 0) && (
        <p className="mt-8 text-sm text-marino-400">Todavía no has hecho ninguna solicitud.</p>
      )}

      <div className="mt-6 space-y-4">
        {solicitudes?.map((s: any) => (
          <div key={s.id} className="rounded-2xl border border-marino-100 p-5">
            <p className="text-xs text-marino-400">
              {new Date(s.created_at).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <p className="mt-1 font-medium text-marino-800">{s.descripcion}</p>
            <p className="mt-1 text-sm text-marino-500">{s.direccion_texto}</p>

            {s.trabajos?.length > 0 && (
              <div className="mt-3 border-t border-marino-100 pt-3">
                <p className="text-xs text-marino-400">Técnicos contactados</p>
                {s.trabajos.map((t: any) => (
                  <p key={t.id} className="mt-1 text-sm text-marino-800">
                    {t.tecnicos?.profiles?.nombre} · ⭐ {t.tecnicos?.calificacion_promedio}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
