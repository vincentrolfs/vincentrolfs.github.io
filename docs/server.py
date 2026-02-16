# Python 3 server example
from http.server import SimpleHTTPRequestHandler, HTTPServer

hostname = "localhost"
port = 8099

class MyServer(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path != "" and self.path != "/" and "." not in self.path:
            self.path += ".html"
        
        SimpleHTTPRequestHandler.do_GET(self)

if __name__ == "__main__":
    server = HTTPServer((hostname, port), MyServer)
    print("Server started at http://%s:%s" % (hostname, port))

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass

    server.server_close()
    print("Server stopped.")