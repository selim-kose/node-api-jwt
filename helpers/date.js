
const dateCreater = () => {
    const now = new Date();
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        timeZoneName: 'short'
    }

    return Intl.DateTimeFormat('sv-SE', options).format(now)
}


module.exports = {dateCreater}