import ListItemModel from "../models/ListItemModel";

export const reorder = <T extends { id: string }>(
  sourceIndex: number,
  destinationIndex: number,
  dndList: ListItemModel[],
  dataList: T[]
) => {
  const reorderedList = [...dndList];
  const [removedItem] = reorderedList.splice(sourceIndex, 1);
  reorderedList.splice(destinationIndex, 0, removedItem);

  return reorderedList.map(
    (dndItem) =>
      dataList.find((dataItem) => dndItem.id === dataItem.id) || dataList[0]
  );
};

export const mapToListItemArr = <T extends ListItemModel>(list: T[]) => {
  return list.map((item) => ({ id: item.id, title: item.title }));
};

export const mapToListItem = <T extends ListItemModel>(item: T) => {
  return { id: item.id, title: item.title };
};
