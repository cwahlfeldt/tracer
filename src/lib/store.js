export function createStore(reducer) {
    let currentState
    let listeners = []

    const getState = () => currentState

    const subscribe = (listener) => {
        listeners.push(listener)
    }

    const dispatch = (action, payload) => {
        currentState = reducer(currentState, action, payload)
        listeners.forEach((l) => l())
    }

    dispatch({ type: '__INIT__' })

    return {
        dispatch,
        subscribe,
        getState,
    }
}
