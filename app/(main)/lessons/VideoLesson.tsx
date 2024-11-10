"use client";
import React from 'react';

interface VideoLessonProps {
  videoSrc: string; // Указываем, что videoSrc должен быть строкой
}

const VideoLesson: React.FC<VideoLessonProps> = ({ videoSrc }) => (
  <iframe
    width="560"
    height="315"
    src={videoSrc}
    title="Video lesson"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
);

export default VideoLesson;