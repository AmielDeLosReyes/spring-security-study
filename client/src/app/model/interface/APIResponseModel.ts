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

export interface Appointment {
    appointmentDate: string;
    appointmentId: number;
    appointmentTime: string;
    isFirstVisit: boolean;
    naration: string | null;
    name?: string;
    patientId: number;
    mobileNo?: string;
    isDone: boolean;
    appointmentNo: number;
}