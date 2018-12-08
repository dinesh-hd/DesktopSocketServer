# import socket               # Import socket module

# s = socket.socket()         # Create a socket object
# host = socket.gethostname() # Get local machine name
# port = 1337                # Reserve a port for your service.

# s.connect((host, port))
# s.send(bytes('Helllo', 'utf-8'))

import websocket
from threading import Thread
import time
import sys


def on_message(ws, message):
    print(message)


def on_error(ws, error):
    print(error)


def on_close(ws):
    print("### closed ###")




host = "ws://localhost:1337/"
ws = websocket.WebSocketApp(host,
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
ws.run_forever()