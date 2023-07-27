import { useSoftSkillFormStore, useSoftSkillsStore } from "./soft-skills/store";
import { useHardSkillsStore, useHardSkillFormStore } from "./hard-skills/store";
import { useLanguagesStore, useLanguageFormStore } from "./languages/store";
import { usePersonalDetailsStore } from "./personal-details/store";
import { useGeneralInfoStore } from "./general-info/store";
import { useEducationFormStore, useEducationsStore } from "./education/store";

export {
  useGeneralInfoStore,
  usePersonalDetailsStore,
  useEducationsStore,
  useEducationFormStore,
  useHardSkillsStore,
  useHardSkillFormStore,
  useSoftSkillsStore,
  useSoftSkillFormStore,
  useLanguagesStore,
  useLanguageFormStore,
};
