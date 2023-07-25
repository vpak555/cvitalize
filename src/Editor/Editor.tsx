import { Accordion } from "@mantine/core";
import LanguagesPanel from "./LanguagesPanel/LanguagesPanel";
import GeneralInfoPanel from "./GeneralInfoPanel/GeneralInfoPanel";
import ProfessionalExperiencePanel from "./ProfExperiencePanel/ProfessionalExperiencePanel";
import EducationPanel from "./EducationPanel/EducationPanel";
import HardSkillsPanel from "./HardSkillsPanel/HardSkillsPanel";
import SoftSkillsPanel from "./SoftSkillsPanel/SoftSkillsPanel";
import PersonalDetailsPanel from "./PersonalDetailsPanel/PersonalDetailsPanel";


export default function Editor() {

  return (
    <Accordion variant="contained" miw={300}>
      <GeneralInfoPanel />
      <PersonalDetailsPanel />
      <EducationPanel />
      <ProfessionalExperiencePanel />
      <HardSkillsPanel />
      <SoftSkillsPanel />
      <LanguagesPanel />
    </Accordion>
  );
}