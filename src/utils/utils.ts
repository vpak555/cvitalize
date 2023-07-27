import dayjs from "dayjs";
import EducationModel from "../models/EducationModel";
import ListItemModel from "../models/ListItemModel";
import ProfExperienceModel from "../models/ProfExperienceModel";

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

export const mapToListItemArr = <T extends ListItemModel>(
  list: T[]
): ListItemModel[] => {
  return list.map((item) => ({ id: item.id, title: item.title }));
};

export const mapToListItem = <T extends ListItemModel>(
  item: T
): ListItemModel => {
  return { id: item.id, title: item.title };
};

export const mapEducationsToListItemArr = (
  list: EducationModel[]
): ListItemModel[] => {
  return list.map((item) => ({ id: item.id, title: item.school }));
};

export const mapEducationToListItem = (item: EducationModel): ListItemModel => {
  return { id: item.id, title: item.school };
};

export const mapProfExperiencesToListItemArr = (
  list: ProfExperienceModel[]
): ListItemModel[] => {
  return list.map((item) => ({ id: item.id, title: item.employer }));
};

export const mapProfExperienceToListItem = (
  item: ProfExperienceModel
): ListItemModel => {
  return { id: item.id, title: item.employer };
};

export const convertDateToString = (date: Date): string => {
  return dayjs(date).format("MMM YYYY").toString();
};
