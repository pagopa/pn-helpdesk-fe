import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import AccordionTimeline from '../accordionData/AccordionTimeline';
import { PhysicalAddress } from '../../model/notification';

type Props = {
    normalizeAddress: PhysicalAddress | undefined;
    oldAddress: PhysicalAddress | undefined;
    accordionKey: string;
};

const LABELS = [
    "At",
    "Address",
    "Address Details",
    "Municipality",
    "Municipality Details",
    "ZIP",
    "Province",
    "Foreign State"
];

const DetailOfAddress: React.FC<Props> = ({ oldAddress, normalizeAddress, accordionKey }) => {
    const highlightDiff = (
        arrA: Array<string | null | undefined>,
        arrB: Array<string | null | undefined>
    ) => (
        arrA.map((valA, i) => {
            const valB = arrB[i];
            const valueA = (valA === "" || valA === null || valA === undefined) ? "" : valA;
            const valueB = (valB === "" || valB === null || valB === undefined) ? "" : valB;

            const isDifferent = valueA !== valueB;
            const label = LABELS[i] || `Dato ${i + 1}`;

            return (
                <div
                    key={i}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: "6px",
                        width: '100%'
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            width: '120px',
                            minWidth: '120px',
                            fontWeight: 'bold',
                            color: 'text.secondary',
                            marginRight: '8px'
                        }}
                    >
                        {label}:
                    </Typography>

                    <div
                        style={{
                            flexGrow: 1,
                            border: '1px black solid',
                            backgroundColor: isDifferent ? "yellow" : "transparent",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            minHeight: "24px",
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {valueA === "" ? "\u00A0" : valueA}
                    </div>
                </div>
            );
        }));

    const oldAddressComplete = [
        oldAddress?.at,
        oldAddress?.address,
        oldAddress?.addressDetails,
        oldAddress?.municipality,
        oldAddress?.municipalityDetails,
        oldAddress?.zip,
        oldAddress?.province,
        oldAddress?.foreignState
    ] as Array<string | undefined>;

    const normalizeAddressComplete = [
        normalizeAddress?.at,
        normalizeAddress?.address,
        normalizeAddress?.addressDetails,
        normalizeAddress?.municipality,
        normalizeAddress?.municipalityDetails,
        normalizeAddress?.zip,
        normalizeAddress?.province,
        normalizeAddress?.foreignState
    ] as Array<string | undefined>;

    return (
        <AccordionTimeline keyValue={accordionKey}
            accordionSummaryChild={<Typography component="span">Indirizzo normalizzato</Typography>}
            accordionDetailsChild={
                // Ho cambiato Typography in Box per contenere correttamente i div ed evitare errori HTML in console
                <Stack direction={'row'} justifyContent={'space-around'} spacing={4} sx={{ width: '100%' }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Indirizzo ente
                        </Typography>
                        {highlightDiff(oldAddressComplete, normalizeAddressComplete)}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Indirizzo normalizzato
                        </Typography>
                        {highlightDiff(normalizeAddressComplete, oldAddressComplete)}
                    </Box>
                </Stack>
            }
        />
    );
};

export default DetailOfAddress;
