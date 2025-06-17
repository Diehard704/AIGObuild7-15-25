import { FragmentWeb } from './fragment-web'

export function BuildPreview() {
  return (
    <div className="h-full">
      {/* Your existing Preview component content but full width */}
      <div className="h-full w-full">
        {/* Use your existing FragmentWeb or Preview components here */}
        <iframe
          className="h-full w-full"
          src="/api/preview" // Your E2B preview URL
          sandbox="allow-forms allow-scripts allow-same-origin"
        />
      </div>
    </div>
  )
}
