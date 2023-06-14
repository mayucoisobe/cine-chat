import ReactStarsRating from 'react-awesome-stars-rating';

type Props = {
  value: number;
  isEdit?: boolean;
  isHalf?: boolean;
  size: number;
  onChange?: ((newValue: number) => void) | null;
};

export const StarRating = ({ value, isEdit, isHalf, size, onChange }: Props): JSX.Element => {
  return (
    <>
      <ReactStarsRating
        value={value}
        isEdit={isEdit}
        isHalf={isHalf}
        size={size}
        starGap={2}
        onChange={onChange}
        className="stars"
      />
    </>
  );
};
