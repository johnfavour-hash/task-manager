"use client"

import { IconButton, type IconButtonProps } from "@chakra-ui/react"
import * as React from "react"
import { Tooltip } from "./tooltip"

export interface ButtonControlProps
    extends Omit<IconButtonProps, "aria-label"> {
    icon: React.ReactNode
    label: string
}

export const ButtonControl = React.forwardRef<
    HTMLButtonElement,
    ButtonControlProps
>(function ButtonControl(props, ref) {
    const { icon, label, ...rest } = props
    return (
        <Tooltip content={label}>
            <IconButton ref={ref} size="2xs" aria-label={label} {...rest}>
                {icon}
            </IconButton>
        </Tooltip>
    )
})
