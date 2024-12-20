import { useLocation } from 'react-router-dom'

import { ModeToggle } from './mode-toggle'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'

export const Header = () => {

    const location = useLocation()

    const links = [
        {
            name: 'Home',
            href: routes.home
        },
    ]

    return (
        <header className='sticky top-0 z-50 flex items-center justify-between gap-x-20 border-b bg-background px-10 py-6'>
            <ModeToggle />
            <NavigationMenu>
                <NavigationMenuList className='gap-x-4'>
                    {links.map((link) => {
                        return (
                            <NavigationMenuItem key={link.name}>
                                <a href={link.href}>
                                    <NavigationMenuLink
                                        active={location.pathname === link.href}
                                        className={cn(navigationMenuTriggerStyle())}>
                                        {link.name}
                                    </NavigationMenuLink>
                                </a>
                            </NavigationMenuItem>
                        )
                    })}
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    )
}
