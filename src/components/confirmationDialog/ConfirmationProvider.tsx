import { useState, useCallback, Fragment, ReactNode } from 'react';
import { createContext } from 'react';
import ConfirmationDialog from './ConfirmationDialog';
import { Options } from './ConfirmationTypes';
import { ContextType } from './ConfirmationTypes';

const INITIAL_OPTIONS: Options = {
  title: 'Conferma operazione',
  message: 'Sei sicuro di voler procedere?',
  extraContent: <Fragment />,
};

const buildOptions = (defaultOptions: Options, options: Options) => {
  const title = options.title || defaultOptions.title || INITIAL_OPTIONS.title;
  const message = options.message || defaultOptions.message || INITIAL_OPTIONS.message;
  const extraContent =
    options.extraContent || defaultOptions.extraContent || INITIAL_OPTIONS.extraContent;

  return { title, message, extraContent };
};

export const ConfirmationContext = createContext<ContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
  defaultOptions?: Options;
};
export const ConfirmationProvider = ({ children, defaultOptions = {} }: Props) => {
  const [options, setOptions] = useState(INITIAL_OPTIONS);
  const [resolveReject, setResolveReject] = useState<Array<any>>([]);
  const [resolve, reject] = resolveReject;

  const confirm = useCallback(
    (options = INITIAL_OPTIONS) =>
      new Promise((resolve, reject) => {
        setOptions(options);
        setResolveReject([resolve, reject]);
      }),
    []
  );

  const handleClose = useCallback(() => {
    setResolveReject([]);
  }, []);

  const handleCancel = useCallback(() => {
    if (reject) {
      reject();
      handleClose();
    }
  }, [reject, handleClose]);

  const handleConfirm = useCallback(() => {
    if (resolve) {
      resolve();
      handleClose();
    }
  }, [resolve, handleClose]);

  return (
    <Fragment>
      <ConfirmationContext.Provider value={confirm}>{children}</ConfirmationContext.Provider>
      <ConfirmationDialog
        open={resolveReject.length === 2}
        options={buildOptions(defaultOptions, options)}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
};
