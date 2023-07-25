import ListItemModel from "./ListItemModel";

type DndListItemModel = {
    item: ListItemModel;
    index: number;
    onEdit: (id: string) => void;
    onRemove: (id: string) => void;
}

export default DndListItemModel;