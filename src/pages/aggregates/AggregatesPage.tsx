import React from "react";
import MainLayout from "../mainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import AggregatesTable from "../../components/aggregates/AggregatesTable";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import * as routes from '../../navigation/router.const';
import { useHasPermissions } from "../../hooks/useHasPermissions";
import { Permission } from "../../model/user-permission";

/**
 * Aggregates page
 * @component
 */
const AggregatesPage = ({email}: any) => {
  const navigate = useNavigate();

  const handleClickNew = () => {
    navigate(routes.CREATE_AGGREGATE);
  };

  const isUserWriter = useHasPermissions([Permission.API_KEY_WRITE]);

  const title = <Typography gutterBottom variant="h4" component="div">
    Gestione Aggregazioni ApiKey
  </Typography>

  const titleWithoutWritePermission = <Grid item>
    {title}
  </Grid>

  const titleWithWritePermission = <>
    <Grid item xs={8}>
      {title}
    </Grid>
    <Grid item xs={4}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          type="submit"
          size="small"
          onClick={handleClickNew}
          startIcon={<GroupAddIcon />}
        >
          Nuova aggregazione
        </Button>
      </Box>
    </Grid>
  </>

  return (
      <MainLayout email={email}>
        <Box px={2}>
          <Grid container marginBottom={3}>
            {isUserWriter ? titleWithWritePermission : titleWithoutWritePermission}
          </Grid>
          
          <AggregatesTable />
          
        </Box>
      </MainLayout>
  );
};
export default AggregatesPage;


