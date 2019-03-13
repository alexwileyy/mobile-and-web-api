exports.getTodaysDate = () => {
    const date = new Date();
    const splitDate = date.toString().split(' ');
    return `${splitDate[0]} ${splitDate[1]} ${splitDate[2]} ${splitDate[3]}`;
}