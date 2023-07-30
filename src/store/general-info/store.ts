import { create } from "zustand";
import GeneralInfoModel from "../../models/GeneralInfoModel";

export const useGeneralInfoStore = create<{
  generalInfo: GeneralInfoModel;
  setGeneralInfo: (generalInfo: GeneralInfoModel) => void;
}>((set) => ({
  generalInfo: {
    fullName: "",
    jobTitle: "",
    profile: "",
    photo: "",
  },
  setGeneralInfo: (generalInfo: GeneralInfoModel) => set({ generalInfo }),
}));
