import {Observable} from "rxjs";
import styles from './index.less';
import {defaultState, Reducer} from "../counter";

export function Test({DOM, onion}) {
    const init$ = Observable.of(
        prevState => (prevState === undefined ? {count2: 1} : prevState),
    )

    const add$ = DOM.select('.' + styles.add)
        .events('click')
        .mapTo(state => ({...state, count2: state.count2 + 1}))

    const reducer$ = Observable.merge(init$, add$)
    return {
        DOM: onion.state$.map(({count2}) => {
                return (
                    <div>
                        <button type="button" className={styles.add}>
                            Increases
                        </button>
                        count: {count2}
                    </div>
                )
            }
        ),
        onion: reducer$
    }
}
