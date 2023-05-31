//create states and transitions
const state1: State = {
	name: "State 1",
	percentReady: 10,
	transitions: [
	  {
		event: { name: "Event 1", execute: () => console.log("Event 1 executed") },
		condition: () => true, // is always true and will always be executed
		nextState: state2
	  },
	  {
		event: event2,
		condition: () => false, // is always false and will never be executed
		nextState: state3
	  },
	  {
		event: event3,
		condition: () => currentState.percentReady >= 50, // is true if the current state is 50% ready
		nextState: state4
	  }
	]
  };