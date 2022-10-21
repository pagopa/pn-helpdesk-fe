import React from "react";
import Header from '../../components/header/Header';
import SearchForm from '../../components/forms/search/SearchForm';
import { Grid } from '@mui/material';
import Footer from '../../components/footer/Footer';
import { useEffect } from 'react';
import { logout, refreshToken } from '../../authentication/auth';
import { useNavigate } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";

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
