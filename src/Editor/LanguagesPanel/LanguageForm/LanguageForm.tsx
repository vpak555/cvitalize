import { Box, Button, Flex, Group, Input, Rating, TextInput, useMantineTheme } from "@mantine/core";
import { IconX, IconDeviceFloppy } from "@tabler/icons-react";
import { useLanguages, useLanguageForm } from "../../../store";
import { isNotEmpty, useForm } from "@mantine/form";
import { useId } from "react";
import SkillFormModel from "../../../models/SkillFormModel";

export default function LanguageForm() {
    const { showLanguageExpertise, addLanguage, editedLanguage, updateLanguage, setEditedLanguage } = useLanguages((state) => state);
    const setShowLanguageForm = useLanguageForm((state) => state.setShowLanguageForm);
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
            title: isNotEmpty('Title is required field')
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
                        placeholder='Spanish'
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
                <Group position='right' mt='md'>
                    <Button type='button' leftIcon={<IconX />} variant='outline' onClick={onCancel}>Cancel</Button>
                    <Button type='submit' leftIcon={<IconDeviceFloppy />}>Save</Button>
                </Group>
            </form>
        </Box>
    );
}