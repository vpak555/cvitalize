import { Flex, Avatar, Title, Text } from "@mantine/core";
import HistoryDetail from "./HistoryDetail/HistoryDetail";
import Section from "./Section/Section";
import Skills from "./Skills/Skills";
import './Default.scss';
import { useEducationsStore, useGeneralInfoStore, useHardSkillsStore, useLanguagesStore, usePersonalDetailsStore, useProfExperiencesStore, useSoftSkillsStore } from "../../store";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import { convertDateToString } from '../../utils/utils';

export default function Default() {
    const { profile, fullName, jobTitle, photo } = useGeneralInfoStore((state) => state.generalInfo);
    const { languages, showLanguageExpertise } = useLanguagesStore((state) => state);
    const { softSkills, showSoftSkillExpertise } = useSoftSkillsStore((state) => state);
    const { hardSkills, showHardSkillExpertise } = useHardSkillsStore((state) => state);
    const { email, phoneNumber, address } = usePersonalDetailsStore((state) => state.personalDetails);
    const { educations } = useEducationsStore((state) => state);
    const { profExperiences } = useProfExperiencesStore((state) => state);

    return (
        <Flex className='cv'>
            <Flex className='cv__left-column' direction='column' gap={24}>
                {photo && <Avatar src={photo} radius={50} size={100} />}
                {(email || phoneNumber || address) && <Section title='Personal Details'>
                    <PersonalDetails personalDetails={{ email, phoneNumber, address }} />
                </Section>}
                {hardSkills.length > 0 &&
                    <Section title='Hard Skills'>
                        <Skills skills={hardSkills} showExpertise={showHardSkillExpertise} />
                    </Section>
                }
                {softSkills.length > 0 &&
                    <Section title='Soft Skills'>
                        <Skills skills={softSkills} showExpertise={showSoftSkillExpertise} />
                    </Section>
                }

                {languages.length > 0 &&
                    <Section title='Languages'>
                        <Skills skills={languages} showExpertise={showLanguageExpertise} />
                    </Section>
                }

            </Flex>
            <Flex className="cv__right-column" direction={'column'} gap={24}>
                <section className='title'>
                    <Title order={1}>{fullName}</Title>
                    <Title order={5} weight={600}>{jobTitle}</Title>
                </section>
                {
                    profile && <Section title='Profile'>
                        <Text size={12}>
                            {profile}
                        </Text>
                    </Section>
                }
                {educations.length > 0 &&
                    <Section title='Education'>
                        {educations.map((education) =>
                            <HistoryDetail
                                key={education.id}
                                title={education.degree}
                                institution={education.school}
                                startDate={education.startDate && convertDateToString(education.startDate)}
                                endDate={education.endDate && convertDateToString(education.endDate)}
                                location={education.location}
                                description={education.description}
                            />)}
                    </Section>
                }
                {profExperiences.length > 0 &&
                    <Section title='Professional Experience'>
                        {profExperiences.map((profExperience) =>
                            <HistoryDetail
                                key={profExperience.id}
                                title={profExperience.jobTitle}
                                institution={profExperience.employer}
                                startDate={profExperience.startDate && convertDateToString(profExperience.startDate)}
                                endDate={profExperience.endDate && convertDateToString(profExperience.endDate)}
                                location={profExperience.location}
                                description={profExperience.description}
                            />)}
                    </Section>
                }
            </Flex>
        </Flex >
    );
}