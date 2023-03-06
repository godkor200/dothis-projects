import './globalStyle.css';
import Layout from './Layout';

/** @type { import('@storybook/react').Preview } */
export const parameters = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <Layout>
      <Story />
    </Layout>
  ),
];
