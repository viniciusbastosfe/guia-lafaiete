import { useState } from 'react'
import { Search, Filter } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string, category: string) => void
  placeholder?: string
  showCategory?: boolean
}

export function SearchBar({ 
  onSearch, 
  placeholder = "Buscar eventos, empresas, músicos...", 
  showCategory = true 
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('todos')

  const categories = [
    { value: 'todos', label: 'Todos' },
    { value: 'eventos', label: 'Eventos' },
    { value: 'empresas', label: 'Empresas' },
    { value: 'influenciadores', label: 'Influenciadores' },
    { value: 'musicos', label: 'Músicos' },
    { value: 'sorteios', label: 'Sorteios' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query, category)
  }

  return (
    <div className="w-full mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#f31100] focus:ring-2 focus:ring-[#f31100]/20 transition-all"
          />
        </div>
        
        {showCategory && (
          <div className="relative md:w-48">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none w-full pl-12 pr-10 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#f31100] focus:ring-2 focus:ring-[#f31100]/20 transition-all bg-white cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <button
          type="submit"
          className="px-8 py-3 bg-[#f31100] text-white rounded-full hover:bg-[#d10e00] transition-all duration-300 font-medium md:w-auto w-full"
        >
          Buscar
        </button>
      </form>
    </div>
  )
}
