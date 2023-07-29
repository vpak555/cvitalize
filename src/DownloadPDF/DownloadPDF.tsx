import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import * as html2pdf from 'html2pdf.js';

export default function DownloadPDF() {

    const opt = {
        filename: 'CV.pdf',
        image: { type: 'png' },
        html2canvas: { scale: 4 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait', compress: true }
    };

    const onDownload = () => {
        const cvElement = document.getElementById('cv');
        html2pdf().set(opt).from(cvElement).save(); // TODO: webworker is needed
    }

    return (
        <Button leftIcon={<IconDownload />} onClick={onDownload}>Download PDF</Button>
    );
}
