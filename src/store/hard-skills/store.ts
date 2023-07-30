
import { create } from "zustand";
import ListItemModel from "../../models/ListItemModel";
import SkillModel from "../../models/SkillModel";
import { mapToListItemArr, mapToListItem } from "../../utils/utils";

export const useHardSkillsStore = create<{
    showHardSkillExpertise: boolean;
    editedHardSkill: SkillModel | undefined;
    hardSkills: SkillModel[];
    dndHardSkills: ListItemModel[];
    setShowHardSkillExpertise: (showHardSkillExpertise: boolean) => void;
    setEditedHardSkill: (editedHardSkill: SkillModel | undefined) => void;
    setHardSkills: (hardSkills: SkillModel[]) => void;
    addHardSkill: (language: SkillModel) => void;
    updateHardSkill: (updatedHardSkill: SkillModel) => void;
    removeHardSkill: (id: string) => void;
    getHardSkillById: (id: string) => SkillModel | undefined;
}>((set, get) => ({
    showHardSkillExpertise: false,
    editedHardSkill: undefined,
    hardSkills: [],
    dndHardSkills: [],
    setShowHardSkillExpertise: (showHardSkillExpertise: boolean) => set({ showHardSkillExpertise }),
    setEditedHardSkill: (editedHardSkill: SkillModel | undefined) => set({ editedHardSkill }),
    setHardSkills: (hardSkills: SkillModel[]) => set(() => ({
        hardSkills,
        dndHardSkills: mapToListItemArr(hardSkills)
    })),
    setDndHardSkills: (dndHardSkills: ListItemModel[]) => set({ dndHardSkills }),
    addHardSkill: (language: SkillModel) =>
        set((state) => ({
            hardSkills: [...state.hardSkills, language],
            dndHardSkills: [...state.dndHardSkills, mapToListItem(language)]
        })),
    updateHardSkill: (updatedHardSkill: SkillModel) =>
        set((state) => ({
            hardSkills: state.hardSkills.map((language) =>
                language.id === get().editedHardSkill?.id ? { ...language, ...updatedHardSkill } : language
            ),
            dndHardSkills: state.dndHardSkills.map((language) =>
                language.id === get().editedHardSkill?.id ? { ...language, ...updatedHardSkill } : language
            ),
        })),
    removeHardSkill: (id: string) =>
        set((state) => ({
            hardSkills: state.hardSkills.filter(language => language.id !== id),
            dndHardSkills: state.dndHardSkills.filter(language => language.id !== id)
        })),
    getHardSkillById: (id: string) => get().hardSkills.find(language => language.id == id)
}));


export const useHardSkillFormStore = create<{
    showHardSkillForm: boolean;
    setShowHardSkillForm: (showHardSkillForm: boolean) => void;
}>((set) => ({
    showHardSkillForm: false,
    setShowHardSkillForm: (showHardSkillForm: boolean) => set({ showHardSkillForm }),
}));
