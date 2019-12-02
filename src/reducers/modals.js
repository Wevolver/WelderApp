const modalsDefault = {
  activeId: null
}

const modals = (state = modalsDefault, action) => {
  switch (action.type) {
    case 'SET_MODAL_ID':
      return Object.assign({}, state, {
        activeId: action.id,
        modalPath: action.location,
        tree: action.tree
      })
    default:
      return state
  }
}

export default modals
