import { Grid, Button, Box, Card, FormHelperText, Typography, InputAdornment } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FieldsProperties, FormField } from "../../formFields/FormFields";
import LockIcon from '@mui/icons-material/Lock';
import { errorMessages, infoMessages } from "../../../helpers/messagesConstants";
import {changePassword} from "../../../authentication/auth"
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch } from 'react-redux';
import * as snackbarActions from "../../../redux/snackbarSlice";
import * as spinnerActions from "../../../redux/spinnerSlice";

/**
 * default values of the form fields
 */
const defaultFormValues: { [key: string]: string } = {
    "newPassword": "",
    "newPasswordConfirm": "",
}

/**
 * Generating the login form using the form fields
 * @component
 */
const ChangePasswordForm = ({ user }: any) => {

    /**
     * dispatch redux actions
     */
    const dispatch = useDispatch();

    /**
     * for navigate to other pages
     */
    const navigate = useNavigate();

    /**
     * form functionalities from react-hook-forms
     */
    const { handleSubmit, control, formState: { errors }, getValues, } = useForm({
        defaultValues: defaultFormValues,
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    
    /**
     * function handling the form submitting
     * @param data the data from the form
     */
    /* istanbul ignore next */
    const onSubmit = async (data: { [x: string]: string; }) => {
        dispatch(spinnerActions.updateSpinnerOpened(true));
        await changePassword(user, data.newPassword).then(res => {
            dispatch(spinnerActions.updateSpinnerOpened(false));
            navigate("/search");
        })
        .catch((error: any) => {
            dispatch(spinnerActions.updateSpinnerOpened(false));
            dispatch(snackbarActions.updateSnackbacrOpened(true))
            dispatch(snackbarActions.updateStatusCode("400"))
        })
    }

    return (
        <Box
            data-testid="ChangePasswordForm"
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{backgroundColor: '#0066CC'}}
        >
            <Card elevation={24} sx={{ width: 1 / 2, padding: "5%", boxShadow: "0px 3px 3px -2px " }}>
                <Grid container direction="column" rowSpacing={2}>
                    <Grid item container alignItems="center" justifyContent="center">
                        <LockIcon sx={{ height: "15%", width: "15%", color: "#0066CC" }} />
                    </Grid>
                    <Grid item container alignItems="center" justifyContent="center">
                        <Box component="span" sx={{ height: "25%", width: "50%", paddingBottom:"2%"}}>
                            <Typography variant="h4">Cambio password</Typography>
                        </Box>
                    </Grid>
                    <form onSubmit={handleSubmit(data => onSubmit(data))}>
                        <Grid item container direction="column" rowSpacing={3}>
                            <Grid item container>
                                <Grid item container>
                                    <Controller
                                        control={control}
                                        name={"newPassword"}
                                        rules={{
                                            ...FieldsProperties["Password"].rules,
                                            validate: {
                                                newPasswordEquality: () => {
                                                    return getValues("newPassword") === getValues("newPasswordConfirm") || errorMessages.PSSWORDS_EQUALITY
                                                }
                                            }
                                        }}
                                        render={({
                                            field: { onChange, onBlur, value, name, ref },
                                            fieldState: { invalid, isTouched, isDirty, error },
                                            formState,
                                        }) => (
                                            <>
                                                <FormField error={error} key={"newPassword"} field={{...FieldsProperties["Password"], label: "Nuova password", 
                                                InputProps: {
                                                    endAdornment: (
                                                        <Tooltip title={infoMessages.PASSWORD_TOOLTIP_MSG} placement="right">
                                                            <InputAdornment position="end">
                                                                <HelpIcon />
                                                            </InputAdornment>
                                                        </Tooltip>
                                                    )
                                                },}} onChange={onChange} value={value} />
                                                <FormHelperText error>{errors["newPassword"] ?
                                                    errors["newPassword"].message
                                                    : " "}</FormHelperText>
                                            </>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container>
                                <Grid item container>
                                    <Controller
                                        control={control}
                                        name={"newPasswordConfirm"}
                                        rules={{
                                            ...FieldsProperties["Password"].rules,
                                            validate: {
                                                newPasswordEquality: () => {
                                                    return getValues("newPassword") === getValues("newPasswordConfirm") || errorMessages.PSSWORDS_EQUALITY
                                                }
                                            }
                                        }}
                                        render={({
                                            field: { onChange, onBlur, value, name, ref },
                                            fieldState: { invalid, isTouched, isDirty, error },
                                            formState,
                                        }) => (
                                            <>
                                                <FormField error={error} key={"newPasswordConfirm"} field={{...FieldsProperties["Password"], label: "Conferma password"}} onChange={onChange} value={value} />
                                                <FormHelperText error>{errors["newPasswordConfirm"] ?
                                                    errors["newPasswordConfirm"].message
                                                    : " "}</FormHelperText>
                                            </>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Button sx={{ background: "#0066CC", '&:hover': { background: "#0059B3" } }} fullWidth size="large" type="submit" variant="outlined"><Typography sx={{ color: 'white' }}>Cambia password</Typography></Button>
                            </Grid>
                        </Grid>
                    </form>

                </Grid>
            </Card>
        </Box>
    )
}

export default ChangePasswordForm;