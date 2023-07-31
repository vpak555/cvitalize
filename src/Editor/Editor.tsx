import { Accordion } from "@mantine/core";
import LanguagesPanel from "./LanguagesPanel/LanguagesPanel";
import GeneralInfoPanel from "./GeneralInfoPanel/GeneralInfoPanel";
import ProfExperiencesPanel from "./ProfExperiencesPanel/ProfExperiencesPanel";
import EducationsPanel from "./EducationsPanel/EducationsPanel";
import HardSkillsPanel from "./HardSkillsPanel/HardSkillsPanel";
import SoftSkillsPanel from "./SoftSkillsPanel/SoftSkillsPanel";
import PersonalDetailsPanel from "./PersonalDetailsPanel/PersonalDetailsPanel";
import './Editor.scss';

export default function Editor() {

  return (
    <Accordion variant="contained" w={350} className='editor'>
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