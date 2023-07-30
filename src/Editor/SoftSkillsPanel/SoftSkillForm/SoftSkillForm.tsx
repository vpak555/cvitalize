import { Box, Button, Flex, Group, Input, Rating, TextInput, useMantineTheme } from '@mantine/core';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';
import { useSoftSkillsStore, useSoftSkillFormStore } from '../../../store';
import { isNotEmpty, useForm } from '@mantine/form';
import { useId } from 'react';
import SkillFormModel from '../../../models/SkillFormModel';
import { useTranslation } from 'react-i18next';

export default function SoftSkillForm() {
    const { t } = useTranslation();
    const { showSoftSkillExpertise, addSoftSkill, editedSoftSkill, updateSoftSkill, setEditedSoftSkill } = useSoftSkillsStore((state) => state);
    const setShowSoftSkillForm = useSoftSkillFormStore((state) => state.setShowSoftSkillForm);
    const { primaryColor } = useMantineTheme();
    const id = useId();
    const initialValues =
        editedSoftSkill ?
            {
                ...editedSoftSkill,
                showExpertise: showSoftSkillExpertise
            } :
            {
                id,
                title: '',
                level: 0,
                showExpertise: showSoftSkillExpertise
            };

    const form = useForm({
        initialValues,
        validate: {
            title: isNotEmpty(t('required', { field: t('softSkill') }))
        },
    });

    const onSave = (values: SkillFormModel) => {
        if (editedSoftSkill) {
            const updatedSoftSkill = { ...editedSoftSkill, ...values };
            updateSoftSkill(updatedSoftSkill);
            setEditedSoftSkill(undefined);
        } else {
            addSoftSkill({ ...values, id });
        }

        setShowSoftSkillForm(false);
    }

    const onCancel = () => {
        setShowSoftSkillForm(false);
    }

    return (
        <Box>
            <form onSubmit={form.onSubmit((values) => onSave(values))}>
                <Flex direction='column' gap={10}>
                    <TextInput
                        label={t('softSkill')}
                        {...form.getInputProps('title')}
                    />
                    {
                        showSoftSkillExpertise &&
                        <Input.Wrapper label='Expertise'>
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