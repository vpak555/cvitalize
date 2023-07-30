import { create } from "zustand";
import ListItemModel from "../../models/ListItemModel";
import EducationModel from "../../models/EducationModel";
import {
  mapEducationsToListItemArr,
  mapEducationToListItem,
} from "../../utils/utils";

export const useEducationsStore = create<{
  editedEducation: EducationModel | undefined;
  educations: EducationModel[];
  dndEducations: ListItemModel[];
  setEditedEducation: (editedEducation: EducationModel | undefined) => void;
  setEducations: (educations: EducationModel[]) => void;
  addEducation: (education: EducationModel) => void;
  updateEducation: (updatedEducation: EducationModel) => void;
  removeEducation: (id: string) => void;
  getEducationById: (id: string) => EducationModel | undefined;
}>((set, get) => ({
  editedEducation: undefined,
  educations: [],
  dndEducations: [],
  setEditedEducation: (editedEducation: EducationModel | undefined) =>
    set({ editedEducation }),
  setEducations: (educations: EducationModel[]) =>
    set(() => ({
      educations,
      dndEducations: mapEducationsToListItemArr(educations),
    })),
  setDndEducations: (dndEducations: ListItemModel[]) => set({ dndEducations }),
  addEducation: (education: EducationModel) =>
    set((state) => ({
      educations: [...state.educations, education],
      dndEducations: [
        ...state.dndEducations,
        mapEducationToListItem(education),
      ],
    })),
  updateEducation: (updatedEducation: EducationModel) =>
    set((state) => ({
      educations: state.educations.map((education) =>
        education.id === get().editedEducation?.id
          ? { ...education, ...updatedEducation }
          : education
      ),
      dndEducations: state.dndEducations.map((education) =>
        education.id === get().editedEducation?.id
          ? { ...education, ...mapEducationToListItem(updatedEducation) }
          : education
      ),
    })),
  removeEducation: (id: string) =>
    set((state) => ({
      educations: state.educations.filter((education) => education.id !== id),
      dndEducations: state.dndEducations.filter(
        (education) => education.id !== id
      ),
    })),
  getEducationById: (id: string) =>
    get().educations.find((education) => education.id == id),
}));

export const useEducationFormStore = create<{
  showEducationForm: boolean;
  setShowEducationForm: (showEducationForm: boolean) => void;
}>((set) => ({
  showEducationForm: false,
  setShowEducationForm: (showEducationForm: boolean) =>
    set({ showEducationForm }),
}));
