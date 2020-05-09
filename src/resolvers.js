
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
        }, 
        deals(_, {input}, {model}){
            return{
                dealId: "testDeal1",
                userId: "test1",
                name: "deal",
                description: "descp",
                link: "link_",
                expiryDate: "10-02-21"
            }
        },
        deal(_, {input}, {model}){
            return{
                dealId: "testDeal1",
                userId: "test1",
                name: "deal",
                description: "descp",
                link: "link_",
                expiryDate: "10-02-21"
            }
        },
        savedDeals(_, {input}, {model}){
            return{
                dealId: "testDeal1",
                userId: "test1",
                name: "deal",
                description: "desp",
                link: "link_",
                expiryDate: "10-02-21"
            }
        },
        menu(){
            return{
                menuId: "test-menu",
                userId: "testM",
                link: "link_"
            }
        }
    }
}