const classses = (...strings: string[]) => {
    let str = "";
    strings.forEach(s => str += s + " ");
    return str;
}

export default classses;