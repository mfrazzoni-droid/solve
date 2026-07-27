import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Image src="/logo.png" alt="SOLVE" width={140} height={40} priority className="h-16 w-auto" />
        <div className="flex items-center gap-4">
          <Link
            href="/tecnico/login"
            className="text-sm font-medium text-marino-500 hover:text-marino-800"
          >
            Soy técnico
          </Link>
          <Link
            href="/cliente/login"
            className="text-sm font-medium text-marino-500 hover:text-marino-800"
          >
            Mi cuenta
          </Link>
          <Link
            href="/solicitar"
            className="rounded-full bg-marino-800 px-5 py-2 text-sm font-medium text-white transition hover:bg-marino-700"
          >
            Solicitar ayuda
          </Link>
        </div>
      </nav>

      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-16 text-center sm:pt-24">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-marino-800 sm:text-6xl">
          ¿Un problema urgente en casa?
          <br />
          <span className="text-amarillo-600">Nosotros lo resolvemos.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-marino-500 sm:text-xl">
          Encuentra técnicos verificados en minutos para resolver cualquier
          emergencia en tu hogar.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/solicitar"
            className="rounded-full bg-marino-800 px-8 py-4 text-base font-medium text-white transition hover:bg-marino-700"
          >
            Solicitar ayuda
          </Link>
          <Link
            href="/como-funciona"
            className="rounded-full border border-marino-200 px-8 py-4 text-base font-medium text-marino-800 transition hover:bg-marino-50"
          >
            Cómo funciona
          </Link>
        </div>
      </section>

      <section className="border-t border-marino-100 bg-marino-50 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-marino-800 sm:text-3xl">
            ¿Eres gasfíter, electricista, cerrajero u otro técnico?
          </h2>
          <p className="mt-3 text-marino-500">
            Únete a SOLVE y recibe nuevos clientes que necesitan tu ayuda.
          </p>
          <Link
            href="/postular"
            className="mt-8 inline-block rounded-full bg-marino-800 px-8 py-4 text-base font-medium text-white transition hover:bg-marino-700"
          >
            Quiero unirme como técnico
          </Link>
        </div>
      </section>
    </main>
  )
}
