import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import type {
  StoryBoardOverviewFieldValues,
  StoryBoardSummaryFieldValues,
} from '@/constants/schema/storyboard';
import useGetStoryBoard from '@/hooks/react-query/query/useGetStoryBoard';

import FileField from './Field/FileField';
import OverviewForm from './Form/OverviewForm';
import SummaryForm from './Form/SummaryForm';
import SearchParamNav from './Nav/SearchParamNav';
import Scene from './Scene/Scene';

interface StoryBoardEditorProps {
  storyBoardId: string;
}

const StoryBoardEditor = ({ storyBoardId }: StoryBoardEditorProps) => {
  const searchParams = useSearchParams();

  const { data, isInitialLoading } = useGetStoryBoard(storyBoardId);

  const [summaryValues, setSummaryValues] =
    useState<StoryBoardSummaryFieldValues>({} as StoryBoardSummaryFieldValues);
  const [overviewValues, setOverviewValues] =
    useState<StoryBoardOverviewFieldValues>(
      {} as StoryBoardOverviewFieldValues,
    );

  useEffect(() => {
    if (data) {
      setSummaryValues({
        title: data.title,
        author: 'chae', // data.author
        createdDate: new Date().toDateString(), // data.overview.createdDate
        uploadDate: new Date().toDateString(), // data.overview.uploadDate
      });
      setOverviewValues({
        actors: data.overview.actors,
        location: data.overview.location,
        description: data.overview.description,
      });
    }
  }, [isInitialLoading]);

  return (
    <>
      <SummaryForm storyBoardId={storyBoardId} defaultValues={summaryValues} />
      <SearchParamNav navKeys={['영상 개요', '스토리보드']} searchKey="e" />
      {!searchParams?.get('e') ? (
        <>
          <OverviewForm
            storyBoardId={storyBoardId}
            defaultValues={overviewValues}
          />
          <FileField />
        </>
      ) : (
        <Scene />
      )}
    </>
  );
};

export default StoryBoardEditor;
