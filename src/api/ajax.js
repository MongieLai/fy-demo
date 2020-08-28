let afterSaleInfo = [
    { "status": "待处理", "type": "软件项目", "companyName": '珠海01有限公司' },
    { "status": "处理中", "type": "软件项目", "companyName": '珠海02有限公司' },
    { "status": "已完成", "type": "软件项目", "companyName": '珠海03有限公司' },
    { "status": "已指派", "type": "软件项目", "companyName": '珠海04有限公司' },
    { "status": "已评价", "type": "软件项目", "companyName": '珠海05有限公司' },
    { "status": "已评价", "type": "软件项目", "companyName": '珠海06有限公司' },
]

let companys = [
    { id: 0, value: "珠海01有限公司", text: "珠海01有限公司" },
    { id: 1, value: "珠海02有限公司", text: "珠海02有限公司" },
    { id: 2, value: "珠海03有限公司", text: "珠海03有限公司" },
    { id: 3, value: "珠海04有限公司", text: "珠海04有限公司" },
    { id: 4, value: "珠海05有限公司", text: "珠海05有限公司" },
    { id: 5, value: "珠海06有限公司", text: "珠海06有限公司" }
]

export default function Api(path, parmas = {}) {
    if (path === '/getAfterSaleInfo') {
        return new Promise((resolve, reject) => {
            resolve(afterSaleInfo)
        })
    } else if (path === '/updateCompanys') {
        return new Promise((resolve, reject) => {
            afterSaleInfo.push({ status: '未处理', ...parmas })
            resolve(afterSaleInfo)
        })
    }
    else if (path === '/getCompanys') {
        return new Promise((resolve, reject) => {
            resolve(companys)
        })
    }
}