var objs = [{
        id: "validateName",
        triggerType: "Pre",
        triggerOperation: "All",
        serverScript: function () {
              var collection = getContext().getCollection();
              var request = getContext().getRequest();
              var docToCreate = request.getBody();
            
              // Reject documents that do not have a name property by throwing an exception.
              if (!docToCreate.name) {
                throw new Error('Document must include a "name" property.');
              }
        }
    },
    {
        id: "validateName2",
        triggerType: "Pre",
        triggerOperation: "All",
        serverScript: function () {
              var collection = getContext().getCollection();
              var request = getContext().getRequest();
              var docToCreate = request.getBody();
            
              // Reject documents that do not have a name property by throwing an exception.
              if (!docToCreate.name) {
                throw new Error('Document must include a "name" property.');
              }
        }
    }
]