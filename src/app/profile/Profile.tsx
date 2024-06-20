// src/app/profile/Profile.tsx
import React, { useEffect, useState } from 'react';
import { Box, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { getProfile } from 'utils/api';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        setError('Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Text>Username: {profile.username}</Text>
      <Text>Email: {profile.email}</Text>
      {/* Display other profile information as needed */}
    </Box>
  );
};

export default Profile;
