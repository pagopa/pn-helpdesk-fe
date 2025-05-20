export type ModalPayloadType = {
  status: string;
  functionality: FunctionalityName;
  initialKODate?: Date;
};

export enum FunctionalityName {
  'NOTIFICATION_CREATE' = 'Creazione Notifiche',
  'NOTIFICATION_VISUALIZATION' = 'Visualizzazione notifiche',
  'NOTIFICATION_WORKFLOW' = 'Workflow Notifiche',
}
export interface MonitorDialogProps {
  modalPayload: ModalPayloadType;
  refreshStatus: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  updateSnackbar: (r: any) => void;
}
