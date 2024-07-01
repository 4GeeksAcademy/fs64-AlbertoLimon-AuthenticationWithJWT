const userOperationDispatcher = {
     register : async (email, password) => {
          try {
               const response = await fetch(process.env.BACKEND_URL + "/register", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: email, password: password })
               });
     
               if (!response.ok) {
                    if (response.status === 401) {
                         throw new Error("Email already in use");
                    } else if (response.status === 400) {
                         throw new Error("Invalid email or password format");
                    } else {
                         throw new Error("There was a problem in the registration request");
                    }
               }
     
               const data = await response.json();
               localStorage.setItem("jwt-token", data.token);
               return data;
          } catch (error) {
               console.error("Error during registration:", error);
               throw error;
          }
     },
     
     login : async (email, password) => {
          const resp = await fetch(process.env.BACKEND_URL+"/login", { 
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ email, password }) 
          })
     
          if(!resp.ok) throw Error("There was a problem in the login request")
     
          if(resp.status === 401){
               throw("Invalid credentials")
          }
          else if(resp.status === 400){
               throw ("Invalid email or password format")
          }
          const data = await resp.json()
          // Save your token in the localStorage
          // Also you should set your user into the store using the setItem function
          localStorage.setItem("jwt-token", data.token);
          
          return data
     },

    getMyTasks : async () => {
        // Retrieve token from localStorage
        const token = localStorage.getItem('jwt-token');
   
        const resp = await fetch(`https://your_api.com/private`, {
           method: 'GET',
           headers: { 
             "Content-Type": "application/json",
             'Authorization': 'Bearer ' + token // ⬅⬅⬅ authorization token
           }
        });
    
        if(!resp.ok) {
             throw Error("There was a problem in the login request")
        } else if(resp.status === 403) {
             throw Error("Missing or invalid token");
        } else {
            throw Error("Unknown error");
        }
    
        const data = await resp.json();
        console.log("This is the data you requested", data);
        return data
   }
}

export default userOperationDispatcher
