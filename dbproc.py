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
				SD = modelClass.SD,
				diagrams = modelClass.diagrams,
				lastUpdate = modelClass.lastUpdate
	)
    nModel.put() 
	
def newDiagram(diagClass):
	if diagClass.predecessor = None:
		q = db.Query(dbopm.SRVOPMmodel, keys_only = True)
		q.filter("id = ",diagClass.modelID)
	else:
		q = db.Query(dbopm.SRVOPMdiagram, keys_only = True)
		q.filter("id = ",diagClass.predecessor)
	for p in q.fetch(1):
		parentKey = p
	nDiag = dbopm.SRVOPMdiagram(
				parent = parentKey,
				id = diagClass.id,
				modelID = diagClass.modelID,
				predecessor = diagClass.predecessor,
				successors = diagClass.successors,
				elements = diagClass.elements,
				name = diagClass.name,
				number = diagClass.number,
				OPL = diagClass.OPL,
				level = diagClass.level
	)
    nDiag.put()

def newPLink(plinkClass):
	q = db.Query(dbopm.SRVOPMdiagram, keys_only = True)
	q.filter("id = ",plinkClass.diagrams[0])
	for p in q.fetch(1):
		diagKey = p
	nPLink = dbopm.SRVOPMProceduralLInk(
				parent = diagKey,
				id = plinkClass.id,
				diagrams = plinkClass.diagrams,
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
	q = db.Query(dbopm.SRVOPMdiagram, keys_only = True)
	q.filter("id = ",processClass.diagrams[0])
	for p in q.fetch(1):
		diagKey = p
	nProcess = dbopm.SRVOPMPRocess(
				parent = diagKey,
				id = processClass.id,
				diagrams = processClass.diagrams,
				description = processClass.description,
				name = processClass.name,
				essence = processClass.essence,
				affiliation = processClass.affiliation,
				scope = processClass.scope,
				unfoldDiag = processClass.unfoldDiag,
				inzoomDiag = processClass.inzoomDiag,
				things = processClass.things,
				url = processClass.url,
				classType = processClass.classType,
				minActivationTime = processClass.minActivationTime,
				maxActivationTime = processClass.maxActivationTime,
				inLinks = processClass.inLinks,
				outLinks = processClass.outLinks
	)
    nProcess.put() 

def newObject(objClass):
	q = db.Query(dbopm.SRVOPMdiagram, keys_only = True)
	q.filter("id = ",objClass.diagrams[0])
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
				unfoldDiag = objClass.unfoldDiag,
				inzoomDiag = objClass.inzoomDiag,
				things = objClass.things,
				url = objClass.url,
				classType = objClass.classType,
				type = objClass.type,
				states = objClass.states,
				inLinks = objClass.inLinks,
				outLInks = objClass.outLinks
	)
    nObj.put() 