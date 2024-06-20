// components/OrganizationCard.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GridItem, Box, CardBody, Text, IconButton } from '@chakra-ui/react';
import { isAuthenticated } from 'utils/api';

interface Organization {
  organization_name: string;
  logo: string;
  description: string;
  is_primary?: boolean;
}

interface OrganizationCardProps {
  lang: string;
  organizations: Organization[];
  dictionary: any;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({ lang, organizations, dictionary }) => {
  const [primaryOrganization, setPrimaryOrganization] = useState<Organization | null>(null);
  const [secondaryOrganizations, setSecondaryOrganizations] = useState<Organization[]>([]);
  const [showSecondary, setShowSecondary] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      	router.push('/auth/sign-in');
    } else if (organizations && organizations.length > 0) {
		const primary = organizations.find((org) => org.is_primary);
		const secondary = organizations.filter((org) => !org.is_primary);
		setPrimaryOrganization(primary || null);
		setSecondaryOrganizations(secondary);
    }
  }, [organizations, router]);

  if (!primaryOrganization && secondaryOrganizations.length === 0) {
    return <Text>Loading...</Text>;
  }

  const getLogoSrc = (logo: string) => {
    if (logo) {
      	try {
			new URL(logo);
			return logo;
		} catch (_) {
			return 'img/course/logo.png';
		}
    }
    return 'img/course/unfound.png';
  };

  const getCompanyName = (name: string) => {
    return dictionary?.company[name] || name;
  };

  const handleToggleSecondary = () => {
    setShowSecondary(!showSecondary);
  };

  const generateRandomPosition = () => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 100 + 100; // Random distance between 100px and 200px
    const x = distance * Math.cos(angle);
    const y = distance * Math.sin(angle);
    return { x, y };
  };

  return (
    <Box display="flex" justifyContent="center" gap="4">
      {primaryOrganization && (
        <GridItem key={primaryOrganization.organization_name} className="card w-64 shadow-x m-4">
          <figure style={{ maxWidth: '250px', maxHeight: '250px' }}>
            <Link href={`/course/${lang}/${primaryOrganization.organization_name}`}>
              <Image
                src={getLogoSrc(primaryOrganization.logo)}
                width={500}
                height={250}
                alt={lang.toUpperCase()}
                className="object-cover h-52 w-full"
              />
            </Link>
          </figure>
          <Box className="card-body">
            <button className="text-black">
              {getCompanyName(primaryOrganization.organization_name)}
            </button>
          </Box>
        </GridItem>
      )}
		<GridItem key={primaryOrganization.organization_name} className="card w-64 shadow-x m-4">

				<figure style={{ maxWidth: '250px', maxHeight: '250px' }} onClick={handleToggleSecondary}>
				<Image
					src="/img/course/206078.png"
					alt="OTHERS"
					width={500}
					height={250}
					className="object-cover h-52 w-full cursor-pointer"
					/>

				</figure>
				<Box className="card-body">
				<button className="text-black">
				{dictionary.company.others}
            </button>
			</Box>
				{showSecondary && (
					<Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
					{secondaryOrganizations.map((org) => {
					const { x, y } = generateRandomPosition();
					return (
						<GridItem
						key={org.organization_name}
						className="card w-64 shadow-x m-4"
						style={{
							position: 'absolute',
							top: `${y}px`,
							left: `${x}px`,
							transform: 'translate(-50%, -50%)',
							}}
							>
						<figure style={{ minWidth: '50px', minHeight: '25px' }}>
							<Link href={`/course/${lang}/${org.organization_name.toLowerCase()}`}>
							<Image
								src={getLogoSrc(org.logo)}
								width={50}
								height={50}
								alt={lang.toUpperCase()}
								className="object-cover h-52 w-full"
								/>
							</Link>
						</figure>
						<Box className="card-body">
							<button className="text-black">
							{getCompanyName(org.organization_name)}
							</button>
						</Box>
						</GridItem>
					);
					})}
				</Box>
				)}
		</GridItem>
    </Box>
  );
};

export default OrganizationCard;
