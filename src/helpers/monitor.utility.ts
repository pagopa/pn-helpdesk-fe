import { format } from 'date-fns';
import { BoStatusUpdateEvent, PnFunctionality, PnFunctionalityStatus } from '../api/downtimeLogs';
import { ModalPayloadType } from '../model/monitor';

export const isEmptyHtml = (html?: string): boolean => {
  if (!html) {
    return true;
  }
  const div = document.createElement('div');
  div.innerHTML = html;
  return !div.textContent || div.textContent.trim() === '';
};

export const maxLength = 3000;

export const formatPayload = (
  payload: ModalPayloadType,
  modalEventDate: Date,
  modalHtmlDescription?: string
): BoStatusUpdateEvent => {
  console.log('hello');
  return {
    status: payload.status as PnFunctionalityStatus,
    timestamp: format(
      new Date(modalEventDate.setSeconds(0, 0)).setMilliseconds(0),
      "yyyy-MM-dd'T'HH:mm:ss.sssXXXXX"
    ),
    functionality: payload.functionality as unknown as PnFunctionality,
    htmlDescription: modalHtmlDescription,
  };
};

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
