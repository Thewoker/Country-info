"use client"
import { Suspense } from 'react'
import CountryInfo from '@/components/CountryInfo'
import Loading from '@/components/Loading'
import { useParams } from 'next/navigation'

export default function CountryPage() {
    const { code } = useParams()
    return (
        <main className="container mx-auto p-4">
            <Suspense fallback={<Loading />}>
                <CountryInfo countryCode={code} />
            </Suspense>
        </main>
    )
}

