import { Box, TextInput, Flex, Textarea, Button, FileButton, Avatar, Input, useMantineTheme } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useGeneralInfoStore } from '../../../store';
import { IconDeviceFloppy, IconReload, IconUpload, IconTrash, IconPencil } from '@tabler/icons-react';
import PhotoCropModal from './PhotoCropModal/PhotoCropModal';
import { useDisclosure } from '@mantine/hooks';
import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function GeneralInfoForm() {
    const { t } = useTranslation();
    const { primaryColor } = useMantineTheme();
    const { generalInfo, setGeneralInfo } = useGeneralInfoStore((state) => state);
    const [opened, { open, close }] = useDisclosure(false);
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoSrc, setPhotoSrc] = useState<string | null>(null);
    const [photoEditMode, setPhotoEditMode] = useState(false);

    const form = useForm({
        initialValues: generalInfo,
        validate: {
            fullName: isNotEmpty(t('required', { field: t('fullName') })),
            jobTitle: isNotEmpty(t('required', { field: t('jobTitle') }))
        },
    });

    const onPhotoChange = (file: File | null) => {
        setPhoto(file);
        open();
    }

    const onPhotoSave = (src: string) => {
        setPhotoSrc(src);
        form.setFieldValue('photo', src);
        setPhotoEditMode(true);
    }

    const onPhotoEdit = () => {
        open();
    }

    const onPhotoDelete = () => {
        setPhotoSrc(null);
        form.setFieldValue('photo', '');
        setPhotoEditMode(false);
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
                    <Input.Wrapper label={t('photo')}>
                        <Flex align='center' gap={10}>
                            <Avatar src={photoSrc} size={60} color={primaryColor} />
                            <Flex direction='column'>
                                {!photoEditMode && <FileButton onChange={(file) => onPhotoChange(file)} accept='image/*'>
                                    {(props) => <Button size='xs' variant='subtle' leftIcon={<IconUpload size={12} />} {...props}>{t('upload')}</Button>}
                                </FileButton>}
                                {photoEditMode && <Button size='xs' variant='subtle' leftIcon={<IconPencil size={12} />} onClick={onPhotoEdit}>
                                    {t('edit')}
                                </Button>}
                                <Button size='xs' variant='subtle' leftIcon={<IconTrash size={12} />} onClick={onPhotoDelete}>
                                    {t('delete')}
                                </Button>
                            </Flex>
                        </Flex>
                    </Input.Wrapper>
                    <TextInput
                        label={t('fullName')}
                        {...form.getInputProps('fullName')}
                        withAsterisk
                    />
                    <TextInput
                        label={t('jobTitle')}
                        {...form.getInputProps('jobTitle')}
                        withAsterisk
                    />
                    <Textarea

                        minRows={2}
                        label={t('profile')}
                        {...form.getInputProps('profile')}
                    />
                </Flex>
                <Flex mt='md' gap={10}>
                    <Button fullWidth type='reset' leftIcon={<IconReload />} variant='outline'>{t('reset')}</Button>
                    <Button fullWidth type='submit' leftIcon={<IconDeviceFloppy />}>{t('save')}</Button>
                </Flex>
            </form>
        </Box >
    );
}