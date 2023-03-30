import { Skeleton } from '@mui/material';
import { FC } from 'react';

type Props = {
  count: number;
};

const SkeletonRectangular: FC<Props> = ({ count }) => {
  return (
    <>
      {Array.from(Array(count)).map((item, index) => (
        <Skeleton
          sx={{ width: { xs: '100%', sm: 258 } }}
          height={360}
          key={index}
          variant="rectangular"
        />
      ))}
    </>
  );
};
export default SkeletonRectangular;
