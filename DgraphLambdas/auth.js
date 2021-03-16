import jwt from 'jsonwebtoken';

async function signupUser({args, graphql}){
        const foundUser = await graphql(`
        mutation (
            $username: String!,
            $email: String!,
            $password: String!
          ){
            addUser(input: [{
                username: $username
                email: $email
                password: $password
                role: USER
                characters: []
            }]){
                user{
                    username
                }
            }
          }
        `, {
            "username": args.username,
            "email": args.email,
            "password": args.password
        });
        console.log(foundUser);
        if(foundUser.data.addUser !== null){
            var username = foundUser.data.addUser.user[0].username;
            var token = createToken(username);
            return {username, token};
        }
        var error = new Object();
        if(foundUser.errors[0]){
            var msg = foundUser.errors[0].message;
            if(msg.includes("Password")){
                console.log("Error password");
                error.password = "Password too weak!";
            }
            if(msg.includes("username")){
                error.username = "Username already in use!";
                console.log(error.username);
            }
        }
        
        return {username: null, token: null,
            errors: {username: error.username, password: error.password}};
};

const createToken = (username) => {
    return jwt.sign(
        {data: {username}}, 
        'YourSecretKey', 
        { expiresIn: '1h' }
    );
}

self.addGraphQLResolvers({
    "Mutation.signup": signupUser,
})