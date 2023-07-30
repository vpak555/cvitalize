import { Box, Button, Flex, Group, Input, Rating, TextInput, useMantineTheme } from "@mantine/core";
import { IconX, IconDeviceFloppy } from "@tabler/icons-react";
import { useHardSkillsStore, useHardSkillFormStore } from "../../../store";
import { isNotEmpty, useForm } from "@mantine/form";
import { useId } from "react";
import SkillFormModel from "../../../models/SkillFormModel";
import { useTranslation } from 'react-i18next';

export default function HardSkillForm() {
    const { t } = useTranslation();
    const { showHardSkillExpertise, addHardSkill, editedHardSkill, updateHardSkill, setEditedHardSkill } = useHardSkillsStore((state) => state);
    const setShowHardSkillForm = useHardSkillFormStore((state) => state.setShowHardSkillForm);
    const { primaryColor } = useMantineTheme();
    const id = useId();
    const initialValues =
        editedHardSkill ?
            {
                ...editedHardSkill,
                showExpertise: showHardSkillExpertise
            } :
            {
                id,
                title: '',
                level: 0,
                showExpertise: showHardSkillExpertise
            };

    const form = useForm({
        initialValues,
        validate: {
            title: isNotEmpty(t('required', { field: t('hardSkill') }))
        },
    });

    const onSave = (values: SkillFormModel) => {
        if (editedHardSkill) {
            const updatedHardSkill = { ...editedHardSkill, ...values };
            updateHardSkill(updatedHardSkill);
            setEditedHardSkill(undefined);
        } else {
            addHardSkill({ ...values, id });
        }

        setShowHardSkillForm(false);
    }

    const onCancel = () => {
        setShowHardSkillForm(false);
    }

    return (
        <Box>
            <form onSubmit={form.onSubmit((values) => onSave(values))}>
                <Flex direction='column' gap={10}>
                    <TextInput
                        label={t('hardSkill')}
                        {...form.getInputProps('title')}
                    />
                    {
                        showHardSkillExpertise &&
                        <Input.Wrapper label={t('expertise')}>
                            <Rating defaultValue={0} count={10} fractions={2} color={primaryColor}
                                {...form.getInputProps('level')}

                            />
                        </Input.Wrapper>

                    }
                </Flex>
                <Group position='center' mt='md'>
                    <Button type='button' leftIcon={<IconX />} variant='outline' onClick={onCancel}>{t('cancel')}</Button>
                    <Button type='submit' leftIcon={<IconDeviceFloppy />}>{t('save')}</Button>
                </Group>
            </form>
        </Box>
    );
}