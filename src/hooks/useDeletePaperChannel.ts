import {useAppDispatch} from "../redux/hook";
import * as spinnerActions from "../redux/spinnerSlice";
import {apiPaperChannel} from "../api/paperChannelApi";
import {resetAllTenderState} from "../redux/tender/reducers";
import {AxiosError} from "axios";
import * as snackbarActions from "../redux/snackbarSlice";
import {resetStateDrivers} from "../redux/deliveriesDrivers/reducers";
import {resetSelectedCost} from "../redux/costs/reducers";


export const useDeletePaperChannel = () => {
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

    const _showErrorMessage = (e: any | AxiosError) => {
        let message = "Errore durante l'eliminazione";
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
        deleteCost
    }
}