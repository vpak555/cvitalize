
import { create } from "zustand";
import ListItemModel from "../../models/ListItemModel";
import SkillModel from "../../models/SkillModel";
import { mapToListItemArr, mapToListItem } from "../../utils/utils";

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

export const useLanguageFormStore = create<{
    showLanguageForm: boolean;
    setShowLanguageForm: (showLanguageForm: boolean) => void;
}>((set) => ({
    showLanguageForm: false,
    setShowLanguageForm: (showLanguageForm: boolean) => set({ showLanguageForm }),
}));
