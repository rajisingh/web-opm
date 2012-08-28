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
import heapq
import time
import threading
import itertools
import scripts

import dbproc

class ActiveClients():
    def __init__(self):
        self.userDict={}
    def add(self,user):
        self.userDict[user.id]=user
    def remove(self,userId):
        del self.userDict[userId]
    def get(self,id):
        return self.userDict[id]
       
activeClients=ActiveClients() 

jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))
################################################################

class schedule(threading.Thread):
    def run(self):
        x=True
        while x :
            x= False
            time.sleep(1)
            if len(messageQueue)>0:
                task=pop_task()
                scripts.action(task.action,task.data).start()

    
    
messageQueue = []                         # list of entries arranged in a heap
entry_finder = {}               # mapping of tasks to entries
REMOVED = '<removed-task>'      # placeholder for a removed task
counter = itertools.count()     # unique sequence count

#sched=schedule()
#sched.start()



def add_task(task):
    'Add a new task or update the priority of an existing task'
    if task in entry_finder:
        remove_task(task)
    count = next(counter)
    entry = [task.priority, count, task]
    entry_finder[task] = entry
    heapq.heappush(messageQueue, entry)

def remove_task(task):
    'Mark an existing task as REMOVED.  Raise KeyError if not found.'
    entry = entry_finder.pop(task)
    entry[-1] = REMOVED

def pop_task():
    'Remove and return the lowest priority task. Raise KeyError if empty.'
    while messageQueue:
        priority, count, task = heapq.heappop(messageQueue)
        if task is not REMOVED:
            del entry_finder[task]
            return task
    raise KeyError('pop from an empty priority queue') 
# this will serve as a queue for processing            

class Message():
    #Defines the message class picked off the API channel. 
    def __init__(self, id, action, userId, data, priority=3):        #!!!!!!!!!shouldn't it be msgID?!
        self.id=id
        self.action=action
        self.userId=userId
        self.data=data
        self.priority=priority
        
    def send(self):
        pass
    def setPriority(self, priority):
        self.priority=priority
    def getPriority(self):
        return self.priority
"""
class MyEncoder(json.JSONEncoder):
    def default(self, o):
        return o.__dict__
   """     
################################################################


class IndexHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('index.html')
        self.response.out.write(template.render())

class EditorHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('editor.html')
        self.response.out.write(template.render())
        

class RPCHandler(webapp2.RequestHandler):
    """ Allows the functions defined in the RPCMethods class to be RPCed."""
    """def __init__(self):
        webapp2.RequestHandler.__init__(self)
        self.methods = RPCMethods()"""
    
    def get(self):

        obj = json.loads(self.request.get("JSONRequest"))
        msg= Message(obj["id"],obj["action"],obj["clientId"],obj["data"])
        if msg.action:
            if msg.action[0] == '_':
                self.error(403) # access denied
                return
            elif msg.action == "openChannel":
                func = getattr(RPCMethods(), "openChannel", None)
                token=func(msg.data,msg.userId)
                self.response.headers["Content-Type"] = "application/jsonrequest"
                self.response.out.write(json.dumps(token))
            else :
                scripts.actions(msg.action,msg.data).start() 
            
            """elif msg.action == "createUserInstance":
                
                user=scripts.createUserInstance(msg.data)
                dbproc.newUser(user)
                channel.send_message(str(msg.userId), "in the handler"+str(msg.data))"""
            
        else:
            self.error(404) # no action specified
          
            

    def post(self):
        obj = json.loads(self.request.body)
        msg = Message(obj["id"],obj["action"],obj["clientId"],obj["data"])
#        channel.send_message(str(msg.userId), "in the handler"+str(msg.userId))
        if msg.action:
            if msg.action[0] == '_':
                self.error(403) # access denied
                return
            else:
                scripts.actions(msg.action,msg.data).start() 
#            msg.action="script1"
#            add_task(msg)
            
           # thread.start_new_thread(schedule,(1,))
        else:
            self.error(404) # no action specified
            
        self.response.headers["Content-Type"] = "application/jsonrequest"
        self.response.out.write(json.dumps(msg.userId))

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
          
class Connected(webapp2.RequestHandler):
    def post(self):
        client_id = self.request.get('from')
        #ActiveClients.append(client_id)
        
class Disconnected(webapp2.RequestHandler):
    def post(self):
        client_id = self.request.get('from')
        #activeClients.remove(client_id)
    
app = webapp2.WSGIApplication([('/', IndexHandler),
                               ('/editor', EditorHandler),
                               ('/_ah/channel/connected/',Connected),
                               ('/_ah/channel/disconnected/',Disconnected),
                               ('/rpc', RPCHandler)], debug = True)    
    
def main():
    app.run()
    
if __name__ == "__main__":
    main()