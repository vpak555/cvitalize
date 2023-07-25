import { UseListStateHandlers } from "@mantine/hooks";
import { DraggableLocation } from "react-beautiful-dnd";
import ListItemModel from "./ListItemModel";

type DragEndModel = {
    destination: DraggableLocation | undefined | null;
    source: DraggableLocation;
    handlers: UseListStateHandlers<ListItemModel>;
}

export default DragEndModel;