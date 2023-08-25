import React from 'react';
import SearchForm from '../../components/forms/search/SearchForm';
import MainLayout from '../mainLayout/MainLayout';

/**
 * Component containing all objects of the app representing the whole page
 * @component
 */
const SearchPage = () => (
    <MainLayout>
      <SearchForm />
    </MainLayout>
  );

export default SearchPage;
