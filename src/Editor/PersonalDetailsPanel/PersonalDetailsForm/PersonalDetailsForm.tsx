import { Box, TextInput, Flex, Button } from '@mantine/core';
import { useForm, isEmail } from '@mantine/form';
import { ChangeEvent, useState } from 'react';
import { usePersonalDetailsStore } from '../../../store';
import { IconDeviceFloppy, IconReload } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export default function PersonalDetailsForm() {
    const { t } = useTranslation();
    const { personalDetails, setPersonalDetails } = usePersonalDetailsStore((state) => state);
    const [phoneNumber, setPhoneNumber] = useState('');

    const form = useForm({
        initialValues: personalDetails,
        validate: {
            email: isEmail(t('invalidEmail'))
        },
    });

    const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.currentTarget.value;
        const filteredValue = inputValue.replace(/[^\d()+-\s]/g, '');
        form.setFieldValue('phoneNumber', filteredValue)
        setPhoneNumber(filteredValue);
    };

    const onReset = () => {
        setPhoneNumber('');
        form.reset();
    }

    return (
        <Box>
            <form onSubmit={form.onSubmit((values) => setPersonalDetails(values))} onReset={onReset}>
                <Flex direction='column' gap={10}>
                    <TextInput
                        label={t('email')}
                        {...form.getInputProps('email')}
                        withAsterisk
                    />
                    <TextInput
                        label={t('phoneNumber')}
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                    <TextInput
                        label={t('address')}
                        {...form.getInputProps('address')}
                    />
                </Flex>
                <Flex mt='md' gap={20}>
                    <Button fullWidth type='reset' leftIcon={<IconReload />} variant='outline'>{t('reset')}</Button>
                    <Button fullWidth type='submit' leftIcon={<IconDeviceFloppy />}>{t('save')}</Button>
                </Flex>
            </form>
        </Box>
    );
}