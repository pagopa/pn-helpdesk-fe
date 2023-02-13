import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {changeKey} from "../../redux/formTender/reducers";
import React, {useEffect} from "react";
import {StepDriverUpload} from "./StepDriverUpload";


export function StepDeliveriesDrivers(){
  const formState = useAppSelector(state => state.tenderForm)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!formState.formTender?.code){
      dispatch(changeKey({key:0}))
    }
  }, [])


  return <>
    {
      (formState.fromUpload) ?
        <StepDriverUpload tenderCode={formState.formTender!.code as string}/>
        :
        null
    }

  </>

}