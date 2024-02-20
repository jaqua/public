/**
 * @author        Dr. J. Quader
 * @copyright     © 2023-2024 by J. Quader
 */
import RootLayout from '../components/RootLayout';
import { NextPageWithLayout } from './_app';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import Head from 'next/head';

const IndexPage: NextPageWithLayout = () => {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>project.de</title>
      </Head>
      <Box>Main page</Box>
    </>
  );
};

IndexPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default IndexPage;
