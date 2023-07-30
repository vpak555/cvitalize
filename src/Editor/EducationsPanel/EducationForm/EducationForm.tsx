import { Box, Button, Flex, Group, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';
import { useEducationsStore, useEducationFormStore } from '../../../store';
import { useForm } from '@mantine/form';
import { useId, useState } from 'react';
import EducationFormModel from '../../../models/EducationFormModel';
import TextEditor from '../../TextEditor/TextEditor';
import { useTranslation } from 'react-i18next';

export default function EducationForm() {
    const { t } = useTranslation();
    const { addEducation, editedEducation, updateEducation, setEditedEducation } = useEducationsStore((state) => state);
    const [description, setDescription] = useState(editedEducation?.description || '');
    const setShowEducationForm = useEducationFormStore((state) => state.setShowEducationForm);
    const id = useId();
    const initialValues =
        editedEducation ?
            {
                ...editedEducation,
            } :
            {
                id,
                school: '',
                degree: '',
                startDate: undefined,
                endDate: undefined,
                location: '',
                description: ''
            };
    const form = useForm({
        initialValues,
    });

    const onSave = (values: EducationFormModel) => {
        if (editedEducation) {
            const updatedEducation = { ...editedEducation, ...values, description };
            updateEducation(updatedEducation);
            setEditedEducation(undefined);
        } else {
            addEducation({ id, ...values, description });
        }

        setShowEducationForm(false);
    }

    const onCancel = () => {
        setShowEducationForm(false);
    }

    return (
        <Box>
            <form onSubmit={form.onSubmit((values) => onSave(values))}>
                <Flex direction='column' gap={10}>
                    <TextInput
                        label={t('school')}
                        {...form.getInputProps('school')}
                    />
                    <TextInput
                        label={t('degree')}
                        {...form.getInputProps('degree')}
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