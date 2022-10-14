
export const regex = {
    ALPHA_NUMERIC_WITHOUT_SPECIAL_CHAR_PATTERN: /^[a-zA-Z0-9-]+$/,
    FISCAL_CODE_PATTERN: /^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})|([0-9]{11})$/, 
    UNIQUE_IDENTIFIER_PATTERN: /^[A-Za-z0-9~\-_]*$/,
    //eslint-disable-next-line
    PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )[\w!@#$%^&()_+."\-\?{}`~[\]*=|;:'<>,\/\\]{16,}$/,
    EMAIL: /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,15}$/,
    IUN: /^([A-Za-z]{4})-([A-Za-z]{4})-([A-Za-z]{4})-([0-9]{6})-([A-Za-z]{1})-([0-9]{1})$/
}
