import { ITEM_COUNT } from '../model/types';

interface Props {
  itemIndex: number;
  onUpClickHandle: () => void;
  onDownClickHandle: () => void;
}
export const ButtonPannel: React.FC<Props> = ({
  itemIndex,
  onUpClickHandle,
  onDownClickHandle,
}) => {
  return (
    <div>
      <button disabled={itemIndex === 0} onClick={onUpClickHandle}>
        ^
      </button>
      <button disabled={itemIndex === ITEM_COUNT - 1} onClick={onDownClickHandle}>
        v
      </button>
    </div>
  );
};
