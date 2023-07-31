import { Box, Button, Flex, TextInput } from '@mantine/core';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';
import { useEducationsStore, useEducationFormStore } from '../../../store';
import { useForm, isNotEmpty } from '@mantine/form';
import { MonthPickerInput } from '@mantine/dates';
import { useId, useState } from 'react';
import EducationFormModel from '../../../models/EducationFormModel';
import TextEditor from '../../TextEditor/TextEditor';
import { useTranslation } from 'react-i18next';
import { isDateAfter } from '../../../utils/utils';
import 'dayjs/locale/ru';

export default function EducationForm() {
    const { t, i18n } = useTranslation();
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
        validate: {
            school: isNotEmpty(t('required', { field: t('school') })),
            startDate: isNotEmpty(t('required', { field: t('startDate') })),
            endDate: (value, values) =>
                value === undefined || isDateAfter(values.startDate, value) ? null : t('endDate>startDate'),
        }
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
                        withAsterisk
                    />
                    <TextInput
                        label={t('degree')}
                        {...form.getInputProps('degree')}
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