import ReactStarsRating from 'react-awesome-stars-rating';

type Props = {
  value: number;
};

export const StarRating = ({ value, onChange }: Props): JSX.Element => {
  return (
    <>
      <ReactStarsRating onChange={onChange} value={value} size={20} starGap={2} className="stars" />
    </>
  );
};
