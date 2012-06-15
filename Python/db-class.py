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
    userID = db.StringProperty()
    provider = db.StringProperty()
    token = db.StringProperty()
    email = db.StringProperty()
    fisrtName = db.StringProperty()
    lastName = db.StringProperty()
    password = db.StringProperty()
    models = db.StringListProperty() # dict. pickeled
    lastLogin = db.DateTimeProperty()
    loginStatus = db.BooleanProperty()

class SRVOPMdiagram(db.Model):
    id = db.StringProperty()
    predecessor = db.StringProperty() # OPM Diagram Key
    successors = db.StringProperty() # dict. pickeled
    elements = db.StringProperty() # dict. pickeled
    name = db.StringProperty()
    number = db.IntegerProperty()
    OPL = db.BlobProperty()
    level = db.IntegerProperty()

class SRVOPMmodel(db.Model):
    modelID = db.StringProperty()
    creator = db.StringProperty() # User Key
    creationDate = db.DateTimeProperty()
    name = db.StringProperty()
    type = db.StringProperty()
    participants = db.StringProperty() # dict. pickeled
    SD = db.StringProperty() # OPM Diagram Key
    lastUpdate = db.DateTimeProperty()

class SRVOPMProceduralLInk(db.Model):
  # OPM ELement
  id = db.StringProperty()
  diagrams = db.StringProperty # dict. pickeled
  description = db.StringProperty()
  # OPM Link
  source = db.StringProperty # Object Key  
  destination = db.StringProperty() # Object Key
  category = db.StringProperty()
  type = db.StringProperty()
  # OPM Procedural Link
  xorRelation = db.StringProperty() # dict. pickeled
  orRelation = db.StringProperty() # dict. pickeled
  
class SRVOPMProceduralLInk(db.Model):
  # OPM ELement
  id = db.StringProperty()
  diagrams = db.StringProperty # dict. pickeled
  description = db.StringProperty()
  # OPM Link
  source = db.StringProperty # Object Key  
  destination = db.StringProperty() # Object Key
  category = db.StringProperty()
  type = db.StringProperty()
  # OPM Structural Link
  participationConst = db.StringProperty()
  participationVal = db.StringProperty()
  cardinality = db.StringProperty()
  tag = db.StringProperty()

class SRVOPMState(db.Model):
  # OPM ELement
  id = db.StringProperty()
  diagrams = db.StringProperty # dict. pickeled
  description = db.StringProperty()
  # OPM Entity
  name = db.StringProperty()
  # OPM State
  callsType = db.StringProperty()
  type = db.StringProperty()
  parent = db.StringProperty() # Object Key
  minActivationTime = db.IntegerProperty()
  maxActivationTime = db.IntegerProperty()
  inLinks = db.StringProperty() # dict. pickeled
  outLinks = db.StringProperty() # dict. pickeled

class SRVOPMPRocess(db.Model):
  # OPM ELement
  id = db.StringProperty()
  diagrams = db.StringProperty # dict. pickeled
  description = db.StringProperty()
  # OPM Entity
  name = db.StringProperty()
  # OPM Thing
  essence = db.StringProperty()
  affiliation = db.StringProperty()
  scope = db.StringProperty()
  unfoldDiag = db.StringProperty() # dict. pickeled
  inzoomDiag = db.StringProperty() # dict. pickeled
  things = db.StringProperty() # dict. pickeled
  url = db.URLProperty()
  # OPM Process
  classType = db.StringProperty()
  minActivationTime = db.IntegerProperty()
  maxActivationTime = db.IntegerProperty()
  inLinks = db.StringProperty() # dict. pickeled
  outLinks = db.StringProperty() # dict. pickeled

class SRVOPMObject(db.Model):
  # OPM ELement
  id = db.StringProperty()
  diagrams = db.StringProperty # dict. pickeled
  description = db.StringProperty()
  # OPM Entity
  name = db.StringProperty()
  # OPM Thing
  essence = db.StringProperty()
  affiliation = db.StringProperty()
  scope = db.StringProperty()
  unfoldDiag = db.StringProperty() # dict. pickeled
  inzoomDiag = db.StringProperty() # dict. pickeled
  things = db.StringProperty() # dict. pickeled
  url = db.URLProperty()
  # OPM Object
  classType = db.StringProperty()
  type = db.StringProperty()
  states = db.StringProperty() # dict. pickeled
  inLinks = db.StringProperty() # dict. pickeled
  outLInks = db.StringProperty()  # dict. pickeled