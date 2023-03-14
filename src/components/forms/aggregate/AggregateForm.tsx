import { useEffect } from 'react'
import { Grid, Button, FormHelperText } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FieldsProperties, FormField } from "../../formFields/FormFields";
import useConfirmDialog from "../../confirmationDialog/useConfirmDialog";
import * as snackbarActions from "../../../redux/snackbarSlice";
import * as spinnerActions from "../../../redux/spinnerSlice";
import apiRequests from "../../../api/apiRequests";
import { createAggregateType, getAggregateResponse, UsagePlan } from "../../../api/apiRequestTypes";
import * as routes from '../../../navigation/router.const';

type FormType = {
    [k: string]: any
}

const defaultFormValues: FormType = {
    id: "", 
    name: "", 
    description: "",
    usagePlanName: "",
    rate: 0,
    burst: 0
}

type Props = { isCreate: boolean, aggregate: getAggregateResponse | undefined, usagePlans: Array<UsagePlan> };

const AggregateForm = ({aggregate, isCreate, usagePlans}: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const confirmDialog = useConfirmDialog();
    const fields = [
        FieldsProperties["Nome Aggregazione"], 
        FieldsProperties["Descrizione Aggregazione"], 
        {...FieldsProperties["Usage Plan"], selectItems: usagePlans.map((u) => u.name)},
        FieldsProperties["Rate"],
        FieldsProperties["Burst"]
    ];

    const { control, watch, formState: { errors, isValid }, reset, clearErrors, setValue } = useForm({
        mode: 'onChange',
        reValidateMode: "onChange",
        defaultValues: defaultFormValues
    });
    const values = watch();

    useEffect(() => {
        if(values.usagePlanName) {
            let usagePlanIndex = usagePlans?.findIndex((item) => item.name === values.usagePlanName);
            const { rate, burst } = usagePlans[usagePlanIndex];
            setValue("rate", rate);
            setValue("burst", burst);
        }
    }, [values.usagePlanName, setValue, usagePlans])

    useEffect(() => {
        if(aggregate && Object.keys(aggregate).length !== 0) {
            reset({
                id: aggregate?.id,
                name: aggregate?.name,
                description: aggregate?.description,
                usagePlanName: aggregate?.usagePlan.name,
                rate: aggregate?.usagePlan.rate,
                burst: aggregate?.usagePlan.burst
            })
        }
    }, [aggregate, reset])

    const handleCreate = () => {
        // POST /aggregate
        let usagePlanIndex = usagePlans?.findIndex((item) => item.name === values.usagePlanName);
        const usagePlanId = usagePlans[usagePlanIndex].id;
        const payload = {
            name: values.name,
            description: values.description,
            usagePlanId
        }
        // returns random id
        dispatch(spinnerActions.updateSpinnerOpened(true));
        let request = apiRequests.createAggregate(payload)
        if (request) {
            request
                .then(res => {
                    reset();
                    dispatch(snackbarActions.updateSnackbacrOpened(true));
                    dispatch(snackbarActions.updateStatusCode("200"));
                    dispatch(snackbarActions.updateMessage(`Aggregato creato con successo`));
                    navigate(routes.GET_UPDATE_AGGREGATE_PATH(res.id));
                })
                .catch(err => {
                    dispatch(snackbarActions.updateSnackbacrOpened(true));
                    dispatch(snackbarActions.updateStatusCode("400"));
                    dispatch(snackbarActions.updateMessage(`Non è stato possibile creare l'aggregato`));
                })
                .finally(() => dispatch(spinnerActions.updateSpinnerOpened(false)));
        }
    }

    const handleSave = () => {
        // PUT /aggregate/{id}
        let usagePlanIndex = usagePlans?.findIndex((item) => item.name === values.usagePlanName);
        const usagePlanId = usagePlans[usagePlanIndex].id;
        const payload: createAggregateType = {
            name: values.name,
            description: values.description,
            usagePlanId
        }
        // returns id
        dispatch(spinnerActions.updateSpinnerOpened(true));
        let request = apiRequests.modifyAggregate(payload, aggregate!.id)
        if (request) {
            request
                .then(res => {
                    dispatch(snackbarActions.updateSnackbacrOpened(true));
                    dispatch(snackbarActions.updateStatusCode("200"));
                    dispatch(snackbarActions.updateMessage(`Aggregato modificato con successo`));
                })
                .catch(err => {
                    dispatch(snackbarActions.updateSnackbacrOpened(true));
                    dispatch(snackbarActions.updateStatusCode("400"));
                    dispatch(snackbarActions.updateMessage(`Non è stato possibile modificare l'aggregato`));
                })
                .finally(() => dispatch(spinnerActions.updateSpinnerOpened(false)));
        }
    }

    const handleDelete = () => {
        // DELETE /aggregate/{id}
        const payload = aggregate!.id
        dispatch(spinnerActions.updateSpinnerOpened(false));
        let request = apiRequests.deleteAggregate(payload)
        if (request) {
            request
                .then(res => {
                    dispatch(snackbarActions.updateSnackbacrOpened(true));
                    dispatch(snackbarActions.updateStatusCode("200"));
                    dispatch(snackbarActions.updateMessage(`Aggregato eliminato con successo`));
                    navigate(routes.AGGREGATES_LIST);
                })
                .catch(err => {
                    dispatch(snackbarActions.updateSnackbacrOpened(true));
                    dispatch(snackbarActions.updateStatusCode("400"));
                    dispatch(snackbarActions.updateMessage(`Non è stato possibile eliminare l'aggregato`));
                })
                .finally(() => dispatch(spinnerActions.updateSpinnerOpened(false)));
        }
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

    const CreateButton = <Button
        variant="outlined"
        type="submit"
        disabled={!isValid}
        onClick={handleCreateClick}
    >
        Crea
    </Button>

    const UpdateButton = <Button
        variant="outlined"
        type="submit"
        disabled={!isValid}
        onClick={handleSaveClick}

    >
        Salva
    </Button>

    const DeleteButton = <Button
        variant="outlined"
        type="submit"
        color="error"
        disabled={!isValid}
        onClick={handleDeleteClick}
    >
        Elimina
    </Button>

    return (
        <>
            <form data-testid="aggregate-form">
                <Grid item container>
                    <Grid item container spacing={2} alignItems="center">
                        {
                            fields.map(field => {
                                return (
                                    !field.hidden &&
                                    <Grid item key={field.name + "Item"} xs={12} lg={field.size ? field.size : 3} xl={field.size ? field.size : 3}>
                                        <Controller
                                            control={control}
                                            name={field.name}
                                            rules={field.rules}
                                            render={({
                                                field: { onChange, onBlur, value, name, ref },
                                                fieldState: { invalid, isTouched, isDirty, error },
                                                formState,
                                            }) => {
                                                return (
                                                    <>
                                                        <FormField field={field} value={value} onBlur={onBlur} error={error}
                                                            onChange={(value: any) => {
                                                                onChange(value)
                                                                value.nativeEvent && value.nativeEvent.data === null && clearErrors(name)
                                                            }}
                                                        />
                                                        <FormHelperText error>{errors[field.name] ?
                                                            errors[field.name].message
                                                            : " "}</FormHelperText>
                                                    </>

                                                )
                                            }}
                                        />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    
                </Grid>
            </form>
            <Grid item container spacing={2}>
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
        </>
        
    )
}

export default AggregateForm;