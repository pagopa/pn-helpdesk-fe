import { Breadcrumbs, Stack, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export type BreadcrumbsProps = {
    links: Array<BreadcrumbsLinkProps>;
    currentLocationLabel: string;
};

type BreadcrumbsLinkProps = {
    linkLabel: string,
    linkRoute: string
}

const StyledLink = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    color: `${theme.palette.text.primary} !important`,
    texDecoration: 'none !important',
    '&:hover, &:focus': {
      textDecoration: 'underline !important',
    },
  }));

const BreadcrumbsLink = ({linkLabel, linkRoute} : BreadcrumbsLinkProps) => {
    return (
        <StyledLink to={linkRoute}>
            {linkLabel}
        </StyledLink>
    )
}

const CustomBreadcrumbs = ({links, currentLocationLabel}: BreadcrumbsProps) => {  
    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'start', sm: 'center' }}
            justifyContent="start"
            spacing={3}
        >
            <Breadcrumbs aria-label="breadcrumb">
                {links.map(link => <BreadcrumbsLink key={link.linkRoute} {...link} />)} 
                <Typography color="text.primary">{currentLocationLabel}</Typography>
            </Breadcrumbs>
        </Stack>
    );
}
export default CustomBreadcrumbs;