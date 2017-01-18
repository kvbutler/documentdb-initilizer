# STILL IN DEVELOPMENT!!!


This is a npm package to initialise and update a collection in document db. You can create and update store procedure, trigger and seed data in a collection using npm commandline. 

### Installation
```sh
npm install documentdb-initializer -g
```

### Usage

```sh
docdb <config-file-path>
```
<config-file-path> should be the realted path to the path you run the command (current wokrking directory).

### Configuration

Example of config file:
```json
{
    "url": "<url>",
    "key": "<key>",
    "database": "<databaseId>",
    "collection": "<collectionId>",
    "storedProcPath": "<path-to-storeProcs>",
    "triggerPath": "<path-to-triggers>",
    "documentPath": "<path-to-documents>",
    "userDefinedFunctionPath": "<path-to-userDefinedFunction>"
}
```
* **url**: The url to connect to your documentdb
* **key**: The key to use to connect to your documentdb
* **database**: the database name/id
* **collection**: the collection name/id
* **storedProcPath**: The related path of current working directory to the folder that you keep your stored procedure files. The format of the files please refer to the **File Format** section.
* **triggerPath**: The related path of current working directory to the folder that you keep your trigger files. The format of the files please refer to the **File Format** section.
* **documentPath**: The related path of current working directory to the folder that you keep your document files. The format of the files please refer to the **File Format** section.
* **userDefinedFunctionPath**: The related path of current working directory to the folder that you keep your stored procedure files. The format of the files please refer to the **File Format** section.

###File Format

Stored proc, trigger, document and user defined function should be in one or multiple js files kept in your configured path. The js script should assign the script configuration object to a variable named **objs**.  

Please refer to  [Microsoft Azure DocumentDB Node.js SDK Documentation](http://azure.github.io/azure-documentdb-node/DocumentClient.html) for detail documentation of the configuration object.

Example of Stored Proc File:
```javascript
var objs = [{
    id: "helloWorld",
    serverScript: function () {
        var context = getContext();
        var response = context.getResponse();

        response.setBody("Hello, World");
    }
},
{
    id: "helloWorld2",
    serverScript: function () {
        var context = getContext();
        var response = context.getResponse();

        response.setBody("Hello, World2");
    }
}]
```

Example of Trigger file:
```javascript
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
}]
```

Example of Document file:
```javascript
var objs = [
    {
        id: "testDocument1",
        name: "testName1"
    },
    {
        id: "testDocument2",
        name: "testName2"
    },
    {
        id: "testDocument3",
        name: "testName3"
    }
]
```

Example of UserDefinedFunction file:
```javascript
var objs = [{
    name: "tax",
    serverScript: function tax(income) {
        if(income == undefined) 
            throw 'no input';

        if (income < 1000) 
            return income * 0.1;
        else if (income < 10000) 
            return income * 0.2;
        else
            return income * 0.4;
    }
}]
```


### Ongoing....

