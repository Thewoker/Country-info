import CountryList from '@/components/CountryList'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Countries of the World</h1>
      <CountryList />
    </main>
  )
}

