import { Accordion } from "@mantine/core";
import LanguagesPanel from "./LanguagesPanel/LanguagesPanel";
import GeneralInfoPanel from "./GeneralInfoPanel/GeneralInfoPanel";
import ProfessionalExperiencePanel from "./ProfExperiencePanel/ProfessionalExperiencePanel";
import EducationPanel from "./EducationPanel/EducationPanel";
import HardSkillsPanel from "./HardSkillsPanel/HardSkillsPanel";
import SoftSkillsPanel from "./SoftSkillsPanel/SoftSkillsPanel";


export default function Editor() {

  return (
    <Accordion variant="contained" miw={300}>
      <GeneralInfoPanel />
      <EducationPanel />
      <ProfessionalExperiencePanel />
      <HardSkillsPanel />
      <SoftSkillsPanel />
      <LanguagesPanel />
    </Accordion>
  );
}