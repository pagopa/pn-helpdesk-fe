import { Box, Button, Card, Container, FormHelperText, Grid, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FieldsProperties, FieldsProps, FormField, MenuItems } from "../FormFields";
import apiRequests from "../../api/apiRequests";
import {
    getLogsProcessesType, getNotificationsInfoLogsType, getNotificationsMonthlyStatsLogsType,
    getPersonsLogsType, getPersonIdType, getPersonTaxIdType
} from "../../api/apiRequestTypes";
import * as snackbarActions from "../../redux/snackbarSlice";
import * as responseActions from "../../redux/responseSlice";
import * as spinnerActions from "../../redux/spinnerSlice";
import { useDispatch } from 'react-redux';
import { base64StringToBlob } from "blob-util";
import SearchIcon from '@mui/icons-material/Search';
import ResponseData from "../ResponseData";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { format, subDays } from "date-fns";

/**
 * default values of the form fields
 */
const defaultFormValues: { [key: string]: any } = {
  "ticketNumber": "",
  "taxId": "",
  "personId": "",
  "iun": "",
  "publicAuthorityName": "",
  "Tipo Estrazione": "Ottieni EncCF",
  "recipientType": "PF",
  "deanonimization": false,
  "Date Picker": format(new Date(), "yyyy-MM-dd"),
  "Time interval": [
    format(subDays(new Date(), 90), "yyyy-MM-dd"),
    format(new Date(), "yyyy-MM-dd"),
  ],
  "traceId": "",
  "monthInterval": [
    format(
      new Date(new Date(new Date().setUTCDate(1)).setHours(0, 0, 0, 0)),
      "yyyy-MM-dd'T'HH:mm:ss.sss'Z'"
    ),
    format(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "yyyy-MM-dd'T'HH:mm:ss.sss'Z'"
    ),
  ]
};

/**
 * Generating the app form using the form fields
 * @component
 */
const SearchForm = () => {

    /**
     * selected value of Tipo Estrazione select menu
     */
    const [selectedValue, setSelectedValue] = useState<string>(Object.keys(MenuItems)[0]);

    /**
     * the fields coresponding to the selected value
     */
    const [fields, setFields] = useState<FieldsProps[]>([]);

    /**
     * helps for watching the touched field and handle changes of them in the Otteni log completi case
     */
    const [prevDirtyFields, setPrevDirtyFields] = useState<string[]>([])

    /**
     * helps for watching the touched field and handle changes of them in the Otteni log completi case
     */
    const [ricerca, setRicerca] = useState<boolean>(false)

    /**
     * dispatch redux actions
     */
    const dispatch = useDispatch();

    /**
     * form functionalities from react-hook-forms
     */
    const { handleSubmit, control, formState: { errors, dirtyFields },
        reset, resetField, getValues, clearErrors } = useForm({
            mode: 'onBlur',
            reValidateMode: "onBlur",
            defaultValues: defaultFormValues
        });

    /**
    * used for watching all fields when changing 
    */
    const watchAllFields = useWatch({ name: MenuItems[selectedValue], control });

    /**
    * used for watching Tipo Estrazione select menu 
    */
    const watchTipoEstrazione = useWatch({ name: "Tipo Estrazione", control, })


    /**
    * function handling changes of the Tipo Estrazione select menu
    * @param {SelectChangeEvent<string>} e the event of the field 
    */
    useEffect(() => {
        const values = getValues();
        reset({ ...defaultFormValues, "Tipo Estrazione": values["Tipo Estrazione"] });
        setSelectedValue(values["Tipo Estrazione"].toString());
        resetStore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchTipoEstrazione])

    useEffect(() => {
        setFields(filterFields(MenuItems[selectedValue]));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValue])

    useLayoutEffect(() => () => {
        setFields(filterFields(MenuItems[selectedValue]));
        disableRicerca();
        resetStore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    /**
     * function handling the changes in the fields when the selected value of Tipo Estrazione is
     * "Ottieni log completi" so some fields are hidden and some are shown according
     * to which fields are filled 
     */
    /* istanbul ignore next */
    useEffect(() => {
        let neededFields: string[] = []
        disableRicerca();
        if (Object.keys(dirtyFields).sort().join("") === prevDirtyFields.sort().join("")) {
            return;
        }
        if (selectedValue === "Ottieni log completi") {
            const common = Object.keys(dirtyFields).filter(
                field => ["deanonimization", "ticketNumber", "Time interval", "recipientType"].includes(field));
            if (Object.keys(dirtyFields).length === common.length) {
                neededFields = MenuItems["Ottieni log completi"].filter(item => item !== "deanonimization");
                clearErrors();
            }
            else {
                if (Object.keys(dirtyFields).includes("taxId")) {
                    neededFields = ["ticketNumber", "taxId", "Time interval", "recipientType"];
                }
                if (Object.keys(dirtyFields).includes("personId")) {
                    neededFields = ["ticketNumber", "personId", "Time interval"];
                }
                if (Object.keys(dirtyFields).includes("iun")) {
                    neededFields = ["ticketNumber", "iun", "deanonimization"];
                }
            }
            if (neededFields.sort().join('|') !== fields.map(field => field.name).sort().join('|')) {
                setFields(filterFields(neededFields));
            }
        }
        setPrevDirtyFields(Object.keys(dirtyFields));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchAllFields])


    /**
     * 
     * @param {string[]} neededFields needed fields in the situation just as names 
     * @returns {FieldsProps[]} needed fields with their specific properties ready for creating 
     */
    const filterFields = (neededFields: string[]): FieldsProps[] => {
        const allFields = Object.values(FieldsProperties);
        return allFields.map(field => {
            if (neededFields.includes(field.name) || field.name === "Tipo Estrazione") {
                if (selectedValue === "Ottieni log completi" &&
                    neededFields.sort().join("") === MenuItems["Ottieni log completi"].sort().join("") &&
                    field.name !== "ticketNumber"
                ) {
                    return { ...field, required: false }
                }
                return { ...field, required: true }
            }
            return hideField(field)
        });
    }

    /**
     * function that changes the hide propety a field
     * @param field field to be hidden
     * @returns the hiddin field
     */
    const hideField = (field: FieldsProps) => {
        resetField(field.name);
        return { ...field, hidden: true }
    }

    /**
     * handling form submit
     * @param data values from the form
     */
     /* istanbul ignore next */
    const onSubmit = (data: any) => {
        resetStore();
        dispatch(spinnerActions.updateSpinnerOpened(true));
        const payload = createPayload(data);
        createRequest(payload);
    }

    /**
     * Formatting the data ready to be sent
     * @param data data that has to be formatted
     * @returns formatted payload 
     */
    const createPayload = (data: any): any => {
        const currentFields = fields
            .filter(field => !field.hidden && field.name !== "Tipo Estrazione")
            .map(field => field.name);
        let payload = Object.assign(
            Object.keys(data)
                .filter((key) => currentFields.includes(key))
                .reduce((obj, key) => {
                    return Object.assign(obj, {
                        [key]: data[key]
                    });
                }, {})
        );
        if (payload["Time interval"]) {
            payload.dateFrom = payload["Time interval"][0];
            payload.dateTo = payload["Time interval"][1];
            delete payload["Time interval"]
        }
        // use case 3
        if(selectedValue === "Ottieni log completi" && payload.hasOwnProperty("taxId")){
            payload.deanonimization = true
        }

        // use case 6
        if(selectedValue === "Ottieni notifiche di una PA"){
            payload.referenceMonth  = payload["monthInterval"][0];
            payload.endMonth = payload["monthInterval"][1];
            delete payload["monthInterval"]
        }
        return payload;
    }

    /**
     * Create request depending on the use case
     * @param payload the request paylod
     */
    /* istanbul ignore next */
    const createRequest = (payload: any) => {
        let request = undefined;
        switch (selectedValue) {
            case "Ottieni EncCF":
                request = apiRequests.getPersonId(payload as getPersonIdType)
                break;
            case "Ottieni CF":
                request = apiRequests.getPersonTaxId(payload as getPersonTaxIdType)
                break;
            case "Ottieni notifica":
                request = apiRequests.getNotificationsInfoLogs(payload as getNotificationsInfoLogsType)
                break;
            case "Ottieni notifiche di una PA":
                request = apiRequests.getNotificationsMonthlyStatsLogs(payload as getNotificationsMonthlyStatsLogsType)
                break;
            case "Get process logs":
                request = apiRequests.getLogsProcesses(payload as getLogsProcessesType)
                break;
            case "Ottieni log completi":
                request = apiRequests.getPersonsLogs(payload as getPersonsLogsType)
                break;
            case "Ottieni log di processo":
                request = apiRequests.getLogsProcesses(payload as getLogsProcessesType)
                break;
            default:
                break;
        }
        if (request) {
            request.then(res => {
                updateSnackbar(res);
                if((res.data.password && res.data.zip) || res.data.data){
                    updateResponse(
                    res.data.password ? { password: res.data.password }
                        :
                        selectedValue === "Ottieni CF" ? { taxId: res.data.data } : { internalId: res.data.data }
                    );
                    res.data.zip && downloadZip(res.data.zip);
                }
                dispatch(spinnerActions.updateSpinnerOpened(false));
            })
            .catch(error => {
                updateSnackbar(error.response);
                dispatch(spinnerActions.updateSpinnerOpened(false));
            })
        }

    }

    /**
     * update the snackbar component depneding on the response
     * @param response 
     */
    const updateSnackbar = (response: any) => {
        dispatch(snackbarActions.updateSnackbacrOpened(true))
        dispatch(snackbarActions.updateStatusCode(response.status))
        response.data.message && dispatch(snackbarActions.updateMessage(response.data.message))
    }

    /**
     * update the response data component depending on the response
     * @param response 
     */
    const updateResponse = (response: any) => {
        dispatch(responseActions.updateResponseOpened(true))
        dispatch(responseActions.updateResponseData(response))
    }

    /**
     * reset the state of the redux store
     */
    const resetStore = () => {
        dispatch(snackbarActions.resetState());
    }

    /**
     * downloading zip file 
     * @param zip file in base64
     */
    /* istanbul ignore next */
    const downloadZip = (zip: string) => {
        var file = base64StringToBlob(zip, "application/zip");
        var fileURL = URL.createObjectURL(file);
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.download = "export";
        fileLink.click();
    }

    /**
     * check if every necessaty field is filled 
     * @returns true | false 
     */
    const disableRicerca = () => {
        const necessaryFields = fields.filter(field => !field.hidden).map(field => field.name)
        const currentValues: any = Object.fromEntries(Object.entries(getValues())
                .filter(([key]) => necessaryFields.includes(key) && key !== "deanonimization"))
        if(Object.entries(currentValues).some(([key, value]) => value === "" || value === null)){
            setRicerca(true);
        }else{
            setRicerca(false);
        }
    }

    return (
        <Container>
            <Grid container direction="column" rowSpacing={3}>
                <Grid item container>
                    <Box>
                        <Typography variant="h4">Ricerca</Typography>
                    </Box>
                </Grid>
                <Grid item container rowSpacing={2}>
                    <Card elevation={24} sx={{ width: 1, padding: "5%", boxShadow: "0px 3px 3px -2px " }}>
                        <Grid container  rowSpacing={2}>
                            <Grid item>
                                <form onSubmit={handleSubmit(data => onSubmit(data))}>
                                    <Grid container item direction="row">
                                        <Grid item container spacing={2} alignItems="center">
                                            {
                                                fields.map(field => {
                                                    return (
                                                        !field.hidden &&
                                                        <Grid item key={field.name + "Item"} width={field.size}>
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
                                         <Grid item container direction="row" justifyContent="space-between">
                                            <Grid item >
                                                <Button size="large" variant="outlined" startIcon={<RestartAltIcon />}
                                                onClick={() => reset({...defaultFormValues, "Tipo Estrazione": getValues("Tipo Estrazione")})}
                                                >Resetta filtri</Button>                       
                                            </Grid>
                                            <Grid item >
                                                <Button size="large" type="submit" variant="contained" sx={{ background: "#0066CC", '&:hover': { background: "#0059B3" } }} startIcon={<SearchIcon />}
                                                        disabled={Object.keys(errors).length > 0 || ricerca} 
                                                >Ricerca</Button>                       
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                            <Grid item xs={12}>
                                 <ResponseData></ResponseData>
                            </Grid>
                        </Grid>
                        
                       
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default SearchForm;
