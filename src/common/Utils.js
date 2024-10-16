const apiLocal = 'http://192.168.1.11:9000'
const apiProduct = ''
const Utils = {
    apiUrl: apiLocal,
    parseDayTime: (type) => {
        if(type == 1) {
            return "Sáng"
        }
        else if(type == 2) {
            return "Chiều"
        }
    },
    formatDate: (dateString) => {
        const date = new Date(dateString)
        const formattedDate = date.toLocaleDateString('en-GB')
        return formattedDate
    }
}
export default Utils