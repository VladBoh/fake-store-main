import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { AppSidebar } from './components/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { ErrorPage } from './pages/error'
import { MetaHead } from '@/components/meta-head'
import { Toaster } from '@/components/ui/sonner'

export const Layout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />

            <MetaHead />
            <SidebarInset>
                <main className='px-6 pt-2 bg-[#b59e8d] h-full'>
                    <SidebarTrigger />
                    <ErrorBoundary fallback={<ErrorPage />}>
                        <Outlet />
                    </ErrorBoundary>
                </main>
            </SidebarInset>

            <Toaster
                richColors
                duration={5000}
            />
        </SidebarProvider>
    )
}
