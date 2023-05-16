import React from 'react';
import AddPatient from '../../components/AddPatient/AddPatient';
import LabList from '../../components/labList/LabList';
import { NavBar } from '../../components/navbar/Navbar';
import PatientsList from '../../components/patientsList/PatientsList';
import { LabSideBar } from '../../components/sidebar/LabSideBar';
import { SideBar } from '../../components/sidebar/SideBar';

export const LabDashboard = () => {

    return (
        <>
        {/* <NavBar /> */}
            {/* Dashboard */}
            <LabSideBar component1={<LabList />} />
        </>
    )
}