export interface responseType {
    statusCode: number;
    message: string;
    data: {};
}

export interface signupResponseType {
    statusCode: number;
    message: string;
    data: {
        _id: string,
        username: string,
        email: string,
        name: string,
        createdAt: string,
        updatedAt: string,
        __v: 0,
        refreshToken: string
    }
    success: boolean;
}