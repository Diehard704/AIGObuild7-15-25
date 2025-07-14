export default function TestRefactor() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Refactor Page</h1>
      <p>This is a simple test page to verify the refactor functionality works.</p>
      <button 
        onClick={() => {
          fetch('/api/refactor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              code: 'console.log("hello world")',
              tier: 'free'
            })
          })
          .then(res => res.json())
          .then(data => {
            console.log('API Response:', data)
            alert('Check console for API response')
          })
          .catch(err => {
            console.error('Error:', err)
            alert('Error: ' + err.message)
          })
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Test API
      </button>
    </div>
  )
}