'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import PopulationChart from './PopulationChart'

export default function CountryInfo({ countryCode }) {
    const [countryData, setCountryData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/country-info/${countryCode}`)
                console.log(response.data)
                setCountryData(response.data)
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching country data:', error)
                setError('Failed to load country information. Please check your connection and try again.')
                setIsLoading(false)
            }
        }

        fetchCountryData()
    }, [countryCode])

    if (isLoading) return <div className="text-center" aria-live="polite">Loading country information...</div>
    if (error) return <div className="text-center text-red-500" aria-live="assertive">{error}</div>
    if (!countryData) return null

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <h1 className="text-3xl font-bold">{countryData.officialName}</h1>
                <Image src={countryData.flag} alt={`Flag of ${countryData.Ukraine}`} width={64} height={40} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-2">Border Countries</h2>
                <ul className="flex flex-wrap gap-2" role="list">
                    {countryData.borders.map(code => (
                        <li key={code.countryCode} className="bg-blue-100 px-3 py-1 rounded">
                            <Link href={`/country/${code.countryCode}`} className="text-blue-600 hover:underline">
                                {code.officialName}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <PopulationChart data={countryData.population} />
        </div>
    )
}

