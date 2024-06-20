// app/course/[lang]/index.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { staticLangs } from 'utils/constants';
import { isAuthenticated } from 'utils/api';
import { getDictionary } from 'app/dictionaries';
import { Box, Text, Spinner, Grid, GridItem } from '@chakra-ui/react'; // Import Grid and GridItem from Chakra UI
import Image from 'next/image';
import Link from 'next/link';
import BackgroundRandom from 'components/BackgroundRandom';



const CourseIndex: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dictionary, setDictionary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDict = await getDictionary("en"); // Call getDictionary the first time in default mode
			  setDictionary(fetchedDict); // Update dict state on successful fetch
        setLoading(false);
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
  }, [router]);

  if (loading) {
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
          <Text fontSize="2xl" mb="4">{dictionary.selectLanguage}</Text>
          {/* Use Chakra UI Grid for flexible layout */}
          <Box display="flex" justifyContent="center" gap="4">
            {staticLangs.map((lang) => (
              <GridItem key={lang} className="card w-64 shadow-x m-4">
                <figure style={{ minWidth: '250px', minHeight: '220px' }}>
                  <Link href={`/course/${lang}/`}>
                    <Image
                      src={`img/course/${lang.toUpperCase()}.png`}
                      width={500}
                      height={250}
                      alt={lang.toUpperCase()}
                      className="object-cover h-52 w-full"
                      />
                  </Link>
                </figure>
                <Box className="card-body">
                  <button className="text-black">
                    {lang === 'ar' ? 'عربية' : lang === 'en' ? 'English' : 'French'}
                  </button>
                </Box>
              </GridItem>
            ))}
          </Box>
        </Box>
    </div>
  );
};

export default CourseIndex;
