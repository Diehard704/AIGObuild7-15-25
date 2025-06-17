'use client'

export function ExampleShowcase() {
  return (
    <div className="bg-white rounded-t-3xl mt-16 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">My Fragments Workspace</h2>
          <div className="flex items-center gap-4">
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="px-4 py-2 border rounded-lg"
            />
            <select className="px-4 py-2 border rounded-lg">
              <option>Last edited</option>
            </select>
            <select className="px-4 py-2 border rounded-lg">
              <option>All creators</option>
            </select>
            <button className="ml-auto text-blue-600 hover:underline">
              View All
            </button>
          </div>
        </div>
        
        {/* Example project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="h-40 bg-orange-500 flex items-center justify-center text-white font-bold">
              Find Your Perfect Home
            </div>
            <div className="p-4">
              <h3 className="font-semibold">Real Estate Platform</h3>
              <p className="text-gray-600 text-sm">Property listings and search</p>
            </div>
          </div>
          {/* Add more example cards */}
        </div>
      </div>
    </div>
  )
}
