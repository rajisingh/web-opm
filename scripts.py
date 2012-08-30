import opmLogicClass
from google.appengine.api import channel
import datetime
import threading
import dbproc
import dbopm
import index
import json
import jsonpickle


class actions(threading.Thread):
    def __init__(self,action,data,save=True):
        self.action=action
        self.save=save
        self.data=data
        threading.Thread.__init__ ( self )
    def run(self):
        if self.action=="getUserModels":
            models=dbproc.getUserModels(self.data) # MUST to have userId  = data field
            msg = index.Message(1111,"getUserModels",self.data,models)
            index.channel.send_message(self.data,jsonpickle.encode(msg))
            
            
            
        elif self.action=="loadModel":
            models = dbproc.getModelObj(self.data["modelId"])
            modelList=[]
            for inst in models :
                temp = convertToData(inst)
                actionName = temp[0]
                dataForm = temp[1]
                modelList.append([actionName,dataForm])
                actions(actionName,dataForm,False).start()
            msg = index.Message(2222,"loadModel",self.data["userId"],modelList)
            index.channel.send_message(self.data["userId"],jsonpickle.encode(msg))
                
                
            
            
        elif self.action=="createUserInstance":
            result = createUserInstance(self.data)
            if self.save :
                result.db()
                
            
        elif self.action == "createModelInstance" :
            result =createModelInstance(self.data)
            index.activeClients.get(result.creator).addModel(result.id)
            for user in result.participants :
                activeClients.get(user).addModel(result.id)
                if self.save :
                    activeClients.get(user).db()
            if self.save :
                result.db()
                
        elif self.action == "createDiagramInstance" :
            result =createDiagramInstance(self.data)
            if self.save :
                result.db()
            
        elif self.action == "createObjectInstance" :
            result =createObjectInstance(self.data)
            if self.save :
                result.db()
            
        elif self.action == "createProcessInstance" :
            result =createProcessInstance(self.data)
            if self.save :
                result.db()
            
        elif self.action == "createStateInstance" :
            result = createStateInstance(self.data)
            temp = result.id.split(":")
            del temp[-1]
            parent = ":".join(temp)
            opmLogicClass.partyOrder.getInst(parent).addState(result.id)
            if self.save :
                result.db()
                opmLogicClass.partyOrder.getInst(parent).db()
                
        elif self.action == "createProceduralLinkInstance" :
            result = createProceduralLinkInstance(self.data)
            opmLogicClass.partyOrder.getInst(result.destination).addLink(result)
            opmLogicClass.partyOrder.getInst(result.source).addLink(result)
            if self.save :
                result.db()
                opmLogicClass.partyOrder.getInst(result.destination).db()
                opmLogicClass.partyOrder.getInst(result.source).db()
                
        elif self.action == "createStructuralLinkInstance" :
            result =createStructuralLinkInstance(self.data)
            opmLogicClass.partyOrder.getInst(result.destination).addLink(result)
            opmLogicClass.partyOrder.getInst(result.source).addLink(result)
            if self.save :
                result.db()
                opmLogicClass.partyOrder.getInst(result.destination).db()
                opmLogicClass.partyOrder.getInst(result.source).db()
            
    
def convertToData(inst):
    actionName = ""
    data = {}
    if isinstance(inst,dbopm.SRVOPMmodel):
        actionName = "createModelInstance" 
        data["id"] = inst.modelID 
        data["creator"] = inst.creator 
        data["name"] = inst.name
        data["type"] = inst.type
        data["participants"] = inst.participants
        
        creationDate = datetime.datetime.strftime(inst.creationDate,'%Y-%m-%dT%H:%M:%S')
        lastUpdate = datetime.datetime.strftime(inst.lastUpdate,'%Y-%m-%dT%H:%M:%S')
        data["creationDate"] = creationDate
        data["lastUpdate"] = lastUpdate
        answer=[actionName,data]
        return answer
    elif isinstance(inst,dbopm.SRVOPMdiagram):
        actionName = "createDiagramInstance"
        data["id"] = inst.id
        data["name"] = inst.name 
        data["number"] = inst.number 
        data["OPL"] = inst.OPL  
        answer=[actionName,data]
        return answer
    elif isinstance(inst,dbopm.SRVOPMObject):
        actionName = "createObjectInstance"
        data["id"] = inst.id
        data["name"] = inst.name 
        data["essence"] = inst.essence
        data["affiliation"] = inst.affiliation
        data["scope"] = inst.scope 
        data["url"] = inst.url
        data["description"] = inst.description
        data["classType"] = inst.classType
        data["type"] =inst.type 
        data["inLinks"] = inst.inLinks 
        data["outLinks"] = inst.outLinks
        data["initValue"] = inst.initValue
        answer=[actionName,data]
        return answer
    elif isinstance(inst,dbopm.SRVOPMPRocess):
        actionName = "createProcessInstance"
        data["id"] = inst.id
        data["name"] = inst.name 
        data["essence"] = inst.essence
        data["affiliation"] = inst.affiliation
        data["scope"] = inst.scope 
        data["url"] = inst.url
        data["description"] = inst.description
        data["classType"] = inst.classType
        data["inLinks"] = inst.inLinks 
        data["outLinks"] = inst.outLinks
        data["maxActivationTime"] = inst.maxActivationTime
        data["minActivationTime"] = inst.minActivationTime
        answer=[actionName,data]
        return answer
        
    elif isinstance(inst,dbopm.SRVOPMState):
        actionName = "createStateInstance"
        data["id"] = inst.id
        data["name"] = inst.name 
        data["description"] = inst.description
        data["classType"] = inst.classType
        data["type"] =inst.type 
        data["inLinks"] = inst.inLinks 
        data["outLinks"] = inst.outLinks
        data["maxActivationTime"] = inst.maxActivationTime
        data["minActivationTime"] = inst.minActivationTime
        answer=[actionName,data]
        return answer
        
        
    elif isinstance(inst,dbopm.SRVOPMStructuralLink):
        actionName = "createStructuralLinkInstance"
        data["id"] = inst.id
        data["description"] = inst.description
        data["type"] =inst.type 
        data["participationConst"] = inst.participationConst
        data["participationVal"] = inst.participationVal
        data["cardinality"] = inst.cardinality
        data["tag"] = inst.tag
        data["category"] = inst.category
        source = {"id":inst.source}
        destination = {"id":inst.destination}
        data["source"] = source 
        data["destination"] = destination
        answer=[actionName,data]
        return answer
    elif isinstance(inst,dbopm.SRVOPMProceduralLink):
        actionName = "createProceduralLinkInstance"
        data["id"] = inst.id
        data["description"] = inst.description
        data["type"] =inst.type 
        source = {"id":inst.source}
        destination = {"id":inst.destination}
        data["source"] = source 
        data["destination"] = destination
        data["category"] = inst.category
        data["xorRelation"] = inst.xorRelation
        data["orRelation"] = inst.orRelation
        answer=[actionName,data]
        return answer

def createUserInstance(data):
    date_lastLogin= datetime.datetime.strptime(str(data["lastLogin"]), '%Y-%m-%dT%H:%M:%S')
    user = opmLogicClass.User(data["id"],data["email"],data["password"],date_lastLogin)
    user.setProvider(data["provider"])
    user.setName(data["firstName"],data["lastName"])
    user.setToken(data["token"])
    user.models = data["models"]
    user.loginStatus=data["loginStatus"]
    return user

def createModelInstance(data):
    date_creationDate =datetime.datetime.strptime(str(data["creationDate"]),'%Y-%m-%dT%H:%M:%S')
    date_lastUpdate=datetime.datetime.strptime(str(data["lastUpdate"]), '%Y-%m-%dT%H:%M:%S')
    
    model = opmLogicClass.OPMModel(data["id"], data["creator"], date_creationDate,
                                   date_lastUpdate,data["name"],data["type"])
    model.share(data["participants"])
    return model

def createDiagramInstance(data):
    diagram = opmLogicClass.OPMDiagram(data["id"],data["name"],data["number"]) 
    diagram.setOPL(data["OPL"])
    return diagram

def createObjectInstance(data):
    
    
    object = opmLogicClass.OPMObject(data["id"],data["name"],data["essence"],
                                     data["affiliation"],data["scope"],data["url"])
    object.classType=data["classType"]
    object.type=data["type"]
    object.initValue=data["initValue"]
    object.inLinks=data["inLinks"]
    object.outLinks=data["outLinks"]
   ## object.states=data["states"]
    object.setDescription(data["description"])
    return object

def createProcessInstance(data):
    
    process=opmLogicClass.OPMProcess(data["id"],data["name"],data["essence"],
                                     data["affiliation"],data["scope"],data["url"])
    process.classType=data["classType"]
    process.minActivationTime=data["minActivationTime"]
    process.maxActivationTime=data["maxActivationTime"]
    process.inLinks=data["inLinks"]
    process.outLinks=data["outLinks"]
    process.setDescription(data["description"])
    
    return process

def createProceduralLinkInstance(data):
    
        
    link = opmLogicClass.OPMProceduralLink(data["id"], data["source"]["id"], data["destination"]["id"], data["category"], data["type"])
    link.xorRelation=data["xorRelation"]
    link.orRelation=data["orRelation"]
    link.setDescription(data["description"])
    return link
    
def createStructuralLinkInstance(data):
    link = opmLogicClass.OPMStructuralLink(data["id"], data["source"]["id"], data["destination"]["id"], data["category"], data["type"])
    link.participationConst=data["participationConst"]
    link.participationVal=data["participationVal"]
    link.cardinality = data["cardinality"]
    link.setTag(data["tag"])
    return link

def createStateInstance(data):
    state = opmLogicClass.OPMState(data["id"],data["name"])
    state.classType=data["classType"]
    state.minActivationTime=data["minActivationTime"]
    state.maxActivationTime=data["maxActivationTime"]        
    state.inLinks=data["inLinks"]
    state.outLink=data["outLinks"]
    state.setType(data["type"])
    return state    
        

         