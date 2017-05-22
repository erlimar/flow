// Copyright (c) E5R Development Team. All rights reserved.
// Licensed under the Apache License, Version 2.0. More license information in LICENSE.txt.

const CreatedState = $flow.createState({
    id: 'CREATED',
    name: 'New person'
})

const EditingState = $flow.createState({
    id: 'EDITING',
    name: 'Editing a person data'
})

const ApprovedState = $flow.createState({
    id: 'APPROVED',
    name: 'Person is approved'
})

const DisapprovedState = $flow.createState({
    id: 'DISAPPROVED',
    name: 'Person is disapproved'
})

const FinishedState = $flow.createState({
    id: 'FINISHED',
    name: 'Person record is finished'
})

$flow.configureState(CreatedState, {
    availableStates: [
        EditingState
    ]
})

$flow.configureState(EditingState, {
    availableStates: [
        ApprovedState,
        DisapprovedState
    ]
})

$flow.configureState(ApprovedState, {
    availableStates: [
        FinishedState
    ]
})

$flow.configureState(DisapprovedState, {
    availableStates: [
        FinishedState
    ]
})

class Person extends $flow.Flow {
    get options() {
        return {
            beginState: CreatedState,
            endState: FinishedState
        }
    }
}
