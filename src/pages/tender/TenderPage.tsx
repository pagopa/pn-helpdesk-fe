import MainLayout from "../mainLayout/MainLayout";
import React, {useCallback, useEffect} from "react";
import {Box, Button, Card, Container, Grid, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {ModelType, PaginationDataGrid} from "../../components/paginationGrid";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {getTenders} from "../../redux/tender/actions";
import {useNavigate} from "react-router-dom";
import {CREATE_TENDER_ROUTE} from "../../navigation/router.const";
import {changeFilterTenders} from "../../redux/tender/reducers";
import {FilterRequest, Tender} from "../../model";


export default function TenderPage({ email }: any){

  const tenderState = useAppSelector(state => state.tender);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchTenders = useCallback(() => {
    const filter = {
      ...tenderState.pagination,
      force: true
    } as FilterRequest
    dispatch(getTenders(filter))
    //eslint-disable-next-line
  }, [tenderState.pagination])

  useEffect(() => {
    fetchTenders();
    // eslint-disable-next-line
  }, [fetchTenders])


  const handleOnPageChange = (page:number) => {
    const filter = {
      ...tenderState.pagination,
      page: page
    }
    dispatch(changeFilterTenders(filter))
  }

  const handleOnPageSizeChange = (pageSize: number) => {
    const filter = {
      ...tenderState.pagination,
      page: 1,
      tot: pageSize
    }
    dispatch(changeFilterTenders(filter))
  }



  return <MainLayout email={email}>
    <Container>
      <Grid container direction="row" rowSpacing={3}>
        <Grid item container>
          <Box>
            <Typography variant="h4" color="text.primary">
              Gare dei recapitisti
            </Typography>
          </Box>
        </Grid>
        <Grid item container direction="row" justifyContent="space-between">
          <Card
            elevation={24}
            sx={{
              width: 1,
              padding: "5%",
              boxShadow: "0px 3px 3px -2px ",
              backgroundColor: "background.paper",
            }}
          >
            <Grid item container justifyContent="right">
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() => navigate(CREATE_TENDER_ROUTE)}
                sx={{
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                Aggiungi
              </Button>
            </Grid>
            <PaginationDataGrid <Tender> data={tenderState.allData}
                                            type={ModelType.TENDER}
                                            loading={tenderState.loading}
                                            rowId={row => row.code}
                                            onPageChange={handleOnPageChange}
                                            onPageSizeChange={handleOnPageSizeChange}/>
          </Card>
        </Grid>

      </Grid>
    </Container>
  </MainLayout>
}