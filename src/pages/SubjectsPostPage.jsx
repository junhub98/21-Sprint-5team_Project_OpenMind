import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfileHeader from '../components/ProfileHeader';
import QuestionSection from '../components/QuestionSection';



export default function PostPage() {

  return (
    <div>
      <ProfileHeader />
      <QuestionSection />
    </div>
  );
};