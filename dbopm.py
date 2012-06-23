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
    provider = db.StringProperty()
    token = db.StringProperty()
    email = db.StringProperty()
    fisrtName = db.StringProperty()
    lastName = db.StringProperty()
    password = db.StringProperty()
    models = db.StringListProperty() # List Keys
    lastLogin = db.DateTimeProperty()
    loginStatus = db.BooleanProperty()

class SRVOPMdiagram(db.Model):
    id = db.StringProperty()
    name = db.StringProperty()
    number = db.IntegerProperty()
    OPL = db.StringProperty()

class SRVOPMmodel(db.Model):
    modelID = db.StringProperty()
    creator = db.IntegerProperty()
    creationDate = db.DateTimeProperty()
    name = db.StringProperty()
    type = db.StringProperty()
    participants = db.StringListProperty() # List Keys
    lastUpdate = db.DateTimeProperty()

class SRVOPMProceduralLink(db.Model):
  # OPM ELement
  id = db.StringProperty()
  description = db.StringProperty()
  # OPM Link
  source = db.StringProperty # Object Key  
  destination = db.StringProperty() # Object Key
  category = db.StringProperty()
  type = db.StringProperty()
  # OPM Procedural Link
  xorRelation = db.StringListProperty() # List Keys
  orRelation = db.StringListProperty() # List Keys
  
class SRVOPMStructuralLink(db.Model):
  # OPM ELement
  id = db.StringProperty()
  description = db.StringProperty()
  # OPM Link
  source = db.StringProperty() # Object Key  
  destination = db.StringProperty() # Object Key
  category = db.StringProperty()
  type = db.StringProperty()
  # OPM Structural Link
  participationConst = db.StringProperty()
  participationVal = db.StringProperty()
  cardinality = db.IntegerProperty()
  tag = db.StringProperty()

class SRVOPMState(db.Model):
  # OPM ELement
  id = db.StringProperty()
  description = db.StringProperty()
  # OPM Entity
  name = db.StringProperty()
  # OPM State
  callsType = db.StringProperty()
  type = db.StringProperty()
  minActivationTime = db.IntegerProperty()
  maxActivationTime = db.IntegerProperty()
  inLinks = db.StringListProperty() # List Keys
  outLinks = db.StringListProperty() # List Keys

class SRVOPMPRocess(db.Model):
  # OPM ELement
  id = db.StringProperty()
  description = db.StringProperty()
  # OPM Entity
  name = db.StringProperty()
  # OPM Thing
  essence = db.StringProperty()
  affiliation = db.StringProperty()
  scope = db.StringProperty()
  url = db.URLProperty()
  # OPM Process
  classType = db.StringProperty()
  minActivationTime = db.IntegerProperty()
  maxActivationTime = db.IntegerProperty()
  inLinks = db.StringListProperty() # List Keys
  outLinks = db.StringListProperty() # List Keys

class SRVOPMObject(db.Model):
  # OPM ELement
  id = db.StringProperty()
  description = db.StringProperty()
  # OPM Entity
  name = db.StringProperty()
  # OPM Thing
  essence = db.StringProperty()
  affiliation = db.StringProperty()
  scope = db.StringProperty()
  url = db.URLProperty()
  # OPM Object
  classType = db.StringProperty()
  type = db.StringProperty()
  inLinks = db.StringListProperty() # List Keys
  outLinks = db.StringListProperty() # List Keys
  initValue = db.StringProperty()
  states = db.StringListProperty() # List Keys