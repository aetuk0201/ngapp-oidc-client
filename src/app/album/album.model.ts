import { Guid } from "guid-typescript";

export class Album {
    id: number = 0;
    guidId: string = Guid.create().toString();
    title: string = '';
    description: string = '';
    owner: string = '';

    constructor() {
        //this.guidId = Guid.create(); // ==> b77d409a-10cd-4a47-8e94-b0cd0ab50aa1
    }

}