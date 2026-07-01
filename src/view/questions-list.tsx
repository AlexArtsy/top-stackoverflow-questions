import { ListItem } from "./list-item";
import { NoData } from "./no-data";

export const QuestionsList: React.FC = () => {
    const listData = [
        'вопрос 1',
        'вопрос 2',
        'вопрос 3',
        'вопрос 4',
        'вопрос 5',
    ];

    return listData.length === 0
            ? (<NoData />)
            : (<div>
                {listData.map(itemData => <ListItem data={itemData} />)}
            </div>);
};