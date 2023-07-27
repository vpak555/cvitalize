import { create } from "zustand";
import ListItemModel from "../../models/ListItemModel";
import ProfExperienceModel from "../../models/ProfExperienceModel";
import {
  mapProfExperiencesToListItemArr,
  mapProfExperienceToListItem,
} from "../../utils/utils";

export const useProfExperiencesStore = create<{
  editedProfExperience: ProfExperienceModel | undefined;
  profExperiences: ProfExperienceModel[];
  dndProfExperiences: ListItemModel[];
  setEditedProfExperience: (editedProfExperience: ProfExperienceModel | undefined) => void;
  setProfExperiences: (profExperiences: ProfExperienceModel[]) => void;
  addProfExperience: (profExperience: ProfExperienceModel) => void;
  updateProfExperience: (updatedProfExperience: ProfExperienceModel) => void;
  removeProfExperience: (id: string) => void;
  getProfExperienceById: (id: string) => ProfExperienceModel | undefined;
}>((set, get) => ({
  editedProfExperience: undefined,
  profExperiences: [],
  dndProfExperiences: [],
  setEditedProfExperience: (editedProfExperience: ProfExperienceModel | undefined) =>
    set({ editedProfExperience }),
  setProfExperiences: (profExperiences: ProfExperienceModel[]) =>
    set(() => ({
      profExperiences,
      dndProfExperiences: mapProfExperiencesToListItemArr(profExperiences),
    })),
  setDndProfExperiences: (dndProfExperiences: ListItemModel[]) => set({ dndProfExperiences }),
  addProfExperience: (profExperience: ProfExperienceModel) =>
    set((state) => ({
      profExperiences: [...state.profExperiences, profExperience],
      dndProfExperiences: [
        ...state.dndProfExperiences,
        mapProfExperienceToListItem(profExperience),
      ],
    })),
  updateProfExperience: (updatedProfExperience: ProfExperienceModel) =>
    set((state) => ({
      profExperiences: state.profExperiences.map((profExperience) =>
        profExperience.id === get().editedProfExperience?.id
          ? { ...profExperience, ...updatedProfExperience }
          : profExperience
      ),
      dndProfExperiences: state.dndProfExperiences.map((profExperience) =>
        profExperience.id === get().editedProfExperience?.id
          ? { ...profExperience, ...mapProfExperienceToListItem(updatedProfExperience) }
          : profExperience
      ),
    })),
  removeProfExperience: (id: string) =>
    set((state) => ({
      profExperiences: state.profExperiences.filter((profExperience) => profExperience.id !== id),
      dndProfExperiences: state.dndProfExperiences.filter(
        (profExperience) => profExperience.id !== id
      ),
    })),
  getProfExperienceById: (id: string) =>
    get().profExperiences.find((profExperience) => profExperience.id == id),
}));

export const useProfExperienceFormStore = create<{
  showProfExperienceForm: boolean;
  setShowProfExperienceForm: (showProfExperienceForm: boolean) => void;
}>((set) => ({
  showProfExperienceForm: false,
  setShowProfExperienceForm: (showProfExperienceForm: boolean) =>
    set({ showProfExperienceForm }),
}));
