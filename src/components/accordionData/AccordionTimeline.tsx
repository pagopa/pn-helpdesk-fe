import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

type AccordionTimelineProps = {
    keyValue: string;
    expandIcon?: React.ReactNode;
    accordionSummaryChild: React.ReactNode;
    accordionDetailsChild: React.ReactNode;
};

const AccordionTimeline: React.FC<AccordionTimelineProps> = ({
    keyValue,
    expandIcon = <ExpandMoreIcon />,
    accordionSummaryChild,
    accordionDetailsChild,
}) => (
    <Accordion>
        <AccordionSummary
            key={keyValue}
            expandIcon={expandIcon}
            aria-controls={`${keyValue}-content`}
            id={`${keyValue}-header`}
        >
            {accordionSummaryChild}
        </AccordionSummary>
        <AccordionDetails>
            {accordionDetailsChild}
        </AccordionDetails>
    </Accordion>
);


export default AccordionTimeline;