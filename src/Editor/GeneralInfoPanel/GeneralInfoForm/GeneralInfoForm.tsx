import { Box, TextInput, Flex, Textarea, Group, Button, FileButton, Avatar, Input, useMantineTheme } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useGeneralInfoStore } from "../../../store";
import { IconDeviceFloppy, IconReload, IconUpload, IconTrash } from "@tabler/icons-react";
import PhotoCropModal from "./PhotoCropModal/PhotoCropModal";
import { useDisclosure } from "@mantine/hooks";
import { FormEvent, useState } from "react";

export default function GeneralInfoForm() {
    const { primaryColor } = useMantineTheme();
    const { generalInfo, setGeneralInfo } = useGeneralInfoStore((state) => state);
    const [opened, { open, close }] = useDisclosure(false);
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoSrc, setPhotoSrc] = useState<string | null>(null);

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

    const onPhotoSave = (src: string) => {
        setPhotoSrc(src);
        form.setFieldValue('photo', src);
    }

    const onPhotoDelete = () => {
        setPhotoSrc(null);
        form.setFieldValue('photo', '');
    }

    const onReset = (event: FormEvent<HTMLFormElement>) => {
        onPhotoDelete();
        form.onReset(event);
    }

    return (
        <Box>
            {photo && <PhotoCropModal photo={photo} opened={opened} onClose={close} onSave={onPhotoSave} />}
            <form onSubmit={form.onSubmit((values) => setGeneralInfo(values))} onReset={onReset}>
                <Flex direction='column' gap={10}>
                    <Input.Wrapper label='Photo'>
                        <Flex align='center' gap={10}>
                            <Avatar src={photoSrc} size={60} color={primaryColor} />
                            <Flex direction='column'>
                                <FileButton  onChange={(file) => onPhotoChange(file)} accept="image/*">
                                    {(props) => <Button size='xs' variant='subtle'  leftIcon={<IconUpload size={12}/>} {...props}>Upload</Button>}
                                </FileButton>
                                <Button size='xs' variant='subtle' leftIcon={<IconTrash size={12} />} onClick={onPhotoDelete}>
                                    Delete
                                </Button>
                            </Flex>
                        </Flex>
                    </Input.Wrapper>
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
        </Box >
    );
}