import ReactStarsRating from 'react-awesome-stars-rating';

type Props = {
  value: number;
  size: number;
};

export const StarRating = ({ value, size, onChange }: Props): JSX.Element => {
  return (
    <>
      <ReactStarsRating
        onChange={onChange}
        value={value}
        size={size}
        starGap={2}
        // primaryColor={'black'}
        className="stars"
      />
    </>
  );
};
