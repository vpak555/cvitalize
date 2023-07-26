import { Box, TextInput, Flex, Textarea, Group, Button, FileInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useGeneralInfoStore } from "../../../store";
import { IconDeviceFloppy, IconReload } from "@tabler/icons-react";
import PhotoCropModal from "./PhotoCropModal/PhotoCropModal";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function GeneralInfoForm() {
    const { generalInfo, setGeneralInfo } = useGeneralInfoStore((state) => state);
    const [opened, { open, close }] = useDisclosure(false);
    const [photo, setPhoto] = useState<File | null>(null);

    const minInputLength = 2;
    const maxInputLength = 100;

    const form = useForm({
        initialValues: generalInfo,
        validate: {
            fullName: (value) => (value.length >= minInputLength && value.length <= maxInputLength ? null : `Full name must be ${minInputLength}-${maxInputLength} characters long`),
            jobTitle: (value) => (value.length >= minInputLength && value.length <= maxInputLength ? null : `Job title must be ${minInputLength}-${maxInputLength} characters long`),
        },
    });

    const onPhotoChange = (file: File | null) => {
        setPhoto(file);
        open();
    }

    const onSave = (src: string) => {
        setGeneralInfo({ ...generalInfo, photo: src });
    }

    return (
        <Box>
            {photo && <PhotoCropModal photo={photo} opened={opened} onClose={close} onSave={onSave} />}
            <form onSubmit={form.onSubmit((values) => setGeneralInfo(values))} onReset={form.onReset}>
                <Flex direction='column' gap={10}>
                    <FileInput
                        accept="image/*"
                        placeholder="photo.jpg"
                        label="Photo"
                        onChange={(file) => onPhotoChange(file)}
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
                    <Button type='reset' leftIcon={<IconReload />} variant='outline'>Reset</Button>
                    <Button type='submit' leftIcon={<IconDeviceFloppy />}>Save</Button>
                </Group>
            </form>
        </Box>
    );
}