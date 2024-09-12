'use client';

import './styles.css';

import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const TabList = () => {
  const router = useRouter();

  const pathName = usePathname();

  const [, , tabname] = pathName?.split('/') ?? [];
  console.log(tabname);
  let tabs = [
    { id: 'summary', label: 'World' },
    { id: 'channel-analysis', label: 'N.Y.' },
    { id: 'competitive-analysis', label: 'Business' },
    { id: 'video-assessment', label: 'Arts' },
  ];

  let [activeTab, setActiveTab] = useState('summary');
  return (
    <div className="container">
      <div className="tabs">
        <input
          type="radio"
          id="radio-1"
          name="tabs"
          checked={activeTab === 'summary'}
          onClick={() => {
            setActiveTab('summary');
          }}
        />
        <label
          className="tab"
          htmlFor="radio-1"
          onClick={() => {
            setActiveTab('summary');
          }}
        >
          Upcoming<span className="notification">2</span>
        </label>
        <input
          type="radio"
          id="radio-2"
          name="tabs"
          checked={activeTab === 'channel-analysis'}
        />
        <label
          className="tab"
          htmlFor="radio-2"
          onClick={() => {
            setActiveTab('channel-analysis');
          }}
        >
          Development
        </label>
        <input
          type="radio"
          id="radio-3"
          name="tabs"
          checked={activeTab === 'competitive-analysis'}
        />
        <label
          className="tab"
          htmlFor="radio-3"
          onClick={() => {
            setActiveTab('competitive-analysis');
          }}
        >
          Completed
        </label>
        <span className="glider"></span>
      </div>
    </div>
  );
};

export default TabList;
