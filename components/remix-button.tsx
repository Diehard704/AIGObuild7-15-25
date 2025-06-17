import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { RefreshCw, Wand2 } from 'lucide-react'

interface RemixButtonProps {
  currentPrompt: string
  onRemix: (type: 'enhance' | 'rebuild') => void
  isLoading?: boolean
}

export function RemixButton({ currentPrompt, onRemix, isLoading }: RemixButtonProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => onRemix('rebuild')}
        disabled={isLoading}
      >
        <RefreshCw className="w-4 h-4" />
        Rebuild
      </Button>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => onRemix('enhance')}
        disabled={isLoading}
      >
        <Wand2 className="w-4 h-4" />
        Enhance
      </Button>
    </div>
  )
} 