import { assign, createMachine } from 'xstate';
import { useMachine } from '@xstate/react'

export const taskMachine = createMachine({
  id: 'task',
  context: {
    title: 'Hello',
    isCompleted: false
  },
  initial: 'empty',
  types: {} as {
    events: { type: 'complete'; message: string } | { type: 'delete' };
  },
  states: {
    empty: {
      on: { complete: {target: 'completed', actions: assign({
        title: "zupa"
      })} },
    },
    completed: { 
      on: { delete: 'deleted' },
    },
    deleted: {}
  },
});

// x-state troche crazy obczaj w examples stopwach i sprobuj mzoe timer do x-state

const PlayGround = () => {
  const [state, send ] = useMachine(taskMachine);  

  console.log(state.can({type: 'delete'}))
  return (
    <div>
      {state.context.title}
      <button onClick={() => send({
        type: "complete",
        message: "hola amigos"
      })} >complete</button>
    </div>

  )
}

export default PlayGround
