import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

export default function Test({ name }: { name: string }) {
  return <div className="text-h1 bg-slate-100 text-danger">test: {name}</div>;
}
