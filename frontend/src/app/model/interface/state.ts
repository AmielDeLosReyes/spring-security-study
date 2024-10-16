export interface IState {
    stateId: number, 
    stateName: string;
}

export interface IDistrict {
    districtName: string,
    districtId: number, 
    stateName: string,
    stateId: number;
}

export interface APIResponseModel {
    message: string,
    result: boolean,
    data: any;
}