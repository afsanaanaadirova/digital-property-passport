export type CustomAxiosErrorType = Error & {
    response?: {
        data: {
            Detail: string;
        };
    };
}