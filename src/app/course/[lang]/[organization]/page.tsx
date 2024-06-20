'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getOrganization, fetchRoles, isAuthenticated } from 'utils/api';
import RoleCard from 'components/RoleCard';
import { Box, Grid, Heading, Spinner, Text } from '@chakra-ui/react';
import { getDictionary } from 'app/dictionaries';

interface OrganizationPageProps {
  params: {
    lang: string;
    organization: string;
  };
}

const OrganizationPage: React.FC<OrganizationPageProps> = ({ params }) => {
  const { lang, organization } = params;
  const [roles, setRoles] = useState<any[]>([]);
  const router = useRouter();
  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDict = await getDictionary(lang);
        setDictionary(fetchedDict);
      } catch (error) {
        console.error('Failed to fetch dictionary:', error);
        // Handle error if needed
      }
    };

    const checkAuthAndFetchData = () => {
      if (!isAuthenticated()) {
        router.push('/auth/sign-in');
      } else {
        fetchData().then(() => {
          getOrganization(organization)
            .then((organizationDetails) => {
              fetchRoles()
                .then((allRoles) => {
                  const filteredRoles = allRoles.filter(
                    (role) => role.organization === organizationDetails.id
                  );
                  setRoles(filteredRoles);
                })
                .catch((error) => {
                  console.error('Error fetching roles:', error);
                  router.push('/auth/sign-in');
                });
            })
            .catch((error) => {
              console.error('Error fetching organization details:', error);
              router.push('/auth/sign-in');
            });
        });
      }
    };

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
    <Box textAlign="center" p="12">
      <Heading mb="8">{dictionary.selectRole}</Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap="6" justifyItems="center">
        {roles.map((role) => (
          <RoleCard key={role.id} role={role} lang={lang} organization={organization} dictionary={dictionary} />
        ))}
      </Grid>
    </Box>
  );
};

export default OrganizationPage;
