import { Box, TextInput, Flex, Textarea, Group, Button } from "@mantine/core";
import { useForm } from '@mantine/form';
import { ChangeEvent, useState } from "react";
import { useGeneralInfo } from "../../../store";
import { IconDeviceFloppy } from "@tabler/icons-react";

export default function GeneralInfoForm() {
    const { generalInfo, setGeneralInfo } = useGeneralInfo((state) => state);
    const [phoneNumber, setPhoneNumber] = useState('');

    const minInputLength = 2;
    const maxInputLength = 100;

    const form = useForm({
        initialValues: generalInfo,
        validate: {
            fullName: (value) => (value.length >= minInputLength && value.length <= maxInputLength ? null : `Full name must be ${minInputLength}-${maxInputLength} characters long`),
            jobTitle: (value) => (value.length >= minInputLength && value.length <= maxInputLength ? null : `Job title must be ${minInputLength}-${maxInputLength} characters long`),
            email: (value) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || value === '' ? null : 'Invalid email'),
        },
    });

    const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.currentTarget.value;
        const filteredValue = inputValue.replace(/[^\d()+-\s]/g, '');
        form.setFieldValue('phoneNumber', filteredValue)
        setPhoneNumber(filteredValue);
    };

    return (
        <Box>
            <form onSubmit={form.onSubmit((values) => setGeneralInfo(values))}>
                <Flex direction='column' gap={10}>
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
                    <TextInput
                        label='Email'
                        placeholder='johndoe@email.com'
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        label='Phone number'
                        placeholder='+1 (555) 555-5555'
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                    <TextInput
                        label='Address'
                        placeholder='8313 Lake Rd. Brooklyn, NY 11235'
                        {...form.getInputProps('address')}
                    />
                </Flex>
                <Group position='right' mt='md'>
                    <Button type='submit' leftIcon={<IconDeviceFloppy />}>Save</Button>
                </Group>
            </form>
        </Box>
    );
}