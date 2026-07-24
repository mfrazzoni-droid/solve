import { createClient } from '@/lib/supabase/server'
import SelectorEstado from './SelectorEstado'

export default async function DashboardTecnico() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: tecnico } = await supabase
    .from('tecnicos')
    .select('estado')
    .eq('id', user!.id)
    .single()

  const { data: leads } = await supabase
    .from('trabajos')
    .select('id, precio_estimado, created_at, solicitudes(descripcion, direccion_texto, nombre_contacto, telefono_contacto)')
    .eq('tecnico_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <div>
      <h1 className="text-2xl font-semibold text-marino-800">Panel de trabajos</h1>

      <div className="mt-6">
        <SelectorEstado estadoActual={tecnico?.estado ?? 'fuera_de_servicio'} />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-marino-800">Solicitudes recibidas</h2>
        <p className="mt-1 text-sm text-marino-500">
          Estos son los clientes que te han sido asignados. Contáctalos directamente para coordinar.
        </p>

        {(!leads || leads.length === 0) && (
          <p className="mt-4 text-sm text-marino-400">Aún no has recibido solicitudes.</p>
        )}

        <div className="mt-4 space-y-4">
          {leads?.map((lead) => (
            <div key={lead.id} className="rounded-2xl border border-marino-100 p-5">
              <p className="font-medium text-marino-800">
                {lead.solicitudes?.descripcion}
              </p>
              <p className="mt-2 text-sm text-marino-500">
                📍 {lead.solicitudes?.direccion_texto}
              </p>
              <p className="mt-1 text-sm text-marino-500">
                👤 {lead.solicitudes?.nombre_contacto}
              </p>
              <p className="mt-1 text-sm text-marino-500">
                💰 Estimado: ${lead.precio_estimado?.toLocaleString('es-CL')}
              </p>
              {lead.solicitudes?.telefono_contacto && (
                <a
                  href={`https://wa.me/${lead.solicitudes.telefono_contacto.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block rounded-full bg-marino-800 px-5 py-2 text-sm font-medium text-white transition hover:bg-marino-700"
                >
                  Contactar por WhatsApp
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
