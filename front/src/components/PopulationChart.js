'use client'

import { useState, useEffect } from 'react'

export default function PopulationChart({ data }) {
  const [maxPopulation, setMaxPopulation] = useState(0)
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (!data || typeof data !== 'object') {
      console.error('Invalid data provided to PopulationChart')
      return
    }

    let populationData = []

    if (Array.isArray(data)) {
      populationData = data
    } else if (data.populationCounts && Array.isArray(data.populationCounts)) {
      populationData = data.populationCounts
    } else {
      console.error('Unexpected data structure in PopulationChart')
      return
    }

    const max = Math.max(...populationData.map(d => d.count || d.value || 0))
    setMaxPopulation(max)
    setChartData(populationData)
  }, [data])

  if (!chartData.length) {
    return <div>No population data available</div>
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-2">Population Over Time</h3>
      <div className="flex flex-col space-y-2">
        {chartData.map((item) => (
          <div key={item.year} className="flex items-center">
            <span className="w-16 text-right mr-2">{item.year}</span>
            <div className="flex-grow bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: `${((item.count || item.value || 0) / maxPopulation) * 100}%` }}
              ></div>
            </div>
            <span className="w-24 text-right ml-2">
              {(item.count || item.value || 0).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

