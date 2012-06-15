import datetime
from google.appengine.ext import db

##User Interface Classes

class UIName(db.Model):
    x = db.FloatProperty()
    y = db.FloatProperty()
    fill = db.StringProperty()
    fontFamily = db.StringProperty()
    fontWeight = db.StringProperty()
    fontSize = db.FloatProperty()
    value = db.StringProperty()

class UIObject(db.Model):
    x = db.FloatProperty()
    y = db.FloatProperty()
    width = db.FloatProperty()
    height = db.FloatProperty()
    fill = db.StringProperty()
    stroke = db.StringProperty()
    strokeWidth = db.FloatProperty()

class UIGroup(db.Model):
    transform = db.StringProperty()
    shape = UIObject()
    name = UIName()
    grip = db.StringProperty()
    
class UIDiagram(db.Model):
    diagramID = db.IntegerProperty()
    width = db.FloatProperty()
    height = db.FloatProperty()
    transform = db.StringProperty()
    elements = UIGroup()    

class UIProcess(db.Model):
    cx = db.FloatProperty()
    cy = db.FloatProperty()
    rx = db.FloatProperty()
    ry = db.FloatProperty()
    fill = db.StringProperty()
    stroke = db.StringProperty()
    strokeWidth = db.FloatProperty()

class UILInk(db.Model):
    fill = db.StringProperty()
    stroke = db.StringProperty()
    d = db.StringProperty()

class UIState (db.Model):
    x = db.FloatProperty()
    y = db.FloatProperty()
    rx = db.FloatProperty()
    ry = db.FloatProperty()
    width = db.FloatProperty()
    height = db.FloatProperty()
    fill = db.StringProperty()
    stroke = db.StringProperty()
    strokeWidth = db.FloatProperty()
    
##Server Classes

class SRVuser(db.Model):
    userID = db.IntegerProperty()
    userName = db.StringProperty()
    alienLogin = db.StringProperty()
    fisrtName = db.StringProperty()
    lastName = db.StringProperty()
    email = db.StringProperty()
    password = db.StringProperty()
    lastLogin = db.DateTimeProperty()
    loginStatus = db.BooleanProperty()

class SRVOPMmodel(db.Model):
    modelID = db.IntegerProperty()
    name = db.StringProperty()
    type = db.StringProperty()
    creatorID = db.IntegerProperty()
    ##participents = SRVUser()   
    ## SD
    lastUpdateDate = db.DateTimeProperty()
    creationDate = db.DateTimeProperty()

class SRVmessage(db.Model):
    msgID = db.IntegerProperty()
    contenct = db.StringProperty()
    timeSent = db.DateTimeProperty()
    msgType = db.StringProperty()
    priority = db.IntegerProperty()

class SRVOPMdiagram(db.Model):
    #pre
    #suc
    #ele
    diagramName = db.StringProperty()
    OPL = db.StringProperty()
    number = db.StringProperty()