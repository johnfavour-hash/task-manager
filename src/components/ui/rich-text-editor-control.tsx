"use client"

import {
  createBooleanControl,
  createSelectControl,
  createSwatchControl,
} from "./rich-text-editor-control-utils"
import { Box } from "@chakra-ui/react"
import {
  LuAlignCenter,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuCode,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHighlighter,
  LuItalic,
  LuLink,
  LuLink2,
  LuList,
  LuListOrdered,
  LuMinus,
  LuQuote,
  LuRotateCcw,
  LuRotateCw,
  LuStrikethrough,
  LuSubscript,
  LuSuperscript,
  LuType,
  LuUnderline,
} from "react-icons/lu"


export const FontFamily = createSelectControl({
  label: "Font Family",
  width: "80px",
  options: [
    { value: "default", label: "Default" },
    { value: "serif", label: "Serif" },
    { value: "mono", label: "Monospace" },
    { value: "cursive", label: "Cursive" },
  ],
  getValue: (editor) =>
    editor.getAttributes("textStyle")?.fontFamily || "default",
  command: (editor, value) =>
    value === "default"
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (editor.chain() as any).focus().unsetFontFamily().run()
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (editor.chain() as any).focus().setFontFamily(value).run(),
})

export const FontSize = createSelectControl({
  label: "Font Size",
  width: "64px",
  options: [
    { value: "12px", label: "12px" },
    { value: "14px", label: "14px" },
    { value: "16px", label: "16px" },
    { value: "18px", label: "18px" },
  ],
  getValue: (editor) => editor.getAttributes("textStyle")?.fontSize || "14px",
  command: (editor, value) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ; (editor.chain() as any).focus().setMark("textStyle", { fontSize: value }).run()
  },
})

export const Bold = createBooleanControl({
  label: "Bold",
  icon: LuBold,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().toggleBold().run(),
  getVariant: (editor) => (editor.isActive("bold") ? "subtle" : "ghost"),
})

export const Italic = createBooleanControl({
  label: "Italic",
  icon: LuItalic,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().toggleItalic().run(),
  getVariant: (editor) => (editor.isActive("italic") ? "subtle" : "ghost"),
})

export const Underline = createBooleanControl({
  label: "Underline",
  icon: LuUnderline,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().toggleUnderline().run(),
  getVariant: (editor) => (editor.isActive("underline") ? "subtle" : "ghost"),
})

export const Strikethrough = createBooleanControl({
  label: "Strikethrough",
  icon: LuStrikethrough,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().toggleStrike().run(),
  getVariant: (editor) => (editor.isActive("strike") ? "subtle" : "ghost"),
})

export const Code = createBooleanControl({
  label: "Code",
  icon: LuCode,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().toggleCode().run(),
  getVariant: (editor) => (editor.isActive("code") ? "subtle" : "ghost"),
})

export const Subscript = createBooleanControl({
  label: "Subscript",
  icon: LuSubscript,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().toggleSubscript().run(),
  getVariant: (editor) => (editor.isActive("subscript") ? "subtle" : "ghost"),
})

export const Superscript = createBooleanControl({
  label: "Superscript",
  icon: LuSuperscript,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().toggleSuperscript().run(),
  getVariant: (editor) => (editor.isActive("superscript") ? "subtle" : "ghost"),
})

export const H1 = createBooleanControl({
  label: "H1",
  icon: LuHeading1,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().toggleHeading({ level: 1 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 1 }) ? "subtle" : "ghost",
})

export const H2 = createBooleanControl({
  label: "H2",
  icon: LuHeading2,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().toggleHeading({ level: 2 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 2 }) ? "subtle" : "ghost",
})

export const H3 = createBooleanControl({
  label: "H3",
  icon: LuHeading3,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().toggleHeading({ level: 3 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 3 }) ? "subtle" : "ghost",
})

export const H4 = createBooleanControl({
  label: "H4",
  icon: LuHeading4,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().toggleHeading({ level: 4 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 4 }) ? "subtle" : "ghost",
})

export const BulletList = createBooleanControl({
  label: "Bullet List",
  icon: LuList,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().toggleBulletList().run(),
  getVariant: (editor) => (editor.isActive("bulletList") ? "subtle" : "ghost"),
})

export const OrderedList = createBooleanControl({
  label: "Ordered List",
  icon: LuListOrdered,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().toggleOrderedList().run(),
  getVariant: (editor) => (editor.isActive("orderedList") ? "subtle" : "ghost"),
})

export const Blockquote = createBooleanControl({
  label: "Blockquote",
  icon: LuQuote,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().toggleBlockquote().run(),
  getVariant: (editor) => (editor.isActive("blockquote") ? "subtle" : "ghost"),
})

export const Hr = createBooleanControl({
  label: "Horizontal Rule",
  icon: LuMinus,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().setHorizontalRule().run(),
  getVariant: (editor) => (editor.isActive("blockquote") ? "subtle" : "ghost"),
})

export const Link = createBooleanControl({
  label: "Link",
  icon: LuLink,
  command: (editor) => {
    const url = window.prompt("Enter URL")
    if (url) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ; (editor.chain() as any)
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run()
    }
  },
  getVariant: (editor) => (editor.isActive("link") ? "subtle" : "ghost"),
})

export const Unlink = createBooleanControl({
  label: "Unlink",
  icon: LuLink2,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().unsetLink().run(),
  getVariant: (editor) => (editor.isActive("link") ? "subtle" : "ghost"),
})

export const AlignLeft = createBooleanControl({
  label: "Align Left",
  icon: LuAlignLeft,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().setTextAlign("left").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "left" }) ? "subtle" : "ghost",
})

export const AlignCenter = createBooleanControl({
  label: "Align Center",
  icon: LuAlignCenter,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().setTextAlign("center").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "center" }) ? "subtle" : "ghost",
})

export const AlignJustify = createBooleanControl({
  label: "Align Justify",
  icon: LuAlignJustify,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().setTextAlign("justify").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "justify" }) ? "subtle" : "ghost",
})

export const AlignRight = createBooleanControl({
  label: "Align Right",
  icon: LuAlignRight,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().setTextAlign("right").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "right" }) ? "subtle" : "ghost",
})

export const Undo = createBooleanControl({
  label: "Undo",
  icon: LuRotateCcw,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().undo().run(),
  isDisabled: (editor) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !(editor.can() as any).undo(),
  getVariant: (editor) => (editor.isActive("link") ? "subtle" : "ghost"),
})

export const Redo = createBooleanControl({
  label: "Redo",
  icon: LuRotateCw,
  command: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().redo().run(),
  isDisabled: (editor) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !(editor.can() as any).redo(),
  getVariant: (editor) => (editor.isActive("link") ? "subtle" : "ghost"),
})

const SWATCH_OPTIONS = [
  { label: "Black", value: "#000000", color: "#000000" },
  { label: "Red", value: "#FF0000", color: "#FF0000" },
  { label: "Green", value: "#00FF00", color: "#00FF00" },
  { label: "Blue", value: "#0000FF", color: "#0000FF" },
  { label: "Yellow", value: "#FFFF00", color: "#FFFF00" },
  { label: "Purple", value: "#800080", color: "#800080" },
  { label: "Orange", value: "#FFA500", color: "#FFA500" },
]

export const TextColor = createSwatchControl({
  label: "Text Color",
  swatches: SWATCH_OPTIONS,
  getValue: (editor) => {
    const color = editor.getAttributes("textStyle")?.color
    return color || ""
  },
  getProps: (editor) => ({
    variant: editor.getAttributes("textStyle")?.color ? "subtle" : "ghost",
  }),
  command: (editor, color) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().setMark("textStyle", { color }).run(),
  icon: LuType,
  onRemove: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().unsetMark("textStyle").run(),
})

const HIGHLIGHT_SWATCH_OPTIONS = [
  { label: "Yellow", value: "#FFFF00", color: "#FFFF00" },
  { label: "Green", value: "#00FF00", color: "#00FF00" },
  { label: "Cyan", value: "#00FFFF", color: "#00FFFF" },
  { label: "Pink", value: "#FF69B4", color: "#FF69B4" },
  { label: "Orange", value: "#FFA500", color: "#FFA500" },
  { label: "Purple", value: "#DDA0DD", color: "#DDA0DD" },
]

export const Highlight = createSwatchControl({
  label: "Highlight",
  swatches: HIGHLIGHT_SWATCH_OPTIONS,
  getValue: (editor) => {
    const color = editor.getAttributes("highlight")?.color
    return color || ""
  },
  getProps: (editor) => ({
    variant: editor.getAttributes("highlight")?.color ? "subtle" : "ghost",
  }),
  command: (editor, color) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().toggleHighlight({ color }).run(),
  icon: LuHighlighter,
  showRemove: true,
  onRemove: (editor) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor.chain() as any).focus().unsetHighlight().run(),
})

const TEXT_STYLE_OPTIONS = [
  { value: "paragraph", label: "Paragraph" },
  { value: "heading1", label: "Heading 1" },
  { value: "heading2", label: "Heading 2" },
  { value: "heading3", label: "Heading 3" },
  { value: "blockquote", label: "Quote" },
  { value: "horizontalRule", label: "Divider", icon: <LuMinus /> },
]

export const TextStyle = createSelectControl({
  label: "Text Style",
  width: "120px",
  placeholder: "Paragraph",
  options: TEXT_STYLE_OPTIONS,
  getValue: (editor) => {
    if (editor.isActive("heading", { level: 1 })) return "heading1"
    if (editor.isActive("heading", { level: 2 })) return "heading2"
    if (editor.isActive("heading", { level: 3 })) return "heading3"
    if (editor.isActive("blockquote")) return "blockquote"
    return "paragraph"
  },
  command: (editor, value) => {
    if (value === "paragraph") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ; (editor.chain() as any).focus().setParagraph().run()
    } else if (value === "heading1") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ; (editor.chain() as any).focus().toggleHeading({ level: 1 }).run()
    } else if (value === "heading2") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ; (editor.chain() as any).focus().toggleHeading({ level: 2 }).run()
    } else if (value === "heading3") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ; (editor.chain() as any).focus().toggleHeading({ level: 3 }).run()
    } else if (value === "blockquote") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ; (editor.chain() as any).focus().toggleBlockquote().run()
    } else if (value === "horizontalRule") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ; (editor.chain() as any).focus().setHorizontalRule().run()
    }
  },
  renderValue: (value, option) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const textStyle: any = {
      paragraph: { fontWeight: "normal", fontSize: "sm" },
      heading1: { fontWeight: "bold", fontSize: "lg" },
      heading2: { fontWeight: "semibold", fontSize: "md" },
      heading3: { fontWeight: "medium", fontSize: "sm" },
      blockquote: { fontStyle: "italic", fontSize: "sm" },
      horizontalRule: { fontWeight: "medium", fontSize: "sm" },
    }
    return <Box {...textStyle[value]}>{option?.label || "Paragraph"}</Box>
  },
})
