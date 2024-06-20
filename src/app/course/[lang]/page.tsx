// app/course/[lang]/index.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { staticOrganizations } from 'utils/constants';
import { isAuthenticated } from 'utils/api';
import { getDictionary } from 'app/dictionaries';
import OrganizationCard from 'components/OrganizationCard';
import { Box, Text, Spinner } from '@chakra-ui/react';
import BackgroundRandom from 'components/BackgroundRandom';

interface OrganizationPageProps {
  params: {
    lang: string;
  };
}

const LangIndex: React.FC<OrganizationPageProps> = ({ params }) => {
  const { lang } = params;
  const router = useRouter();
  const [dictionary, setDictionary] = useState(null);

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
			fetchData(); // Fetch dictionary when authenticated
		}
	};

    checkAuth();
  }, [router, lang, dictionary]);

  if (!dictionary) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center z-10">
      <BackgroundRandom />
      <Box textAlign="center" p="12">
        <Text fontSize="2xl" mb="4">{dictionary.selectOrganization}</Text>
        {/* Use Chakra UI Grid for flexible layout */}
        <Box display="flex" justifyContent="center" gap="4">
          <OrganizationCard lang={lang} organizations={staticOrganizations} dictionary={dictionary} />
        </Box>
      </Box>
    </div>
  );
};

export default LangIndex;
