import initialState from '../game/state/initialState.js'

export function createStore(reducer, initialState) {
    let currentState
    let listeners = []

    const getState = () => currentState

    const subscribe = listener => {
        listeners.push(listener)
    }

    const dispatch = action => {
        currentState = reducer(currentState, action)
        listeners.forEach(l => l())
    }

    dispatch({ type: '__INIT__' })

    return {
        dispatch,
        subscribe,
        getState
    }
}

export function combineReducers(reducers) {
    return function combination(state = initialState, action) {
        let nextState = {}
        let hasChanged = false

        Object.keys(reducers).forEach(key => {
            let reducer = reducers[key]
            let previousStateForKey = state[key]

            nextState[key] = reducer(previousStateForKey, action)

            if (nextState[key] !== previousStateForKey) {
                hasChanged = true
            }
        })

        return hasChanged ? nextState : state
    }
}