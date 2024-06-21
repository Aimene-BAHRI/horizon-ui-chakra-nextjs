// app/course/[lang]/[organization]/[role]/videoReader/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner, Box } from '@chakra-ui/react';
import VideoPlayer from 'components/VideoPlayer';
import { getVideo } from 'utils/api';

interface VideoReaderProps {
  params: {
    lang: string;
    organization: string;
    role: string;
    course_id: number;
  };
}

const VideoReader: React.FC<VideoReaderProps> = ({ params }) => {
  const { lang, organization, role, course_id } = params;
  const [video, setVideo] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await getVideo(course_id);
        setVideo(data[0]); // Assuming we fetch one video for simplicity
        setLoading(false);
      } catch (error) {
        console.error('Error fetching video:', error);
        setLoading(false);
      }
    };

    fetchVideo();
  }, [course_id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!video) {
    return (
      <Box height="100vh" width="100vw" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <VideoPlayer videoUrl="/videos/nature.mp4" title="Default Video" />
      </Box>
    );
  }

  let videoUrl = '';
  switch (lang) {
    case 'en':
      videoUrl = video.video_url_en;
      break;
    case 'fr':
      videoUrl = video.video_url_fr;
      break;
    case 'ar':
      videoUrl = video.video_url_ar;
      break;
    default:
      videoUrl = video.video_url_en;
  }

  return (
    <Box height="100vh" width="100vw" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <VideoPlayer videoUrl={videoUrl} title={video.title} />
    </Box>
  );
};

export default VideoReader;
