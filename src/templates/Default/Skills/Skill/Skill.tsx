import { Rating, Title, useMantineTheme } from "@mantine/core";
import SkillModel from "../../../../models/SkillModel";

export default function Skill({ skill, showExpertise }: { skill: SkillModel, showExpertise: boolean }) {
    const { primaryColor } = useMantineTheme();
    const { title, level } = skill;

    return (
        <>
            <Title order={6} size={12} weight={500}>{title}</Title>
            {showExpertise && <Rating value={level} count={10} fractions={2} size='xs' color={primaryColor} readOnly />}
        </>
    );
}