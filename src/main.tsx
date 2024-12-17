import { createRoot } from 'react-dom/client'
import './components/assets/i18n';
import { App } from './app'
import './index.css'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { Providers } from './provider'

if (process.env.NODE_ENV === 'production') {
    disableReactDevTools();
  }

createRoot(document.getElementById('root')!).render(
    <Providers>
        <App />
    </Providers>
)
