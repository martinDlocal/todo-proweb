
const STATUS = {
  PENDING : "PENDING",
  COMPLETE: "COMPLETE"
}

const toList = [{
  id: 0,
  status: STATUS.PENDING,
  description: "Example todo"
}];
  
const getRandomGreetingFn = () =>
    messages[Math.floor(Math.random() * messages.length)];
  
exports.handler = (event, context, callback) => {
    console.log(context);
    console.log(event);

    const {
      queryStringParameters: { name },
    } = event;
  
    const greeting = getRandomGreetingFn()(name);
  
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ greeting }),
    });
  };
  