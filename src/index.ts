import run from '@cycle/rxjs-run'

import { buildDrivers, wrapMain } from './drivers'
import { App } from './components/app'

const main = wrapMain(App)

run(main as any, buildDrivers(([k, t]) => [k, t()]))

if ((module as any).hot) {
    (module as any).hot.accept('./components/app', () => {
        const newApp = (require('./components/app') as any).App
        run(wrapMain(newApp) as any, buildDrivers(([k, t]) => [k, t()]))
    })
}
