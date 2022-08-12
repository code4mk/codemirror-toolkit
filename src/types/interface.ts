import { ViewUpdate } from "@codemirror/view";
import { EditorStateConfig } from "@codemirror/state";

export interface CreateStateOptions extends EditorStateConfig {
  onChange(doc: string, viewUpdate: ViewUpdate): void
  onUpdate(viewUpdate: ViewUpdate): void
  onFocus(viewUpdate: ViewUpdate): void
  onBlur(viewUpdate: ViewUpdate): void
}