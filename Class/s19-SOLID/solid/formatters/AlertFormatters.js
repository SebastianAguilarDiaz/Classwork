export class AlertFomatter{
    static formatText(sensorData){
        return `[ALERT] Sensor ${sensorData.id} excced limit! Value: ${sensorData.reading}`;
    }

    static formatHtml(sensorData){
        return `
        <div style="border; 2px solid red; padding: 15px; font-family: sans-serif;">
        <h2 style="color : red;"> SuntainHub Critical Aletr </h2>
        <p> Sensor ID: "<strong>${sensorData.id}</strong></p>
        <p>Recorded Value: <strong>${sensorData.reading}</strong></p>
        <p>Timestamp: ${new Date().toLocaleDateString()}</p>
        </div>
        `;

        
    }
}