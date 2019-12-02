export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('WevolverState')
    if (serializedState !== null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch(err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
        console.log('STATTE')
    const serializedState = JSON.stringify(state)
    localStorage.getItem('WevolverState', serializedState)
    return JSON.parse(serializedState)
  } catch(err) {
    console.log(err)
  }
}