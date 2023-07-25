import DragEndModel from './DragEndModel';
import ListItemModel from './ListItemModel';

type DndListModel = {
    list: ListItemModel[];
    onAdd: () => void;
    onDragEnd: ({ destination, source, handlers }: DragEndModel) => void;
    onEdit: (id: string) => void;
    onRemove: (id: string) => void;
}

export default DndListModel;