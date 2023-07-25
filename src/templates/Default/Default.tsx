import { Flex, Avatar, Title, Text } from "@mantine/core";
import HistoryDetail from "./HistoryDetail/HistoryDetail";
import Section from "./Section/Section";
import Skills from "./Skills/Skills";
import './Default.scss';
import { useGeneralInfoStore, useHardSkillsStore, useLanguagesStore, usePersonalDetailsStore, useSoftSkillsStore } from "../../store";
import PersonalDetails from "./PersonalDetails/PersonalDetails";

export default function Default() {
    const { profile, fullName, jobTitle } = useGeneralInfoStore((state) => state.generalInfo);
    const { languages, showLanguageExpertise } = useLanguagesStore((state) => state);
    const { softSkills, showSoftSkillExpertise } = useSoftSkillsStore((state) => state);
    const { hardSkills, showHardSkillExpertise } = useHardSkillsStore((state) => state);
    const { email, phoneNumber, address } = usePersonalDetailsStore((state) => state.personalDetails);

    return (
        <Flex className='cv'>
            <Flex className='cv__left-column' direction='column' gap={24}>
                <Avatar src='public/me.jpg' radius={50} size={100} />
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
                <Section title='Education'>
                    <HistoryDetail
                        title="Bachelor"
                        institution='Tashkent University of Information Technologies'
                        startDate='Sep 2014'
                        endDate='Jul 2018'
                        location='Uzbekistan, Urgench'
                        description='Tashkent University of Information Technologies
            Tashkent University of Information Technologies
            Tashkent University of Information Technologies
            Tashkent University of Information Technologies
            Tashkent University of Information Technologies'
                    />
                </Section>
                <Section title='Professional Experience'>
                    <HistoryDetail
                        title="Senior Software Engineer"
                        institution='Tashkent University of Information Technologies'
                        startDate='Sep 2014'
                        endDate='Jul 2018'
                        location='Uzbekistan, Urgench'
                        description='Tashkent University of Information Technologies
            Tashkent University of Information Technologies
            Tashkent University of Information Technologies
            Tashkent University of Information Technologies
            Tashkent University of Information Technologies'
                    />
                </Section>
            </Flex>
        </Flex>
    );
}