import { useEffect, useState } from "react";
import novaLogo from "../../img/logo-e1729683266649.png";

const Home = () => {
	const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiREVNT19OT1ZBX0NBRkUiLCJzdWIiOiJERU1PX05PVkFfQ0FGRSIsImp0aSI6IjQ5MGQ3Mjk5LWY1Y2YtNDI3MS1hOWE5LTg2ZmE0MGVlNTVjMyIsImlhdCI6MTc0Nzc3MDIyMSwiRGF0YWJhc2UiOiJQT1NfREVNT19OT1ZBX0NBRkUiLCJyb2wiOiJhcGlfYWNjZXNzIiwiaWQiOiI2MTIzIiwibmJmIjoxNzQ3NzcwMjIxLCJleHAiOjE4NDgwMDk2MDEsImlzcyI6InJlbGVhc2UiLCJhdWQiOiJodHRwczovL2JldGEuYXBpLm5vdmFwb2ludG9mc2FsZS5jb20vIn0.yF79mZu1fCkte_EopiSfnTrqr7vwN8kVvE-6iM1ZXog'
    const [authData, setAuthData] = useState(null);
    const [customers, setCustomers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Authentication
    const authenticate = async () => {
        try {
            const response = await fetch("https://beta.api.novapointofsale.com/auth/login", {
                method: 'POST',
                headers: { 
                    'accept': 'application/json', 
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: "DEMO_NOVA_CAFE",
                    password: "KSMQYcm6La",
                })
            });
            
            if (!response.ok) {
                throw new Error(`Login failed: ${response.status}`);
            }
            console.log('Successfully Logged in')
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Authentication error:", error);
            throw error;
        }
    };

    //API fetch with auth token
    const fetchWithAuth = async (url, options = {}) => {
        try {
            // Check if token exists and is not expired
            if (!authData || new Date() > new Date(authData.expires)) {
                const newAuthData = await authenticate();
                setAuthData(newAuthData);
            }

            const response = await fetch(url, {
                ...options,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                    ...options.headers
                }
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("API request error:", error);
            throw error;
        }
    };

    // Get Customers
    const getCustomers = async () => {
        try {
            const data = await fetchWithAuth("https://beta.api.novapointofsale.com/customers");
            setCustomers(data);
            return JSON.stringify(data);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    // Initial load
    useEffect(() => {
        const initialize = async () => {
            try {
                await getCustomers();
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        initialize();
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center">Error: {error}</div>;

    return (
		<>
        <div className="text-center">
            <h1 className="text-center mt-5">Hello Rigo!</h1>
            <p>
                <img src={novaLogo} alt="Rigo" />
            </p>
            <div>
                <h2>Customer Data Loaded</h2>
                <button onClick={getCustomers} className="btn btn-primary">
                    Refresh Customers
                </button>
                {<pre>{JSON.stringify(customers, null, 0)}</pre>}

            {customers && customers.length > 0 ? (
                customers.map((customer) => (
                    <div key={Math.random()}>
                        <h1>{customer.firstName || customer.name || "No name"}</h1>
						<h3>{customer.email}</h3>
                        {/* Add more customer details as needed */}
                    </div>
                ))
            ) : (
                <p>No customers found</p>
            )}
        </div>
    </div>
		</>
    );
};

export default Home;





/*
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
const [character, setCharacter] = useState([])
const [location, setLocation] = useState([])
const [episodes, setEpisode] = useState([])
const [combinedData, mergedData] = useState([]); 


//Fetch API Data for Rick and Morti

useEffect(() => {
		fetch('https://rickandmortyapi.com/api/character')
		.then(response =>  {
			if (!response.ok) {
				throw new Error ('Error fetching info');
			} 
			return response.json();
		})
		.then(data => { 
			console.log(data.results),
			setCharacter(data.results)
		})
		.catch(error => console.log(error))
		

'
	}, [])
	

const fetchData = async () => {
	const urls = ["https://rickandmortyapi.com/api/character",
					"https://rickandmortyapi.com/api/location",
					"https://rickandmortyapi.com/api/episode"
				]
	try {
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const data = await Promise.all(responses.map(res => res.json()));

		console.log(data) 
		setCharacter(data[0].results)
		setLocation(data[1].results)
		setEpisode(data[2].results)
		mergedData(data[0].results);
	}
			catch (error) {
				console.error('Error fetching data:', error)
			}
		}
	
useEffect(() => {
	fetchData()
}, [])

	return (
		<div className="container" >
		<h1 className="center-text">Rick and Morty Characters</h1>
		<ul>
                {combinedData.map(character => (
				<div key={character.id}>
					<img src={character.image}></img>
                    <h1>Name:{character.name}</h1>
					<h2>Species:{character.species}</h2>
					<h2>Current Location:{character.location?.name}</h2>
					<h2>Origin: {character.origin?.name}</h2>
				</div>
                ))
				}
				</ul>	
		</div>
	);
};
*/
