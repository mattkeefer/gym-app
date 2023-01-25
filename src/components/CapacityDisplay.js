export default function CapacityDisplay(props) {
    const floorData = props.floorData;
    if (floorData) {
        const data = floorData.data;
        const time = data.Time;
        const readableDate = `${time[1]}/${time[2]} ${time[3] > 12 ? time[3] - 12 : time[3]}:${time[4]} ${time[3] > 12 ? 'PM' : 'AM'}`;

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