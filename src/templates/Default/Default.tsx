import { Flex, Avatar, Title, Text } from "@mantine/core";
import HistoryDetail from "./HistoryDetail/HistoryDetail";
import Section from "./Section/Section";
import Skills from "./Skills/Skills";
import './Default.scss';
import { useEducationsStore, useGeneralInfoStore, useHardSkillsStore, useLanguagesStore, usePersonalDetailsStore, useProfExperiencesStore, useSoftSkillsStore } from "../../store";
import PersonalDetails from './PersonalDetails/PersonalDetails';
import { convertDateToString } from '../../utils/utils';
import { useTranslation } from 'react-i18next';

export default function Default() {
    const { profile, fullName, jobTitle, photo } = useGeneralInfoStore((state) => state.generalInfo);
    const { languages, showLanguageExpertise } = useLanguagesStore((state) => state);
    const { softSkills, showSoftSkillExpertise } = useSoftSkillsStore((state) => state);
    const { hardSkills, showHardSkillExpertise } = useHardSkillsStore((state) => state);
    const { email, phoneNumber, address } = usePersonalDetailsStore((state) => state.personalDetails);
    const { educations } = useEducationsStore((state) => state);
    const { profExperiences } = useProfExperiencesStore((state) => state);
    const { t } = useTranslation();
    return (
        <Flex className='cv'>
            <Flex className='cv__left-column' direction='column' gap={24}>
                {photo && <Avatar src={photo} radius={50} size={100} /> || <Flex h={100} />}
                {(email || phoneNumber || address) && <Section title={t('personalDetails')}>
                    <PersonalDetails personalDetails={{ email, phoneNumber, address }} />
                </Section>}
                {hardSkills.length > 0 &&
                    <Section title={t('hardSkills')}>
                        <Skills skills={hardSkills} showExpertise={showHardSkillExpertise} />
                    </Section>
                }
                {softSkills.length > 0 &&
                    <Section title={t('softSkills')}>
                        <Skills skills={softSkills} showExpertise={showSoftSkillExpertise} />
                    </Section>
                }

                {languages.length > 0 &&
                    <Section title={t('languages')}>
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
                    profile && <Section title={t('profile')}>
                        <Text size={12}>
                            {profile}
                        </Text>
                    </Section>
                }
                {educations.length > 0 &&
                    <Section title={t('education')}>
                        {educations.map((education) =>
                            <HistoryDetail
                                key={education.id}
                                title={education.degree}
                                institution={education.school}
                                startDate={education.startDate && convertDateToString(education.startDate)}
                                endDate={education.endDate && convertDateToString(education.endDate) || t('present')}
                                location={education.location}
                                description={education.description}
                            />)}
                    </Section>
                }
                {profExperiences.length > 0 &&
                    <Section title={t('profExperience')}>
                        {profExperiences.map((profExperience) =>
                            <HistoryDetail
                                key={profExperience.id}
                                title={profExperience.jobTitle}
                                institution={profExperience.employer}
                                startDate={profExperience.startDate && convertDateToString(profExperience.startDate)}
                                endDate={profExperience.endDate && convertDateToString(profExperience.endDate) || t('present')}
                                location={profExperience.location}
                                description={profExperience.description}
                            />)}
                    </Section>
                }
            </Flex>
        </Flex >
    );
}