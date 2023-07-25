import { Flex } from "@mantine/core";
import SkillsModel from "../../../models/SkillsModel";
import Skill from "./Skill/Skill";

export default function Skills({ skills, showExpertise }: SkillsModel) {
    return (
        <Flex direction={'column'} gap={10}>
            {skills.map(((skill, index) => <Skill key={index} skill={skill} showExpertise={showExpertise} />))}
        </Flex>
    );
}