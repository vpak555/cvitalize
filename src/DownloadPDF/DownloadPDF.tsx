import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

export default function DownloadPDF() {
    const onDownload = () => {
        window.print();
    }

    return (
        <Button leftIcon={<IconDownload />} onClick={onDownload}>Download PDF</Button>
    );
}
