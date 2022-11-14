import { useContext } from "react";
import ConfirmationContext from "./ConfirmationContext";

const useConfirmDialog = () => {
  const confirm = useContext(ConfirmationContext);
  if (confirm === undefined) {
    throw new Error(
      'useConfirmDialog must be used within a CustomMobileDialogProvider'
    );
  }
  return confirm;
};

export default useConfirmDialog;