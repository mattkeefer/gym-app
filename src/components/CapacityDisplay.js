export default function CapacityDisplay(props) {
    const floorData = props.floorData;
    if (floorData) {
        const data = floorData.data;
        const date = data.Updated ? new Date(data.Updated.seconds * 1000) : undefined;
        
        const readableDate = date ? `${date.toLocaleDateString()} ${date.toLocaleTimeString()}` : 'No date information';

        return (
            <div className="display">
                <h3>{floorData.title}</h3>
                <div className="numbers">
                    <p>{data.Capacity}/{floorData.maxCapacity}</p>
                    <p>{Math.round(data.Capacity / floorData.maxCapacity * 100)}%</p>
                </div>
                <div className="date">
                    <p>{readableDate}</p>
                </div>
            </div>
        );
    }
    return (
        <div className="display">
            <p>No data</p>
        </div>
    );
}