#OPM CLASS LOGIC
################################################################
	
class User():
	#This class deals with the user attributes like personal info and methods like logging in/out 

	def __init__(self,id, email, password, lastLogin):
		#initializing values for variables
		self.id=id
		self.provider=None
		self.token=None
		self.email=email
		self.firstName=None
		self.lastName=None
		self.password=password
		self.models= { }
		self.lastLogin=lastLogin
		self.loginStatus=False
		
		
	def getId(self):
		#Returns user id
		return self.id	
	
	def getEmail(self):
		#Returns users email
		return self.email
	
	def getName(self):
		#Returns users full name
		if ((self.firstName is None) and (self.lastName is None)) :
			return "No name has been specified"
		elif (self.firstName is None) :
			return self.lastName
		elif (self.lastName is None) :
			return self.firstName
		return self.firstName + " " + self.lastName
	
	def setName(self, newFirstName, newLastName):
		#Sets a new first and last name for the user
		self.firstName=newFirstName
		self.lastName=newLastName
	
	def getModels (self):
		#receives the  model id's list
		return self.models
	def getModel (self,modelId):
		#receives the  model id's list
		return self.models[modelId]
	
	def addModel (self, model):
		#adds a model to the list of models
		self.models[model.id]=model
	
	def getLastLogin (self):
		#gets the last login date
		return self.lastLogin
	
	def setLastLogin (self, newLoginDate):
		#set new login date 
		self.lastLogin=newLoginDate
	
	def setToken (self,newToken):
		#sets the given token the user receives when he signs in via provider
		self.token=newToken
	
	def getToken (self):
		return self.token
		
	def setPassword (self, newPassword):
		#sets the new password if user wishes to update it
		self.password=newPassword
	
	def getPassword (self):
		#called if user forgets password
		###TODO: Send request to DB and send the letter with password to the user
		return self.password
	
	def getLoginStatus (self):
		#login status of user
		return self.loginStatus
	
	def setProvider (self, provider):
		#token provider i.e FB LI Google etc
		self.provider=provider
	
	def getProvider (self):
		return self.provider
	
#!!!!!!! 	
#	def deleteModel (model)
#This undefined function should contact the DB and delete the model off it.

#  	def login(self)
#	def logout(self)
#According to the JS model and code, These functions should ne log in and out via the different providers. 
#The Python Server Side model suggest the following:
		
	#THESE FUNCTIONS REMAIN UNDEFINED!!!!!
	#Logging via social networks	
	"""def loginFB(self, id, pwd):   
		self.id=id
		self.pwd=pwd
	def loginLI(self, id, pwd):  
		self.id=id
		self.pwd=pwd
	def loginGO(self, id, pwd):   
		self.id=id
		self.pwd=pwd
	def loginGO(self, id, pwd):   
		self.id=id
		self.pwd=pwd
	def logout(self):
		return self"""
	#def editUser(self) #!!!!!unsure what it should return
	
	
	

#End of USER class
################################################################

################################################################
class OPMModel():   
	#Has the general definitions and the methods of a given OPM model
	def __init__(self, modelID, creator, creationDate, sd, lastUpdate,name = 'New Model',type = 'System'):   
	#constructor
		self.modelID=modelID
		self.creator=creator  
		self.creationDate=creationDate	
		self.name = name 			#default value
		self.type = type
		self.participants = { }
		self.sd = sd		#create first SD for model, with level=0
		self.diagrams = { }							#map object with diagrams in a model
		self.lastUpdate = lastUpdate		
# working methods
	def getID(self): 	
	#ID of model
		return self.modelID		
	def getCreator(self):
		return self.creator
	def getName(self):							#Retrieving name of model	
		return self.name		
	def setName(self,name):						
	#Setting a name for the model
		self.name=name
	def share(self, newParticipants):
	#adds participants, input :user instance or list of user paticipants
		if(bool(getattr(newParticipants, '__iter__', False))):
			
			for user in newParticipants:
				self.participants[user.id]=user
		else :
			self.participants[newParticipants.id]=newParticipants
	def unshare(self,users):
		if(bool(getattr(users, '__iter__', False))):
			
			for user in users :
				del self.participants[user.id]
		else :
			del self.participants[users.id]
	def getParticipants(self):
		return self.participants
		
	def getType (self):							#Type of model
		return self.type
	def setType (self, type):					#Setting a type
		self.type=type
	def addDiagram(self,diagrams):
		if(bool(getattr(diagrams, '__iter__', False))):
			
			for diagram in diagrams :
				self.diagrams[diagram.id]=diagram
		else :
			self.diagrams[diagrams.id]=diagrams
	def removeDiagrams(self,diagrams):
		if(bool(getattr(diagrams, '__iter__', False))):
			
			for diagram in diagrams :
				del self.diagrams[diagram.id]
		else :
			del self.diagrams[diagrams.id]
	def getDiagrams(self):
		return self.diagrams
	def getLastUpdate(self):
		return self.lastUpdate
	def setLastUpdate(self,date):
		self.lastUpdate = date
	def getCreationDate(self):
		return self.creationDate	
	def getSd(self):
		return self.sd
	# not working								#Save the model
	def load(self):	
		pass							#Load a model

################################################################

import itertools
messageQueue = []                         # list of entries arranged in a heap
entry_finder = {}               # mapping of tasks to entries
REMOVED = '<removed-task>'      # placeholder for a removed task
counter = itertools.count()     # unique sequence count

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
    		
################################################################


class OPMDiagram():
	def __init__(self,id,predecessor, level, name):
		self.id=id
		self.predecessor=predecessor
		self.successors = { }		#map of successors
		self.elements = { }		#map of elements that diagram contains
		self.name = name
		self.number = None
		self.OPL = None
		self.level = level
	#  Working functions
	def getId(self):
		return self.id
	
	def getName(self):
		return self.name
	
	def setName(self,name):
		self.name = name
	
	def getNumber(self):
		return self.number
	
	def setNumber(self,number):
		self.number = number
	
	def addElement(self,element):
		self.elements[element.id] = element
	
	def getElement(self,id):
		return self.elements[id]
	
	def getElements(self):
		return self.elements
	
	def removeElement(self,element):
		del self.elements[element.id]
		pass
	
	def getPredecessor(self):
   		return self.predecessor
	    
	def getSuccessors(self):
		return self.successors
	    
	def addSuccessor(self,diagram):
    #receives OPMDiagram object to add to the map of successor diagrams
	   self.successors[diagram.id] = diagram
	
	def removeSuccessor(self,diagram):
		del self.successors[diagram.id]
	
	def getLevel(self):
		return self.level
	
	def getOPL(self): #for future implementation
		return self.OPL
	
# /*Non-working function*/
#	def reLevel(self,levels):          
	
#	def print(self):
	#need implementation of print procedure.
	#including XML function
	
#	def writeOPL(self,text):
	#TODO: need to think of a more clever way to add text to the OPL.
	#changes to OPL are done per element creation. therefore, at each creation of each type of element
	#we'll need an OPL "generator".

		
############################################################################
class OPMElement():   #this is an abstract class. Here, and in the other
					#I'd raise an exception if we somehow use the getID method without implementing it
					#please view http://nedbatchelder.com/text/pythonic-interfaces.html
					#and http://www.boduch.ca/2010/04/python-abstract-class.html
	def __init__(self ,id):
		self.id = id
		self.diagrams = { }   	#may be part of a few diagrams, so using map
		self.description = None
     	
	def getID(self):
		return self.id


	def getDescription(self):
		return self.description  

	def setDescription(self,description):
		self.description = description

	def getDiagrams(self):
		return self.diagrams

	def addDiagram(self,diagram):
    #receives diagram object
		self.diagrams[diagram.id] = diagram

	def removeDiagram(self,diagram):
	#removes diagram from the element's list of diagrams
		del self.diagrams[diagram.id]



#Just the base code for catching the error
"""try:
   OPMElement.getID() 
except NotImplementedError:
   print "GetID function Not implemented in an inherited class"
"""
############################################################################
class OPMEntity(OPMElement):
	def __init__(self,id,name=None):
		OPMElement.__init__(self,id)
		self.name=name
		
	def getName(self):
		return self.name
	def setName(self,name):
		self.name = name

	#OPM IN and OUT links remain undefined


	def getInLinks(self):
		return self.inLinks

	def getOutLinks(self):
		return self.outLinks

	def addLink(self,link):
		if (link.source.id == this.id) :
			self.outLinks[link.id] = link
		else :
			self.inLinks[link.id] = link
	

	def removeLink(self,link):
#		remove link from source and destination
		try :
			if(link.source.id == self.id):
				del self.outLinks[link.id].destination.inLinks[link.id]
				del this.outLinks[link.id]
		
			elif(link.destination.id == self.id):
				del self.inLinks[link.id].source.outLinks[link.id]
				del self.inLinks[link.id]
		
    
    		except : 
    	
    	 		txt="There was an error deleting the link.\n\n";
    	  		txt+="Error description: "
    	  	 	print ( txt , sys.exc_info()[0])
    

#########################LINKS#############################################
############################################################################
class OPMLink(OPMElement):
	#defines the OPM Link basic properties
	def __init__(self, id, src, dest, category, type):
		OPMElement.__init__(self,id)
		self.source=src
		self.destination=dest
		self.category=category 	# "Structural" and "Procedural"
		self.type=type  		# "instrument", "Agent" etc
	def getDestination(self):
		return self.destination
	def setDestination(self, dest):
		self.destination=dest
	def getSource(self):
		return self.source
	def setSource(self, source):
		self.source=source	
	def getType(self):
		return self.type
	def setType(self, newType):
		self.type=newType
	def getCategory(self):
		return self.category
	def setCategory(self, newCategory):
		self.category=newCategory
		
		
############################################################################
class OPMProceduralLink(OPMLink):
	def __init__(self, id, src, dest, category, type):
		OPMLink.__init__(self, id, src, dest, category, type)
		self.category="Procedural"
		self.xorRelation={ }
		self.orRelation={ }
		
	"""def verifyLink(self):
		#this function verifies if there is a linke between two entities
		if ((self.source.outLinks[self.destination.id]== None) or (self.destination.inLinks[self.source.id] == None)) :
			return True   #Checks if two elements are linked
		if (self.source.outLinks[self.source.id].category == self.destination.inLinks[self.source.id].category):
			return False   #Can't connect two objects with more than one link 
		
		#No Case switch by source type, so we'll use nested IF statements
		
		if	(isinstance(self.source,OPMObject)):  #CASE 1
			if (isinstance(self.destination,OPMProcess):
				if (self.type == "Invocation" or self.type == "Exception"): 
					return False
                else:
					return True
			if (isinstance(self.destination,OPMObject) or (self.destination,OPMState): 
				return False
				
		if	(isinstance(self.source,OPMProcess)):  #CASE 2
			if (isinstance(self.destination,OPMObject)) or (isinstance(self.destination,OPMState)):
                if (self.type == "Result" or self.type == "Effect"):
					return True
                else:
					return False
        
			if (isinstance(this.destination,OPMProcess)):
                if (self.type === "Invocation" or self.type == "Exception"): 
					return True
			else: 
				return False
        
		if	(isinstance(self.source,OPMState)):  #CASE 3
			if (isinstance(this.destination,OPMProcess)):
                if (self.type == "Invocation" or self.type == "Exception"):
					return False
                else:
					return True 
			if (isinstance(self.destination,OPMObject)) or (isinstance(self.destination,OPMState): 
				return False		
	"""
	#These functions get, add and remove Xor and Or relations
	def addXorRelation(self, link):
		self.xorRelation[link.id]=link
	def removeXorRelation(self,link):
		del xorRelation[link.id]
	def getXorRelation(self):
		return self.xorRelation
	def addOrRelation(self, link):
		self.orRelation[link.id]=link
	def removeOrRelation(self,link):
		del orRelation[link.id]
	def getOrRelation(self):
		return self.orRelation	
	
#On the original model. Meanwhile commented here		
			
#	def setDest(self,entity):
#		self.entity=entity
#	def getDest(self):
#		return self.destination
#	def setOriginType(self,originType):
#		self.originType=originType
#	def getOriginTYpe(self):
#		return self.originType
#	def getDescription(self):
#		return self.description
#	def setDescription(self, description):
#		self.description=description
#	def setSource(self, source):
#		self.source=source
#	def getSource(self):
#		return self.source

############################################################################
class OPMStructuralLink(OPMLink):
	def __init__(self, id, src, dest, category, type):
		OPMLink.__init__(self, id, src, dest, category, type)
		self.category="Structural"
		self.participationConst=None
		self.participationVal=None
		self.cardinality = 1
		self.tag=None
	"""	def verifyLink(self):
		#this function verifies if a link can be added between two entities
		if ((self.source.outLinks[self.destination.id]== None) or (self.destination.inLinks[self.source.id] == None)) :
			return True   #Checks if two elements are linked
		if (self.source.outLinks[self.source.id].category == self.destination.inLinks[self.source.id].category):
			return False   #Can't connect two objects with more than one link 
		
		if (self.type == "Unidirectional" or this.type == "Bidirectional"):
			return True 
		else: 
            return False
		
		
		#No Case switch by source type, so we'll use nested IF statements
		
		if	(isinstance(self.source,OPMObject)):  #CASE 1
			if (isinstance(self.destination,OPMProcess):
				if (self.type == "Exhibition"): 
					return True
                else:
					return False
			if (isinstance(self.destination,OPMObject)): 
				return True
				
		if	(isinstance(self.source,OPMProcess)):  #CASE 2
			if (isinstance(self.destination,OPMObject)):
                if (self.type == "Exhibition"):
					return True
                else:
					return False
			if (isinstance(this.destination,OPMProcess)):
					return True
			        
		if	(isinstance(self.source,OPMState)):  #CASE 3
			return False
	"""	
	#Working functions to get and set participation values, constants, cardinailty and tags
	def getCardinality(self):
		return self.cardinality
	def setCardinality(self, card):
		self.cardinality=card	
	def getTag(self):
		return self.tag
	def setTag(self, tag):
		self.tag=tag
	def getParticipationConst(self):
		return self.participationConst
	def setParticipationConst(self, partConst):
		self.participationConst=partConst
	def getParticipationVal(self):
		return self.participationVal
	def setParticipationVal(self,val):
		self.participationVal=val
	
	############################################################################
class OPMThing(OPMEntity):
	def __init__(self,id,name=None,essence = "Informatical",affiliation = "Systemic",scope = "Public",url=None):
		OPMEntity.__init__(self,id,name=None)
		self.essence = essence 
		self.affiliation = affiliation	
	 	self.scope = scope
	 	self.unfoldDiag = { }	#diagram instance which is created by unfolding of this object
	 	self.inzoomDiag = { }	#diagram instance which is created by inzooming of this object
	 	self.things = { }
	 	self.url = url

#  Working function
	def getEssence(self):
		return self.essence

	def setEssence(self,ess):
		self.essence = ess

	def getAffiliation(self):
		return self.affiliation

	def setAffiliation(self,aff):
		self.affiliation = aff

	def getScope(self):
		return self.scope
    
	def setScope(self,scope):
		self.scope = scope

	def addThing(self,thing):
		self.things[thing.id] = thing	

	def removeThing(self,thing):
 		del self.things[thing.id]
     	# IMPORTANT this will not delete the thing it only removes it from the dict
      	

	def getThing(self):
		return self.things

	def getURL(self):
		return self.url

	def setURL(self,newURL):
		self.url = newURL

	def getUnfoldDiag(self):
		return self.unfoldDiag

	def getInzoomDiag(self):
		return self.inzoomDiag

#   Non-working functions
#	def unfolding(self,newDiagId, fatherDiag):

#	def inzooming(self,newDiagId, fatherDiag):


############################################################################

class OPMState(OPMEntity):
	def __init__(self,parent,id,name=None):
		OPMEntity.__init__(self,id,name)
		self.classType="OPMState"
		self.type=None
		self.parent=parent
		self.minActivationTime=None
		self.maxActivationTime=None
		self.inLinks={ }
		self.outLink={ }
	def getType(self):
		return self.type
	def setType(self, type):
		self.type=type
	def setMinActivationTime(self, minActTime):
		self.minActivationTime=minActTime
	def getMinActivationTime(self):
		return self.minActivationTime
	def setMaxActivationTime(self, maxActTime):
		self.maxActivationTime=maxActTime
	def getMaxActivationTime(self):
		return self.maxActivationTime

#Following functions are not included in the client side. Commented for now.		
#	def setDescription(self, description):
#		self.description=description
#	def getDescription(self):
#		return self.description
		
############################################################################
class OPMProcess(OPMThing):
	def __init__(self,id,name=None,essence = "Informatical",affiliation = "Systemic",scope = "Public",url=None):
		OPMThing.__init__(self,id,name=None,essence = "Informatical",affiliation = "Systemic",scope = "Public",url=None)
		self.classType="OPMProcess"
		self.minActivationTime=None
		self.maxActivationTime=None
		self.inLinks={ }
		self.outLink={ }
	def setMinActivationTime(self, minActTime):
		self.minActivationTime=minActTime
	def getMinActivationTime(self):
		return self.minActivationTime
	def setMaxActivationTime(self, maxActTime):
		self.maxActivationTime=maxActTime
	def getMaxActivationTime(self):
		return self.maxActivationTime
#FOllowing funcs are meanwhile commented. Not in the clients side	
#	def getName(self):
#		return self.name
#	def setName(self, name):
#		self.name=name
#	def setDescription(self, description):
#		self.description=description
#	def getDescription(self):
#		return self.description
#	def getInProceduralLinksRelationMatrix(self):
#		return self.ProceduralLinksRelationMatrix=ProceduralLinksRelationMatrix   #we'll have to shorten this up...
#	def setInProceduralLinksRelationMatrix(self, ProceduralLinksRelationMatrix):
#		self.ProceduralLinksRelationMatrix=ProceduralLinksRelationMatrix   #we'll have to shorten this up...
############################################################################
	
class OPMObject(OPMThing):
	def __init__(self,id,name=None,essence = "Informatical",affiliation = "Systemic",scope = "Public",url=None):
		OPMThing.__init__(self,id,name=None,essence = "Informatical",affiliation = "Systemic",scope = "Public",url=None)
		self.classType="OPMObject"
		self.type="Compound Object"
		self.states={ }
		self.inLinks={ }
		self.outLink={ }
		self.initValue=None
	def getInitValue(self):
		return self.initValue
	def setInitValue(self, newInitValue):
		self.initValue=newInitValue
	def getType(self):
		return self.type
	def setType(self,newType):
		self.type=newType
	def addState(self,state):
		self.states[state.id]=state
	def removeState(self, state):  #Not sure about this deletion
		del states[state.id]
	def getStates(self):
		return self.states
	def getState(self, id):
		return self.states[id]
#Following funcs are meanwhile commented. Not in the clients side
#	def getName(self):
#		return self.name
#	def getDescription(self):
#		return self.description
#	def setDescription(self, description):
#		self.description=description
#	def addState(self, state):
	

############################################################################
#ALL FOR NOW	