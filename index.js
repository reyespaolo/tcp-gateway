var net = require('net');

server = net.createServer()

server.once('error', (error) => {
    console.error('TCP Gateway Error', error)
    setTimeout(() => {
      server.close(() => {
        server.removeAllListeners()
        process.exit()
      })
    }, 5000)
  });

  server.once('listening', () => {
    console.log("TCP Gateway Ok")
  });

  server.once('close', function () {
    console.log("TCP Gateway Close")
 })

 server.on('connection', (socket) => {
     socket.setEncoding('utf8')
     socket.setKeepAlive(true, 5000)
     socket.setTimeout(3600000)
     socket.on('error', (error) => {
       console.error('Client Error.', error)
       socket.destroy()
     })

     socket.on('timeout', () => {
       plugin.log('TCP Gateway - Socket Timeout.')
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
       //Handle Data
       console.log(data);

     })

   })

  server.listen(3111);
