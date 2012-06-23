#OPM CLASS LOGIC

import index
import dbproc

class PartyOrder():
	dictInst= {}
	dictChildrenLen = {}
	def add(self,inst):
		self.dictInst[inst.id]=inst
		temp = inst.id.split(":")
		if len(temp)>1:
			del temp[-1]
			parent = ":".join(temp)
			self.dictChildInst[parent]+=1
		inst.db()
	def update(self,inst):
		self.dictInst[inst.id]=inst
		inst.db()
	def getInst(self,id):
		return self.dictInst[id]
	def remove(self,id):
		if self.dictInst.__contains__(id):
			del dictInst[id]
		pass #Not FINISHED!!!!
	
partyOrder = PartyOrder()

	
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
		self.models= []
		self.lastLogin=lastLogin
		self.loginStatus=False
		index.activeClients.add(self)
		
	"""def objForJson(self):
		obj = self
  		obj.models = []
  		for i in self.models :
  			obj.models.append(self.models[i].id)
  		return obj"""

 
	
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
		index.activeClients.add(self)
	
	def getModels (self):
		#receives the  model id's list
		return self.models
	def getModel (self,modelId):
		#receives the  model id's list
		return partyOrder.getInst(modelId)
	
	def addModel (self, modelId):
		#adds a model to the list of models
		self.models.append(modelId)
		index.activeClients.add(self)
		
	
	def getLastLogin (self):
		#gets the last login date
		return self.lastLogin
	
	def setLastLogin (self, newLoginDate):
		#set new login date 
		self.lastLogin=newLoginDate
		index.activeClients.add(self)
	
	def setToken (self,newToken):
		#sets the given token the user receives when he signs in via provider
		self.token=newToken
		index.activeClients.add(self)
	
	def getToken (self):
		return self.token
		
	def setPassword (self, newPassword):
		#sets the new password if user wishes to update it
		self.password=newPassword
		index.activeClients.add(self)
	
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
		index.activeClients.add(self)
	
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
	def __init__(self, id, creator, creationDate, lastUpdate,name = 'New Model',type = 'System'):   
	#constructor
		self.id=id
		self.creator=creator
		self.creationDate=creationDate	
		self.name = name 			#default value
		self.type = type
		self.participants = []
		self.lastUpdate = lastUpdate
		partyOrder.add(self)
# working methods
	
	"""def objForJson(self):
		obj = self
		obj.creator = self.creator.id
  		obj.sd = self.sd.id
		obj.diagrams = []
	 	obj.participants = []
	 	for i in self.diagrams :
	 		obj.diagrams.append(self.diagrams[i].id)
	 	for i in self.participants :
	 		obj.participants.append(self.participants[i].id)
 		return obj"""

	def db(self):
		dbproc.newModel(self)
	def getId(self): 	
	#ID of model
		return self.id		
	def getCreator(self):
		return self.creator
	def getName(self):							#Retrieving name of model	
		return self.name		
	def setName(self,name):						
	#Setting a name for the model
		self.name=name
		partyOrder.update(self)
	def share(self, newParticipants):
	#adds participants, input :user instance or list of user paticipants
		if(bool(getattr(newParticipants, '__iter__', False))):
			for user in newParticipants:
				self.participants.append(user)		
		else :
			self.participants.append(newParticipants)
			
		partyOrder.update(self)
		
	def unshare(self,users):
		if(bool(getattr(users, '__iter__', False))):
			for i in users :
				self.participants.remove(i)
		else :
			self.participants.remove(users)
		dictionary[self.id]=self
	def getParticipants(self):
		return self.participants
		
	def getType (self):							#Type of model
		return self.type
	def setType (self, type):					#Setting a type
		self.type=type
		dictionary[self.id]=self
	def setLastUpdate(self,date):
		self.lastUpdate = date
		dictionary[self.id]=self
	def getCreationDate(self):
		return self.creationDate	
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
	def __init__(self,id, name, number = None):
		self.id=id
		self.name = name
		self.number = number
		self.OPL = None
		partyOrder.add(self)
	#  Working functions
	
	def db(self):
		dbproc.newDiagram(self)
	"""def objForJson(self):
		obj = self
		obj.predecessor = self.predecessor.id
		obj.elements = []  

	 	for i in self.elements :
	 		obj.elements.append(self.elements[i].id)
     
  	 	obj.successors = []
  	 	for i in self.successors :
  	 		obj.successors.append(self.successors[i].id)
  	 	return obj"""

	
	def getId(self):
		return self.id
	
	def getName(self):
		return self.name
	
	def setName(self,name):
		self.name = name
		partyOrder.update(self)
	
	def getNumber(self):
		return self.number
	
	def setNumber(self,number):
		self.number = number
		partyOrder.update(self)
		
	def getOPL(self): #for future implementation
		return self.OPL
	def setOpl(self,OPL):
		self.OPL=OPL
		partyOrder.update(self)
	
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
		self.description = None
     	
	def getId(self):
		return self.id


	def getDescription(self):
		return self.description  

	def setDescription(self,description):
		self.description = description
		partyOrder.update(self)

	


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
		partyOrder.update(self)

	#OPM IN and OUT links remain undefined


	def getInLinks(self):
		return self.inLinks

	def getOutLinks(self):
		return self.outLinks

	def addLink(self,link):
		if (link.source == self.id) :
			self.outLinks.append(link.id)
		else :
			self.inLinks.append(link.id)
		partyOrder.update(self)

	"""def removeLink(self,link):
#		remove link from source and destination
		try :
			if(link.source == self.id):
				del self.outLinks[link.id].destination.inLinks[link.id]
				del this.outLinks[link.id]
		
			elif(link.destination.id == self.id):
				del self.inLinks[link.id].source.outLinks[link.id]
				del self.inLinks[link.id]
		
    
    		except : 
    	
    	 		txt="There was an error deleting the link.\n\n"
    	  		txt+="Error description: "
    	  	 	print ( txt , sys.exc_info()[0])"""
    

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
		return partyOrder.getInst(self.destination)
	def setDestination(self, dest):
		self.destination=dest
		partyOrder.update(self)
	def getSource(self):
		return partyOrder.getInst(self.source)
	def setSource(self, source):
		self.source=source	
		partyOrder.update(self)
	def getType(self):
		return self.type
	def setType(self, newType):
		self.type=newType
		partyOrder.update(self)
	def getCategory(self):
		return self.category
	def setCategory(self, newCategory):
		self.category=newCategory
		partyOrder.update(self)
		
############################################################################
class OPMProceduralLink(OPMLink):
	def __init__(self, id, src, dest, category, type):
		OPMLink.__init__(self, id, src, dest, category, type)
		self.category="Procedural"
		self.xorRelation=[]
		self.orRelation=[]
		partyOrder.add(self)
	def db(self):
		dbproc.newPlink(self)
	"""def objForJson(self):
		obj = self
		obj.source = self.source.id
    	obj.destination = self.destination.id
     	obj.diagrams = []
        
    	for i in self.diagrams :
        	obj.diagrams.append(self.diagrams[i].id)
        
		obj.xorRelation = []
		for i in self.xorRelation :
			obj.xorRelation.append(self.xorRelation[i].id) 
		
		obj.orRelation = []
		for i in self.orRelation :
			obj.orRelation.append(self.orRelation[i].id)
		return obj"""
	
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
		self.xorRelation.append(link.id)
		partyOrder.update(self)
	def removeXorRelation(self,link):
		selfxorRelation.remove(link.id)
		partyOrder.update(self)
	def getXorRelation(self):
		return self.xorRelation
	def addOrRelation(self, link):
		self.orRelation.append(link.id)
		partyOrder.update(self)
	def removeOrRelation(self,link):
		self.orRelation.remove(link.id)
		partyOrder.update(self)
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
		partyOrder.add(self)
	def db(self):
		dbproc.newSlink(self)	
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
		partyOrder.update(self)	
	def getTag(self):
		return self.tag
	def setTag(self, tag):
		self.tag=tag
		partyOrder.update(self)
	def getParticipationConst(self):
		return self.participationConst
	def setParticipationConst(self, partConst):
		self.participationConst=partConst
		partyOrder.update(self)
	def getParticipationVal(self):
		return self.participationVal
	def setParticipationVal(self,val):
		self.participationVal=val
		partyOrder.update(self)
	
	############################################################################
class OPMThing(OPMEntity):
	def __init__(self,id,name=None,essence = "Informatical",affiliation = "Systemic",scope = "Public",url=None):
		OPMEntity.__init__(self,id,name=None)
		self.essence = essence 
		self.affiliation = affiliation	
	 	self.scope = scope
	 	self.url = url

#  Working function
	def getEssence(self):
		return self.essence

	def setEssence(self,ess):
		self.essence = ess
		partyOrder.update(self)
	def getAffiliation(self):
		return self.affiliation

	def setAffiliation(self,aff):
		self.affiliation = aff
		partyOrder.update(self)
	def getScope(self):
		return self.scope
    
	def setScope(self,scope):
		self.scope = scope
		partyOrder.update(self)

	def getURL(self):
		return self.url

	def setURL(self,newURL):
		self.url = newURL
		partyOrder.update(self)

	
#   Non-working functions
#	def unfolding(self,newDiagId, fatherDiag):

#	def inzooming(self,newDiagId, fatherDiag):


############################################################################

class OPMState(OPMEntity):
	def __init__(self,id,name=None):
		OPMEntity.__init__(self,id,name)
		self.classType="OPMState"
		self.type=None
		self.minActivationTime=None
		self.maxActivationTime=None
		self.inLinks=[]
		self.outLink=[]
		partyOrder.add(self)
		
	def db(self):
		dbproc.newState(self)
	def getType(self):
		return self.type
	def setType(self, type):
		self.type=type
		partyOrder.update(self)
	def setMinActivationTime(self, minActTime):
		self.minActivationTime=minActTime
		partyOrder.update(self)
	def getMinActivationTime(self):
		return self.minActivationTime
	def setMaxActivationTime(self, maxActTime):
		self.maxActivationTime=maxActTime
		partyOrder.update(self)
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
		self.inLinks=[]
		self.outLink=[]
		partyOrder.add(self)
	def db(self):
		dbproc.newProcess(self)
		
	
	"""def objForJson(self):
		obj = self
    	obj.inLinks = []
    	for i in self.inLinks :
        	obj.inLinks.append(self.inLinks[i].id)
        
        obj.outLinks = []
    	for i in self.outLinks :
    		obj.outLinks.append(self.outLinks[i].id)
    		
		if self.unfoldDiag :
			obj.unfoldDiag = self.unfoldDiag.id
		else :
			obj.unfoldDiag = None
	 	if self.inzoomDiag :
	 		obj.inzoomDiag = self.inzoomDiag.id
     	else :
     		obj.inzoomDiag =None
     	
     	obj.things = []
     	for i in self.things :
	   		obj.things.append(self.things[i].id)
    
    	self.diagrams = []
     	for i in self.diagrams :
        	obj.diagrams.append(self.diagrams[i].id)
        return obj"""

	def setMinActivationTime(self, minActTime):
		self.minActivationTime=minActTime
		partyOrder.update(self)
	def getMinActivationTime(self):
		return self.minActivationTime
	def setMaxActivationTime(self, maxActTime):
		self.maxActivationTime=maxActTime
		partyOrder.update(self)
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
		self.inLinks=[]
		self.outLink=[]
		self.states=[]
		self.initValue=None
		partyOrder.add(self)
	
	def db(self):
		dbproc.newObject(self)
	
	"""def objForJson(self):
		obj = self
    	obj.states = []
     	for i in self.states :
        	obj.states.append(self.states[i].id)
        
        obj.inLinks = []
    	for i in self.inLinks :
        	obj.inLinks.append(self.inLinks[i].id)
        
        obj.outLinks = []
    	for i in self.outLinks :
    		obj.outLinks.append(self.outLinks[i].id)
    		
		if self.unfoldDiag :
			obj.unfoldDiag = self.unfoldDiag.id
		else :
			obj.unfoldDiag = None
	 	if self.inzoomDiag :
	 		obj.inzoomDiag = self.inzoomDiag.id
     	else :
     		obj.inzoomDiag =None
     	
     	obj.things = []
     	for i in self.things :
	   		obj.things.append(self.things[i].id)
    
    	self.diagrams = []
     	for i in self.diagrams :
        	obj.diagrams.append(self.diagrams[i].id)
        return obj"""


	
	def getInitValue(self):
		return self.initValue
	def setInitValue(self, newInitValue):
		self.initValue=newInitValue
		partyOrder.update(self)
	def getType(self):
		return self.type
	def setType(self,newType):
		self.type=newType
		partyOrder.update(self)
	def addState(self,stateId):
		self.states.append(stateId)
		partyOrder.update(self)
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