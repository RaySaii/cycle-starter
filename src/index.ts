import { run } from '@cycle/run'

import { buildDrivers, wrapMain } from './drivers'
import { Component } from './interfaces'
import { App } from './components/app'

const main: Component = wrapMain(App)
const DEV = process.env.NODE_ENV === 'development'

run(main as any, buildDrivers(([k, t]) => [k, t()]))

if ((module as any).hot) {
    (module as any).hot.accept('./components/app', () => {
        const newApp = (require('./components/app') as any).App
        run(wrapMain(newApp) as any, buildDrivers(([k, t]) => [k, t()]))
    })
}
