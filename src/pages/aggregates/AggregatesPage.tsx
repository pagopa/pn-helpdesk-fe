import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AggregatesTable from '../../components/aggregates/AggregatesTable';
import MainLayout from '../mainLayout/MainLayout';
import * as routes from '../../navigation/router.const';
import { useHasPermissions } from '../../hooks/useHasPermissions';
import { Permission } from '../../model/user-permission';

/**
 * Aggregates page
 * @component
 */
const AggregatesPage = ({ email }: any) => {
  const navigate = useNavigate();

  const handleClickNew = () => {
    navigate(routes.CREATE_AGGREGATE);
  };

  const isUserWriter = useHasPermissions([Permission.API_KEY_WRITE]);

  const title = (
    <Typography gutterBottom variant="h4" component="div">
      Gestione Aggregazioni ApiKey
    </Typography>
  );

  const titleWithoutWritePermission = <>{title}</>;

  const titleWithWritePermission = (
    <>
      <Box>
        {title}
      </Box>
      <Box >
        <Stack sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            type="submit"
            size="small"
            onClick={handleClickNew}
            startIcon={<GroupAddIcon />}
          >
            Nuova aggregazione
          </Button>
        </Stack>
      </Box>
    </>
  );

  return (
    <MainLayout email={email}>
      <Box sx={{ px: 2 }}>
        <Grid container sx={{ mb: 3 }}>
          {isUserWriter ? titleWithWritePermission : titleWithoutWritePermission}
        </Grid>

        <AggregatesTable />
      </Box>
    </MainLayout>
  );
};
export default AggregatesPage;
