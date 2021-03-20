import jwt from 'jsonwebtoken';

async function signupUser({args, graphql}){
        const {data, errors} = await graphql(`
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
        console.log(data.addUser);
        console.log(errors);
        if(data.addUser !== null){
            var token = createToken(data.addUser.user[0].username, data.addUser.user[0].role);
            return {username: data.addUser.user[0].username, token};
        }
        var error = new Object();
        if(errors[0]){
            var msg = errors[0].message;
            if(msg.includes("Password")){
                console.log("Error password");
                error.password = "Password too weak!";
            }
            if(msg.includes("username")){
                error.username = "Username already in use!";
                console.log(error.username);
            }
        }
        
        return {errors: {username: error.username, password: error.password}};
};

async function loginUser({args, graphql}){
    const {data, errors} = await graphql(`
    query Login($username: String!, $password: String!){
        checkUserPassword(username: $username, password: $password){
          username
          role
          email
          characters{
            id
            name
            race
          }
        }
      }
    `, {
        "username": args.username,
        "password": args.password
    });

    console.log(data);
    console.log(errors);
    if(errors){
        return {error: errors[0].message}
    }

    if(data.checkUserPassword){
        var token = createToken(data.checkUserPassword.username, data.checkUserPassword.role);
        return {user: data.checkUserPassword, token}
    }else{
        return {error: "Wrong username or password!"}
    }

}

const createToken = (username, role) => {
    return jwt.sign(
        {data: {username, role}}, 
        'YourSecretKey', 
        { expiresIn: '1h' }
    );
}

self.addGraphQLResolvers({
    "Mutation.signup": signupUser,
    "Query.login": loginUser
})