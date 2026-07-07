interface Props {
  itemIndex: number;
  itemCount: number;
  onUpClickHandle: (e: React.MouseEvent) => void;
  onDownClickHandle: (e: React.MouseEvent) => void;
}
export const ButtonPannel: React.FC<Props> = ({
  itemIndex,
  itemCount,
  onUpClickHandle,
  onDownClickHandle
}) => {
  return (
    <div>
      <button disabled={itemIndex === 0} onClick={onUpClickHandle}>
        ^
      </button>
      <button disabled={itemIndex === itemCount - 1} onClick={onDownClickHandle}>
        v
      </button>
    </div>
  );
};
