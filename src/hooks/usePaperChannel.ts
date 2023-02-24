import {useAppDispatch} from "../redux/hook";
import * as spinnerActions from "../redux/spinnerSlice";
import {apiPaperChannel} from "../api/paperChannelApi";
import {resetAllTenderState, setLoadingTenders} from "../redux/tender/reducers";
import {AxiosError} from "axios";
import * as snackbarActions from "../redux/snackbarSlice";
import {resetStateDrivers} from "../redux/deliveriesDrivers/reducers";
import {resetSelectedCost} from "../redux/costs/reducers";
import {StatusStatusCodeEnum} from "../api/paperChannel";


export const usePaperChannel = () => {
    const dispatch = useAppDispatch();

    const deleteTender = async (tenderCode:string) => {
        try {
            dispatch(spinnerActions.updateSpinnerOpened(true));
            await apiPaperChannel().deleteTender(tenderCode);
            dispatch(resetAllTenderState());
            dispatch(spinnerActions.updateSpinnerOpened(false));
        } catch (e){
            _showErrorMessage(e);
        }
    }

    const deleteDriver = async (tenderCode: string, driverCode: string) => {
        try {
            dispatch(spinnerActions.updateSpinnerOpened(true));
            await apiPaperChannel().deleteDriver(tenderCode, driverCode)
            dispatch(spinnerActions.updateSpinnerOpened(false));
            dispatch(resetStateDrivers());
        } catch (e){
            _showErrorMessage(e)
        }
    }

    const deleteCost = async (tenderCode: string, driverCode: string, uuid: string) => {
        try {
            dispatch(spinnerActions.updateSpinnerOpened(true));
            await apiPaperChannel().deleteCost(tenderCode, driverCode, uuid)
            dispatch(resetSelectedCost());
            dispatch(spinnerActions.updateSpinnerOpened(false));
        } catch (e){
            _showErrorMessage(e)
        }
    }

    const changeStatusTender = async (tenderCode:string, actualStatus: "CREATED" | "VALIDATED") => {
        try {
            dispatch(setLoadingTenders(true));
            const status:StatusStatusCodeEnum = (actualStatus === "CREATED") ? "VALIDATED" : "CREATED";
            await apiPaperChannel().updateStatusTender(tenderCode, {statusCode: status});
            dispatch(setLoadingTenders(false));
            dispatch(resetAllTenderState());
        } catch (e) {
            console.log(e);
            dispatch(setLoadingTenders(false));
            _showErrorMessage(e, "Errore durante il cambio di stato della gara!");
        }
    }

    const _showErrorMessage = (e: any | AxiosError, customMessage:string = "Errore durante l'eliminazione") => {
        let message = customMessage;
        if (e instanceof AxiosError && e?.response?.data?.detail){
            message = e.response.data.detail;
        }
        dispatch(spinnerActions.updateSpinnerOpened(false));
        dispatch(snackbarActions.updateSnackbacrOpened(true));
        dispatch(snackbarActions.updateStatusCode(400));
        dispatch(snackbarActions.updateMessage(message));
    }


    return {
        deleteTender,
        deleteDriver,
        deleteCost,
        changeStatusTender
    }
}