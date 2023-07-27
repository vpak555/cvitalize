import { Box, Button, Flex, Group, TextInput } from "@mantine/core";
import { DateInput } from '@mantine/dates';
import { IconX, IconDeviceFloppy } from "@tabler/icons-react";
import { useEducationsStore, useEducationFormStore } from "../../../store";
import { useForm } from "@mantine/form";
import { useId, useState } from 'react';
import EducationFormModel from "../../../models/EducationFormModel";
import TextEditor from "../../TextEditor/TextEditor";

export default function EducationForm() {
    const { addEducation, editedEducation, updateEducation, setEditedEducation } = useEducationsStore((state) => state);
    const [description, setDescription] = useState('');
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
                        label='School'
                        placeholder='Harvard University'
                        {...form.getInputProps('school')}
                    />
                    <TextInput
                        label='Degree'
                        placeholder='Bachelor'
                        {...form.getInputProps('degree')}
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
                        content={editedEducation?.description || description}
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