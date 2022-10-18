import React from "react";
import Header from '../Components/Header';
import SearchForm from '../Components/Forms/SearchForm';
import { Grid } from '@mui/material';
import Footer from '../Components/Footer';
import { useEffect } from 'react';
import { logout, refreshToken } from '../Authentication/auth';
import { useNavigate } from "react-router-dom";
import MainLayout from "./MainLayout";

/**
 * Component containing all objects of the app representing the whole page 
 * @component
 */
const SearchPage = ({ email }: any) => {

  const navigate = useNavigate();

  return (
    <MainLayout email={email}>
      <SearchForm />
    </MainLayout>
  );
}

export default SearchPage;
