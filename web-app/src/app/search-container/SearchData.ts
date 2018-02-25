export class SearchData {
    from: string;
    to: string;
    departuredate: string;
    backdate: string;
    adults: Number;
    childrens: Number;
    constructor() {
        this.from = '';
        this.to = '';
        this.departuredate = '';
        this.backdate = '0000-00-00';
        this.adults = 1;
        this.childrens = 0;
    }
}

