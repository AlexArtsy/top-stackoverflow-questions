interface Props {
    data: string;
};
export const ListItemContent: React.FC<Props> = ({ data }) => {
    return (
        <div>
            <span>Какие-то данные: {data}</span>
        </div>
    );
};