import { Box, TextInput, Flex, Group, Button } from "@mantine/core";
import { useForm } from '@mantine/form';
import { ChangeEvent, useState } from "react";
import { usePersonalDetailsStore } from "../../../store";
import { IconDeviceFloppy } from "@tabler/icons-react";

export default function PersonalDetailsForm() {
    const { personalDetails, setPersonalDetails } = usePersonalDetailsStore((state) => state);
    const [phoneNumber, setPhoneNumber] = useState('');

    const form = useForm({
        initialValues: personalDetails,
        validate: {
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
            <form onSubmit={form.onSubmit((values) => setPersonalDetails(values))}>
                <Flex direction='column' gap={10}>
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