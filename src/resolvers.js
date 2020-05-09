
module.exports = {
    Query: {
        user(_, {input}, {model}){
            return{
                userId: "test1",
                email: "test@email.com",
                username: "test test",
                type: 1,
                link: "test@mail.com"
            }
        }
    }
}