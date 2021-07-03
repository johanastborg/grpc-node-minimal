var PROTO_PATH = 'helloworld.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const settings = {keepCase: true, longs: String, enums: String, defaults: true, oneofs: true};
const packageDefinition = protoLoader.loadSync(PROTO_PATH, settings);
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

(() => {
  const target = 'localhost:50051';
  let client = new hello_proto.Greeter(target, grpc.credentials.createInsecure());
  let user = 'johan', country = 'sweden';
  let [variable1 , variable2, variable3] = ["Hello, World!", "Testing...", 42];
  console.log(variable2);
  client.sayHello({name: user, country: country}, function(err, response) {
    console.log('Greeting:', response.message);
  });
  client.sayGoodbye({name: user, country: country, date: Date.now()}, function(err, response) {
    console.log('Greeting:', response.message);
  });
})();
