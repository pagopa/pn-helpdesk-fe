import { Grid, Button, Box, Card, FormHelperText, Link, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FieldsProperties, FormField } from "../FormFields";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from "../../resources/logo.svg";
import {login} from "../../Authentication/auth"
import * as snackbarActions from "../../redux/snackbarSlice";
import { useDispatch } from 'react-redux';
import * as spinnerActions from "../../redux/spinnerSlice";

/**
 * default values of the form fields
 */
const defaultFormValues: { [key: string]: string } = {
    "email": "",
    "password": "",
}

/**
 * Generating the login form using the form fields
 * @component
 */
const LoginForm = ({ setUser, setEmail }: any) => {

    /**
     * dispatch redux actions
     */
    const dispatch = useDispatch();

    /**
     * tooltip about forgot password
     */
    const [tooltipOpen, setTooltipOpen] = useState(false);

     /**
     * form functionalities from react-hook-forms
     */
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: defaultFormValues,
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    /**
     * for navigate to other pages 
     */
    const navigate = useNavigate();
    

    /**
     * function handling the form submitting
     * @param data the data from the form
     */
    /* istanbul ignore next */
    const onSubmit = async (data: { [x: string]: string; }) => {
        dispatch(spinnerActions.updateSpinnerOpened(true));
        setEmail(data.email)
        await login({email: data.email, password: data.password})
            .then((user: {[key:string]: any}) => {
                if(user.challengeName === "NEW_PASSWORD_REQUIRED"){
                    dispatch(spinnerActions.updateSpinnerOpened(false));
                    setUser(user)
                }else{
                    dispatch(spinnerActions.updateSpinnerOpened(false));
                    navigate("/search");
                }
            })
            .catch((error: any) => {
                dispatch(spinnerActions.updateSpinnerOpened(false));
                dispatch(snackbarActions.updateSnackbacrOpened(true))
                dispatch(snackbarActions.updateStatusCode("400"))
            })
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{backgroundColor: '#0066CC'}}
        >
            <Card elevation={24} sx={{ width: 1 / 2, padding: "5%", boxShadow: "0px 3px 3px -2px " }}>
                <Grid container direction="column" rowSpacing={2}>
                    <Grid item container alignItems="center" justifyContent="center">
                        <AccountCircleIcon sx={{ height: "15%", width: "15%", color: "#0066CC" }} />
                    </Grid>
                    <Grid item container alignItems="center" justifyContent="center">
                        <Box component="img" sx={{ height: "15%", width: "15%", paddingBottom:"2%"}}
                            alt="logo"
                            src={logo}
                        />
                    </Grid>
                    <form onSubmit={handleSubmit(data => onSubmit(data))}>
                        <Grid item container direction="column" rowSpacing={3}>
                            <Grid item container>
                                <Controller
                                    control={control}
                                    name={"email"}
                                    rules={FieldsProperties["Email"].rules}
                                    render={({
                                        field: { onChange, onBlur, value, name, ref },
                                        fieldState: { invalid, isTouched, isDirty, error },
                                        formState,
                                    }) => (
                                        <>
                                            <FormField error={error} key={"email"} field={FieldsProperties["Email"]} onChange={onChange} value={value} />
                                            <FormHelperText error>{errors["email"] ?
                                                errors["email"].message
                                                : " "}</FormHelperText>
                                        </>
                                    )}
                                />
                            </Grid>
                            <Grid item container>
                                <Grid item container>
                                    <Controller
                                        control={control}
                                        name={"password"}
                                        rules={FieldsProperties["Password"].rules}
                                        render={({
                                            field: { onChange, onBlur, value, name, ref },
                                            fieldState: { invalid, isTouched, isDirty, error },
                                            formState,
                                        }) => (
                                            <>
                                                <FormField error={error} key={"password"} field={FieldsProperties["Password"]} onChange={onChange} value={value} />
                                                <FormHelperText error>{errors["password"] ?
                                                    errors["password"].message
                                                    : " "}</FormHelperText>
                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid item container justifyContent="flex-end">
                                    <Tooltip
                                        onClose={() => setTooltipOpen(false)}
                                        open={tooltipOpen}
                                        placement="bottom"
                                        title="In caso di smarrimento della password contattare l'amministratore di sistema per richiedere il reset"
                                    >
                                        <Link sx={{ cursor: "pointer" }} onClick={() => setTooltipOpen(true)}>Password dimenticata?</Link>
                                    </Tooltip>
                                </Grid>

                            </Grid>
                            <Grid item>
                                <Button sx={{ background: "#0066CC", '&:hover': { background: "#0059B3" } }} fullWidth size="large" type="submit" variant="outlined"><Typography sx={{ color: 'white' }}>LOGIN</Typography></Button>
                            </Grid>
                        </Grid>
                    </form>

                </Grid>
            </Card>
        </Box>
    )
}

export default LoginForm;