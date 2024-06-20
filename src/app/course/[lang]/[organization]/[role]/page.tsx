'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner, Box } from '@chakra-ui/react';
import EmployeeForm from 'components/forms/EmployeeForm';
import { getDictionary } from 'app/dictionaries';
import Link from 'next/link';
import BtnNext from 'components/BtnNext';
import BackgroundRandom from 'components/BackgroundRandom';
import { isAuthenticated } from 'utils/api';

interface FormProps {
  params: {
    role: string;
    lang: string;
    organization: string;
  };
}

const FormPage: React.FC<FormProps> = ({ params }) => {
  console.log("Role parameters : ", params);
  const { lang, organization, role } = params;
  const [dictionary, setDictionary] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDict = await getDictionary(lang); // Call getDictionary with selectedLang
        setDictionary(fetchedDict); // Update dict state on successful fetch
      } catch (error) {
        console.error('Failed to fetch dictionary:', error);
        // Handle error if needed
      }
    };

    const checkAuth = async () => {
      if (!isAuthenticated()) {
        router.push('/auth/sign-in');
      } else {
        try {
          fetchData();
        }
        catch (error) {
          console.error('Error fetching dictionary:', error);
          router.push('/auth/sign-in');
        }
      }
    };

    checkAuth();
  }, [router, lang, organization]);

  // Determine which form component to render based on the role
  const renderFormComponent = () => {
    switch (role) {
      case 'employee':
        return (
          <div>
            <EmployeeForm lang={lang} organization={organization} dictionary={dictionary} />

          </div>
        )
      // Add more cases for other roles as needed
      default:
        return <Box>Error: Form not found for this role</Box>;
    }
  };

  if (!dictionary) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center space-y-8 z-10">
      {renderFormComponent()}
    </div>
  );
};

export default FormPage;