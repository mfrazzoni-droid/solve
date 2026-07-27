'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function CerrarSesionAdmin() {
  const router = useRouter()
  const supabase = createClient()

  async function cerrarSesion() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button onClick={cerrarSesion} className="text-sm font-medium text-marino-500 hover:text-marino-800">
      Cerrar sesión
    </button>
  )
}
