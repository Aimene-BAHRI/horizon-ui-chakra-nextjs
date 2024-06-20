import React from 'react';
import { Card, CardBody, Box, Text, Grid, GridItem } from '@chakra-ui/react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faUserGraduate,
  faSearch,
  faUserCheck,
  faTools,
} from "@fortawesome/free-solid-svg-icons";

interface RoleCardProps {
  role: any;
  lang: string;
  organization: string;
  dictionary: any;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, lang, organization, dictionary }) => {
  const getRolename = (name: string) => {
    return dictionary?.role[name] || name;
  };

  const getIcon = (roleName: string) => {
    switch (roleName) {
      case 'employee':
        return faUserTie;
      case 'intern':
        return faUserGraduate;
      case 'auditor':
        return faSearch;
      case 'visitor':
        return faUserCheck;
      case 'contractor':
        return faTools;
      default:
        return faUserTie;
    }
  };

  return (
    <GridItem>
      <Card
        key={role.name}
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
        <Link href={`/course/${lang}/${organization}/${role.name}`} passHref>
          <Box as="a" textAlign="center" p="4">
            <FontAwesomeIcon icon={getIcon(role.name)} size="3x" style={{ color: 'blue' }}/>
            <CardBody>
              <Text fontWeight="bold" mt="2">
                {getRolename(role.name)}
              </Text>
            </CardBody>
          </Box>
        </Link>
      </Card>
    </GridItem>
  );
};

export default RoleCard;
