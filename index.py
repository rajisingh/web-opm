'''
 Web OPM: online case tool for Object-Process Methodology
 Copyright 2012 Israel Institute of Technology - Technion
 The code is licensed under GNU General Public License, v2
  
 File context description:
 Main handlers URI handlers
 
 Author: Sergey N. Bolshchikov
'''
from google.appengine.api import channel
import webapp2
import jinja2

import json

import os
import logging
jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

class IndexHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('index.html')
        self.response.out.write(template.render())

class EditorHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('editor.html')
        self.response.out.write(template.render())
        

class RPCHandlerGet(webapp2.RequestHandler):
    """ Allows the functions defined in the RPCMethods class to be RPCed."""
    """def __init__(self):
        webapp2.RequestHandler.__init__(self)
        self.methods = RPCMethods()"""

    def get(self):
        func = None

        obj = json.loads(self.request.get("JSONRequest"))
        action = obj["action"]
        clientId=obj["clientId"]
        data = obj["data"]
        if action:
            if action[0] == '_':
                self.error(403) # access denied
                return
            else:
                func = getattr(RPCMethods(), action, None)

        if not func:
            self.error(404) # file not found
            return

        
        result = func(data,clientId)
        self.response.headers["Content-Type"] = "application/jsonrequest"
        self.response.out.write(json.dumps(result))


class RPCHandlerPost(webapp2.RequestHandler):
    
    def post(self):
        obj = json.loads(self.request.body)
        #logging.warning(type(obj))
        func=obj["action"]
        clientId=obj["clientId"]
        args=obj["data"]
        #logging.warning(type(args))
        if func[0] == '_':
            self.error(403) # access denied
            return

        func = getattr(RPCMethods(), func, None)
        if not func:
            self.error(404) # file not found
            return

        result = func(args,clientId)
        self.response.headers["Content-Type"] = "application/jsonrequest"
        self.response.out.write(json.dumps(result))

class RPCMethods:
    """ Defines the methods that can be RPCed.
    NOTE: Do not allow remote callers access to private/protected "_*" methods.
    """

    def openChannel(self, args , clientId):
        return channel.create_channel(str(clientId),duration_minutes=None)
        
    def minus(self, args , clientId):
        result = int(args["arg1"])-int(args["arg2"]) 
        channel.send_message(str(clientId),str(result))
        return "Answer sent by channel"   
    def add(self, args , clientId):
        # The JSON encoding may have encoded integers as strings.
        # Be sure to convert args to any mandatory type(s).
    
        #logging.warning(args)
        ints = [int(args["arg1"]),int(args["arg2"])]
        channel.send_message(str(clientId), str(sum(ints)))
        return "Answer sent by channel"
          
app = webapp2.WSGIApplication([('/', IndexHandler),
                               ('/editor', EditorHandler),
                               ('/rpcg', RPCHandlerGet),
                               ('/rpcp', RPCHandlerPost)], debug = True)    
    
def main():
    app.run()
    
if __name__ == "__main__":
    main()