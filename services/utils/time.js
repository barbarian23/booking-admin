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

    return `${(dd > 9 ? '' : '0') + dd}/${(mm > 9 ? '' : '0') + mm}/${yyyy}`;
};

//yyyy-mm-dd
export const date2dStr = (date) => {
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();
    const yyyy = date.getFullYear();

    return `${yyyy}-${(mm > 9 ? '' : '0') + mm}-${(dd > 9 ? '' : '0') + dd}`;
};

//30-09-2022 09:15:31 PM => yyyy-mm-dd
export const dtStr2ISODateStr = (str) => {
    const [dtStr, timeStr] = str.split(' ');
    const dt = new Date(dtStr.split(' ')[0]); 
    const mm = dt.getMonth() + 1; // getMonth() is zero-based
    const dd = dt.getDate();
    const yyyy = dt.getFullYear();
    

    return `${yyyy}-${(mm > 9 ? '' : '0') + mm}-${(dd > 9 ? '' : '0') + dd}`;
};