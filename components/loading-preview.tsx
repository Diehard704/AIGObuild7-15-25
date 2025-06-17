export function LoadingPreview() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-900">
      <div className="text-center text-white max-w-md">
        {/* Cloud loading icon */}
        <div className="w-24 h-24 mx-auto mb-6 relative">
          <div className="absolute inset-0 bg-gray-600 rounded-full animate-pulse"></div>
          <div className="absolute top-2 left-2 right-2 bottom-2 bg-gray-500 rounded-full animate-pulse delay-100"></div>
        </div>
        
        <h3 className="text-2xl font-semibold mb-6">Spinning up preview...</h3>
        
        {/* Feature checklist */}
        <div className="space-y-3 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span className="text-gray-300">Select specific elements to modify</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
            <span className="text-gray-300">Upload images as a reference</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
            <span className="text-gray-300">Instantly preview your changes</span>
          </div>
        </div>
      </div>
    </div>
  )
}
