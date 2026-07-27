import { createAdminClient } from '@/lib/supabase/admin'
import BotonAprobar from './BotonAprobar'
import CerrarSesionAdmin from './CerrarSesionAdmin'
import Link from 'next/link'

export default async function DashboardAdmin() {
  const supabase = createAdminClient()

  const { data: tecnicosPendientes } = await supabase
    .from('tecnicos')
    .select('id, comuna, created_at, profiles(nombre, email, telefono)')
    .eq('verificado', false)
    .order('created_at', { ascending: false })

  const { count: totalSolicitudes } = await supabase
    .from('solicitudes')
    .select('*', { count: 'exact', head: true })

  const { count: totalTecnicos } = await supabase
    .from('tecnicos')
    .select('*', { count: 'exact', head: true })
    .eq('verificado', true)

  const { count: totalLeads } = await supabase
    .from('trabajos')
    .select('*', { count: 'exact', head: true })

  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-marino-100 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-lg font-semibold text-marino-800">
              SOLVE Admin
            </Link>
            <Link href="/admin/solicitudes" className="text-sm font-medium text-marino-500 hover:text-marino-800">
              Solicitudes
            </Link>
            <Link href="/admin/tecnicos" className="text-sm font-medium text-marino-500 hover:text-marino-800">
              Técnicos
            </Link>
            <Link href="/admin/postulaciones" className="text-sm font-medium text-marino-500 hover:text-marino-800">
              Postulaciones
            </Link>
          </div>
          <CerrarSesionAdmin />
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-2xl font-semibold text-marino-800">Resumen</h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-marino-100 p-5">
            <p className="text-sm text-marino-500">Solicitudes totales</p>
            <p className="mt-2 text-2xl font-semibold text-marino-800">{totalSolicitudes ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-marino-100 p-5">
            <p className="text-sm text-marino-500">Técnicos verificados</p>
            <p className="mt-2 text-2xl font-semibold text-marino-800">{totalTecnicos ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-marino-100 p-5">
            <p className="text-sm text-marino-500">Leads generados</p>
            <p className="mt-2 text-2xl font-semibold text-marino-800">{totalLeads ?? 0}</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-medium text-marino-800">
            Técnicos pendientes de aprobar {tecnicosPendientes?.length ? `(${tecnicosPendientes.length})` : ''}
          </h2>

          {(!tecnicosPendientes || tecnicosPendientes.length === 0) && (
            <p className="mt-4 text-sm text-marino-400">No hay técnicos pendientes por ahora.</p>
          )}

          <div className="mt-4 space-y-3">
            {tecnicosPendientes?.map((tecnico: any) => (
              <div key={tecnico.id} className="flex items-center justify-between rounded-2xl border border-marino-100 p-4">
                <div>
                  <p className="font-medium text-marino-800">{tecnico.profiles?.nombre}</p>
                  <p className="text-sm text-marino-500">
                    {tecnico.profiles?.email} · {tecnico.profiles?.telefono} · {tecnico.comuna}
                  </p>
                </div>
                <BotonAprobar tecnicoId={tecnico.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
