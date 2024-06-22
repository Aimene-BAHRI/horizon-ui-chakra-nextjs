// components/VideoPlayer.tsx
import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title }) => {
  return (
    <Box width="100%" height="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={4}>
      <Heading mb={4}>{title}</Heading>
      <Box width="100%" height="100%" maxW="800px" maxH="450px">
        <iframe
          width="100%"
          height="100%"
          src={videoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
    </Box>
  );
};

export default VideoPlayer;
