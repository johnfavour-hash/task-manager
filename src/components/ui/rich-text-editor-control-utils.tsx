"use client"

import type { IconButtonProps, Select } from "@chakra-ui/react"
import {
    Box,
    CloseButton,
    ColorSwatch,
    HStack,
    IconButton,
    Popover,
    Portal,
    Select as ChakraSelect,
    VStack,
    createListCollection,
} from "@chakra-ui/react"
import { Editor } from "@tiptap/react"
import * as React from "react"
import { useRichTextEditorContext } from "./rich-text-editor-context"
import { Tooltip } from "./tooltip"
import { ButtonControl } from "./rich-text-editor-button-control"

export interface BaseControlConfig {
    label: string
    icon?: React.ElementType
    isDisabled?: (editor: Editor) => boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getProps?: (editor: Editor) => Record<string, any>
}



export interface BooleanControlConfig extends BaseControlConfig {
    icon: React.ElementType
    command: (editor: Editor) => void
    getVariant?: (editor: Editor) => IconButtonProps["variant"]
}

export function createBooleanControl(config: BooleanControlConfig) {
    const {
        label,
        icon: Icon,
        isDisabled,
        command,
        getVariant,
        getProps,
    } = config

    const BooleanControl = React.forwardRef<HTMLButtonElement, IconButtonProps>(
        function BooleanControl(props, ref) {
            const { editor } = useRichTextEditorContext()
            if (!editor) return null
            const disabled = isDisabled ? isDisabled(editor) : false
            const dynamicProps = getProps ? getProps(editor) : {}
            const variant =
                getVariant && !getProps ? getVariant(editor) : dynamicProps.variant

            return (
                <ButtonControl
                    ref={ref}
                    label={label}
                    icon={<Icon />}
                    variant={variant}
                    onClick={() => command(editor)}
                    disabled={disabled}
                    {...props}
                />
            )
        },
    )

    BooleanControl.displayName = `BooleanControl(${label})`
    return BooleanControl
}

export interface SelectOption {
    value: string
    label: string
    icon?: React.ReactNode
}

export interface SelectControlConfig extends BaseControlConfig {
    options: SelectOption[]
    width?: Select.RootProps["width"]
    getValue: (editor: Editor) => string
    command: (editor: Editor, value: string) => void
    placeholder?: string
    renderValue?: (value: string, option?: SelectOption) => React.ReactNode
}

export function createSelectControl(config: SelectControlConfig) {
    const {
        label,
        options,
        width,
        getValue,
        command,
        placeholder = "Select",
        renderValue,
        isDisabled,
        getProps,
    } = config

    const SelectControl = React.forwardRef<
        HTMLButtonElement,
        Omit<ChakraSelect.RootProps, "collection">
    >(function SelectControl(props, ref) {
        const { editor } = useRichTextEditorContext()
        const controlId = React.useId()

        if (!editor) return null

        const currentValue = getValue(editor)
        const disabled = isDisabled ? isDisabled(editor) : false

        const currentOption = options.find((o) => o.value === currentValue)
        const displayValue =
            renderValue && currentOption
                ? renderValue(currentValue, currentOption)
                : currentOption?.label || placeholder

        const collection = createListCollection({ items: options })
        const dynamicProps = getProps ? getProps(editor) : {}

        return (
            <ChakraSelect.Root
                width={width}
                {...props}
                size="xs"
                variant="ghost"
                collection={collection}
                value={[currentValue]}
                onValueChange={(details) => command(editor, details.value[0])}
                disabled={disabled}
                ids={{ trigger: controlId }}
                positioning={{ sameWidth: false }}
                css={{
                    "--select-trigger-height": "sizes.6",
                    "--select-trigger-padding-x": "spacing.2",
                }}
                {...dynamicProps}
            >
                <Tooltip content={label} ids={{ trigger: controlId }}>
                    <ChakraSelect.Trigger ref={ref}>
                        <ChakraSelect.ValueText>{displayValue}</ChakraSelect.ValueText>
                        <ChakraSelect.Indicator />
                    </ChakraSelect.Trigger>
                </Tooltip>
                <Portal>
                    <ChakraSelect.Positioner>
                        <ChakraSelect.Content minW="20">
                            {options.map((opt) => (
                                <ChakraSelect.Item key={opt.value} item={opt.value}>
                                    {opt.icon && (
                                        <Box as="span" marginEnd="2">
                                            {opt.icon}
                                        </Box>
                                    )}
                                    <ChakraSelect.ItemText>{opt.label}</ChakraSelect.ItemText>
                                </ChakraSelect.Item>
                            ))}
                        </ChakraSelect.Content>
                    </ChakraSelect.Positioner>
                </Portal>
            </ChakraSelect.Root>
        )
    })

    SelectControl.displayName = `SelectControl(${label})`
    return SelectControl
}

export interface SwatchOption {
    value: string
    color: string
    label?: string
}
export interface SwatchControlConfig extends BaseControlConfig {
    swatches: SwatchOption[]
    getValue: (editor: Editor) => string
    command: (editor: Editor, value: string) => void
    showRemove?: boolean
    onRemove?: (editor: Editor) => void
}

export function createSwatchControl(config: SwatchControlConfig) {
    const {
        label,
        swatches,
        getValue,
        command,
        showRemove = false,
        onRemove,
        isDisabled,
        icon: Icon,
        getProps,
    } = config

    const SwatchControl = React.forwardRef<HTMLButtonElement, IconButtonProps>(
        function SwatchControl(props, ref) {
            const { editor } = useRichTextEditorContext()
            const [open, setOpen] = React.useState(false)
            const triggerId = React.useId()

            if (!editor) return null
            const currentValue = getValue(editor)
            const disabled = isDisabled ? isDisabled(editor) : false
            const dynamicProps = getProps ? getProps(editor) : {}

            return (
                <Popover.Root
                    open={open}
                    onOpenChange={(e) => setOpen(e.open)}
                    ids={{ trigger: triggerId }}
                    size="sm"
                >
                    <Tooltip content={label} ids={{ trigger: triggerId }}>
                        <Popover.Trigger asChild>
                            <IconButton
                                ref={ref}
                                size="2xs"
                                aria-label={label}
                                disabled={disabled}
                                {...dynamicProps}
                                {...props}
                            >
                                <VStack gap="1px">
                                    {Icon && <Icon />}
                                    <ColorSwatch value={currentValue} h="4px" w="100%" />
                                </VStack>
                            </IconButton>
                        </Popover.Trigger>
                    </Tooltip>

                    <Portal>
                        <Popover.Positioner>
                            <Popover.Content width="auto">
                                <Popover.Body>
                                    <HStack wrap="wrap">
                                        {swatches.map((swatch) => (
                                            <ColorSwatch
                                                key={swatch.value}
                                                cursor="button"
                                                value={swatch.color}
                                                onClick={() => {
                                                    command(editor, swatch.value)
                                                    setOpen(false)
                                                }}
                                            />
                                        ))}
                                        {showRemove && onRemove && (
                                            <Popover.CloseTrigger asChild>
                                                <CloseButton
                                                    size="2xs"
                                                    onClick={() => {
                                                        onRemove(editor)
                                                        setOpen(false)
                                                    }}
                                                />
                                            </Popover.CloseTrigger>
                                        )}
                                    </HStack>
                                </Popover.Body>
                            </Popover.Content>
                        </Popover.Positioner>
                    </Portal>
                </Popover.Root>
            )
        },
    )

    SwatchControl.displayName = `SwatchControl(${label || "Unnamed"})`
    return SwatchControl
}
