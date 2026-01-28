"use client"

import { Menu as ChakraMenu, Portal } from "@chakra-ui/react"
import * as React from "react"

export const MenuRoot = ChakraMenu.Root
export const MenuTrigger = ChakraMenu.Trigger

export const MenuContent = React.forwardRef<HTMLDivElement, ChakraMenu.ContentProps>(
    function MenuContent(props, ref) {
        return (
            <Portal>
                <ChakraMenu.Positioner>
                    <ChakraMenu.Content
                        ref={ref}
                        {...props}
                        bg={{ base: "white", _dark: "#1F2937" }}
                        borderColor={{ base: "gray.200", _dark: "gray.700" }}
                        boxShadow="lg"
                        py={2}
                    />
                </ChakraMenu.Positioner>
            </Portal>
        )
    },
)

export const MenuItem = React.forwardRef<HTMLDivElement, ChakraMenu.ItemProps>(
    function MenuItem(props, ref) {
        return (
            <ChakraMenu.Item
                ref={ref}
                {...props}
                _hover={{ bg: { base: "gray.50", _dark: "gray.700" } }}
                px={4}
                py={2}
                cursor="pointer"
            />
        )
    },
)

export const MenuSeparator = ChakraMenu.Separator
export const MenuItemGroup = ChakraMenu.ItemGroup
