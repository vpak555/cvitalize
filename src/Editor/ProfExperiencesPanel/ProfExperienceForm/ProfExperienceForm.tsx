import { Box, Button, Flex, Group, TextInput } from "@mantine/core";
import { DateInput } from '@mantine/dates';
import { IconX, IconDeviceFloppy } from "@tabler/icons-react";
import { useProfExperiencesStore, useProfExperienceFormStore } from "../../../store";
import { useForm } from "@mantine/form";
import { useId, useState } from 'react';
import ProfExperienceFormModel from "../../../models/ProfExperienceFormModel";
import TextEditor from "../../TextEditor/TextEditor";

export default function ProfExperienceForm() {
    const { addProfExperience, editedProfExperience, updateProfExperience, setEditedProfExperience } = useProfExperiencesStore((state) => state);
    const [description, setDescription] = useState('');
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
                        label='Employer'
                        placeholder='Google'
                        {...form.getInputProps('employer')}
                    />
                    <TextInput
                        label='Job Title'
                        placeholder='Software Engineer'
                        {...form.getInputProps('jobTitle')}
                    />
                    <Flex gap={10}>
                        <DateInput
                            valueFormat="MMM YYYY"
                            label='Start Date'
                            placeholder='Sep 2014'
                            {...form.getInputProps('startDate')}
                        />
                        <DateInput
                            valueFormat="MMM YYYY"
                            label='End Date'
                            placeholder='Jul 2018'
                            {...form.getInputProps('endDate')}
                        />
                    </Flex>
                    <TextInput
                        label='Location'
                        placeholder='Cambridge, Massachusetts'
                        {...form.getInputProps('location')}
                    />
                    <TextEditor
                        label='Description'
                        content={editedProfExperience?.description || description}
                        onChange={setDescription}
                    />
                </Flex>
                <Group position='right' mt='md'>
                    <Button type='button' leftIcon={<IconX />} variant='outline' onClick={onCancel}>Cancel</Button>
                    <Button type='submit' leftIcon={<IconDeviceFloppy />}>Save</Button>
                </Group>
            </form>
        </Box>
    );
}