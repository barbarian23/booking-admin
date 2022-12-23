export const ts2dtStr = (ts) => {
    let dateTime = moment.unix(ts).utc('+7');
    return dateTime.format('hh:mm:ss DD/MM/YYYY')
}

//30-09-2022 09:15:31 PM => 30/09/2022
export const dtStr2dStr = (str) => {
    const [dtStr, timeStr] = str.split(' ');
    const dt = new Date(dtStr.split(' ')[0]); 
    const mm = dt.getMonth() + 1; // getMonth() is zero-based
    const dd = dt.getDate();
    const yyyy = dt.getFullYear();

    return `${dd.toString().padStart(2,'0')}/${mm.toString().padStart(2,'0')}/${yyyy.toString().padStart(4,'0')}`;
};

//=>dd-mm-yyyy
export const dt2dtStr = (date) => {
    if(!date) return ''; 
    
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();
    const yyyy = date.getFullYear();

    return `${dd.toString().padStart(2,'0')}-${mm.toString().padStart(2,'0')}-${yyyy.toString().padStart(4,'0')}`;
}

//=>yyyy-mm-dd
export const date2ISODateStr = (date) => {
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();
    const yyyy = date.getFullYear();

    return `${yyyy.toString().padStart(4,'0')}-${mm.toString().padStart(2,'0')}-${dd.toString().padStart(2,'0')}`;
};

//30-09-2022 09:15:31 PM => yyyy-mm-dd
export const dtStr2ISODateStr = (str) => {
    const [dtStr, timeStr] = str.split(' ');
    const dt = new Date(dtStr.split(' ')[0]); 
    const mm = dt.getMonth() + 1; // getMonth() is zero-based
    const dd = dt.getDate();
    const yyyy = dt.getFullYear();


    return `${yyyy.toString().padStart(4,'0')}-${mm.toString().padStart(2,'0')}-${dd.toString().padStart(2,'0')}`;
};