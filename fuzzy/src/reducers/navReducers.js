import App from '../App';

const initialState = App.router.getStateForAction(App.router.getActionForPathAndParams('Login'));

const navReducers = (state = initialState, action) => {
  const nextState = App.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export default navReducers