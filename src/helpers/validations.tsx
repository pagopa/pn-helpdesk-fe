export const regex = {
  ALPHA_NUMERIC_WITHOUT_SPECIAL_CHAR_PATTERN: /^[a-zA-Z0-9-]+$/,
  FISCAL_CODE_PATTERN:
    /^([A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})$/i,
  UNIQUE_IDENTIFIER_PATTERN: /^[A-Za-z0-9~\-_]*$/,
  UNIQUE_CODE_PATTERN: /^[A-Za-z0-9~\-_]{7}$/i,
  TAX_ID_PATTERN: /^[0-9]{11}$/i,
  PHONE_NUMBER_PATTERN: /^[+(\s.\-\d)]{5,30}$/i,
  PASSWORD:
    //eslint-disable-next-line
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )[\w!@#$%^&()+."\-\?{}`~[\]*=|;:'<>,\/\\]{16,}$/,
  EMAIL:
    /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,15}$/,
  IUN: /^([A-Za-z]{4})-([A-Za-z]{4})-([A-Za-z]{4})-(\d{6})-([A-Za-z]{1})-(\d{1})$/,
  AMOUNT: /^\d,\d{1,2}$/,
  CAP: /^[0-9]{5}$/,
  JTI: /^[A-Za-z0-9-]*$/,
};
