var objs = {
    id: "helloWorld3",
    serverScript: function () {
        var context = getContext();
        var response = context.getResponse();

        response.setBody("Hello, World3");
    }
}