const apiLocal = 'http://192.168.1.18:9000'
const apiProduct = 'http://42.113.122.118:9000'
const Utils = {
    apiUrl: apiProduct,
    parseDayTime: (type) => {
        if(type == 1) {
            return "Sáng"
        }
        else if(type == 2) {
            return "Chiều"
        }
        else if(type == 3) {
            return "Lễ"
        }
    },
    formatDate: (dateString) => {
        const date = new Date(dateString)
        const formattedDate = date.toLocaleDateString('en-GB')
        return formattedDate
    },
    formatDateTime: (dateString) => {
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
}
export default Utils