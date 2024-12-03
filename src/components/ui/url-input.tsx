import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const UrlInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className='space-y-2'>
            <Label htmlFor='url'>Url</Label>
            <div className='flex rounded-lg shadow-sm shadow-black/5'>
                <span className='-z-10 inline-flex items-center rounded-s-lg border border-input bg-background px-3 text-sm text-muted-foreground'>
                    https://
                </span>
                <Input
                    {...props}
                    id='url'
                    className='-ms-px rounded-s-none shadow-none'
                    placeholder='google.com'
                />
            </div>
        </div>
    )
}
