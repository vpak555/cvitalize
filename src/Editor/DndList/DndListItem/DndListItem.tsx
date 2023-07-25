import { IconGripVertical, IconPencil } from "@tabler/icons-react";
import { Draggable } from "react-beautiful-dnd";
import DndListItemModel from "../../../models/DndListItemModel";
import { ActionIcon, CloseButton, createStyles, Flex, Group, rem, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    item: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: theme.radius.md,
        border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
        padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
        paddingLeft: `calc(${theme.spacing.xl} - ${theme.spacing.md})`, // to offset drag handle
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    },

    itemDragging: {
        boxShadow: theme.shadows.sm,
    },

    symbol: {
        fontSize: rem(30),
        fontWeight: 700,
        width: rem(60),
    },

    dragHandle: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },
}));

export default function DndListItem({ item, index, onEdit, onRemove }: DndListItemModel) {
    const { classes, cx } = useStyles();

    return (
        <Draggable key={item.id} index={index} draggableId={item.id}>
            {(provided, snapshot) => (
                <div
                    className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div {...provided.dragHandleProps} className={classes.dragHandle}>
                        <IconGripVertical size="1.05rem" stroke={1.5} />
                    </div>
                    <Flex justify='space-between' align='center'>
                        <Text>{item.title}</Text>

                    </Flex>
                    <Group ml='auto' spacing='xs' >
                        <ActionIcon size={18} onClick={() => onEdit(item.id)}><IconPencil /></ActionIcon>
                        <CloseButton onClick={() => onRemove(item.id)} />
                    </Group>
                </div>
            )}
        </Draggable >
    );
}