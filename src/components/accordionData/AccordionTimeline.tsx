import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from "react-redux";
import { Accordion, AccordionDetails, AccordionSummary, SxProps } from "@mui/material";
import { selectExpanded, toggleSingle } from "../../redux/accordionSlice";

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
    sxDetails,
}) => {
    const dispatch = useDispatch();
    const expanded = useSelector(selectExpanded);

    return (
        <Accordion
            expanded={!!expanded[keyValue]}
            onChange={() => dispatch(toggleSingle(keyValue))}>
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
};


export default AccordionTimeline;