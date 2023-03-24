/* tslint:disable */
/* eslint-disable */
/**
 * PN Template BE Microservice
 * Documentation APIs v1.0
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: pn@pagopa.it
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface EstimateDto
 */
export interface EstimateDto {
    /**
     * 
     * @type {string}
     * @memberof EstimateDto
     */
    'paId': string;
    /**
     * 
     * @type {string}
     * @memberof EstimateDto
     */
    'status'?: EstimateDtoStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof EstimateDto
     */
    'deadlineDate'?: string;
    /**
     * 
     * @type {string}
     * @memberof EstimateDto
     */
    'referenceMonth'?: string;
    /**
     * 
     * @type {number}
     * @memberof EstimateDto
     */
    'totalDigitalNotif'?: number;
    /**
     * 
     * @type {number}
     * @memberof EstimateDto
     */
    'totalPaper890Notif'?: number;
    /**
     * 
     * @type {number}
     * @memberof EstimateDto
     */
    'totalPaperNationalNotif'?: number;
    /**
     * 
     * @type {number}
     * @memberof EstimateDto
     */
    'totalPaperInternationalNotif'?: number;
    /**
     * 
     * @type {string}
     * @memberof EstimateDto
     */
    'lastModifiedTimestamp'?: string;
}

export const EstimateDtoStatusEnum = {
    Created: 'CREATED',
    Validated: 'VALIDATED',
    InProgress: 'IN_PROGRESS',
    Ended: 'ENDED'
} as const;

export type EstimateDtoStatusEnum = typeof EstimateDtoStatusEnum[keyof typeof EstimateDtoStatusEnum];

/**
 * 
 * @export
 * @interface EstimateSearchTableDTO
 */
export interface EstimateSearchTableDTO {
    /**
     * 
     * @type {string}
     * @memberof EstimateSearchTableDTO
     */
    'referenceMonth'?: string;
    /**
     * 
     * @type {string}
     * @memberof EstimateSearchTableDTO
     */
    'lastModifiedTimestamp'?: string;
    /**
     * 
     * @type {string}
     * @memberof EstimateSearchTableDTO
     */
    'status'?: EstimateSearchTableDTOStatusEnum;
    /**
     * 
     * @type {boolean}
     * @memberof EstimateSearchTableDTO
     */
    'checkPDND'?: boolean;
}

export const EstimateSearchTableDTOStatusEnum = {
    Created: 'CREATED',
    Validated: 'VALIDATED',
    InProgress: 'IN_PROGRESS',
    Ended: 'ENDED'
} as const;

export type EstimateSearchTableDTOStatusEnum = typeof EstimateSearchTableDTOStatusEnum[keyof typeof EstimateSearchTableDTOStatusEnum];

/**
 * 
 * @export
 * @interface InfoDownloadDTO
 */
export interface InfoDownloadDTO {
    /**
     * 
     * @type {string}
     * @memberof InfoDownloadDTO
     */
    'paId'?: string;
    /**
     * 
     * @type {string}
     * @memberof InfoDownloadDTO
     */
    'status'?: InfoDownloadDTOStatusEnum;
}

export const InfoDownloadDTOStatusEnum = {
    Uploading: 'UPLOADING',
    Uploaded: 'UPLOADED'
} as const;

export type InfoDownloadDTOStatusEnum = typeof InfoDownloadDTOStatusEnum[keyof typeof InfoDownloadDTOStatusEnum];

/**
 * 
 * @export
 * @interface Page
 */
export interface Page {
    /**
     * 
     * @type {boolean}
     * @memberof Page
     */
    'empty'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Page
     */
    'first'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Page
     */
    'last'?: boolean;
    /**
     * 
     * @type {number}
     * @memberof Page
     */
    'number': number;
    /**
     * 
     * @type {number}
     * @memberof Page
     */
    'numberOfElements': number;
    /**
     * 
     * @type {Pageable}
     * @memberof Page
     */
    'pageable'?: Pageable;
    /**
     * 
     * @type {number}
     * @memberof Page
     */
    'size': number;
    /**
     * 
     * @type {Sort}
     * @memberof Page
     */
    'sort'?: Sort;
    /**
     * 
     * @type {number}
     * @memberof Page
     */
    'totalElements': number;
    /**
     * 
     * @type {number}
     * @memberof Page
     */
    'totalPages': number;
}
/**
 * 
 * @export
 * @interface Pageable
 */
export interface Pageable {
    /**
     * 
     * @type {number}
     * @memberof Pageable
     */
    'offset'?: number;
    /**
     * 
     * @type {number}
     * @memberof Pageable
     */
    'pageNumber'?: number;
    /**
     * 
     * @type {number}
     * @memberof Pageable
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof Pageable
     */
    'paged'?: boolean;
    /**
     * 
     * @type {Sort}
     * @memberof Pageable
     */
    'sort'?: Sort;
    /**
     * 
     * @type {boolean}
     * @memberof Pageable
     */
    'unpaged'?: boolean;
}
/**
 * 
 * @export
 * @interface PageableEstimateResponseDto
 */
export interface PageableEstimateResponseDto {
    /**
     * 
     * @type {Array<EstimateSearchTableDTO>}
     * @memberof PageableEstimateResponseDto
     */
    'content': Array<EstimateSearchTableDTO>;
    /**
     * 
     * @type {boolean}
     * @memberof PageableEstimateResponseDto
     */
    'empty'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageableEstimateResponseDto
     */
    'first'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageableEstimateResponseDto
     */
    'last'?: boolean;
    /**
     * 
     * @type {number}
     * @memberof PageableEstimateResponseDto
     */
    'number': number;
    /**
     * 
     * @type {number}
     * @memberof PageableEstimateResponseDto
     */
    'numberOfElements': number;
    /**
     * 
     * @type {Pageable}
     * @memberof PageableEstimateResponseDto
     */
    'pageable'?: Pageable;
    /**
     * 
     * @type {number}
     * @memberof PageableEstimateResponseDto
     */
    'size': number;
    /**
     * 
     * @type {Sort}
     * @memberof PageableEstimateResponseDto
     */
    'sort'?: Sort;
    /**
     * 
     * @type {number}
     * @memberof PageableEstimateResponseDto
     */
    'totalElements': number;
    /**
     * 
     * @type {number}
     * @memberof PageableEstimateResponseDto
     */
    'totalPages': number;
}
/**
 * 
 * @export
 * @interface Sort
 */
export interface Sort {
    /**
     * 
     * @type {boolean}
     * @memberof Sort
     */
    'empty'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Sort
     */
    'sorted'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Sort
     */
    'unsorted'?: boolean;
}

/**
 * EstimateApi - axios parameter creator
 * @export
 */
export const EstimateApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * API che consente di aggiungere o di modificare i dettagli di una stima.
         * @summary Inserimento o modifica di una stima.
         * @param {EstimateDto} [estimateDto] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createOrUpdateEstimate: async (estimateDto?: EstimateDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/template/v1/estimate`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(estimateDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * API che consente il download dell\'elenco fatture delle stime.
         * @summary Download fatture delle stime
         * @param {string} paId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadEstimateFile: async (paId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'paId' is not null or undefined
            assertParamExists('downloadEstimateFile', 'paId', paId)
            const localVarPath = `/template/v1/estimate/file-download`
                .replace(`{${"paId"}}`, encodeURIComponent(String(paId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * API che estrae la lista di stime
         * @summary ritorna elenco di stime in base alla partita iva o al nome della pa.
         * @param {string} paId 
         * @param {string} taxId 
         * @param {number} [page] Risultati di pagina che si vuole ottenere (0..N)
         * @param {number} [size] Numero di elementi per pagina.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllEstimate: async (paId: string, taxId: string, page?: number, size?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'paId' is not null or undefined
            assertParamExists('getAllEstimate', 'paId', paId)
            // verify required parameter 'taxId' is not null or undefined
            assertParamExists('getAllEstimate', 'taxId', taxId)
            const localVarPath = `/template/v1/estimates`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (paId !== undefined) {
                localVarQueryParameter['paId'] = paId;
            }

            if (taxId !== undefined) {
                localVarQueryParameter['taxId'] = taxId;
            }

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (size !== undefined) {
                localVarQueryParameter['size'] = size;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * API che ritorna il dettaglio di una stima.
         * @summary ritorna il dettaglio delle stime in base al mese di riferimento e al paId.
         * @param {string} paId 
         * @param {string} referenceMonth 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getEstimateDetail: async (paId: string, referenceMonth: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'paId' is not null or undefined
            assertParamExists('getEstimateDetail', 'paId', paId)
            // verify required parameter 'referenceMonth' is not null or undefined
            assertParamExists('getEstimateDetail', 'referenceMonth', referenceMonth)
            const localVarPath = `/template/v1/estimate/{paId}/detail/{referenceMonth}`
                .replace(`{${"paId"}}`, encodeURIComponent(String(paId)))
                .replace(`{${"referenceMonth"}}`, encodeURIComponent(String(referenceMonth)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * EstimateApi - functional programming interface
 * @export
 */
export const EstimateApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = EstimateApiAxiosParamCreator(configuration)
    return {
        /**
         * API che consente di aggiungere o di modificare i dettagli di una stima.
         * @summary Inserimento o modifica di una stima.
         * @param {EstimateDto} [estimateDto] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createOrUpdateEstimate(estimateDto?: EstimateDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EstimateDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createOrUpdateEstimate(estimateDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * API che consente il download dell\'elenco fatture delle stime.
         * @summary Download fatture delle stime
         * @param {string} paId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async downloadEstimateFile(paId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InfoDownloadDTO>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.downloadEstimateFile(paId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * API che estrae la lista di stime
         * @summary ritorna elenco di stime in base alla partita iva o al nome della pa.
         * @param {string} paId 
         * @param {string} taxId 
         * @param {number} [page] Risultati di pagina che si vuole ottenere (0..N)
         * @param {number} [size] Numero di elementi per pagina.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllEstimate(paId: string, taxId: string, page?: number, size?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PageableEstimateResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllEstimate(paId, taxId, page, size, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * API che ritorna il dettaglio di una stima.
         * @summary ritorna il dettaglio delle stime in base al mese di riferimento e al paId.
         * @param {string} paId 
         * @param {string} referenceMonth 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getEstimateDetail(paId: string, referenceMonth: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EstimateDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getEstimateDetail(paId, referenceMonth, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * EstimateApi - factory interface
 * @export
 */
export const EstimateApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = EstimateApiFp(configuration)
    return {
        /**
         * API che consente di aggiungere o di modificare i dettagli di una stima.
         * @summary Inserimento o modifica di una stima.
         * @param {EstimateDto} [estimateDto] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createOrUpdateEstimate(estimateDto?: EstimateDto, options?: any): AxiosPromise<EstimateDto> {
            return localVarFp.createOrUpdateEstimate(estimateDto, options).then((request) => request(axios, basePath));
        },
        /**
         * API che consente il download dell\'elenco fatture delle stime.
         * @summary Download fatture delle stime
         * @param {string} paId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadEstimateFile(paId: string, options?: any): AxiosPromise<InfoDownloadDTO> {
            return localVarFp.downloadEstimateFile(paId, options).then((request) => request(axios, basePath));
        },
        /**
         * API che estrae la lista di stime
         * @summary ritorna elenco di stime in base alla partita iva o al nome della pa.
         * @param {string} paId 
         * @param {string} taxId 
         * @param {number} [page] Risultati di pagina che si vuole ottenere (0..N)
         * @param {number} [size] Numero di elementi per pagina.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllEstimate(paId: string, taxId: string, page?: number, size?: number, options?: any): AxiosPromise<PageableEstimateResponseDto> {
            return localVarFp.getAllEstimate(paId, taxId, page, size, options).then((request) => request(axios, basePath));
        },
        /**
         * API che ritorna il dettaglio di una stima.
         * @summary ritorna il dettaglio delle stime in base al mese di riferimento e al paId.
         * @param {string} paId 
         * @param {string} referenceMonth 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getEstimateDetail(paId: string, referenceMonth: string, options?: any): AxiosPromise<EstimateDto> {
            return localVarFp.getEstimateDetail(paId, referenceMonth, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * EstimateApi - object-oriented interface
 * @export
 * @class EstimateApi
 * @extends {BaseAPI}
 */
export class EstimateApi extends BaseAPI {
    /**
     * API che consente di aggiungere o di modificare i dettagli di una stima.
     * @summary Inserimento o modifica di una stima.
     * @param {EstimateDto} [estimateDto] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EstimateApi
     */
    public createOrUpdateEstimate(estimateDto?: EstimateDto, options?: AxiosRequestConfig) {
        return EstimateApiFp(this.configuration).createOrUpdateEstimate(estimateDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * API che consente il download dell\'elenco fatture delle stime.
     * @summary Download fatture delle stime
     * @param {string} paId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EstimateApi
     */
    public downloadEstimateFile(paId: string, options?: AxiosRequestConfig) {
        return EstimateApiFp(this.configuration).downloadEstimateFile(paId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * API che estrae la lista di stime
     * @summary ritorna elenco di stime in base alla partita iva o al nome della pa.
     * @param {string} paId 
     * @param {string} taxId 
     * @param {number} [page] Risultati di pagina che si vuole ottenere (0..N)
     * @param {number} [size] Numero di elementi per pagina.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EstimateApi
     */
    public getAllEstimate(paId: string, taxId: string, page?: number, size?: number, options?: AxiosRequestConfig) {
        return EstimateApiFp(this.configuration).getAllEstimate(paId, taxId, page, size, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * API che ritorna il dettaglio di una stima.
     * @summary ritorna il dettaglio delle stime in base al mese di riferimento e al paId.
     * @param {string} paId 
     * @param {string} referenceMonth 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EstimateApi
     */
    public getEstimateDetail(paId: string, referenceMonth: string, options?: AxiosRequestConfig) {
        return EstimateApiFp(this.configuration).getEstimateDetail(paId, referenceMonth, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * HealthCheckApi - axios parameter creator
 * @export
 */
export const HealthCheckApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * health check path per verificare lo stato del micro servizio
         * @summary healthCheck path
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        status: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/status`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * HealthCheckApi - functional programming interface
 * @export
 */
export const HealthCheckApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = HealthCheckApiAxiosParamCreator(configuration)
    return {
        /**
         * health check path per verificare lo stato del micro servizio
         * @summary healthCheck path
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async status(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.status(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * HealthCheckApi - factory interface
 * @export
 */
export const HealthCheckApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = HealthCheckApiFp(configuration)
    return {
        /**
         * health check path per verificare lo stato del micro servizio
         * @summary healthCheck path
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        status(options?: any): AxiosPromise<void> {
            return localVarFp.status(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * HealthCheckApi - object-oriented interface
 * @export
 * @class HealthCheckApi
 * @extends {BaseAPI}
 */
export class HealthCheckApi extends BaseAPI {
    /**
     * health check path per verificare lo stato del micro servizio
     * @summary healthCheck path
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HealthCheckApi
     */
    public status(options?: AxiosRequestConfig) {
        return HealthCheckApiFp(this.configuration).status(options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * TemplateSampleApi - axios parameter creator
 * @export
 */
export const TemplateSampleApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Build a map of all the Http Header for the request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getHttpHeadersMap: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/template/api/httpheaders`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TemplateSampleApi - functional programming interface
 * @export
 */
export const TemplateSampleApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TemplateSampleApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Build a map of all the Http Header for the request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getHttpHeadersMap(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<{ [key: string]: Array<string>; }>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getHttpHeadersMap(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TemplateSampleApi - factory interface
 * @export
 */
export const TemplateSampleApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TemplateSampleApiFp(configuration)
    return {
        /**
         * 
         * @summary Build a map of all the Http Header for the request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getHttpHeadersMap(options?: any): AxiosPromise<{ [key: string]: Array<string>; }> {
            return localVarFp.getHttpHeadersMap(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TemplateSampleApi - object-oriented interface
 * @export
 * @class TemplateSampleApi
 * @extends {BaseAPI}
 */
export class TemplateSampleApi extends BaseAPI {
    /**
     * 
     * @summary Build a map of all the Http Header for the request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TemplateSampleApi
     */
    public getHttpHeadersMap(options?: AxiosRequestConfig) {
        return TemplateSampleApiFp(this.configuration).getHttpHeadersMap(options).then((request) => request(this.axios, this.basePath));
    }
}

