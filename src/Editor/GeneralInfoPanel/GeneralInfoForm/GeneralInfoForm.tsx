import { Box, TextInput, Flex, Textarea, Group, Button, FileInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useGeneralInfoStore } from "../../../store";
import { IconDeviceFloppy } from "@tabler/icons-react";

export default function GeneralInfoForm() {
    const { generalInfo, setGeneralInfo } = useGeneralInfoStore((state) => state);

    const minInputLength = 2;
    const maxInputLength = 100;

    const form = useForm({
        initialValues: generalInfo,
        validate: {
            fullName: (value) => (value.length >= minInputLength && value.length <= maxInputLength ? null : `Full name must be ${minInputLength}-${maxInputLength} characters long`),
            jobTitle: (value) => (value.length >= minInputLength && value.length <= maxInputLength ? null : `Job title must be ${minInputLength}-${maxInputLength} characters long`),
        },
    });

    return (
        <Box>
            <form onSubmit={form.onSubmit((values) => setGeneralInfo(values))}>
                <Flex direction='column' gap={10}>
                    <FileInput
                        placeholder="photo.jpg"
                        label="Photo"
                    />
                    <TextInput
                        label='Full name'
                        placeholder='John Doe'
                        {...form.getInputProps('fullName')}
                    />
                    <TextInput
                        label='Job title'
                        placeholder='Software Engineer'
                        {...form.getInputProps('jobTitle')}
                    />
                    <Textarea

                        minRows={2}
                        label='Profile'
                        placeholder='I am a Software Engineer with overall 5 years in IT industry'
                        {...form.getInputProps('profile')}
                    />
                </Flex>
                <Group position='right' mt='md'>
                    <Button type='submit' leftIcon={<IconDeviceFloppy />}>Save</Button>
                </Group>
            </form>
        </Box>
    );
}