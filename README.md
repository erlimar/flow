# Flow

Uma idéia sobre o uso de Máquina de Estados em implementações que precisam
de objetos que transitam entre estados definidos.

## Pré-requisitos

* NODE >= 7
* NPM >= 3

## Testando

```shell
$ npm install
$ npm start
```

> Abra a URL: http://localhost:8080 e use o console do para experimentar.

O objetivo aqui é mostrar que uma vez configurado um objeto para seguir um fluxo:

```js
class Person extends $flow.Flow {
    get options() {
        return {
            beginState: CreatedState,
            endState: FinishedState
        }
    }
}
```

E que esses fluxos sejam:

```js
const CreatedState = $flow.createState({...})
const EditingState = $flow.createState({...})

const ApprovedState, DisapprovedState, FinishedState
```

E que haja um fluxo definido entre eles:

```js
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

$flow.configureState(ApprovedState, {...})
$flow.configureState(DisapprovedState, {...})
```

A partir deste momento você só pode mudar o estado de um objeto seguindo o fluxo. Ou seja, o objeto sempre iniciará no estado `CreatedState`, e estará concluído quando chegar ao estado `FinishedState`.

Experimente criando um objeto no seu console, e veja seu estado original:

```js
let person = new Person()

console.log(person.state.id)
```

Você também pode conferir se ele está ou não no estado inicial:

```js
console.log($flow.isNew(person))
```

Também pode listar quais possíveis estados que ele aceita no momento atual:

```js
$flow.availableStates(person)
```

Nesse caso você perceberá que só é possível mudar para `EditingState`. Então tente mudar o estado para `ApprovedState`:

```js
person.state = ApprovedState

console.log(person.state.id)
```

Você recebe uma exceção na tela, e verá que o estado do mesmo não mudou. Isso é a máquina de estado garantindo a integridade do fluxo.

Mas se você seguir o fluxo conforme ele é definido, você conseguirá levar o objeto até ao final do fluxo definido, veja o `$flow.isDone(person)`;

```js
person.state = EditingState
$flow.availableStates(person)

person.state = ApprovedState
$flow.availableStates(person)

person.state = FinishedState
$flow.availableStates(person)

$flow.isDone(person)
```

## Pronto!

Essa era a idéia que queria apresentar. Podemos usar esse conceito para implementar funcionalidades como, cadastro de pessoas, contratos, etc.