import { Skeleton } from '@mui/material';
import { FC } from 'react';

type Props = {
  count: number;
};

const styles = {
  root: {
    width: { xs: '100%', sm: 258 },
  },
};
const SkeletonRectangular: FC<Props> = ({ count }) => {
  return (
    <>
      {Array.from(Array(count)).map((item, index) => (
        <Skeleton
          sx={styles.root}
          height={360}
          key={index}
          variant="rectangular"
        />
      ))}
    </>
  );
};
export default SkeletonRectangular;
