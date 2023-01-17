import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader
} from '@mui/material';
import { ReactNode } from 'react';
import { CardActionType, CardHeaderType } from './types';

type Props = {
    cardId: string,
    cardHeader: CardHeaderType,
    cardBody: ReactNode,
    cardActions?: Array<CardActionType>
}

const CustomCard = ({cardId, cardHeader, cardBody, cardActions} : Props) => {

  return (
      <Card
        key={cardId}
        raised
        data-testid="customCard"
        sx={{
          mb: 2,
          px: 2,
        }}
      >
        <CardHeader 
          sx={cardHeader.sx ? cardHeader.sx : null} 
          title={cardHeader.title ? (cardHeader.title) : null} 
          avatar={cardHeader.avatar ? cardHeader.avatar : null}
          action={cardHeader.action ? cardHeader.action : null} 
          className="card-header" 
        />
        <CardContent sx={{ padding: 0, mt: 2, mb:2, ':last-child': { padding: 0 } }}>
          {cardBody}
        </CardContent>
        <CardActions disableSpacing className="card-actions">
          {cardActions &&
            cardActions.map((action) => (
              <Box
                key={action.id}
                onClick={() => action.onClick ? action.onClick() : null}
                data-testid="cardAction"
                sx={{ ml: 'auto' }}
              >
                {action.component}
              </Box>
            ))}
        </CardActions>
      </Card>
  );
}

export default CustomCard;

