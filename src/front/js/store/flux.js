
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			logged: false,
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
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
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
			register: async (email, password) => {

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
			}
			,
			login: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password })
					})

					if (!resp.ok) {
						alert("Error en el login")
						throw Error("There was a problem in the login request ")
					}

					if (resp.status === 401) {
						alert("Algo fue mal, vuelve a introducir el correo y la contraseña")
						throw ("Invalid credentials")
					}
					else if (resp.status === 400) {
						throw ("Invalid email or password format")
					}
					const data = await resp.json()
					// Save your token in the localStorage
					// Also you should set your user into the store using the setItem function
					localStorage.setItem("jwt-token", data.token);


					return data

				} catch (error) {
					console.error("Error during login:", error);
					throw error;
				}
			},
			/*
			verify: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/protected", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							'Authorization': 'Bearer ' + localStorage.getItem("jwt-token")
						},

					});
					if (resp.status == 422) {
						return false;
					}

					const data = await response.json();

					if (data.logged_in) {
						setStore({ logged: data.logged_in })
						return true
					} else {
						return false
					}


				} catch (error) {
					setStore({ logged: false })
				}
			},
			*/
			logout: async () => {
				localStorage.clear()
				setStore({ logged: false });
			}
		}
	};
};

export default getState;
