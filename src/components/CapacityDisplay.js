export default function CapacityDisplay(props) {
    const floorData = props.floorData;
    if (floorData) {
        const data = floorData.data;
        const date = data.Updated ? new Date(data.Updated.seconds * 1000) : undefined;
        
        const readableDate = date ? `${date.toLocaleDateString()} ${date.toLocaleTimeString()}` : 'No date information';

        return (
            <div className="display">
                <h3 id="fullTitle">{floorData.title}</h3>
                <h3 id="shortTitle">{floorData.shortTitle}</h3>
                <div className="numbers">
                    <p id="numCapacity">{data.Capacity}/{floorData.maxCapacity}</p>
                    <p id="percentage">{Math.round(data.Capacity / floorData.maxCapacity * 100)}%</p>
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