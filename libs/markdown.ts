import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { MDEditorProps } from "@uiw/react-md-editor";

interface MarkDownEditorProps extends MDEditorProps {
  value: string;
  onChange: any;
}

interface MarkDownPreviewProps extends MDEditorProps {
  source: string | null;
}

const MDEditor = dynamic<MarkDownEditorProps>(
  () => import("@uiw/react-md-editor").then((mod) => mod.default) as any,
  { ssr: false }
);

const MarkdownPreview = dynamic<MarkDownPreviewProps>(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default) as any,
  { ssr: false }
);

export { MDEditor, MarkdownPreview };
