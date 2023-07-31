import { Box, Button, Flex, TextInput } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';
import { useProfExperiencesStore, useProfExperienceFormStore } from '../../../store';
import { useForm, isNotEmpty } from '@mantine/form';
import { useId, useState } from 'react';
import ProfExperienceFormModel from '../../../models/ProfExperienceFormModel';
import TextEditor from '../../TextEditor/TextEditor';
import { useTranslation } from 'react-i18next';
import { isDateAfter } from '../../../utils/utils';

export default function ProfExperienceForm() {
    const { t, i18n } = useTranslation();
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
        validate: {
            employer: isNotEmpty(t('required', { field: t('employer') })),
            jobTitle: isNotEmpty(t('required', { field: t('jobTitle') })),
            startDate: isNotEmpty(t('required', { field: t('startDate') })),
            endDate: (value, values) =>
                value === undefined || isDateAfter(values.startDate, value) ? null : t('endDate>startDate'),
        }
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
                    withAsterisk
                />
                <TextInput
                    label={t('jobTitle')}
                    {...form.getInputProps('jobTitle')}
                    withAsterisk
                />
                <Flex gap={10}>
                    <MonthPickerInput
                        locale={i18n.language}
                        valueFormat='MMM YYYY'
                        label={t('startDate')}
                        styles={{ root: { width: '100%' } }}
                        {...form.getInputProps('startDate')}
                        withAsterisk
                    />
                    <MonthPickerInput
                        locale={i18n.language}
                        valueFormat='MMM YYYY'
                        label={t('endDate')}
                        styles={{ root: { width: '100%' } }}
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
            <Flex mt='md' gap={10}>
                <Button fullWidth type='button' leftIcon={<IconX />} variant='outline' onClick={onCancel}>{t('cancel')}</Button>
                <Button fullWidth type='submit' leftIcon={<IconDeviceFloppy />}>{t('save')}</Button>
            </Flex>
        </form>
    </Box>
);
}