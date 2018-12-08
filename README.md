# DesktopSocketServer
A Simple electron application written on NodeJS which can function as a socket server.

This opens a simple UI where you can enter a string. This string would be serialized as a JSON string 
and sent to the clients connected to the server.

You can connect any client to this server by using ws://ip:1337

This was primarily intented to be used a mock socket server

# Setting up

After syning the code 
>run npm install

>./node_modules/.bin/electron .
