export type Options = {
  title?: string;
  message?: string;
  extraContent?: React.ReactNode;
};

export type ContextType = (options: Options) => Promise<any>;
