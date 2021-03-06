const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = 'helloworld.proto';
const SETTINGS = {keepCase: true, longs: String, enums: String, defaults: true, oneofs: true};
const packageDefinition = protoLoader.loadSync(PROTO_PATH, SETTINGS);
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

const sayHello = (call, callback) => {
  console.log(call.request);
  callback(null, {message: `Name: ${call.request.name}, Country: ${call.request.country}`});
}

const sayGoodbye = (call, callback) => {
  console.log(call.request);
  callback(null, {message: `Goodbye ${call.request.name}. Go home to ${call.request.country}`});
}

(() => {
  const addr = '0.0.0.0:50051';
  let server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {sayHello: sayHello, sayGoodbye: sayGoodbye});
  server.bindAsync(addr, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
})();
