import { Box, Button, Flex, Group, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';
import { useProfExperiencesStore, useProfExperienceFormStore } from '../../../store';
import { useForm } from '@mantine/form';
import { useId, useState } from 'react';
import ProfExperienceFormModel from '../../../models/ProfExperienceFormModel';
import TextEditor from '../../TextEditor/TextEditor';
import { useTranslation } from 'react-i18next';

export default function ProfExperienceForm() {
    const { t } = useTranslation();
    const { addProfExperience, editedProfExperience, updateProfExperience, setEditedProfExperience } = useProfExperiencesStore((state) => state);
    const [description, setDescription] = useState(editedProfExperience?.description || '');
    const setShowProfExperienceForm = useProfExperienceFormStore((state) => state.setShowProfExperienceForm);
    const id = useId();
    const initialValues =
        editedProfExperience ?
            {
                ...editedProfExperience,
            } :
            {
                id,
                employer: '',
                jobTitle: '',
                startDate: undefined,
                endDate: undefined,
                location: '',
                description: ''
            };
    const form = useForm({
        initialValues,
    });

    const onSave = (values: ProfExperienceFormModel) => {

        if (editedProfExperience) {
            const updatedProfExperience = { ...editedProfExperience, ...values, description };
            updateProfExperience(updatedProfExperience);
            setEditedProfExperience(undefined);
        } else {
            addProfExperience({ id, ...values, description });
        }

        setShowProfExperienceForm(false);
    }

    const onCancel = () => {
        setShowProfExperienceForm(false);
    }

    return (
        <Box>
            <form onSubmit={form.onSubmit((values) => onSave(values))}>
                <Flex direction='column' gap={10}>
                    <TextInput
                        label={t('employer')}
                        {...form.getInputProps('employer')}
                    />
                    <TextInput
                        label={t('jobTitle')}
                        {...form.getInputProps('jobTitle')}
                    />
                    <Flex gap={10}>
                        <DateInput
                            valueFormat='MMM YYYY'
                            label={t('startDate')}
                            {...form.getInputProps('startDate')}
                        />
                        <DateInput
                            valueFormat='MMM YYYY'
                            label={t('endDate')}
                            {...form.getInputProps('endDate')}
                        />
                    </Flex>
                    <TextInput
                        label={t('location')}
                        {...form.getInputProps('location')}
                    />
                    <TextEditor
                        label={t('description')}
                        content={description}
                        onChange={setDescription}
                    />
                </Flex>
                <Group position='center' mt='md'>
                    <Button type='button' leftIcon={<IconX />} variant='outline' onClick={onCancel}>{t('cancel')}</Button>
                    <Button type='submit' leftIcon={<IconDeviceFloppy />}>{t('save')}</Button>
                </Group>
            </form>
        </Box>
    );
}