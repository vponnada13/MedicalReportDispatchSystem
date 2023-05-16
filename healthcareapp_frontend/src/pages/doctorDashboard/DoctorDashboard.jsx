import React from 'react';
import AddPatient from '../../components/AddPatient/AddPatient';
import { NavBar } from '../../components/navbar/Navbar';
import PatientsList from '../../components/patientsList/PatientsList';
import { SideBar } from '../../components/sidebar/SideBar';

export const DoctorDashboard = () => {

    return (
        <>
        {/* <NavBar /> */}
            {/* Dashboard */}
            <SideBar component1={<PatientsList />} />
        </>
    )
}