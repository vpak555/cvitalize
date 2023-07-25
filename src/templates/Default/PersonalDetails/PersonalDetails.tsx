import { Flex } from "@mantine/core";
import PersonalDetail from "./PersonalDetail/PersonalDetail";
import { IconLocation, IconMail, IconPhone } from "@tabler/icons-react";
import PersonalDetailsModel from "../../../models/PersonalDetailsModel";

export default function PersonalDetails({ personalDetails }: { personalDetails: PersonalDetailsModel }) {
    const { email, phoneNumber, address } = personalDetails;

    return (
        <Flex direction='column' gap={10}>
            {email && <PersonalDetail detail={email} icon={IconMail} />}
            {phoneNumber && <PersonalDetail detail={phoneNumber} icon={IconPhone} />}
            {address && <PersonalDetail detail={address} icon={IconLocation} />}
        </Flex>


    );
}