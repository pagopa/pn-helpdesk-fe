import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, SxProps } from "@mui/material";

type AccordionTimelineProps = {
    children?: React.ReactNode;
    keyValue: string;
    expandIcon?: React.ReactNode;
    accordionSummaryChild: React.ReactNode;
    accordionDetailsChild: React.ReactNode;
    sxSummary?: SxProps;
    sxDetails?: SxProps;
};

const AccordionTimeline: React.FC<AccordionTimelineProps> = ({
    children,
    keyValue,
    expandIcon = <ExpandMoreIcon />,
    accordionSummaryChild,
    accordionDetailsChild,
    sxSummary,
    sxDetails
}) => (
    <Accordion>
        <AccordionSummary
            key={keyValue}
            expandIcon={expandIcon}
            aria-controls={`${keyValue}-content`}
            id={`${keyValue}-header`}
            sx={sxSummary}
        >
            {accordionSummaryChild}
        </AccordionSummary>
        <AccordionDetails sx={sxDetails} >
            {accordionDetailsChild}
        </AccordionDetails>
        {children}
    </Accordion >
);


export default AccordionTimeline;