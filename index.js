var net = require('net');
server = net.createServer()

server.once('listening', () => {
    console.log("TCP Gateway Ok")
});

 server.on('connection', (socket) => {
   socket.setEncoding('utf8')
   socket.setKeepAlive(true, 5000)
   socket.setTimeout(3600000)
   socket.on('error', (error) => {
     console.error('Error.', error)
     socket.destroy()
   })

   socket.on('timeout', () => {
     plugin.log('TCP Gateway Timeout.')
     socket.destroy()
   })

   socket.on('close', () => {
     if (socket.device) {
       delete clients[socket.device]
     }
     setTimeout(() => {
       socket.removeAllListeners()
     }, 5000)
   })
   socket.on('data', (data) => {
     console.log(data);
   })
 })

 server.once('close', function () {
   console.log("TCP Gateway Close")
 })

 server.once('error', (error) => {
  console.error('TCP Gateway Error', error)
  setTimeout(() => {
    server.close(() => {
      server.removeAllListeners()
      process.exit()
    })
  }, 5000)
 });
 server.listen(3111);
