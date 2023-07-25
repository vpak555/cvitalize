import { create } from "zustand";
import GeneralInfoModel from "./models/GeneralInfoModel";
import SkillModel from "./models/SkillModel";
import ListItemModel from "./models/ListItemModel";
import { mapToListItemArr, mapToListItem } from './utils/utils';
import PersonalDetailsModel from "./models/PersonalDetailsModel";

export const useGeneralInfoStore = create<{
    generalInfo: GeneralInfoModel;
    setGeneralInfo: (generalInfo: GeneralInfoModel) => void;
}>((set) => ({
    generalInfo: {
        fullName: '',
        jobTitle: '',
        profile: '',
        photo: '',
    },
    setGeneralInfo: (generalInfo: GeneralInfoModel) => set({ generalInfo }),
}));

export const usePersonalDetailsStore = create<{
    personalDetails: PersonalDetailsModel;
    setPersonalDetails: (personalDetails: PersonalDetailsModel) => void;
}>((set) => ({
    personalDetails: {
        email: '',
        phoneNumber: '',
        address: '',

    },
    setPersonalDetails: (personalDetails: PersonalDetailsModel) => set({ personalDetails }),
}));

export const useLanguagesStore = create<{
    showLanguageExpertise: boolean;
    editedLanguage: SkillModel | undefined;
    languages: SkillModel[];
    dndLanguages: ListItemModel[];
    setShowLanguageExpertise: (showLanguageExpertise: boolean) => void;
    setEditedLanguage: (editedLanguage: SkillModel | undefined) => void;
    setLanguages: (languages: SkillModel[]) => void;
    addLanguage: (language: SkillModel) => void;
    updateLanguage: (updatedLanguage: SkillModel) => void;
    removeLanguage: (id: string) => void;
    getLanguageById: (id: string) => SkillModel | undefined;
}>((set, get) => ({
    showLanguageExpertise: false,
    editedLanguage: undefined,
    languages: [],
    dndLanguages: [],
    setShowLanguageExpertise: (showLanguageExpertise: boolean) => set({ showLanguageExpertise }),
    setEditedLanguage: (editedLanguage: SkillModel | undefined) => set({ editedLanguage }),
    setLanguages: (languages: SkillModel[]) => set(() => ({
        languages,
        dndLanguages: mapToListItemArr(languages)
    })),
    setDndLanguages: (dndLanguages: ListItemModel[]) => set({ dndLanguages }),
    addLanguage: (language: SkillModel) =>
        set((state) => ({
            languages: [...state.languages, language],
            dndLanguages: [...state.dndLanguages, mapToListItem(language)]
        })),
    updateLanguage: (updatedLanguage: SkillModel) =>
        set((state) => ({
            languages: state.languages.map((language) =>
                language.id === get().editedLanguage?.id ? { ...language, ...updatedLanguage } : language
            ),
            dndLanguages: state.dndLanguages.map((language) =>
                language.id === get().editedLanguage?.id ? { ...language, ...updatedLanguage } : language
            ),
        })),
    removeLanguage: (id: string) =>
        set((state) => ({
            languages: state.languages.filter(language => language.id !== id),
            dndLanguages: state.dndLanguages.filter(language => language.id !== id)
        })),
    getLanguageById: (id: string) => get().languages.find(language => language.id == id)
}));

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

export const useLanguageFormStore = create<{
    showLanguageForm: boolean;
    setShowLanguageForm: (showLanguageForm: boolean) => void;
}>((set) => ({
    showLanguageForm: false,
    setShowLanguageForm: (showLanguageForm: boolean) => set({ showLanguageForm }),
}));

export const useHardSkillFormStore = create<{
    showHardSkillForm: boolean;
    setShowHardSkillForm: (showHardSkillForm: boolean) => void;
}>((set) => ({
    showHardSkillForm: false,
    setShowHardSkillForm: (showHardSkillForm: boolean) => set({ showHardSkillForm }),
}));

export const useSoftSkillFormStore = create<{
    showSoftSkillForm: boolean;
    setShowSoftSkillForm: (showSoftSkillForm: boolean) => void;
}>((set) => ({
    showSoftSkillForm: false,
    setShowSoftSkillForm: (showSoftSkillForm: boolean) => set({ showSoftSkillForm }),
}));