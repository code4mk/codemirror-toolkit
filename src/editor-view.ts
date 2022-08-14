import {
  EditorView,
  EditorViewConfig,
} from '@codemirror/view'

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
  createEditorView,
  destroyEditorView
}