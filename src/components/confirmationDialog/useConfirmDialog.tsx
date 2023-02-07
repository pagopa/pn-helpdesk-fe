import { useContext } from "react";
import { ConfirmationContext } from "./ConfirmationProvider";

const useConfirmDialog = () => {
  const confirm = useContext(ConfirmationContext);
  if (confirm === undefined) {
    throw new Error(
      'useConfirmDialog must be used within a ConfirmationProvider'
    );
  }
  return confirm;
};

export default useConfirmDialog;