import {EditorState, EditorStateConfig} from "@codemirror/state"
import { ViewUpdate, EditorView } from "@codemirror/view"


export interface CreateStateOptions extends EditorStateConfig {
  onChange(doc: string, viewUpdate: ViewUpdate): void
  onUpdate(viewUpdate: ViewUpdate): void
  onFocus(viewUpdate: ViewUpdate): void
  onBlur(viewUpdate: ViewUpdate): void
}

const createEditorState = ({onUpdate, onChange, onFocus, onBlur, ...config}: CreateStateOptions) => {
  let state = EditorState.create({
    doc: config.doc,
    selection: config.selection,
    extensions: [
      ...(Array.isArray(config.extensions) ? config.extensions : [config.extensions]),
      EditorView.updateListener.of((viewUpdate) => {
        onUpdate(viewUpdate)
        // state change on onchange action
        if (viewUpdate.docChanged) {
          onChange(viewUpdate.state.doc.toString(), viewUpdate)
        }
        // state change on focus action
        if (viewUpdate.focusChanged) {
          viewUpdate.view.hasFocus ? onFocus(viewUpdate) : onBlur(viewUpdate)
        }
      })
    ]
  })
  return state
}

export {
  createEditorState
}