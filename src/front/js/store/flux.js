import userOperationDispatcher from "./userOperationDispatcher";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			logged: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			createUser: async (email, password) => {
				await userOperationDispatcher.register(email,password)
			}
			,
			loginUser : async (email, password) => {
				await userOperationDispatcher.login(email,password)
			},
			verify: async() => {
				try{
					const response = await fetch(process.env.BACKEND_URL + "/protected", {
						method: "GET",
						headers: {
							 "Content-Type": "application/json",
							 'Authorization' : 'Bearer' + localStorage.getItem("token")
						},
						
				   });
				   const data = await response.json();
				   setStore({ logged : data.logged_in  || false });

				}catch(error) {
					setStore({ logged : false })
				}
			},
			logout: async() => {
				localStorage.clear()
				setStore({ logged: false});
			}
		}
	};
};

export default getState;
