export interface IEmployee {
    BusinessEntityID: number,
    LoginID: string,
    JobTitle: string,
    NationalIDNumber: string,
    OrganizationLevel: string,
    BirthDate: string,
    MaritalStatus: string,
    Gender: string,
    HireDate: string,
    SalariedFlag: boolean,
    VacationHours: number,
    SickLeaveHours: number,
    ModifiedDate: Date,
    CurrentFlag: boolean,
    rowguid: string
}