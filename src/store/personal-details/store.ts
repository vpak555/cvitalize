import { create } from "zustand";
import PersonalDetailsModel from "../../models/PersonalDetailsModel";

export const usePersonalDetailsStore = create<{
  personalDetails: PersonalDetailsModel;
  setPersonalDetails: (personalDetails: PersonalDetailsModel) => void;
}>((set) => ({
  personalDetails: {
    email: "",
    phoneNumber: "",
    address: "",
  },
  setPersonalDetails: (personalDetails: PersonalDetailsModel) =>
    set({ personalDetails }),
}));
