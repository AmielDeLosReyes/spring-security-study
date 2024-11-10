export const environment = {
    BASE_URL: 'http://localhost:8080',
    REGISTER_USER_URL: '/registration',
    LOGIN_USER_URL: '/auth/login',
    GET_ALL_PATIENTS_URL: '/api/HospitalAppointment/GetAllPatients',
    GET_SINGLE_PATIENT_URL: '/api/HospitalAppointment/GetPatientByPatientId',
    UPDATE_PATIENT_URL: '/api/HospitalAppointment/UpdatePatient',
    DELETE_PATIENT_URL: '/api/HospitalAppointment/DeletePatientByPatienId',
    ADD_PATIENT_URL: '/api/HospitalAppointment/AddNewPatient',
    DASHBOARD_DATA_URL: '/api/HospitalAppointment/GetDashboardData',
    GET_ALL_APPOINTMENTS_URL: '/api/HospitalAppointment/GetAllAppointments',
    GET_SINGLE_APPOINTMENT_URL: '/api/HospitalAppointment/GetAppointmentByAppointmentId',
    MARK_APPTMNT_AS_DONE_URL: '/api/HospitalAppointment/MarkAppointmentDone',
    DELETE_SINGLE_APPOINTMENT_URL: '/api/HospitalAppointment/DeleteAppointmentByAppointment'
};
