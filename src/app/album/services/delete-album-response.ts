
export class DeleteAlbumResponse {
    isSuccess: boolean;
    message: string;
    validationErrors: string[];

    constructor(isSuccess:boolean, message:string, validationErrors:string[]) {
        this.isSuccess = isSuccess;
        this.message = message;
        this.validationErrors = validationErrors;
    }

}