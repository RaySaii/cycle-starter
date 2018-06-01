import isolate from '@cycle/isolate';

import {driverNames} from '../drivers';
import {RouteValue, routes, initialRoute} from '../routes';

import {Observable} from "rxjs";


export const defaultState = {
    counter: {count: 5},
    test: {count: 5},
    speaker: undefined //use default state of component
};

export function App(sources) {
    const initReducer$ = Observable.of(
        prevState => (prevState === undefined ? defaultState : prevState)
    );

    const match$ = sources.router.define(routes);

    const componentSinks$ = match$.map(
        ({path, value}: { path: string; value }) => {
            const {component, scope} = value;
            return isolate(component, scope)({
                ...sources,
                router: sources.router.path(path)
            });
        }
    );

    function extractSinks(sinks$,
                          driverNames: string[]) {
        return driverNames
            .map(d => ({
                [d]: sinks$
                    .filter(s => !!s[d])
                    .switchMap(s => s[d])
            }))
            .reduce((acc, curr) => Object.assign(acc, curr), {});
    }

    const sinks = extractSinks(componentSinks$, driverNames);
    return {
        ...sinks,
        onion: Observable.merge(initReducer$, sinks.onion)
    };
}
