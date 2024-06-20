import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Text,
  Button,
  Center,
  Image,
  Spinner
} from '@chakra-ui/react';
import { getProfile, updateUser, updateProfile } from 'utils/api';

interface EmployeeFormProps {
  lang: string;
  organization: string;
  dictionary: any;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ lang, organization, dictionary, handleFileUpload }) => {
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    nationality: '',
    phonenumber: '',
    startdate: '',
    enddate: '',
    organization: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data[0]);
        setFormData({
          first_name: data[0]?.user?.first_name || '',
          last_name: data[0]?.user?.last_name || '',
          email: data[0]?.user?.email || '',
          nationality: data[0]?.nationality || '',
          phonenumber: data[0]?.phone_number || '',
          startdate: data[0]?.debut_mission || '',
          enddate: data[0]?.end_mission || '',
          organization: data[0]?.organization || '',
        });
      } catch (error) {
        console.error('Fetching profile failed:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format dates to YYYY-MM-DD
      const formattedStartDate = formData.startdate ? new Date(formData.startdate).toISOString().split('T')[0] : null;
      const formattedEndDate = formData.enddate ? new Date(formData.enddate).toISOString().split('T')[0] : null;

      // Create the payload for user and profile
      const userData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        // Add any other user fields to update
      };

      const profileData = {
        organization: formData.organization,
        role: formData.role,
        nationality: formData.nationality,
        identity_card_number: formData.identity_card_number,
        identity_type: formData.identity_type,
        phone_number: formData.phonenumber,
        debut_mission: formattedStartDate,
        end_mission: formattedEndDate,
        // Add any other profile fields to update
      };

      // Update user data separately
      await updateUser(profile.user.id, userData);

      // Update profile data
      await updateProfile(profile.id, profileData);

      alert('Profile saved successfully');
    } catch (error) {
      console.error('Profile save failed:', error);
      alert('Profile save failed');
    }
  };

  if (!profile) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box className="relative min-h-screen flex items-center justify-center z-10">
      <Box className="card shrink-0 w-full h-auto max-w-4xl shadow-2xl bg-base-100 relative z-20 p-10">
        <form className="card-body" onSubmit={handleSubmit}>
          {/* Logo */}
          <Center mb={5}>
            <Image
              src="/img/course/logo.png"
              alt="Logo"
              objectFit="cover"
              htmlWidth={500}
              htmlHeight={250}
            />
          </Center>
          {/* Line 1 */}
          <Flex mb={4} justifyContent="space-between">
            <FormControl flex="1" mr={4}>
              <FormLabel>{dictionary.name}</FormLabel>
              <Input type="text" name="name" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} placeholder={dictionary.name} />
            </FormControl>
            <FormControl flex="1">
              <FormLabel>{dictionary.secname}</FormLabel>
              <Input type="text" name="secname" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} placeholder={dictionary.secname} />
            </FormControl>
          </Flex>
          {/* Line 2 */}
          <Flex mb={4} justifyContent="space-between">
            <FormControl flex="1" mr={4}>
              <FormLabel>{dictionary.nationality}</FormLabel>
              <Input type="text" name="nationality" value={formData.nationality} onChange={handleChange} placeholder={dictionary.nationality} />
            </FormControl>
            <FormControl flex="1">
              <FormLabel>{dictionary.organisation}</FormLabel>
              <Input type="text" value={organization} placeholder={dictionary.organisation} disabled />
            </FormControl>
          </Flex>
          {/* Line 3 */}
          <Flex mb={4} justifyContent="space-between">
            <FormControl flex="1" mr={4}>
              <FormLabel>{dictionary.phonenumber}</FormLabel>
              <Input type="tel" name="phonenumber" value={formData.phonenumber} onChange={handleChange} placeholder={dictionary.phonenumber} />
            </FormControl>
            <FormControl flex="1">
              <FormLabel>{dictionary.email}</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={dictionary.email} />
            </FormControl>
          </Flex>
          {/* Line 4 */}
          <Flex mb={4} justifyContent="space-between">
            <FormControl flex="1" mr={4}>
              <FormLabel>{dictionary.startdate}</FormLabel>
              <Input type="date" name="startdate" value={formData.startdate} onChange={handleChange} placeholder={dictionary.startdate} />
            </FormControl>
            <FormControl flex="1">
              <FormLabel>{dictionary.enddate}</FormLabel>
              <Input type="date" name="enddate" value={formData.enddate} onChange={handleChange} placeholder={dictionary.enddate} />
            </FormControl>
          </Flex>
          {/* File Upload */}
          <Flex mb={4} alignItems="center">
            <Text>{dictionary.uploidpic}</Text>
            <label htmlFor="fileUpload">
              <Input
                id="fileUpload"
                type="file"
                accept="image/*" // Restrict file types if needed
                onChange={handleFileUpload}
              />
            </label>
          </Flex>
          <Button type="submit">{profile ? dictionary.update : dictionary.create}</Button>
        </form>
      </Box>
    </Box>
  );
};

export default EmployeeForm;
