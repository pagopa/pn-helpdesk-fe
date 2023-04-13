import React, { useState } from "react";
import MainLayout from "../mainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import VirtualKeyTable from "../../components/apikey/VirtualKeyTable";
import GroupsTable from "../../components/apikey/GroupsTable";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import * as routes from '../../navigation/router.const';
import { useHasPermissions } from "../../hooks/useHasPermissions";
import { Permission } from "../../model/user-permission";

/**
 * AuthApikey page
 * @component
 */
const AuthApikeyPage = ({ email }: any) => {
  const [selectedPa, setSelectedPa] = useState(null);
  const navigate = useNavigate();
  const handleClickNew = () => {
    navigate(routes.CREATE_AGGREGATE);
  };

  const isUserWriter = useHasPermissions([Permission.API_KEY_WRITE]);

  return (
    <MainLayout email={email}>
      <Box px={4}>
        <Grid container marginBottom={3}>
          <Typography gutterBottom variant="h4" component="div">
            Gestione Autorizzazioni Apikey
          </Typography>
        </Grid>
        <Grid container spacing={10}>
          <Grid item xs={4} style={{ alignItems: 'left', textAlign: "center" }} >
            <Typography gutterBottom variant="h6" component="div">
              Seleziona una PA
            </Typography>
            <Box marginTop={4.4}>
              <GroupsTable />
            </Box>
          </Grid>
          <Grid item xs={8} justifyContent={'flex-start'}>
            <Grid style={{ textAlign: "center" }}>
              <Typography gutterBottom variant="h6" component="div">
                Virtual Keys
              </Typography>
            </Grid>
            <Box marginTop={1}>
              <VirtualKeyTable />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );

};
export default AuthApikeyPage;