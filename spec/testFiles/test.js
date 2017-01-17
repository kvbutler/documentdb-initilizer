
var helloWorldStoredProc = {
    id: "helloWorld",
    body: function () {
        var context = getContext();
        var response = context.getResponse();

        response.setBody("Hello, World");
    }
}

return helloWorldStoredProc;
