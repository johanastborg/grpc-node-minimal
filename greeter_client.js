const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = 'helloworld.proto';
const SETTINGS = {keepCase: true, longs: String, enums: String, defaults: true, oneofs: true};
const packageDefinition = protoLoader.loadSync(PROTO_PATH, SETTINGS);
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

(() => {
  const target = 'localhost:50051';
  let client = new hello_proto.Greeter(target, grpc.credentials.createInsecure());
  let user = 'johan', country = 'sweden', date = Date.now();
  client.sayHello({name: user, country: country}, (err, response) => {
    console.log('Greeting:', response.message);
  });
  client.sayGoodbye({name: user, country: country, date: date}, (err, response) => {
    console.log('Greeting:', response.message);
  });
})();
