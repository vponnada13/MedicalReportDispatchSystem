import React from 'react';
import AddPatient from '../../components/AddPatient/AddPatient';
import CompletedPatientsList from '../../components/completedPatientsList/CompletedPatientsList';
import LabList from '../../components/labList/LabList';
import { NavBar } from '../../components/navbar/Navbar';
import PatientsList from '../../components/patientsList/PatientsList';
import { LabSideBar } from '../../components/sidebar/LabSideBar';
import { SideBar } from '../../components/sidebar/SideBar';

export const CompletedList = () => {

    return (
        <>
        {/* <NavBar /> */}
            {/* Dashboard */}
            <SideBar component1={<CompletedPatientsList />} />
        </>
    )
}