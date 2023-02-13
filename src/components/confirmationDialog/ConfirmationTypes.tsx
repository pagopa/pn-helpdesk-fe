export type Options = {
    title?: string,
    message?: string
}

export type ContextType = (options: Options) => Promise<any>