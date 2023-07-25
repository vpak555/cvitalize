import { Accordion } from "@mantine/core";
import PanelModel from "../../models/PanelModel";

export default function Panel({ title, children }: PanelModel) {
    return (
        <Accordion.Item value={title}>
            <Accordion.Control>
                {title}
            </Accordion.Control>
            <Accordion.Panel>{children}</Accordion.Panel>
        </Accordion.Item>
    );
}