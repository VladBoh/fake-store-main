import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { routes } from './config/routes'
import { Layout } from './layout'
import { CartPage } from './pages/cart'
import { ErrorPage } from './pages/error'
import { HomePage } from './pages/home'
import { ProductsPage } from './pages/products'
import { UsersPage } from './pages/users'
import { ProductPage } from './components/products/product'
import { LoginPage } from './pages/login'
import { CollorGeneratorPage } from './pages/dashboard'
import { RequireAuthProvider } from './provider/provider-for-auth'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: routes.cart,
                element:<RequireAuthProvider><CartPage /></RequireAuthProvider>
            },
            {
                path: routes.generator,
                element: <CollorGeneratorPage />
            },
            {
                path: routes.products,
                element:<RequireAuthProvider><ProductsPage /></RequireAuthProvider>
            },
            {
                path: routes.users,
                element:<RequireAuthProvider><UsersPage /></RequireAuthProvider>
            },
            {
                path: routes.product,
                element: <ProductPage />
            }
        ]
    },
    {
        path: routes.auth,
        element: <LoginPage />
    },
    {
        path: '*',
        element: <ErrorPage />
    }
])

export const App = () => <RouterProvider router={router} />
