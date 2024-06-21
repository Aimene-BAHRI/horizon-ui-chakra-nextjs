'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from 'utils/api';
import RoleCard from 'components/RoleCard';
import { Box, Grid, Heading, Spinner } from '@chakra-ui/react';
import { getDictionary } from 'app/dictionaries';
import { staticRoles } from 'utils/constants';
import FullBackground from 'components/Backegrounds/FullBackground';

interface OrganizationPageProps {
  params: {
    lang: string;
    organization: string;
  };
}

const OrganizationPage: React.FC<OrganizationPageProps> = ({ params }) => {
  const { lang, organization } = params;
  const router = useRouter();
  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDict = await getDictionary(lang);
        setDictionary(fetchedDict);
      } catch (error) {
        console.error('Failed to fetch dictionary:', error);
      }
    };

    const checkAuthAndFetchData = () => {
      if (!isAuthenticated()) {
        router.push('/auth/sign-in');
      }
      fetchData();
    }

    checkAuthAndFetchData();
  }, [router, lang, organization]);

  if (!dictionary) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <div>

    <FullBackground />
    <Box textAlign="center" p="12">
      <Heading mb="8">{dictionary.selectRole}</Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap="6" justifyItems="center">
        <RoleCard roles={staticRoles} lang={lang} organization={organization} dictionary={dictionary} />
      </Grid>
    </Box>
    </div>
  );
};

export default OrganizationPage;
