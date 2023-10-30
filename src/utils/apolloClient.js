import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createHttpLink } from "apollo-link-http";
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';



const httpLink = createHttpLink({
    uri: 'https://kids-in-motion.vercel.app/api/graphql' // Live
    // uri: 'http://localhost:3000/api/graphql' // KW Studio
  });

  
  const authLink = setContext( async (_, { headers }) => {
    const token = await AsyncStorage.getItem('@token')
    console.log("TOKEN IN HEADER ::: ", token)
    return {
      headers: {
        ...headers,
        authorization: token 
      }
    }
  })

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  fetchPolicy: 'network-only'
});

export default client;