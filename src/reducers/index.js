//提供状态，提供可以被action计算的状态，视图与状态一一对应
export default (state = 0, action) => {
    console.log(action.type)
    switch(action.type) {
      case 'INCREMENT': 
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      default:
        return state; 
    }
  }
  