import { create } from "zustand";
import ListItemModel from "../../models/ListItemModel";
import SkillModel from "../../models/SkillModel";
import { mapToListItemArr, mapToListItem } from "../../utils/utils";

export const useSoftSkillsStore = create<{
    showSoftSkillExpertise: boolean;
    editedSoftSkill: SkillModel | undefined;
    softSkills: SkillModel[];
    dndSoftSkills: ListItemModel[];
    setShowSoftSkillExpertise: (showSoftSkillExpertise: boolean) => void;
    setEditedSoftSkill: (editedSoftSkill: SkillModel | undefined) => void;
    setSoftSkills: (softSkills: SkillModel[]) => void;
    addSoftSkill: (language: SkillModel) => void;
    updateSoftSkill: (updatedSoftSkill: SkillModel) => void;
    removeSoftSkill: (id: string) => void;
    getSoftSkillById: (id: string) => SkillModel | undefined;
}>((set, get) => ({
    showSoftSkillExpertise: false,
    editedSoftSkill: undefined,
    softSkills: [],
    dndSoftSkills: [],
    setShowSoftSkillExpertise: (showSoftSkillExpertise: boolean) => set({ showSoftSkillExpertise }),
    setEditedSoftSkill: (editedSoftSkill: SkillModel | undefined) => set({ editedSoftSkill }),
    setSoftSkills: (softSkills: SkillModel[]) => set(() => ({
        softSkills,
        dndSoftSkills: mapToListItemArr(softSkills)
    })),
    setDndSoftSkills: (dndSoftSkills: ListItemModel[]) => set({ dndSoftSkills }),
    addSoftSkill: (language: SkillModel) =>
        set((state) => ({
            softSkills: [...state.softSkills, language],
            dndSoftSkills: [...state.dndSoftSkills, mapToListItem(language)]
        })),
    updateSoftSkill: (updatedSoftSkill: SkillModel) =>
        set((state) => ({
            softSkills: state.softSkills.map((language) =>
                language.id === get().editedSoftSkill?.id ? { ...language, ...updatedSoftSkill } : language
            ),
            dndSoftSkills: state.dndSoftSkills.map((language) =>
                language.id === get().editedSoftSkill?.id ? { ...language, ...updatedSoftSkill } : language
            ),
        })),
    removeSoftSkill: (id: string) =>
        set((state) => ({
            softSkills: state.softSkills.filter(language => language.id !== id),
            dndSoftSkills: state.dndSoftSkills.filter(language => language.id !== id)
        })),
    getSoftSkillById: (id: string) => get().softSkills.find(language => language.id == id)
}));



export const useSoftSkillFormStore = create<{
    showSoftSkillForm: boolean;
    setShowSoftSkillForm: (showSoftSkillForm: boolean) => void;
}>((set) => ({
    showSoftSkillForm: false,
    setShowSoftSkillForm: (showSoftSkillForm: boolean) => set({ showSoftSkillForm }),
}));