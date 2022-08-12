import { EditorView } from "@codemirror/view"

const EditorTools = (view: EditorView) => {

  const getDoc = () => {
    if (view?.state?.doc?.toString()) {
      return view.state.doc.toString()
    }
    return " "
  }

  const setDoc = (newDoc: string) => {
    if (newDoc !== getDoc() && view?.state?.doc?.toString) {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: newDoc
        }
      })
    }
  }
 
  const focus = () => view.focus()

  return {
    getDoc,
    setDoc,
    focus
  }

}

export {
  EditorTools
}