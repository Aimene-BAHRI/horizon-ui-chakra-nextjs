import React from 'react';
import { Card, CardBody, Box, Text, GridItem } from '@chakra-ui/react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faUserGraduate,
  faSearch,
  faUserCheck,
  faTools,
} from "@fortawesome/free-solid-svg-icons";

interface Role {
  role_name: string;
  organization_name: string;
  fa_icon: string;
  description: string;
}

interface RoleCardProps {
  roles: Role[];
  organization: string;
  lang: string;
  dictionary: any;
}

const icons = {
  faUserTie,
  faUserGraduate,
  faSearch,
  faUserCheck,
  faTools,
};

const RoleCard: React.FC<RoleCardProps> = ({ roles, lang, organization, dictionary }) => {
  const getRolename = (name: string) => {
    return dictionary?.role[name] || name;
  };
  const filteredRoles = roles.filter(role => role.organization_name === organization);

  return (
    <>
      {filteredRoles.map((role) => (
        <GridItem key={role.role_name}>
          <Card
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="sm"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
            minWidth="200px"
            minHeight="200px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            p="4"
          >
            <Link href={`/course/${lang}/${organization}/${role.role_name}`} passHref>
              <Box as="a" textAlign="center" p="4">
                <FontAwesomeIcon icon={icons[role.fa_icon]} size="3x" style={{ color: 'blue' }} />
                <CardBody>
                  <Text fontWeight="bold" mt="2">
                    {getRolename(role.role_name)}
                  </Text>
                </CardBody>
              </Box>
            </Link>
          </Card>
        </GridItem>
      ))}
    </>
  );
};

export default RoleCard;
