/**
 * @copyright     © 2024 by J. Quader
 * @author        Dr. J. Quader
 */
import Presentation from '../../components/presentation/Presentation';
import BaseSection from '../../components/ui/sections/BaseSection';
import { NextPageWithLayout } from '../_app';
import { useNotecardContentQuery } from '@jaqua/project.de/graphql';
import { Alert } from '@jaqua/shared/feat/layout';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Head from 'next/head';
import { useRouter } from 'next/router';

const PresentationPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { id } = query;
  if (!id) return;

  const {
    loading,
    data: { notecardContent: data } = { notecardContent: {} },
  } = // eslint-disable-next-line react-hooks/rules-of-hooks
    useNotecardContentQuery({
      variables: {
        param: { name: 'id', value: id as string },
      },
    });

  if (loading)
    return <CircularProgress size={80} className="animated fadeIn" />;
  if (!data?.content)
    return (
      <Box>
        <BaseSection sx={{ py: 5, pt: 12, backgroundColor: 'primary.dark' }}>
          <Alert severity="error" elevation={0}>
            No dataset existing
          </Alert>
        </BaseSection>
      </Box>
    );

  return (
    <>
      <Head>
        <title>Presentation</title>
      </Head>

      <Presentation
        title={data?.title}
        content={JSON.parse(data.content)?.content}
        date={data?.updatedAt}
      />
    </>
  );
};

export default PresentationPage;
