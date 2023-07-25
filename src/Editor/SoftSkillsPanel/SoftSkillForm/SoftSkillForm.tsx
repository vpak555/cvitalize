import { Box, Button, Flex, Group, Input, Rating, TextInput, useMantineTheme } from "@mantine/core";
import { IconX, IconDeviceFloppy } from "@tabler/icons-react";
import { useSoftSkills, useSoftSkillForm } from "../../../store";
import { isNotEmpty, useForm } from "@mantine/form";
import { useId } from "react";
import SkillFormModel from "../../../models/SkillFormModel";

export default function SoftSkillForm() {
    const { showSoftSkillExpertise, addSoftSkill, editedSoftSkill, updateSoftSkill, setEditedSoftSkill } = useSoftSkills((state) => state);
    const setShowSoftSkillForm = useSoftSkillForm((state) => state.setShowSoftSkillForm);
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
            title: isNotEmpty('Soft skill is required field')
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
                        label='Soft skill'
                        placeholder='Creativity'
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
                <Group position='right' mt='md'>
                    <Button type='button' leftIcon={<IconX />} variant='outline' onClick={onCancel}>Cancel</Button>
                    <Button type='submit' leftIcon={<IconDeviceFloppy />}>Save</Button>
                </Group>
            </form>
        </Box>
    );
}