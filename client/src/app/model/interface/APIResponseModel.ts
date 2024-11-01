export interface APIResponseModel {
    message: string,
    result: boolean,
    data: any;
}

export interface IPatient {
    patientId: number,
    name: string,
    mobileNo: string,
    city: string,
    age: number,
    gender: string;
}