import { Accordion } from "@mantine/core";
import LanguagesPanel from "./LanguagesPanel/LanguagesPanel";
import GeneralInfoPanel from "./GeneralInfoPanel/GeneralInfoPanel";
import ProfExperiencesPanel from "./ProfExperiencesPanel/ProfExperiencesPanel";
import EducationsPanel from "./EducationsPanel/EducationsPanel";
import HardSkillsPanel from "./HardSkillsPanel/HardSkillsPanel";
import SoftSkillsPanel from "./SoftSkillsPanel/SoftSkillsPanel";
import PersonalDetailsPanel from "./PersonalDetailsPanel/PersonalDetailsPanel";


export default function Editor() {

  return (
    <Accordion variant="contained" w={300}>
      <GeneralInfoPanel />
      <PersonalDetailsPanel />
      <EducationsPanel />
      <ProfExperiencesPanel />
      <HardSkillsPanel />
      <SoftSkillsPanel />
      <LanguagesPanel />
    </Accordion>
  );
}