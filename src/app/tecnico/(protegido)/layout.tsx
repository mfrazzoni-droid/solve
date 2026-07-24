import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CerrarSesionBoton from './CerrarSesionBoton'

export default async function TecnicoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/tecnico/login')
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-marino-100 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/tecnico/dashboard" className="text-lg font-semibold text-marino-800">
            SOLVE Técnico
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium text-marino-500">
            <Link href="/tecnico/dashboard" className="hover:text-marino-800">
              Trabajos
            </Link>
            <Link href="/tecnico/historial" className="hover:text-marino-800">
              Historial
            </Link>
            <Link href="/tecnico/ganancias" className="hover:text-marino-800">
              Ganancias
            </Link>
            <Link href="/tecnico/perfil" className="hover:text-marino-800">
              Perfil
            </Link>
            <Link href="/tecnico/documentos" className="hover:text-marino-800">
              Documentos
            </Link>
            <CerrarSesionBoton />
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
    </div>
  )
}
