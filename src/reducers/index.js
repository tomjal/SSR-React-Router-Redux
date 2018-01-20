export default function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return { ...state, initialText: 'rendered in the browser' };
    default:
      return { ...state };
  }
}
