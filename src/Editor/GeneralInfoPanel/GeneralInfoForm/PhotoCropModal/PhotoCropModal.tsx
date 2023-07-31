import { ActionIcon, Box, Button, FileButton, Flex, Group, Modal, ModalProps, Slider, Text } from '@mantine/core';
import { IconDeviceFloppy, IconRotate2, IconRotateClockwise2, IconUpload } from '@tabler/icons-react';
import { useRef, useState, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useTranslation } from 'react-i18next';

type Props = ModalProps & {
    photo: File | string;
    onSave: (src: string) => void;
}

export default function PhotoCropModal({ photo, opened, onClose, onSave }: Props) {
    const { t } = useTranslation();
    const editorRef = useRef<AvatarEditor>(null);
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [image, setImage] = useState<File | string>('');

    const rotationMarks = [
        { value: -45, label: '-45°' },
        { value: -30, label: '-30°' },
        { value: -15, label: '-15°' },
        { value: 0, label: '0°' },
        { value: 15, label: '15°' },
        { value: 30, label: '30°' },
        { value: 45, label: '45°' },
    ];

    const zoomMarks = [
        { value: 1, label: 'x1' },
        { value: 3, label: 'x3' },
    ];

    useEffect(() => {
        setImage(photo);
        setZoom(1);
        setRotation(0);
    }, [photo]);

    const save = () => {
        if (editorRef) {
            const dataUrl = editorRef.current?.getImage().toDataURL();
            dataUrl && onSave(dataUrl);
            onClose();
        }
    };

    const upload = (file: File | null) => {
        setImage(file || '');
    }

    const onRotateLeft = () => {
        setRotation(rotation - 90);
    }

    const onRotateRight = () => {
        setRotation(rotation + 90);
    }

    const onRotateChange = (value: number) => {
        setRotation(value);
    }

    const onZoomChange = (value: number) => {
        setZoom(value);
    }

    return (
        <Modal opened={opened} onClose={onClose} centered size={350}>
            <Flex direction='column' gap={20} >
                <Text align='center'>{t('dragPhoto')}</Text>
                <Flex align='center'>
                    <ActionIcon onClick={onRotateLeft}><IconRotate2 /></ActionIcon>
                    <AvatarEditor ref={editorRef} image={image} border={0} rotate={rotation} scale={zoom} style={{ margin: '0 auto' }} />
                    <ActionIcon onClick={onRotateRight}><IconRotateClockwise2 /></ActionIcon>
                </Flex>
                <Flex direction='column' gap={30} mb={20}>
                    <Box miw={200} mx='auto'>
                        <Text size={14}>{t('zoom')}</Text>
                        <Slider size={4} min={1} max={3} step={0.1} marks={zoomMarks} onChange={onZoomChange} />
                    </Box>
                    <Box miw={200} mx='auto'>
                        <Text size={14}>{t('rotate')}</Text>
                        <Slider size={4} min={-45} max={45} marks={rotationMarks} onChange={onRotateChange} />
                    </Box>
                </Flex>
                <Flex mt={10} gap={10}>
                    <FileButton onChange={upload} accept='image/*'>
                        {(props) => <Button fullWidth variant='outline' leftIcon={<IconUpload />} {...props}>{t('new')}</Button>}
                    </FileButton>
                    <Button fullWidth type='button' leftIcon={<IconDeviceFloppy />} onClick={save}>{t('save')}</Button>
                </Flex>
            </Flex>
        </Modal>
    );
}