
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
**url**: The url to connect to your documentdb
**key**: The key to use to connect to your documentdb
**database**: the database name/id
**collection**: the collection name/id
**storedProcPath**: The related path of current working directory to the folder that you keep your stored procedure files. The format of the files please refer to the **File Format** section.
**triggerPath**: The related path of current working directory to the folder that you keep your trigger files. The format of the files please refer to the **File Format** section.
**documentPath**: The related path of current working directory to the folder that you keep your document files. The format of the files please refer to the **File Format** section.
**userDefinedFunctionPath**: The related path of current working directory to the folder that you keep your stored procedure files. The format of the files please refer to the **File Format** section.

### Ongoing....