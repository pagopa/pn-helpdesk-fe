import React from 'react';
import { Typography } from '@mui/material';
import AccordionTimeline from '../accordionData/AccordionTimeline';

type Props = {
    normalizeAddress: {
        at: null;
        address: string;
        addressDetails: string;
        zip: string;
        municipality: string;
        municipalityDetails: string;
        province: string;
        foreignState: string;
    } | null;

    oldAddress: {
        at: null;
        address: string;
        addressDetails: string | null;
        zip: string;
        municipality: string;
        municipalityDetails: string | null;
        province: string;
        foreignState: string | null;
    } | null;
};

const DetailOfAddress: React.FC<Props> = ({ oldAddress, normalizeAddress }) => {
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
        <AccordionTimeline keyValue="address"
            accordionSummaryChild={<Typography component="span">Indirizzo normalizzato</Typography>
            }
            accordionDetailsChild={<>
                <Typography variant="body1">
                    Indirizzo ente : {highlightDiff(oldAddressComplete, normalizeAddressComplete)}
                </Typography>
                <Typography variant="body1">
                    Indirizzo normalizzato : {highlightDiff(normalizeAddressComplete, oldAddressComplete)}
                </Typography>
            </>
            }
        ></AccordionTimeline>
    );
};

export default DetailOfAddress;
