

function router(baseResource){
    const api = {
        getAll: null,
        getOne: null,
        createOne: null,
        deleteOne: null,
        updateOne: null,
    }
    return {
        getOne: (fn) => {
            api.getOne = fn;
        },
        getAll: (fn) => {
            api.getAll = fn;
        },
        createOne: (fn) => {
            api.createOne = fn;
        },
        deleteOne: (fn) => {
            api.deleteOne = fn
        },
        execute: (event) => {
            const regex = /\/.netlify\/functions\/(\w+)\/?(\d+)?/;
            const [base, name, param] = regex.exec(event.path);
            const method = event.httpMethod;

            if(method === METHODS.GET){
                if(param){
                    return api.getOne(param);
                }else{
                    return api.getAll();
                }
            }
        
            if(method === METHODS.POST){
                return api.createOne(event.body)
            }
        
            if(method === METHODS.DELETE){
                if(param){
                    return api.deleteOne(param)
                }
            }
        }
    }
}

const STATUS = {
    PENDING : "PENDING",
    COMPLETE: "COMPLETE"
}

const METHODS = {
    GET : "GET",
    POST: "POST",
    DELETE: "DELETE"
}

let todoList = [{
    id: 0,
    status: STATUS.PENDING,
    description: "Example todo"
}];

const methods = {
    getTodos : () => todoList, 
    getOneTodo: (id) => todoList.find(todo => todo.id === parseInt(id)), 
    createTodo: (body) => {
        todoList = toList.concat([body]);
    },
    deleteTodo: (id) => {
        todoList = todoList.filter(todo => todo.id === parseInt(id));
    }
}

const routerInstance = router('todos');

/*
* GET /todos
*/
routerInstance.getAll(() => {
    return methods.getTodos();
});

/*
* GET /todos/:id
*/
routerInstance.getOne((param) => {
    return methods.getOneTodo(param);
});

/*
* POST /todos
*/
routerInstance.createOne((body) => {
    return methods.createTodo(body);
});

/*
* DELETE /todos
*/
routerInstance.deleteOne((param) => {
    return methods.deleteTodo(param);
});


exports.handler = (event, context, callback) => {
    try{
        const result = routerInstance.execute(event);
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(result),
        });
    }catch(e){
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({error: e.message}),
        });
    }
  };
  