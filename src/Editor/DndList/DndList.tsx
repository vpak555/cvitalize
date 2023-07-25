import { useDidUpdate, useListState } from '@mantine/hooks';
import { Button, Flex, Group } from '@mantine/core';
import { DragDropContext } from 'react-beautiful-dnd';
import StrictModeDroppable from './StrictModeDroppable/StrictModeDroppable';
import DndListItem from './DndListItem/DndListItem';
import { IconPlus } from '@tabler/icons-react';
import DndListModel from '../../models/DndListModel';

export default function DndList({ list, onAdd, onDragEnd, onEdit, onRemove }: DndListModel) {
  const [state, handlers] = useListState(list);

  useDidUpdate(() => handlers.setState(list), [list]);

  const items = state.map((item, index) => (
    <DndListItem key={item.id} item={item} index={index} onEdit={onEdit} onRemove={onRemove} />
  ));

  return (
    <>
      <Flex direction='column' gap={10}>
        {list.length > 0 &&
          <DragDropContext
            onDragEnd={({ destination, source }) => onDragEnd({ destination, source, handlers })}
          >
            <StrictModeDroppable items={items} />
          </DragDropContext>
        }
      </Flex>
      <Group position='right' mt='md'>
        <Button type='button' leftIcon={<IconPlus />} onClick={onAdd}>Add</Button>
      </Group>
    </>
  );
}