import React from "react";
import MainLayout from "../mainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import AggregationTable from "../../components/aggregation/AggregationTable";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
/**
 * Aggregations page
 * @component
 */
const AggregationsPage = ({email}: any) => {
  const navigate = useNavigate();
  const handleClickCrea = () => {
    navigate(`/aggregation`);
  };

  return (
      <MainLayout email={email}>
          
          <Box px={2}>
            
            <Grid container marginBottom={3}>
              <Grid item xs={8}>
                <Typography gutterBottom variant="h4" component="div">
                  Gestione Aggregazioni ApiKey
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    type="submit"
                    size="small"
                    onClick={handleClickCrea}
                    startIcon={<GroupAddIcon />}
                  >
                    Nuova aggregazione
                  </Button>
                </Box>
              </Grid>
            </Grid>

            
            <AggregationTable />
          </Box>
          
      </MainLayout>
  );
};
export default AggregationsPage;


