// Copyright (c) E5R Development Team. All rights reserved.
// Licensed under the Apache License, Version 2.0. More license information in LICENSE.txt.

(function(_) {
    const $config = []

    class State {
        constructor(id, name) {
            this._id = id
            this._name = name
        }

        get id() {
            return this._id
        }

        get name() {
            return this._name
        }
    }

    function invalidStateError(state) {
        let error = new Error('Invalid state.')

        error.stateObject = state

        return error
    }

    class Flow {
        constructor() {
            if (!this.options || !(this.options.beginState instanceof State)) {
                throw new Error('Invalid #options.beginState value')
            }

            this._state = this.options.beginState
        }

        get options() {
            return {}
        }

        get state() {
            return this._state
        }

        set state(value) {
            let f = $config.filter((v) => v.state === this._state)

            if (f.length !== 1) {
                throw invalidStateError(value)
            }

            if (0 > f[0].options.availableStates.indexOf(value)) {
                throw invalidStateError(value)
            }

            this._state = value
        }
    }

    /**
     * State Machine Management
     */
    class SMM {

        get State() {
            return State
        }

        get Flow() {
            return Flow
        }

        createState(options) {
            return new State(options.id, options.name)
        }

        configureState(state, options) {
            let filtered = $config.filter((value) => value.state === state)

            if (filtered.length === 1) {
                filtered[0].options = options
                return
            }

            $config.push({
                state: state,
                options: options
            })
        }

        availableStates(object) {
            if (!(object instanceof Flow)) {
                throw new Error('Invalid object')
            }

            let f = $config.filter((v) => v.state === object._state)

            return f.length ? f[0].options.availableStates : []
        }

        isNew(object) {
            if (!(object instanceof Flow)) {
                throw new Error('Invalid object')
            }

            if (!object.options || !(object.options.beginState instanceof State)) {
                throw new Error('Invalid #options.beginState value')
            }

            return object._state === object.options.beginState
        }

        isDone(object) {
            if (!(object instanceof Flow)) {
                throw new Error('Invalid object')
            }

            if (!object.options || !(object.options.beginState instanceof State)) {
                throw new Error('Invalid #options.beginState value')
            }

            return object._state === object.options.endState
        }
    }

    _.$flow = _.$flow || new SMM()
})(window)
