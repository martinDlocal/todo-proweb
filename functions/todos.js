

const STATUS = {
    PENDING : "PENDING",
    COMPLETE: "COMPLETE"
}

const METHODS = {
    GET : "GET",
    POST: "POST",
    DELETE: "DELETE"
}

let toList = {
    0: {
        id: 0,
        status: STATUS.PENDING,
        description: "Example todo"
    }
};

const methods = {
    getTodos : () => toList, 
    getOneTodo: (id) => toList.find(todo => todo.id === parseInt(id)),
    createTodo: (body) => {
        const count = Object.keys(toList);
        const lastId = count[count.length - 1];
        toList[lastId + 1] = body;
    },
    deleteTodo: (id) => {
        delete toList[id];
    }
}

exports.handler = (event, context, callback) => {
    console.log(event);
    const regex = /\/.netlify\/functions\/(\w+)\/?(\d+)?/;
    const [base, name, param] = regex.exec(event.path);
    const method = event.httpMethod;

    console.log("resource", name);
    console.log("param", param);

    if(method === METHODS.GET){
        if(param){
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify(methods.getOneTodo(param)),
              });
        }else{
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify(methods.getTodos())
              });
        }
    }

    if(method === METHODS.POST){
        return callback(null, {
            statusCode: 200,
            body: JSON.stringify(methods.createTodo(event.body))
        });
    }

    if(method === METHODS.DELETE){
        if(param){
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify(methods.deleteTodo(param))
            });
        }
    }
    
    callback(null, {
      statusCode: 404,
      body: "Not found",
    });
  };
  