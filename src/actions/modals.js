let modalId = null
export const setModalId = (id, location, tree) => {
  return {
    type: 'SET_MODAL_ID',
    id,
    location,
    tree
  }
}
