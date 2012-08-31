from google.appengine.ext import db
import dbopm
import jsonpickle

def getModelObj(modelID,creatorID):

  q = db.GqlQuery("SELECT * FROM SRVOPMmodel WHERE modelID = :1 AND creator = :2",
                  modelID,creatorID,keys_only = True)  
  objects = q.run()
  objList = []
  for obj in objects:
    ancObj = db.Query()
    ancObj.ancestor(obj)
    finalObj = ancObj.run()
    for fo in finalObj:
     objList.append(fo)
  return(objList)

def getUserModels(creatorID):
    q = db.GqlQuery("SELECT * FROM SRVOPMmodel WHERE creator = :1",creatorID)
    result = q.run()
    userModels = []
    for p in result:
      uModel = [p.modelID,p.name]
      userModels.append(uModel)
    return(userModels)

def newUser(userClass):
    nUser = dbopm.SRVuser(
                    key_name = str(userClass.id),
					userID = userClass.id,
					provider = userClass.provider,
					token = userClass.token,
					email = userClass.email,
					fisrtName = userClass.firstName,
					lastName = userClass.lastName,
					password = userClass.password,
					models = userClass.models,
					lastLogin = userClass.lastLogin,
					loginStatus = userClass.loginStatus
	)
    nUser.put() 

def newModel(modelClass):
    q = db.Query(dbopm.SRVuser, keys_only = True)
    q.filter("userID = ",modelClass.creator)
    creatorKey = q.get()
    nModel = dbopm.SRVOPMmodel(
                key_name = modelClass.id,
				parent = creatorKey,
				modelID = modelClass.id,
				creator = modelClass.creator,
				creationDate = modelClass.creationDate,
				name = modelClass.name,
				type = modelClass.type,
				participants = modelClass.participants,
				lastUpdate = modelClass.lastUpdate
	)
    nModel.put() 
	
def newDiagram(diagClass):
    tempVar = diagClass.id.split(":")
    del tempVar[-1]
    parID = ":".join(tempVar)
    parentKey = ""
    q = db.Query(dbopm.SRVOPMmodel, keys_only = True)
    q.filter("modelID = ",parID)
    for p in q.fetch(1):
		parentKey = p
    if parentKey == "":
		q = db.Query(dbopm.SRVOPMObject, keys_only = True)
		q.filter("id = ",parID)
		for p in q.fetch(1):
			parentKey = p
    if parentKey == "":
		q = db.Query(dbopm.SRVOPMPRocess, keys_only = True)
		q.filter("id = ",parID)
		for p in q.fetch(1):
			parentKey = p
    nDiag = dbopm.SRVOPMdiagram(
                key_name = diagClass.id,
				parent = parentKey,
				id = diagClass.id,
				name = diagClass.name,
				number = diagClass.number,
				OPL = diagClass.OPL
                )
    nDiag.put()

def newPlink(plinkClass):
    tempVar = plinkClass.id.split(":")
    del tempVar[-1]
    parID = ":".join(tempVar)
    q = db.Query(dbopm.SRVOPMdiagram, keys_only = True)
    q.filter("id = ",parID)
    diagKey = q.get()
    nPlink = dbopm.SRVOPMProceduralLink(
                key_name = plinkClass.id,
				parent = diagKey,
				id = plinkClass.id,
				description = plinkClass.description,
				source = plinkClass.source,
				destination = plinkClass.destination,
				category = plinkClass.category,
				type = plinkClass.type,
				xorRelation = plinkClass.xorRelation,
				orRelation = plinkClass.orRelation
	)
    nPlink.put()

def newSlink(slinkClass):
    tempVar = slinkClass.id.split(":")
    del tempVar[-1]
    parID = ":".join(tempVar)
    q = db.Query(dbopm.SRVOPMdiagram, keys_only = True)
    q.filter("id = ",parID)
    diagKey = q.get()
    nSlink = dbopm.SRVOPMStructuralLink(
                key_name = slinkClass.id,
                parent = diagKey,
                id = slinkClass.id,
                description = slinkClass.description,
                source = slinkClass.source,
                destination = slinkClass.destination,
                category = slinkClass.category,
                type = slinkClass.type,
                participationConst = slinkClass.participationConst,
                participationVal = slinkClass.participationVal,
                cardinality = slinkClass.cardinality,
                tag = slinkClass.tag
    )
    nSlink.put()

def newProcess(processClass):
    tempVar = processClass.id.split(":")
    del tempVar[-1]
    parID = ":".join(tempVar)
    q = db.Query(dbopm.SRVOPMdiagram, keys_only = True)
    q.filter("id = ",parID)
    diagKey = q.get()
    nProcess = dbopm.SRVOPMPRocess(
                key_name = processClass.id,
				parent = diagKey,
				id = processClass.id,
				description = processClass.description,
				name = processClass.name,
				essence = processClass.essence,
				affiliation = processClass.affiliation,
				scope = processClass.scope,
				url = processClass.url,
				classType = processClass.classType,
				minActivationTime = processClass.minActivationTime,
				maxActivationTime = processClass.maxActivationTime,
				inLinks = processClass.inLinks,
				outLinks = processClass.outLinks
	)
    nProcess.put() 

def newObject(objClass):
    tempVar = objClass.id.split(":")
    del tempVar[-1]
    parID = ":".join(tempVar)
    q = db.Query(dbopm.SRVOPMdiagram, keys_only = True)
    q.filter("id = ",parID)
    diagKey = q.get()
    nObj = dbopm.SRVOPMObject(
                key_name = objClass.id,
				parent = diagKey,
				id = objClass.id,
				description = objClass.description,
				name = objClass.name,
				essence = objClass.essence,
				affiliation = objClass.affiliation,
				scope = objClass.scope,
				url = objClass.url,
				classType = objClass.classType,
				type = objClass.type,
				inLinks = objClass.inLinks,
				outLinks = objClass.outLinks,
				initValue = objClass.initValue,
                states = objClass.states
	)
    nObj.put()

def newState(stateClass):
    tempVar = stateClass.id.split(":")
    del tempVar[-1]
    parID = ":".join(tempVar)
    q = db.Query(dbopm.SRVOPMObject, keys_only = True)
    q.filter("id = ",parID)
    diagKey = q.get()
    nState = dbopm.SRVOPMState(
                key_name = stateClass.id,
                parent = diagKey,
                id = stateClass.id,
                description = stateClass.description,
                name = stateClass.name,
                classType = stateClass.classType,
                type = stateClass.type,
                minActivationTime = stateClass.minActivationTime,
                maxActivationTime = stateClass.maxActivationTime,
                inLinks = stateClass.inLinks,
                outLinks = stateClass.outLinks
    )
    nState.put()
    
def newUIObject(uiObj):
    q = db.Query(dbopm.SRVOPMObject, keys_only = True)
    q.filter("id = ",uiObj.id)
    objKey = q.get()
    nObj = dbopm.UIObject(
                          key_name = str(uiObj["id"]),
                          parent = objKey,
                          objID = uiObj["id"],
                          x = uiObj["x"],
                          y = uiObj["y"],
                          width = uiObj["width"],
                          height = uiObj["height"],
                          fill = uiObj["fill"],
                          stroke = uiObj["stroke"],
                          strokeWidth = uiObj["strokeWidth"],
                          name = jsonpickle.encode(uiObj["name"]),
                          states = uiObj["states"],
                          sataesAmount = uiObj["statesAmount"],
                          icon = uiObj["icon"],
                          objType = uiObj["type"]
                          )
    nObj.put()

def newUIDiag(uiDiag):
    q = db.Query(dbopm.SRVOPMdiagram, keys_only = True)
    q.filter("id = ",uiDiag["id"])
    diagKey = q.get()
    nDiag = dbopm.UIDiagram(
                        key_name = str(uiDiag["id"]),
                        parent = diagKey,
                        diagramID = uiDiag["id"],
                        active = uiDiag["active"],
                        transform = uiDiag["transform"],
                        elements = jsonpickle.encode(uiDiag["elements"]),
                        diagramType = uiDiag["type"]
                    )
    nDiag.put()

def newUIProc(uiProc):
    q = db.Query(dbopm.SRVOPMPRocess, keys_only = True)
    q.filter("id = ",uiProc["id"])
    procKey = q.get()
    nProc = dbopm.UIProcess(
                        key_name = str(uiProc["id"]),
                        parent = procKey,
                        procID = uiProc["id"],
                        x = uiProc["x"],
                        y = uiProc["y"],
                        rx = uiProc["rx"],
                        ry = uiProc["ry"],
                        fill = uiProc["fill"],
                        stroke = uiProc["stroke"],
                        strokeWidth = uiProc["strokeWidth"],
                        name = jsonpickle.encode(uiProc["name"]),
                        icon = uiProc["icon"],
                        procType = uiProc["type"]
                        )
    nProc.put()

def newUILink(uiLink):
    q1 = db.Query(dbopm.SRVOPMStructuralLink, keys_only = True)
    q1.filter("id = ",uiLink["id"])
    slKey = q1.get()
    q2 = db.Query(dbopm.SRVOPMProceduralLink, keys_only = True)
    q2.filter("id = ",uiLink["id"])
    prKey = q2.get()
    if slKey != "":
        lKey = slKey
    if prKey != "":
        lKey = prKey
    nLink = dbopm.UILink(
                        key_name = str(uiLink["id"]),
                        parent = lKey,
                        linkID = uiLink["id"],
                        fill = uiLink["fill"],
                        stroke = uiLink["stroke"],
                        strokeWidth = uiLink["strokeWidth"],
                        name = jsonpickle.encode(uiLink["name"]),
                        linkType = uiLink["type"],
                        d = uiLink.d
                        )
    nLink.put()

def newUIState(uiState):
    q = db.Query(dbopm.SRVOPMState, keys_only = True)
    q.filter("id = ",uiState["id"])
    stateKey = q.get()
    nState = dbopm.UIState(
                        key_name = str(uiState["id"]),
                        parent = stateKey,
                        stateID = uiState["id"],
                        x = uiState["x"],
                        y = uiState["y"],
                        rx = uiState["rx"],
                        ry = uiState["ry"],
                        width = uiState["width"],
                        height = uiState["height"],
                        fill = uiState["fill"],
                        stroke = uiState["stroke"],
                        strokeWidth = uiState["strokeWidth"],
                        name = jsonpickle.encode(uiState["name"]),
                        stateParent = uiState["parent"],
                        icon = uiState["icon"],
                        stateType = uiState["type"]
                    )
    nState.put()