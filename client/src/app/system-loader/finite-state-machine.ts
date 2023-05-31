/**
 * Events can be linked in the finite state machine. 
 * In the finite automaton, each event is usually associated with the transition from one state to another.
 * Thus, the execution of one event can lead to the execution of another event, 
 * and you may also be allowed to go to another event without executing the previous one.
 * 
 */

interface Event {
	name: string;
	execute: (currentState: State, stateMachine: StateMachine) => void;
  }

interface State {
	name: string;
	percentReady: number;
	transitions: {
	  event: Event;
	  condition: () => boolean;
	  nextState: State;
	}[];
  }

  class StateMachine {
	private currentState: State;
  
	constructor(initialState: State) {
	  this.currentState = initialState;
	}
  
	executeEvent(event: Event) {
	  event.execute(this.currentState, this);
	}
  
	transitionToState(nextState: State) {
	  this.currentState = nextState;
	}
  }