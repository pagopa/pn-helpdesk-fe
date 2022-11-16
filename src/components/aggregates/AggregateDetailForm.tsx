import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Grid, TextField, FormControl, Select, MenuItem, InputLabel, Button, Tooltip, InputAdornment, OutlinedInput, Box } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import useConfirmDialog from "../confirmationDialog/useConfirmDialog";
import apiRequests from "../../api/apiRequests";
import { createAggregateType } from "../../api/apiRequestTypes";
import { useNavigate } from "react-router-dom";

type Props = { isCreate: boolean, agg: any };

const AggregationDetailForm = ({ isCreate, agg }: Props) => {
    const confirmDialog = useConfirmDialog();
    const navigate = useNavigate();
    const defAgg = { id: "", name: "", usagePlan: { id: "", name: "", quota: 0, rate: 0, burst: 0 }, createdAt: "", lastUpdate: "", associatedPa: 0 }
    const [aggregate, setAggregate]: any = useState(defAgg);
    const [usagePlans, setUsagePlans]: any = useState(undefined);
    useEffect(() => {
        setAggregate(agg)
        let request = apiRequests.getUsagePlans()
        if (request) {
            request
                .then(res => {
                    setUsagePlans(res.items);
                })
                .catch(err => {
                    console.log("Errore: ", err)
                })
        }
    }, [agg])

    const emptyValues = {
        aggregationName: "",
        aggregationDescription: "",
        usagePlan: "",
        quota: "",
        rate: "",
        burst: ""
    };

    const validationSchema = yup.object({
        aggregationName: yup.string(),
        aggregationDescription: yup.string(),
        AWSApiKey: yup.string(),
        usagePlan: yup.string()
    });

    const initialValues = (aggregation: any) => {
        if (!aggregation)
            return emptyValues;

        return {
            aggregationName: aggregation.aggregationName,
            aggregationDescription: aggregation.aggregationDescription,
            AWSApiKey: aggregation.AWSApiKey,
            usagePlan: aggregation.usagePlan,
            quota: aggregation.quota,
            rate: aggregation.rate,
            burst: aggregation.burst
        }
    }

    const usagePlanList = [
        {
            name: "Small",
            quota: 1000,
            rate: 100,
            burst: 30
        },
        {
            name: "Medium",
            quota: 5000,
            rate: 1000,
            burst: 300
        },
        {
            name: "Large",
            quota: 10000,
            rate: 2000,
            burst: 600
        }
    ]

    const aggregationData = {
        aggregationName: aggregate?.name,
        aggregationDescription: aggregate?.description || "Descrizione aggregazione",
        usagePlan: aggregate?.usagePlan?.name,
        quota: aggregate?.usagePlan?.quota,
        rate: aggregate?.usagePlan?.rate,
        burst: aggregate?.usagePlan?.burst
    }

    const formik = useFormik({
        initialValues: initialValues(isCreate ? null : aggregationData),
        enableReinitialize: true,
        validationSchema,
        /** onSubmit populates filters */
        onSubmit: (values: any) => {

        },
    });

    const handleChangeUsagePlan = async (evt: any) => {
        const { value, name } = evt.target;
        let indexUsagePlan = usagePlans.findIndex((item: { name: any; }) => item.name === value);
        await formik.setFieldValue("quota", usagePlans[indexUsagePlan].quota);
        await formik.setFieldValue("burst", usagePlans[indexUsagePlan].burst);
        await formik.setFieldValue("rate", usagePlans[indexUsagePlan].rate);
        await formik.setFieldValue(name, value);
    }

    const handleCreateClick = () => {
        confirmDialog({ title: "Crea aggregato", message: "Sicuro di voler creare questo aggregato?" })
            .then(() => {
                handleCreate()
            })
            .catch(() => { });
    }

    const handleSaveClick = () => {
        confirmDialog({ title: "Salva modifiche", message: "Sicuro di voler salvare le modifiche?" })
            .then(() => {
                handleSave()
            })
            .catch(() => { });
    }

    const handleDeleteClick = () => {
        confirmDialog({ title: "Elimina modifiche", message: "Sicuro di voler eliminare le modifiche?" })
            .then(() => {
                handleDelete()
            })
            .catch(() => { });
    }

    const handleCreate = () => {
        // POST /aggregate
        const payload = {
            name: formik.values.aggregationName,
            description: formik.values.aggregationDescription,
            usagePlanId: usagePlans?.findIndex((item: { name: any; }) => item.name === formik.values.usagePlan).toString(),
        }
        // returns random id
        let request = apiRequests.createAggregate(payload)
        if (request) {
            request
                .then(res => {
                    console.log(res);
                    formik.resetForm();
                    navigate(`/aggregate/${res}`);
                })
                .catch(err => {
                    console.log("Errore: ", err)
                })
        }
    }

    const handleSave = () => {
        // PUT /aggregate/{id}
        const payload: createAggregateType = {
            name: formik.values.aggregationName,
            description: formik.values.aggregationDescription,
            usagePlanId: usagePlans?.findIndex((item: { name: any; }) => item.name === formik.values.usagePlan).toString(),
        }
        // returns id
        let request = apiRequests.modifyAggregate(payload, agg.id)
        if (request) {
            request
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log("Errore: ", err)
                })
        }
    }

    const handleDelete = () => {
        // DELETE /aggregate/{id}
        const payload = agg.id
        let request = apiRequests.deleteAggregate(payload)
        if (request) {
            request
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log("Errore: ", err)
                })
        }
    }

    const CreateButton = <Button
        variant="outlined"
        type="submit"
        size="small"
        disabled={!formik.isValid}
        onClick={handleCreateClick}
    >
        Crea
    </Button>

    const UpdateButton = <Button
        variant="outlined"
        type="submit"
        size="small"
        disabled={!formik.isValid}
        onClick={handleSaveClick}

    >
        Salva
    </Button>

    const DeleteButton = <Button
        variant="outlined"
        type="submit"
        size="small"
        color="error"
        disabled={!formik.isValid}
        onClick={handleDeleteClick}
    >
        Elimina
    </Button>

    const IconWithTooltip = ({ title }: any) => (
        <Tooltip title={title}>
            <HelpOutlineIcon />
        </Tooltip>
    );

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing="2" direction="column">
                <Grid container item spacing="3">
                    <Grid item xs={4}>
                        <TextField
                            id="aggregationName"
                            value={formik.values.aggregationName}
                            onChange={formik.handleChange}
                            label={"Nome aggregazione"}
                            name="aggregationName"
                            error={formik.touched.aggregationName && Boolean(formik.errors.aggregationName)}
                            fullWidth
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            id="aggregationDescription"
                            value={formik.values.aggregationDescription}
                            onChange={formik.handleChange}
                            label={"Descrizione aggregazione"}
                            name="aggregationDescription"
                            error={formik.touched.aggregationDescription && Boolean(formik.errors.aggregationDescription)}
                            fullWidth
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="usage-plan-label">Usage plan</InputLabel>
                            <Select
                                labelId="usage-plan-label"
                                id="usagePlan"
                                name="usagePlan"
                                value={formik.values.usagePlan}
                                label="Usage plan"
                                onChange={(evt) => handleChangeUsagePlan(evt)}
                                size="small"
                            >
                                {usagePlans?.map((item: any, index: number) => {
                                    return <MenuItem key={`${item.name}-${index}`} value={item.name}>{item.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="quota">Quota</InputLabel>

                            <OutlinedInput
                                id="quota"
                                value={formik.values.quota}
                                onChange={formik.handleChange}
                                label="Quota"
                                name="quota"
                                fullWidth
                                size="small"
                                disabled={true}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconWithTooltip title="Numero di richieste permesse al mese" />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="rate">Rate</InputLabel>

                            <OutlinedInput
                                id="rate"
                                value={formik.values.rate}
                                onChange={formik.handleChange}
                                label="Rate"
                                name="rate"
                                fullWidth
                                size="small"
                                disabled={true}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconWithTooltip title="Numero di richieste permesse al secondo" />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="burst">Burst</InputLabel>

                            <OutlinedInput
                                id="burst"
                                value={formik.values.burst}
                                onChange={formik.handleChange}
                                label="Burst"
                                name="burst"
                                fullWidth
                                size="small"
                                disabled={true}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconWithTooltip title="Numero di richieste permesse in concorrenza" />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container item spacing={1}>
                    {isCreate ? (
                        <Grid item>
                            {CreateButton}
                        </Grid>
                    ) : (
                        <>
                            <Grid item>
                                {UpdateButton}
                            </Grid>
                            <Grid item>
                                {DeleteButton}
                            </Grid>
                        </>
                    )}

                </Grid>
            </Grid>


        </form>
    )
}

export default AggregationDetailForm;
