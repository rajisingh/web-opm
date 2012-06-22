import dbopm

def newUser(userClass):
    nUser = dbopm.SRVuser(
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
    creatorKey = ""
    for p in q.fetch(1):
        creatorKey = p
    nModel = dbopm.SRVOPMmodel(
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
		q = db.Query(dbopm.SRVOPMProceduralLInk, keys_only = True)
		q.filter("id = ",parID)
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
				parent = parentKey,
				id = diagClass.id,
				name = diagClass.name,
				number = diagClass.number,
				OPL = diagClass.OPL,
				level = diagClass.level
                )
    nDiag.put()

def newPLink(plinkClass):
    tempVar = diagClass.id.split(":")
    del tempVar[-1]
    parID = ":".join(tempVar)
    q = db.Query(dbopm.SRVOPMdiagram, keys_only = True)
    q.filter("id = ",parID)
    diagKey = ""
    for p in q.fetch(1):
		diagKey = p
    nPLink = dbopm.SRVOPMProceduralLInk(
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
    nPLink.put() 

def newProcess(processClass):
    tempVar = diagClass.id.split(":")
    del tempVar[-1]
    parID = ":".join(tempVar)
    q = db.Query(dbopm.SRVOPMdiagram, keys_only = True)
    q.filter("id = ",parID)
    diagKey = ""
    for p in q.fetch(1):
		diagKey = p
    nProcess = dbopm.SRVOPMPRocess(
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
    tempVar = diagClass.id.split(":")
    del tempVar[-1]
    parID = ":".join(tempVar)
    q = db.Query(dbopm.SRVOPMdiagram, keys_only = True)
    q.filter("id = ",parID)
    diagKey = ""
    for p in q.fetch(1):
		diagKey = p
    nObj = dbopm.SRVOPMObject(
				parent = diagKey,
				id = objClass.id,
				diagrams = objClass.diagrams,
				description = objClass.description,
				name = objClass.name,
				essence = objClass.essence,
				affiliation = objClass.affiliation,
				scope = objClass.scope,
				url = objClass.url,
				classType = objClass.classType,
				type = objClass.type,
				inLinks = objClass.inLinks,
				outLInks = objClass.outLinks,
				initValue = objClass.initValue
	)
    nObj.put() 