import { Typography, Box } from '@mui/material';
import React from 'react';

import { codiciStatusTimeline } from '../../model/notification';
import { formatEventDate } from '../../helpers/utils';

type AnalogEvent = {
    accordionKey: string;
    analogEvents: Array<{
        elementId: string;
        category: string;
        details?: {
            schedulingDate?: string | null;
            deliveryDetailCode?: string | null;
            deliveryFailureCause?: string | null;
            responseStatus?: string | null;
            registeredLetterCode?: string | null;
            [key: string]: any;
        };
    }>;
};

type SendAnalog = {
    deliveryDetailCode: string;
    deliveryFailureCause: string;
    responseStatus: string;
    registeredLetterCode: string;
    attachments: Array<AnalogAttachment>;

} | null;

type AnalogAttachment = {
    documentType: string;
    url: string;
    date: string;
};

const PhysicalAddress: React.FC<{ address: any }> = ({ address }) => (
    <Box sx={{ mt: 0.5, pl: 2 }}> {/* Un leggero rientro a sinistra isola visivamente l'indirizzo */}
        {address.fullname && (
            <Typography variant="body2">
                Nome: <Box component="span" sx={{ fontWeight: 'bold' }}>{address.fullname}</Box>
            </Typography>
        )}
        {address.address && (
            <Typography variant="body2">
                Indirizzo: <Box component="span" sx={{ fontWeight: 'bold' }}>{address.address}</Box>
            </Typography>
        )}
        {address.addressDetails && (
            <Typography variant="body2">
                Dettagli: <Box component="span" sx={{ fontWeight: 'bold' }}>{address.addressDetails}</Box>
            </Typography>
        )}
        {address.zip && (
            <Typography variant="body2">
                CAP: <Box component="span" sx={{ fontWeight: 'bold' }}>{address.zip}</Box>
            </Typography>
        )}
        {address.municipality && (
            <Typography variant="body2">
                Comune: <Box component="span" sx={{ fontWeight: 'bold' }}>{address.municipality}</Box>
            </Typography>
        )}
        {address.province && (
            <Typography variant="body2">
                Provincia: <Box component="span" sx={{ fontWeight: 'bold' }}>{address.province}</Box>
            </Typography>
        )}
        {address.foreignState && (
            <Typography variant="body2">
                Stato estero: <Box component="span" sx={{ fontWeight: 'bold' }}>{address.foreignState}</Box>
            </Typography>
        )}
    </Box>
);

const PrepareAnalogDomicile: React.FC<{ domicile: any }> = ({ domicile }) => (
    <Box sx={{ mt: 0.5, pl: 2 }}> {/* Rientro a sinistra per uniformità visiva con gli altri blocchi */}
        {domicile.at && (
            <Typography variant="body2">
                Domicilio presso: <Box component="span" sx={{ fontWeight: 'bold' }}>{domicile.at}</Box>
            </Typography>
        )}
        {domicile.address && (
            <Typography variant="body2">
                Indirizzo: <Box component="span" sx={{ fontWeight: 'bold' }}>{domicile.address}</Box>
            </Typography>
        )}
        {domicile.addressDetails && (
            <Typography variant="body2">
                Dettagli: <Box component="span" sx={{ fontWeight: 'bold' }}>{domicile.addressDetails}</Box>
            </Typography>
        )}
        {domicile.zip && (
            <Typography variant="body2">
                CAP: <Box component="span" sx={{ fontWeight: 'bold' }}>{domicile.zip}</Box>
            </Typography>
        )}
        {domicile.municipality && (
            <Typography variant="body2">
                Comune: <Box component="span" sx={{ fontWeight: 'bold' }}>{domicile.municipality}</Box>
            </Typography>
        )}
        {domicile.province && (
            <Typography variant="body2">
                Provincia: <Box component="span" sx={{ fontWeight: 'bold' }}>{domicile.province}</Box>
            </Typography>
        )}
        {domicile.foreignState && (
            <Typography variant="body2">
                Stato estero: <Box component="span" sx={{ fontWeight: 'bold' }}>{domicile.foreignState}</Box>
            </Typography>
        )}
    </Box>
);


const SendAnalogDomicile: React.FC<{ analogCost: any }> = ({ analogCost }) => {
    // Dividiamo il valore intero in centesimi (es. 310) per 100 per ottenere i decimali reali (3.10)
    const realCost = typeof analogCost.analogCost === 'number'
        ? analogCost.analogCost / 100
        : parseFloat(analogCost.analogCost) / 100;

    // Formattiamo il numero in valuta italiana (es. 3.1 -> 3,10 €)
    const formattedCost = !isNaN(realCost)
        ? realCost.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })
        : `${analogCost.analogCost} €`;
    return (<>
        {analogCost?.analogCost && (
            <>
                <Box component="span" >{formattedCost} </Box>
            </>
        )}
        {analogCost?.numberOfPages && (
            <>
                - Numero Pagine: <Box component="span" >{analogCost.numberOfPages} Incluso AAR </Box>
            </>
        )}
        {analogCost?.envelopeWeight && (
            <>
                - Peso: <Box component="span" >{analogCost.envelopeWeight} </Box>
            </>
        )}
    </>
    );
};

const SendAnalogDetails: React.FC<{ sendAnalog: SendAnalog }> = ({ sendAnalog }) => (
    <>
        {sendAnalog?.attachments && (
            <Box component="span"> - Attachments: {sendAnalog.attachments.map((attachment, index) => (
                <React.Fragment key={index}>
                    <Box component="span">
                        {attachment.documentType} -
                    </Box>
                    <Box component="span">
                        {attachment.url} -
                    </Box>
                    <Box component="span">
                        {formatEventDate(attachment.date)}
                    </Box>
                </React.Fragment>
            ))}</Box>
            </Box>
        )}
    </>
);

const SendAnalogFeedbackDetails: React.FC<{ feedback: any }> = ({ feedback }) => (
    <>
        {feedback?.responseStatus && <Box component="span">{feedback.responseStatus}</Box>}
    </>
);

function getSummaryText(sendAnalog: SendAnalog, sendAnalogFeedback: any, prepareAnalogDomicileFailure: any): string {
    if (sendAnalog) {
        const code = sendAnalog.deliveryDetailCode || sendAnalog.deliveryFailureCause;
        return code ? ` - ${code} - ${codiciStatusTimeline[code]}` : "";
    }
    if (sendAnalogFeedback?.deliveryDetailCode) {
        return `- ${sendAnalogFeedback.deliveryDetailCode} - ${codiciStatusTimeline[sendAnalogFeedback.deliveryDetailCode]}`;
    }
    if (prepareAnalogDomicileFailure) {
        return `- ${prepareAnalogDomicileFailure.failureCause} - ${codiciStatusTimeline[prepareAnalogDomicileFailure.failureCause]}`;
    }
    return "";
}


function parseAnalogElement(el: any) {
    const eventDateFormatted = formatEventDate(el.eventTimestamp || el.timestamp || el.details?.eventTimestamp);

    const schedulingDate =
        el.elementId.includes("SCHEDULE_ANALOG_WORKFLOW") && el.details?.schedulingDate
            ? new Date(el.details.schedulingDate).toLocaleDateString()
            : null;

    const sendAnalog: SendAnalog =
        el.elementId.includes("SEND_ANALOG_PROGRESS") && el.details
            ? {
                deliveryDetailCode: el.details.deliveryDetailCode,
                deliveryFailureCause: el.details.deliveryFailureCause,
                responseStatus: el.details.responseStatus,
                registeredLetterCode: el.details.registeredLetterCode,
                attachments: el.details.attachments,
            }
            : null;

    const sendAnalogFeedback =
        el.elementId.includes("SEND_ANALOG_FEEDBACK") && el.details
            ? {
                deliveryDetailCode: el.details.deliveryDetailCode,
                responseStatus: el.details.responseStatus,
                deliveryFailureCause: el.details.deliveryFailureCause,
            }
            : null;

    const prepareAnalogDomicile =
        el.elementId.includes("PREPARE_ANALOG_DOMICILE") && el.details
            ? {
                at: el.details.physicalAddress?.at || '',
                address: el.details.physicalAddress?.address,
                addressDetails: el.details.physicalAddress?.addressDetails,
                zip: el.details.physicalAddress?.zip,
                municipality: el.details.physicalAddress?.municipality,
                mucipalityDetails: el.details.physicalAddress?.municipalityDetails,
                province: el.details.physicalAddress?.province,
                foreignState: el.details.physicalAddress?.foreignState,
            }
            : null;

    const prepareAnalogDomicileFailure =
        el.elementId.includes("PREPARE_ANALOG_DOMICILE_FAILURE")
            ? {
                failureCause: el.details.failureCause,
            }
            : null;

    const sendAnalogDomicile =
        el.elementId.includes("SEND_ANALOG_DOMICILE") && el.details
            ? {
                analogCost: el.details.analogCost,
                sendDate: el.details.sendDate,
                numberOfPages: el.details.numberOfPages,
                envelopeWeight: el.details.envelopeWeight,
            }
            : null;


    const physicalAddress =
        (el.elementId.includes("ANALOG_SUCCESS_WORKFLOW") || el.elementId.includes("ANALOG_FAILURE_WORKFLOW"))
            ? el.details?.physicalAddress
            : null;

    return { eventDateFormatted, schedulingDate, sendAnalog, sendAnalogFeedback, physicalAddress, prepareAnalogDomicile, prepareAnalogDomicileFailure, sendAnalogDomicile };
}


const AnalogEvent: React.FC<AnalogEvent> = ({ analogEvents }) => (
    <Box sx={{ my: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        {analogEvents.map((el: any, i: number) => {
            const {
                eventDateFormatted,
                schedulingDate,
                sendAnalog,
                sendAnalogFeedback,
                physicalAddress,
                prepareAnalogDomicile,
                prepareAnalogDomicileFailure,
                sendAnalogDomicile
            } = parseAnalogElement(el);

            return (
                <Typography key={`analog-${i}`} variant="body2" component="div">

                    {eventDateFormatted && (
                        <> - <Box component="span" >{eventDateFormatted}</Box>:</>
                    )}
                    <Box component="span" > {el.category} {getSummaryText(sendAnalog, sendAnalogFeedback, prepareAnalogDomicileFailure)}</Box>

                    {/* Data schedulazione */}
                    {schedulingDate && (
                        <> - Schedulato il: <Box component="span" >{schedulingDate}</Box></>
                    )}

                    {/* Sub-componenti dei dettagli: 
                        Avvolti in Box inline per accodarli sulla stessa riga di testo */}
                    {physicalAddress && (
                        <> - Indirizzo: <PhysicalAddress address={physicalAddress} /></>
                    )}

                    {sendAnalog && (
                        <><Box component="span" sx={{ display: 'inline' }}><SendAnalogDetails sendAnalog={sendAnalog} /></Box></>
                    )}

                    {sendAnalogFeedback && (
                        <> - Feedback: <Box component="span" sx={{ display: 'inline' }}><SendAnalogFeedbackDetails feedback={sendAnalogFeedback} /></Box></>
                    )}

                    {prepareAnalogDomicile && (
                        <> - Domicilio: <Box component="span" sx={{ display: 'inline' }}><PrepareAnalogDomicile domicile={prepareAnalogDomicile} /></Box></>
                    )}

                    {sendAnalogDomicile && (
                        <> - Costo: <Box component="span" sx={{ display: 'inline' }}><SendAnalogDomicile analogCost={sendAnalogDomicile} /></Box></>
                    )}
                </Typography>
            );
        })}
    </Box>
);

export default AnalogEvent;
