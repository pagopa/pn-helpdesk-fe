import { Grid, TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const PaFilterTable = () => {

    const emptyValues = {
        paName: ""
    };

    const validationSchema = yup.object({
        paName: yup.string()
    });

    const initialValues = (pa:any) => {
        if(!pa)
            return emptyValues;
        
        return {
            paName: pa.paName
        }
    }

    const formik = useFormik({
        initialValues: initialValues(null),
        validationSchema,
        /** onSubmit populates filters */
        onSubmit: (values: any) => {
          
        },
    });

    return (
        <Grid container spacing="1">
            <Grid item xs={9}>
                <TextField
                    id="paName"
                    value={formik.values.paName}
                    onChange={formik.handleChange}
                    label={"Nome PA"}
                    name="paName"
                    error={formik.touched.paName && Boolean(formik.errors.paName)}
                    fullWidth
                    size="small"
                />
            </Grid>
            <Grid item xs={3}>
                <Button
                    variant="outlined"
                    type="submit"
                    size="small"
                    disabled={!formik.isValid}
                >
                    Filtra
                </Button>
                <Button
                    type="submit"
                    size="small"
                    disabled={!formik.isValid}
                >
                    Rimuovi Filtri
                </Button>
            </Grid>
        </Grid>
    );
    
}
export default PaFilterTable; 