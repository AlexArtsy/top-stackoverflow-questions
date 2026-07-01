import { useState } from "react";
import { ListItemContent } from "./list-item-content";

type Props = {
    data: string;
};
export const ListItem: React.FC<Props> = ({ data }) => {
    const [ isOpened, setIsOpened ] = useState<boolean>();

    const onClickHandle = () => {
        setIsOpened((prev) => !prev);
    };

    return (
        <div onClick={onClickHandle}>
            {data}
            {isOpened && <ListItemContent data={data} />}
        </div>
    );
};