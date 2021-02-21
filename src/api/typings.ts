export interface Country {
    name: string;
    alpha3Code: string;
    capital: string;
    population: number;
    currencies: Currency[];
    languages: Language[];
    flag: string;
}

interface Currency {
    code: string;
    name: string;
    symbol: string;
}

interface Language {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    iso639_1: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    iso639_2: string;
    name: string;
    nativeName: string;
}
