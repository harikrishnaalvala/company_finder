import {useEffect, useState} from 'react'
import './App.css'

const mockData = [
  {
    id: 1,
    name: 'TechNova',
    industry: 'Software',
    location: 'Bangalore',
    employees: 250,
    rating: 4.6,
  },
  {
    id: 2,
    name: 'GreenWorks',
    industry: 'Energy',
    location: 'Hyderabad',
    employees: 120,
    rating: 4.3,
  },
  {
    id: 3,
    name: 'MediCore',
    industry: 'Healthcare',
    location: 'Chennai',
    employees: 80,
    rating: 4.1,
  },
  {
    id: 4,
    name: 'FinVerse',
    industry: 'Finance',
    location: 'Mumbai',
    employees: 300,
    rating: 4.8,
  },
  {
    id: 5,
    name: 'EduSpark',
    industry: 'Education',
    location: 'Delhi',
    employees: 200,
    rating: 4.4,
  },
  {
    id: 6,
    name: 'AgriGrow',
    industry: 'Agriculture',
    location: 'Pune',
    employees: 60,
    rating: 4.0,
  },
  {
    id: 7,
    name: 'SkyLogix',
    industry: 'Aerospace',
    location: 'Bangalore',
    employees: 500,
    rating: 4.7,
  },
  {
    id: 8,
    name: 'UrbanNest',
    industry: 'Real Estate',
    location: 'Chennai',
    employees: 90,
    rating: 4.2,
  },
  {
    id: 9,
    name: 'TechNova',
    industry: 'Software',
    location: 'Bangalore',
    employees: 250,
    rating: 4.6,
  },

  {
    id: 10,
    name: 'GreenWorks',
    industry: 'Energy',
    location: 'Hyderabad',
    employees: 120,
    rating: 4.3,
  },
  {
    id: 11,
    name: 'MediCore',
    industry: 'Healthcare',
    location: 'Chennai',
    employees: 80,
    rating: 4.1,
  },
  {
    id: 12,
    name: 'FinVerse',
    industry: 'Finance',
    location: 'Mumbai',
    employees: 300,
    rating: 4.8,
  },
  {
    id: 13,
    name: 'EduSpark',
    industry: 'Education',
    location: 'Delhi',
    employees: 200,
    rating: 4.4,
  },
  {
    id: 14,
    name: 'AgriGrow',
    industry: 'Agriculture',
    location: 'Pune',
    employees: 60,
    rating: 4.0,
  },
  {
    id: 15,
    name: 'SkyLogix',
    industry: 'Aerospace',
    location: 'Bangalore',
    employees: 500,
    rating: 4.7,
  },
  {
    id: 16,
    name: 'UrbanNest',
    industry: 'Real Estate',
    location: 'Chennai',
    employees: 90,
    rating: 4.2,
  },
]

export default function App() {
  const [companies, setCompanies] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [industry, setIndustry] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock company data

  // Simulate API call
  useEffect(() => {
    setTimeout(() => {
      setCompanies(mockData)
      setFiltered(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  // Apply filters and sorting
  useEffect(() => {
    let results = [...companies]

    if (search) {
      results = results.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (industry) results = results.filter(c => c.industry === industry)

    if (sortBy === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'location') {
      results.sort((a, b) => a.location.localeCompare(b.location))
    }

    setFiltered(results)
  }, [search, industry, sortBy, companies])

  if (loading) return <div className="loading">Loading companies...</div>

  return (
    <div className="container">
      <h1>🏢 Company Finder</h1>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={industry} onChange={e => setIndustry(e.target.value)}>
          <option value="">All Industries</option>
          <option value="Software">Software</option>
          <option value="Energy">Energy</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
          <option value="Education">Education</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Aerospace">Aerospace</option>
          <option value="Real Estate">Real Estate</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="name">Name (A–Z)</option>
          <option value="location">Location</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid">
        {filtered.length ? (
          filtered.map(company => (
            <div
              key={company.id}
              className="card"
              role="button"
              tabIndex={0}
              onClick={() => setSelectedCompany(company)}
              onKeyDown={e => e.key === 'Enter' && setSelectedCompany(company)}
            >
              <h3>{company.name}</h3>
              <p>
                <strong>Industry:</strong> {company.industry}
              </p>
              <p>
                <strong>Location:</strong> {company.location}
              </p>
            </div>
          ))
        ) : (
          <p className="no-results">No companies found.</p>
        )}
      </div>

      {/* Modal */}
      {selectedCompany && (
        <div
          className="modal-overlay"
          role="button"
          tabIndex={0}
          onClick={() => setSelectedCompany(null)}
          onKeyDown={e => e.key === 'Enter' && setSelectedCompany(null)}
        >
          <div
            className="modal"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h2>{selectedCompany.name}</h2>
            <p>
              <strong>Industry:</strong> {selectedCompany.industry}
            </p>
            <p>
              <strong>Location:</strong> {selectedCompany.location}
            </p>
            <p>
              <strong>Employees:</strong> {selectedCompany.employees}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {selectedCompany.rating}
            </p>
            <button type="button" onClick={() => setSelectedCompany(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
