'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'

export default function CountryList() {
    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/available-countries')
                console.log(response.data)
                setCountries(response.data)
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching countries:', error)
                setError('Failed to load countries. Please check your connection and try again.')
                setIsLoading(false)
            }
        }

        fetchCountries()
    }, [])

    if (isLoading) return <div className="text-center" aria-live="polite">Loading countries...</div>
    if (error) return <div className="text-center text-red-500" aria-live="assertive">{error}</div>

    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
            {countries.map(country => (
                <li key={country.countryCode} className="border p-4 rounded-lg hover:bg-gray-100">
                    <Link href={`/country/${country.countryCode}`} className="text-blue-600 hover:underline">
                        {country.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

