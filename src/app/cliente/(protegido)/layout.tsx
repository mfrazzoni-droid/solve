import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CerrarSesionCliente from './CerrarSesionCliente'

export default async function ClienteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/cliente/login?redirect=/cliente/historial')
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-marino-100 px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-marino-800">
            SOLVE
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium text-marino-500">
            <Link href="/cliente/historial" className="hover:text-marino-800">
              Mi historial
            </Link>
            <Link href="/solicitar" className="hover:text-marino-800">
              Nueva solicitud
            </Link>
            <CerrarSesionCliente />
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-6 py-8">{children}</main>
    </div>
  )
}
