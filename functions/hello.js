
// domain/.netlify/functions/hello

const items = [
    {id:1,name:'jhon'},
    {id:2,name:'susan'},
]

exports.handler = async function(event,handler){
    return {
        statusCode:200,
        body:JSON.stringify(items)
    }
}