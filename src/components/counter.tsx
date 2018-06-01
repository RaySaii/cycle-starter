import xs, {Stream} from 'xstream'
import {VNode, DOMSource,} from '@cycle/dom'
import {StateSource} from 'cycle-onionify'
import styles from './counter.less'
import sstyles from './counter.scss'
import {BaseSources, BaseSinks} from '../interfaces'
import {Observable} from "rxjs";
import {Test} from "./test";
import isolate from '@cycle/isolate';


// Types
export interface Sources extends BaseSources {
    onion?: StateSource<State>;
}

export interface Sinks extends BaseSinks {
    onion?: Stream<Reducer>;
}

// State
export interface State {
    count: number;
}

export const defaultState: State = {
    count: 30,
}
export type Reducer = (prev: State) => State | undefined;


export function Counter({DOM, onion}) {
    const test = isolate(Test)({DOM, onion})

    const action$ = intent(DOM)
    const vdom$ = view({DOM, onion})

    const routes$ = DOM.select('[data-action="navigate"]')
        .events('click')
        .mapTo('/test')
    return {
        DOM: Observable.combineLatest(vdom$, test.DOM).map(([a, test]) => {
            return (
                <div>
                    dsd
                    {a}
                    {test}
                </div>
            )
        }),
        onion: Observable.merge(action$, test.onion),
        router: routes$,
    }
}

function intent(DOM: DOMSource) {
    const init$ = Observable.of(
        prevState => (prevState === undefined ? defaultState : prevState),
    )

    const add$ = DOM.select('.' + styles.add)
        .events('click')
        .mapTo<Reducer>(state => ({...state, count: state.count + 1}))

    const subtract$ = DOM.select('.' + sstyles.subtract)
        .events('click')
        .mapTo<Reducer>(state => ({...state, count: state.count - 1}))

    return Observable.merge(init$, add$, subtract$)
}

function view(source) {
    const {onion} = source
    return onion.state$.map(({count}) => {
        return (
            <div>
                <h2>My Awesodsd Cycle.js app - Page 1</h2>
                <span>{'Cor: ' + count}</span>
                <button type="button" className={styles.add}>
                    Increases
                </button>
                <button type="button" className={sstyles.subtract}>
                    Decrease
                </button>
                <button type="button" data-action="navigate">
                    test
                </button>
            </div>
        )
    })
}
