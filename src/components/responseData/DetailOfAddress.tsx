import React from 'react';
import { Stack, Typography } from '@mui/material';
import AccordionTimeline from '../accordionData/AccordionTimeline';
import { PhysicalAddress } from '../../model/notification';

type Props = {
    normalizeAddress: PhysicalAddress | undefined;
    oldAddress: PhysicalAddress | undefined;
    accordionKey: string;
};

const DetailOfAddress: React.FC<Props> = ({ oldAddress, normalizeAddress, accordionKey }) => {
    const highlightDiff = (
        arrA: Array<string | null | undefined>,
        arrB: Array<string | null | undefined>
    ) => (
        arrA.map((valueA, i) => {
            const valueB = arrB[i];
            const isDifferent = valueA !== valueB;

            return (
                <div
                    key={i}
                    style={{
                        border: '1px black solid',
                        backgroundColor: isDifferent ? "yellow" : "transparent",
                        padding: "2px 4px",
                        marginBottom: "4px"
                    }}
                >
                    {valueA ?? "-"}
                </div>
            );
        }));

    const oldAddressComplete = [
        oldAddress?.address,
        oldAddress?.municipality,
        oldAddress?.municipalityDetails,
        oldAddress?.zip,
        oldAddress?.province
    ] as Array<string | undefined>;
    const normalizeAddressComplete = [
        normalizeAddress?.address,
        normalizeAddress?.municipality,
        normalizeAddress?.municipalityDetails,
        normalizeAddress?.zip,
        normalizeAddress?.province
    ] as Array<string | undefined>;

    return (
        <AccordionTimeline keyValue={accordionKey}
            accordionSummaryChild={<Typography component="span">Indirizzo normalizzato</Typography>
            }
            accordionDetailsChild={<Stack direction={'row'} justifyContent={'space-around'}>
                <Typography variant="body1">
                    Indirizzo ente : {highlightDiff(oldAddressComplete, normalizeAddressComplete)}
                </Typography>
                <Typography variant="body1">
                    Indirizzo normalizzato : {highlightDiff(normalizeAddressComplete, oldAddressComplete)}
                </Typography>
            </Stack>
            }
        ></AccordionTimeline>
    );
};

export default DetailOfAddress;
