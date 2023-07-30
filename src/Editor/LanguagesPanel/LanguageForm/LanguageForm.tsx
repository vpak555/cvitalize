import { Box, Button, Flex, Group, Input, Rating, TextInput, useMantineTheme } from '@mantine/core';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';
import { useLanguagesStore, useLanguageFormStore } from '../../../store';
import { isNotEmpty, useForm } from '@mantine/form';
import { useId } from 'react';
import SkillFormModel from '../../../models/SkillFormModel';
import { useTranslation } from 'react-i18next';

export default function LanguageForm() {
    const { t } = useTranslation();
    const { showLanguageExpertise, addLanguage, editedLanguage, updateLanguage, setEditedLanguage } = useLanguagesStore((state) => state);
    const setShowLanguageForm = useLanguageFormStore((state) => state.setShowLanguageForm);
    const { primaryColor } = useMantineTheme();
    const id = useId();
    const initialValues =
        editedLanguage ?
            {
                ...editedLanguage,
                showExpertise: showLanguageExpertise
            } :
            {
                id,
                title: '',
                level: 0,
                showExpertise: showLanguageExpertise
            };
    const form = useForm({
        initialValues,
        validate: {
            title: isNotEmpty(t('required', { field: t('language') }))
        },
    });

    const onSave = (values: SkillFormModel) => {
        if (editedLanguage) {
            const updatedLanguage = { ...editedLanguage, ...values };
            updateLanguage(updatedLanguage);
            setEditedLanguage(undefined);
        } else {
            addLanguage({ ...values, id });
        }

        setShowLanguageForm(false);
    }

    const onCancel = () => {
        setShowLanguageForm(false);
    }

    return (
        <Box>
            <form onSubmit={form.onSubmit((values) => onSave(values))}>
                <Flex direction='column' gap={10}>
                    <TextInput
                        label='Language'
                        {...form.getInputProps('title')}
                    />
                    {
                        showLanguageExpertise &&
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