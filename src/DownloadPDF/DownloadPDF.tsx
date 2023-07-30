import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useTranslation } from 'react-i18next';

export default function DownloadPDF() {
    const { t } = useTranslation();

    const onDownload = () => {
        window.print();
    }

    return (
        <Button leftIcon={<IconDownload />} onClick={onDownload}>{t('downloadPDF')}</Button>
    );
}
