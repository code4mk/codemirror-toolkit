import {
  EditorState
} from '@codemirror/state'
import {
  EditorView,
  EditorViewConfig
} from '@codemirror/view'

import { CreateStateOptions } from 'types/interface'

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

/**
 * 
 * @param config 
 * @returns 
 */
const createEditorView = (config: EditorViewConfig) => {
  let view = new EditorView({ ...config })
  return view
}

/**
 * Destroy EdiorView.
 * 
 * @param view 
 * @returns 
 */
const destroyEditorView = (view: EditorView) => {
  return view.destroy()
}

export {
  createEditorState,
  createEditorView,
  destroyEditorView
}