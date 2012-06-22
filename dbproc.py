import dbopm

def newUser(userClass):
    nUser = dbopm.SRVuser(
                    key_name = userClass.id,
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
    tempVar = diagClass.id.split(":")
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
    tempVar = diagClass.id.split(":")
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
    tempVar = diagClass.id.split(":")
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
    tempVar = diagClass.id.split(":")
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
				outLInks = objClass.outLinks,
				initValue = objClass.initValue
	)
    nObj.put()

def newState(stateClass):
    tempVar = diagClass.id.split(":")
    del tempVar[-1]
    parID = ":".join(tempVar)
    q = db.Query(dbopm.SRVOPMObject, keys_only = True)
    q.filter("id = ",parID)
    diagKey = q.get()
    nState = dbopm.SRVOPMObject(
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