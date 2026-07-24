import { createClient } from '@/lib/supabase/server'
import FormularioPerfil from './FormularioPerfil'

export default async function PerfilTecnico() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: perfil } = await supabase
    .from('profiles')
    .select('nombre, telefono, email')
    .eq('id', user!.id)
    .single()

  const { data: tecnico } = await supabase
    .from('tecnicos')
    .select('comuna, horario')
    .eq('id', user!.id)
    .single()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-marino-800">Mi perfil</h1>
      <FormularioPerfil perfil={perfil} tecnico={tecnico} />
    </div>
  )
}
