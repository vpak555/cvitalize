import { Flex } from "@mantine/core";
import { useState, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";

export default function StrictModeDroppable({ items }: { items: React.ReactNode[] }) {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    if (!enabled) {
        return null;
    }

    return (
        <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
                <Flex direction='column' gap={10} {...provided.droppableProps} ref={provided.innerRef}>
                    {items}
                    {provided.placeholder}
                </Flex>
            )}
        </Droppable>
    );
}