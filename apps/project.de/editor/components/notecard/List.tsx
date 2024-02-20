/**
 * @author        Dr. J. Quader
 * @copyright     © 2023 by J. Quader
 */
import { useNotecardListQuery } from '@jaqua/project.de/graphql';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, gridClasses } from '@mui/x-data-grid';
import Link from 'next/link';
import { useRouter } from 'next/router';

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Notecard', width: 200 },
];

export default function DataTable() {
  const router = useRouter();
  const { data, loading } = useNotecardListQuery();

  const handleClick = ({ id }) => {
    if (!id) return;
    router.push(['notecard', id].join('/'));
  };

  if (loading) return <CircularProgress color="inherit" />;
  if (!data?.notecardList?.length)
    return (
      <Paper elevation={1} sx={{ p: 2 }}>
        <Link href="/notecard/new">
          <Button variant="outlined" color="primary" sx={{ mb: 2 }}>
            Create new notecard
          </Button>
        </Link>
      </Paper>
    );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Link href="/notecard/new">
          <Button variant="outlined" color="primary" sx={{ mb: 2 }}>
            Create new notecard
          </Button>
        </Link>
        <DataGrid
          rows={data.notecardList}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 50 },
            },
          }}
          pageSizeOptions={[50]}
          checkboxSelection={false}
          density="compact"
          disableRowSelectionOnClick
          onRowClick={handleClick}
          sx={{
            border: 0,
            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
              {
                outline: 'none',
              },
            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
              {
                outline: 'none',
              },
            [`& .${gridClasses.columnHeaderTitle}`]: {
              fontWeight: 'bold',
              fontSize: 'medium',
            },
            [`& .${gridClasses.footerContainer}`]: { border: 0 },
            [`& .${gridClasses.row}`]: { cursor: 'pointer' },
          }}
        />
      </Paper>
    </Box>
  );
}
