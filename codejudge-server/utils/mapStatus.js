const statusMap={
    1:"Queued",
    2:"Processing",
    3:"Accepted",
    4:"Wrong Answer",
    5:"Time Limit Exceeded",
    6:"Compilation Error",
    7:"Runtime Error",
    8:"Internal Error",
};
module.exports=function mapStatus(code){
    return statusMap[code] || "Unknown";
};