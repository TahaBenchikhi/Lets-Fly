export class BookInfo {
    numVol: number;
    title: string;
    firstname: string;
    lastname: string;
    passport_num: string;
    passport_country: string;
    passport_valid_until: Date;
    email: string;
    phone: string;
    address: string;
    address_2: string;
    country: string;
    city: string;

    constructor(numVol: number){
        this.numVol = numVol;
    }
}
    